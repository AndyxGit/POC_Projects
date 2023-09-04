package lippia.services.api.common;

import com.crowdar.api.rest.APIManager;
import com.crowdar.api.rest.Response;
import com.crowdar.core.PropertyManager;
import lippia.model.api.common.tn3_details.Tn3DetailsResponse;
import lippia.utils.LocalData;
import org.testng.Assert;

public class Tn3DetailsService extends BaseService {

    private Tn3DetailsService() {
        throw new IllegalStateException("Tn3DetailsService class");
    }

    public static Tn3DetailsResponse getResponse() {
        return (Tn3DetailsResponse) APIManager.getLastResponse().getResponse();
    }

    public static Response get(String jsonName) {
        if (LocalData.localData.getToken() == null) BaseService.findToken();
        Assert.assertNotNull(PARAMS.get(), "BaseService.PARAMS es null");
        Assert.assertNotNull(LocalData.localData.getToken(), "El token es null");
        Assert.assertNotNull(LocalData.localData.getSubId(), "LocalData.localData.getSubId() es null");
        PARAMS.get().put("urlTn3Details", PropertyManager.getProperty("url.tn3.details"));
        PARAMS.get().put("authorization", LocalData.localData.getToken());
        PARAMS.get().put("subId", LocalData.localData.getSubId());
        return get(jsonName, Tn3DetailsResponse.class);
    }

    public static Tn3DetailsResponse get() {
        get("request/tn3/rq_Tn3_details");
        return getResponse();
    }
}
