package steps.dataConsumption;

import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lippia.constants.common.PortalPrepagoConstants;
import lippia.constants.dataConsumption.DataConsumptionConstants;
import lippia.utils.LocalData;
import org.testng.Assert;

import static com.crowdar.core.actions.ActionManager.*;
import static lippia.model.bdModel.dataConsumption.Linea.linea;
import static lippia.model.bdModel.dataConsumption.dias.DiaDesde.diaDesde;
import static lippia.model.bdModel.dataConsumption.dias.DiaHasta.diaHasta;
import static lippia.services.api.dataConsumption.DataConsumptionService.*;
import static lippia.services.db.dataConsumption.DBServiceDC.*;
import static lippia.services.web.dataConsumption.DataConsumptionService.*;
import static lippia.utils.dataConsumption.controller.DateController.setFechas;
import static lippia.utils.dataConsumption.controller.FiltrosController.getFiltros;
import static lippia.utils.dataConsumption.controller.FiltrosController.setFiltros;
import static lippia.utils.dataConsumption.controller.RoamingController.setRoaming;

public class DataConsumptionSteps {


    public static Boolean descripcionesFlag = false;

    @Before
    public static void doBefore(Scenario scenario) {
        if (scenario.getId().contains("dataConsumption")) {
            getFiltros();

            if (!descripcionesFlag) {
                getDescripciones();
                descripcionesFlag = true;
            }
        }

    }

    @After
    public static void doAfter(Scenario scenario) {
        if (scenario.getId().contains("dataConsumption")) {
            borrarConsumo();
        }
    }

    @And("se configuran las fechas segun (.*)")
    public void queSeConfiguranLasFechasSegunFechas(String fecha) {
        setFechas(fecha);
    }

    @And("se hace click en card Consumo de Datos")
    public void clickEnCardConsumoDeDatos() {
        click(PortalPrepagoConstants.CARD_CONSUMO_DATOS);
    }

    @Then("se accede a la Pantalla de Consumo de Datos")
    public void seAccedeALaPantallaDeConsumoDeDatos() {
        Assert
                .assertEquals(getText(DataConsumptionConstants.LABEL_CONSUMO_DE_DATOS),
                        DataConsumptionConstants.TITULO_CONSUMO_DE_DATOS);
    }

    @And("el numero de linea es traido desde el Portal")
    public void elNumeroDeLineaEsTraidoDesdeElPortal() {
        esperar();
        Assert.assertEquals(getNumberFromSearch(), LocalData.localData.getBillNumber());
    }

    @And("se ingresan las fechas (.*) en el front")
    public void ingresarFechasEnElFront(String fecha) {
        ingresarFechasFront(fecha);
    }

    @And("esperar")
    public void esperar() {
        espera(3000);
    }

    @And("el boton Consultar esta activado")
    public void elBotonConsultarEstaActivado() {
        Assert.assertTrue(isPresent(DataConsumptionConstants.BOTON_CONSULTAR_ENABLED));
        Assert.assertFalse(isPresent(DataConsumptionConstants.BOTON_CONSULTAR_DISABLED));
    }

    @Given("el boton Consultar esta desactivado")
    public void elBotonConsultarEstaDesactivado() {
        click(PortalPrepagoConstants.CARD_CONSUMO_DATOS);
        Assert.assertTrue(isPresent(DataConsumptionConstants.BOTON_CONSULTAR_DISABLED));
        Assert.assertFalse(isPresent(DataConsumptionConstants.BOTON_CONSULTAR_ENABLED));
    }

    @And("se configura el (.*)")
    public void queSeConfiguraElRoaming(String r) {
        setRoaming(r);
    }

    @And("existen consumos para el servicio (.*)")
    public void queExistenConsumosParaElServicioRatingGroup(String ratingGroup) {
        generadorDeConsumos(ratingGroup);
    }

    @And("se ingresa el numero de linea en el front")
    public void seIngresaElNumeroDeLinea() {
        ingresarLinea();
    }

    @And("se selecciona el roaming en el front")
    public void seSeleccionaElRoaming() {
        seleccionarRoaming();
    }

    @And("se selecciona el servicio (.*) en el front")
    public void seSeleccionaElServicioFiltro(String filtro) {
        seleccionarServicio(filtro);
    }

    @And("se hace click en el boton Consultar")
    public void seHaceClickEnElBotonConsultar() {
        clickEnBotonConsultar();
    }

    @And("se presion consultar")
    public void seClickeaElBotonConsultar() {
       presionarConsultar();
    }

    @And("se ingresan las fechas correspondientes")
    public void seIngresanLasFechasCorrespondientes() {
        System.out.println("fecha desde generada = " + diaDesde.getDiaInicio());
        System.out.println("fecha hasta generada = " + diaHasta.getDiaFin());

        // ingresarFechas();
        esperar();
    }

