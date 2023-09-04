package lippia.services.web.login;

import com.crowdar.core.PropertyManager;
import com.crowdar.core.actions.ActionManager;
import lippia.constants.common.LoginConstants;

import static com.crowdar.core.actions.WebActionManager.navigateTo;

public class LoginService extends ActionManager {

    public static void login(String username, String password) {
        String environment = PropertyManager.getProperty("environment").toLowerCase();
        if (environment.equalsIgnoreCase("DEV")) environment = "desa";
        navigateTo(PropertyManager.getProperty("web.base.url").replace("{{environment}}",environment));
        waitVisibility(LoginConstants.INPUT_USERNAME_ID);
        setInput(LoginConstants.INPUT_USERNAME_ID, username);
        waitVisibility(LoginConstants.INPUT_PASSWORD_ID);
        setInput(LoginConstants.INPUT_PASSWORD_ID, password);
        click(LoginConstants.BTN_INGRESAR_ID);
    }
}
