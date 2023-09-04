package steps.line_data;

import com.crowdar.core.actions.WebActionManager;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import lippia.constants.line_data.LineDataConstants;
import lippia.services.api.common.Tn3Service;
import org.testng.Assert;
import validator.line_data.LineDataValidator;

public class LineDataSteps {

    @And("se visualizan los datos de la linea")
    public void seVisualizanLosDatosDeLaLinea() {
        LineDataValidator.validateLineDataDisplayed(true);
    }

    @And("no se visualizan los datos")
    public void noSeVisualizanLosDatos() {
        LineDataValidator.validateLineDataDisplayed(false);
    }

    @And("se verifican que son correctos")
    public void seVerificanQueSonCorrectos() {
        LineDataValidator.validateLineData();
    }

    @And("hay diferencia entre el Estado Actual de la base de datos y la plataforma para la linea ingresada")
    public void hayDiferenciaEntreElEstadoActualDeLaBaseDeDatosYLaPlataformaParaLaLineaIngresada() {
        Tn3Service.changeStatusSuscriber(null);
    }

    @Then("se verifica que el estado actual es inconsistente")
    public void seVerificaQueElEstadoActualEsInconsistente() {
        LineDataValidator.validateInconsistentState();
    }

    @And("se muestra un tooltip con el detalle del estado actual")
    public void seMuestraUnTooltipConElDetalleDelEstadoActual() {
        Assert.assertTrue(WebActionManager.isVisible(LineDataConstants.ESTADO_ACTUAL_TOOLTIP), "El tooltip de estado inconsistente no es visible");
    }

    @And("se verifica la recarga de credito de pesos '(.*)' con vencimiento en '(.*)' dias")
    public void seVerificaLaRecargaDeCreditoDePesosMontoRecargaConVencimientoEnDiasDias(String monto, String dias) {
        LineDataValidator.validateRecharge(monto, dias);
    }

    @And("se verifica la acreditacion de saldo promocional de pesos '(.*)' con vencimiento en '(.*)' dias")
    public void seVerificaLaAcreditacionDeSaldoPromocionalDePesosMontoConVencimientoEnDiasDias(String monto, String dias) {
        LineDataValidator.validatePromotionalRecharge(monto, dias);
    }

    @And("se verifica que el saldo de abono disponible es de pesos '(.*)'")
    public void seVerificaQueElSaldoDeAbonoDisponibleEsDePesos(String monto) {
        LineDataValidator.validateAvailableMonthlyPayment(monto);
    }

    @Then("datos de la linea se contrae")
    public void datosDeLaLineaSeContrae() {
        LineDataValidator.validateContracted();
    }
}
