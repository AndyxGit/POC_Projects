package lippia.services.api.common;

import com.crowdar.api.rest.Request;
import com.crowdar.api.rest.Response;
import com.crowdar.core.PropertyManager;
import lippia.config.EntityConfiguration;
import lippia.config.RequestException;
import lippia.services.web.common.CustomMethodService;
import lippia.utils.LocalData;
import org.testng.Assert;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.logging.Logger;

public class BaseService extends CustomMethodService {

    private static final Logger LOGGER = Logger.getLogger(BaseService.class.getName());
    public static final ThreadLocal<Map<String, String>> PARAMS = new ThreadLocal<>();

    public static <T> Response get(String jsonRequest, Class<T> classModel) {
        Request request = getRequest(jsonRequest, setParams());
        request.getHeaders().put("Accept-Charset", "utf-8");
        request.setUrl(request.getUrl().replace("%pais%", PropertyManager.getProperty("country").toLowerCase()));
        return get(request, classModel, getCustomRestClient());
    }

    public static <T> Response post(String jsonRequest, Class<T> classModel) {
        Request request = getRequest(jsonRequest, setParams());
        request.getHeaders().put("Accept-Charset", "utf-8");
        request.getHeaders().put("Content-Type", "application/json");
        request.setUrl(request.getUrl().replace("%pais%", PropertyManager.getProperty("country").toLowerCase()));
        return post(request, classModel, getCustomRestClient());
    }

    private static Map<String, String> setParams() {
        Assert.assertNotNull(PARAMS.get(), "BaseService.PARAMS es null");
        PARAMS.get().put("base.url", PropertyManager.getProperty("base.url"));
        PARAMS.get().put("lineNumber", LocalData.localData.getBillNumber());
        return PARAMS.get();
    }

    public static void doRequest(String methodName, String entity, String jsonName) throws RequestException {
        Class<?> entityService = EntityConfiguration.valueOf(entity).getEntityService();
        String jsonPath = "request/".concat(jsonName);
        try {
            entityService.getMethod(methodName.toLowerCase(), String.class).invoke("", jsonPath);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RequestException("Error haciendo la solicitud: " + e.getMessage());
        }
    }

    /**
     * Metodo que trae el token para utilizarlo en las APIs de la capa V2
     */
    public static void findToken() {
        if (LocalData.localData.getToken() == null) {
            LOGGER.info("Se crea un token para el acceso a las APIs");
            Token.post("request/rq_findToken");
            LOGGER.info("Token para el servicio: " + LocalData.localData.getToken());
        }
    }
}