    @And("se consulta a la BD con el filtro (.*)")
    public void seConsultaALaBD(String filtro) {
        getConsumosBD(filtro);
    }

    @Then("las respuestas son iguales")
    public void lasRespuestasSonIguales() {
        verificarRespuestas();
    }

    @And("se configuran los filtros segun (.*)")
    public void seConfiguranLosFiltrosSegunFiltro(String filtro) {
        setFiltros(filtro);
    }

    @And("no se visualizan datos de consumo")
    public void noSeVisualizanDatosDeConsumo() {
        Assert.assertFalse(isPresent(DataConsumptionConstants.SUMATORIA_COSTO_CONSUMOS));
    }


    @And("el switch de Rango de fechas está activado por defecto")
    public void elSwitchDeRangoDeFechasEstaActivadoPorDefecto() {
        Assert.assertEquals(getAttribute(DataConsumptionConstants.FILTRO_FECHAS, "aria-checked"), "true");
    }

    @Then("se visualiza un mensaje que informa datos no consultados aun")
    public void seVisualizaUnMensajeQueInformaDatosNoConsultadosAun() {
        verificarDatosNoConsultados();
    }

    @And("se ingresa el numero de linea invalido en el front")
    public void seIngresaElNumeroDeLineaInvalidoEnElFront() {
        linea.setNumero("0000000000");
        ingresarLinea();
    }

    @Then("se visualiza un mensaje que informa consumos no encontrados")
    public void seVisualizaUnMensajeQueInformaConsumosNoEncontrados() {
        verificarSinConsumos();
    }

    @Then("se visualiza un mensaje que solicita que se ingrese numero de linea")
    public void seVisualizaUnMensajeQueSolicitaQueSeIngreseNumeroDeLinea() {
        verificarIngreseNumero();
    }

    @And("se consulta a la API con roaming HOME y el filtro (.*)")
    public void seConsultaALaAPIConRoamingHOMEYElFiltroFiltro(String filtro) {
        consultarAPIHome(filtro);
    }

    @And("se consulta a la API con roaming ROAMING y el filtro (.*)")
    public void seConsultaALaAPIConRoamingROAMINGYElFiltroFiltro(String filtro) {
        //consultarAPIRoaming(filtro);
        getAPIResponse(filtro);
    }


    @Then("se visualiza un mensaje que informa formato fecha equivocado")
    public void seVisualizaUnMensajeQueInformaFormatoFechaEquivocado() {
        verificarFormatoFecha();
    }

    @And("se hace click en el header SERVICIO")
    public void seHaceClickEnElHeaderSERVICIO() {
        clickHeaderServicios();
    }

    @And("se hace click en el header Precio")
    public void seHaceClickEnElHeaderPRECIO() {
        clickHeaderPrecio();
    }

    @And("se hace click en el header Fecha")
    public void seHaceClickEnElHeaderFecha() {
        clickHeaderFecha();
    }


    @Then("los resultados se ordenan por SERVICIO desc")
    public void losResultadosSeOrdenanPorSERVICIODesc() {
        verificarOrdenServiciosDesc();
    }


    @Then("los resultados se ordenan por Precio desc")
    public void losResultadosSeOrdenanPorPrecioDesc() {
        verificarOrdenPreciosDesc();
    }

    @Then("los resultados se ordenan por Precio asc")
    public void losResultadosSeOrdenanPorPrecioAsc() {
        verificarOrdenPreciosAsc();
    }


    @Then("los resultados se ordenan por Fecha desc")
    public void losResultadosSeOrdenanPorFechaDesc() {
        verificarOrdenFechasDesc();
    }

    @Then("los resultados se ordenan por Fecha asc")
    public void losResultadosSeOrdenanPorFechaAsc() {
        clickHeaderFecha();
    }

    @Then("la fecha es la fecha actual")
    public void laFechaEsLaFechaActual() {
        verificarFechaActual();
    }

    @Then("hovering sobre el icono de info muestra un msj de demora")
    public void hoveringSobreElIconoDeInfoMuestraUnMsjDeDemora() {
        verificarTooltip();
    }

    @When("request API filtro = (.*)")
    public void requestAPIFiltroFiltro(String filtro) {
        getAPIResponse(filtro);
    }

    @And("las fechas corresponden a las ultimas 48hs")
    public void lasFechasCorrespondenALasUltimasHs() {
        verificarFechasPorDefecto();
    }

    @Then("se verifica el icono del pais")
    public void seVerificaElIconoDelPais() {
        verificarIconoPais();
    }
}
