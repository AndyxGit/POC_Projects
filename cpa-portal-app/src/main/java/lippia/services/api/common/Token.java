package lippia.services.api.common;

import com.crowdar.api.rest.Headers;
import com.crowdar.core.PropertyManager;
import lippia.utils.LocalData;
import org.testng.Assert;

public class Token extends BaseService {

    private Token() {
        super();
        throw new IllegalStateException("Token class");
    }

    /**
     * Una solicitud POST que toma un archivo json como parámetro y devuelve una respuesta.
     *
     * @param jsonName El nombre del archivo json que contiene el cuerpo de la solicitud.
     */
    public static void post(String jsonName) {
        Assert.assertNotNull(PARAMS.get(), "BaseService.PARAMS es null");
        PARAMS.get().put("urlToken", PropertyManager.getProperty("url.token"));
        Headers header = post(jsonName, Token.class).getHeader();
        String str = header.getHeaderValues("authorization").toString();
        LocalData.localData.setToken(str.replaceAll("[\\[\\]]", ""));
    }
}
