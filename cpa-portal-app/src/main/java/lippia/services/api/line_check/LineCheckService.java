package lippia.services.api.line_check;

import com.crowdar.api.rest.APIManager;
import com.crowdar.api.rest.Response;
import lippia.model.api.lineCheck.LineCheckResponse;
import lippia.services.api.common.BaseService;

public class LineCheckService extends BaseService {

    private LineCheckService() {
        throw new IllegalStateException("LineCheckService class");
    }

    private static LineCheckResponse getResponse() {
        return (LineCheckResponse) APIManager.getLastResponse().getResponse();
    }

    public static Response get(String jsonName) {
        return get(jsonName, LineCheckResponse.class);
    }

    public static LineCheckResponse get() {
        get("request/lineCheck/rq_lineCheck");
        return getResponse();
    }
}
