package lippia.services.api.line_data;

import com.crowdar.api.rest.APIManager;
import com.crowdar.api.rest.Response;
import lippia.model.api.lineData.LineDataResponse;
import lippia.services.api.common.BaseService;
import lippia.utils.LocalData;
import org.testng.Assert;

public class LineDataService extends BaseService {

    private LineDataService() {
        throw new IllegalStateException("LineDataService class");
    }

    private static LineDataResponse getResponse() {
        return (LineDataResponse) APIManager.getLastResponse().getResponse();
    }

    public static Response get(String jsonName) {
        Assert.assertNotNull(PARAMS.get(), "BaseService.PARAMS es null");
        PARAMS.get().put("msisdn", LocalData.localData.getMsisdn());
        PARAMS.get().put("rplId", LocalData.localData.getRplId());
        return get(jsonName, LineDataResponse.class);
    }

    public static LineDataResponse get() {
        get("request/lineData/rq_lineData");
        return getResponse();
    }
}
