package lippia.services.web.home;

import com.crowdar.core.actions.ActionManager;
import lippia.constants.common.HomeConstants;

public class HomeService extends ActionManager {

    public static void clickPortalPrepago() {
        click(HomeConstants.PORTAL_PREPAGO_BUTTON);
    }
}
