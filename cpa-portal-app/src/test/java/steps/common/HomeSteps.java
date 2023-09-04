package steps.common;

import io.cucumber.java.en.When;
import lippia.services.web.home.HomeService;

public class HomeSteps {
    @When("ingresamos al Portal Prepago Cuenta Segura")
    public void ingresamosAlPortalPrepagoCuentaSegura() {
        HomeService.clickPortalPrepago();
    }
}
