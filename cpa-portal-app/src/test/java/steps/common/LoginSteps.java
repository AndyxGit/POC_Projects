package steps.common;

import com.crowdar.core.PropertyManager;
import io.cucumber.java.en.Given;
import lippia.services.web.login.LoginService;

public class LoginSteps {

    @Given("inicio sesion con las credenciales por defecto")
    public void inicioSesionConLasCredencialesPorDefecto() {
        LoginService.login(PropertyManager.getProperty("portal.user"), PropertyManager.getProperty("portal.password"));
    }
}
