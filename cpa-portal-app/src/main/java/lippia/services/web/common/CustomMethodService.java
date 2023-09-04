package lippia.services.web.common;

import com.crowdar.api.rest.MethodsService;
import com.crowdar.api.rest.RestClient;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.*;
import java.io.IOException;
import java.net.HttpURLConnection;

public class CustomMethodService extends MethodsService {
    public static RestClient getCustomRestClient() {
        try {
            configureInsecureSSL();
        } catch (Exception e) {
            e.printStackTrace();
        }
        RestTemplate restTemplate = createInsecureRestTemplate();

        return RestClient.getRestClient(restTemplate);
    }

    private static void configureInsecureSSL() throws Exception {
        HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);
        HttpsURLConnection.setDefaultSSLSocketFactory(createInsecureSSLSocketFactory());
    }

    private static javax.net.ssl.SSLSocketFactory createInsecureSSLSocketFactory() throws Exception {
        javax.net.ssl.TrustManager[] trustAllCerts = new javax.net.ssl.TrustManager[]{new javax.net.ssl.X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }

            public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
            }

            public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
            }
        }};

        javax.net.ssl.SSLContext sslContext = javax.net.ssl.SSLContext.getInstance("SSL");
        sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
        return sslContext.getSocketFactory();
    }

    private static RestTemplate createInsecureRestTemplate() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory() {
            protected void prepareConnection(HttpURLConnection connection, String httpMethod) throws IOException {
                if (connection instanceof HttpsURLConnection) {
                    try {
                        ((HttpsURLConnection) connection).setSSLSocketFactory(createInsecureSSLSocketFactory());
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    ((HttpsURLConnection) connection).setHostnameVerifier((hostname, session) -> true);
                }
                super.prepareConnection(connection, httpMethod);
            }
        };
        return new RestTemplate(requestFactory);
    }
}
