package steps.portal_prepago;

import com.crowdar.core.PropertyManager;
import com.crowdar.core.actions.WebActionManager;
import com.google.firebase.database.annotations.NotNull;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lippia.constants.common.PortalPrepagoConstants;
import lippia.constants.line_data.LineDataConstants;
import lippia.utils.LocalData;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

public class PortalPrepagoSteps {
    @And("el asesor ingresa el numero de linea en el campo de busqueda")
    public void elAsesorIngresaElNumeroDeLineaEnElCampoDeBusqueda() {
        String lineNumber = LocalData.localData.getBillNumber();
        WebActionManager.setInput(PortalPrepagoConstants.SEARCH_PHONE_INPUT, lineNumber, true);
    }

    @Then("Se verifica que la bandera mostrada corresponde al pais")
    public void seVerificaQueLaBanderaMostradaCorrespondeAlPais() {
        String country = PropertyManager.getProperty("country");
        Assert.assertEquals(country, WebActionManager.getText(PortalPrepagoConstants.COUNTRY_NAME_TXT));

        WebElement elem = WebActionManager.getElement(PortalPrepagoConstants.COUNTRY_OPTION_IMG);
        String flagAlt = elem.getAttribute("alt").toUpperCase();
        Assert.assertEquals(country, flagAlt);
    }

    @And("el asesor hace click en el desplegable Datos de la linea")
    public void elAsesorHaceClickEnElDesplegableDatosDeLaLinea() {
        WebActionManager.waitClickable(LineDataConstants.DDLL_DROPDOWN);
        WebActionManager.click(LineDataConstants.DDLL_DROPDOWN);
    }

    @When("el asesor presiona enter en el textbox searchPhoneInput sin ingresar ningun numero")
    @And("el asesor presiona enter en el textbox searchPhoneInput")
    public void elAsesorPresionaEnterEnElTextboxSearchPhoneInputSinIngresarNingunNumero() {
        WebElement element = WebActionManager.getElement(PortalPrepagoConstants.SEARCH_PHONE_INPUT);
        element.sendKeys(Keys.ENTER);
    }

    @Then("se muestra el mensaje de error '(.*)'")
    public void seMuestraElMensajeDeErrorPorFavorIngreseElNumeroDeLineaAConsultar(@NotNull String msg) {
        msg = msg.replace("\\n", "\n");
        WebActionManager.waitVisibility(LineDataConstants.DDLL_INGRESE_NUMERO_MSG);
        String msgError = WebActionManager.getText(LineDataConstants.DDLL_INGRESE_NUMERO_MSG);
        Assert.assertEquals(msg, msgError, "El mensaje de error al no ingresar un numero de consulta, no es correcto");
    }

    @Then("se muestra el error '(.*)' en un mensaje emergente")
    public void seMuestraElErrorPorFavorIngreseElNumeroDeLineaAConsultarEnUnMensajeEmergente(String msg) {
        String [] error = msg.split(":");
        String titulo = error[0].trim();
        String desc = error[1].trim();

        String msgErrorTitulo = WebActionManager.getText(PortalPrepagoConstants.ERROR_EMERGENTE_TITULO);
        Assert.assertEquals(titulo, msgErrorTitulo, "El titulo del mensaje de error al no ingresar un numero de consulta, no es correcto");
        String msgErrorDesc = WebActionManager.getText(PortalPrepagoConstants.ERROR_EMERGENTE_DESC);
        Assert.assertEquals(desc, msgErrorDesc, "La descripción del mensaje de error al no ingresar un numero de consulta, no es correcto");
    }

    @And("el asesor presiona enter en el textbox numero de linea ingresando un numero invalido - '(.*)'")
    public void elAsesorPresionaEnterEnElTextboxNumeroDeLineaIngresandoUnNumeroInvalidoNumero(String celNumber) {
        WebElement element = WebActionManager.getElement(PortalPrepagoConstants.SEARCH_PHONE_INPUT);
        element.sendKeys(celNumber);
        element.sendKeys(Keys.ENTER);
    }

    @When("el asesor presiona backspace en el textbox numero de linea")
    public void elAsesorPresionaBackspaceEnElTextboxNumeroDeLinea() {
        WebElement element = WebActionManager.getElement(PortalPrepagoConstants.SEARCH_PHONE_INPUT);
        element.sendKeys(Keys.BACK_SPACE);
    }
}
