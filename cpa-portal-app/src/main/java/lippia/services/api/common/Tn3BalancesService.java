package lippia.services.api.common;

import com.crowdar.api.rest.Response;
import com.crowdar.core.PropertyManager;
import lippia.model.api.common.tn3_balances.Tn3BalancesResponse;
import lippia.utils.LocalData;
import org.testng.Assert;

import static lippia.utils.DateUtils.changeFormat;

public class Tn3BalancesService extends BaseService {

    private Tn3BalancesService() {
        throw new IllegalStateException("Tn3BalancesService class");
    }
    private static String RECHARGE = "recharge";
    private static String EXPIRY_DATE = "expiryDate";
    private static String ERROR_BASEPARAMS_NULL = "BaseService.PARAMS es null";

    private static Response post(String jsonName) {
        if (LocalData.localData.getToken() == null) BaseService.findToken();
        Assert.assertNotNull(PARAMS.get(), ERROR_BASEPARAMS_NULL);
        PARAMS.get().put("urlTn3Balances", PropertyManager.getProperty("url.tn3.balances"));
        PARAMS.get().put("authorization", LocalData.localData.getToken());
        PARAMS.get().put("subId", LocalData.localData.getSubId());
        return post(jsonName, Tn3BalancesResponse.class);
    }

    public static void accountRecharge(String mount, String expiryDate) {
        Assert.assertNotNull(PARAMS.get(), ERROR_BASEPARAMS_NULL);
        PARAMS.get().put(RECHARGE, String.valueOf(Integer.parseInt(mount) * 100000));
        PARAMS.get().put(EXPIRY_DATE, changeFormat(expiryDate.concat(" 00:00"), "dd/MM/yyyy HH:mm", "yyyy-MM-dd HH:mm:ss.SSS Z"));
        post("request/tn3/rq_Tn3_fundTransfer_main");
    }

    public static void bonusRecharge(String mount, String expiryDate) {
        Assert.assertNotNull(PARAMS.get(), ERROR_BASEPARAMS_NULL);
        PARAMS.get().put(RECHARGE, String.valueOf(Integer.parseInt(mount) * 100000));
        PARAMS.get().put(EXPIRY_DATE, changeFormat(expiryDate.concat(" 00:00"), "dd/MM/yyyy HH:mm", "yyyy-MM-dd HH:mm:ss.SSS Z"));
        post("request/tn3/rq_Tn3_fundTransfer_bonus");
    }

    public static void periodicRecharge(String mount) {
        Assert.assertNotNull(PARAMS.get(), ERROR_BASEPARAMS_NULL);
        PARAMS.get().put(RECHARGE, String.valueOf(Integer.parseInt(mount) * 100000));
        post("request/tn3/rq_Tn3_fundTransfer_periodic");
    }
}
