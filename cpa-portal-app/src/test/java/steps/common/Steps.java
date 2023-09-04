package steps.common;

import com.claro.sp.automation.controller.CellularController;
import com.claro.sp.automation.model.subscriber.Cellular;
import com.crowdar.core.PropertyManager;
import com.google.firebase.database.annotations.NotNull;
import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import lippia.services.api.common.BaseService;
import lippia.services.api.common.Tn3BalancesService;
import lippia.services.db.common.DbService;
import lippia.services.api.common.Tn3Service;
import lippia.utils.DateUtils;
import lippia.utils.LocalData;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;
import static com.claro.sp.ta.cpas.Registration.registrationCpa;

public class Steps {

    private static final Logger logger = Logger.getLogger(Steps.class.getName());
    //DATOS CREACION DE LINEAS
    private static CellularController cellularController = null;
    private Cellular newCellular = null;
    //DATOS REGISTRAR CPA
    private static boolean dunit = false;
    private static String exa;
    private static String rt;
    private String nameCp;
    private int idTestCase;
    private final String bbRepositoryName = "CPA_TX_CN";
    private final String cpaCreationDate = "31/12/3999";
    Tn3Service tn3 = new Tn3Service();
    DbService dbService = new DbService();


    @Before()
    public void setScenario(Scenario scenario) throws Exception {
        org.apache.log4j.Logger.getRootLogger().info(" Opening-----------" + scenario.getName() + "-----------");
        LocalData.localData.setScenario(scenario);
        BaseService.PARAMS.set(new HashMap<>());

        if (Boolean.parseBoolean(PropertyManager.getProperty("flagCpa"))) {
            String busqueda2 = "@PSP-";
            List<String> tags = (List<String>) scenario.getSourceTagNames();
            for (String i : tags) {
                if (i.contains(busqueda2)) {
                    idTestCase = Integer.parseInt(i.substring(5));
                }
            }
            nameCp = scenario.getName();
            if (!dunit) {
                Runtime.getRuntime().addShutdownHook(new Thread() {
                    public void run() {
                        System.out.println("/");
                    }
                });
                exa = registrationCpa().getUsername();
                rt = registrationCpa().getRt();
                dunit = true;
            }
            registrationCpa()
                    .idTestCase(this.idTestCase)
                    .nameCp(nameCp)
                    .cpaCreationDate(cpaCreationDate)
                    .exa(exa)
                    .rt(rt)
                    .bbRepositoryName(bbRepositoryName)
                    .insertExecution();
        }
    }


    @After
    public void doAfter(Scenario scenario) throws Exception {
        System.out.println("--------------------------------------------------------------");
        System.out.println("Ending - " + scenario.getName() + " Status - " + scenario.getStatus());
        System.out.println("--------------------------------------------------------------");

        if (Boolean.parseBoolean(PropertyManager.getProperty("flagCpa"))) {
            registrationCpa()
                    .idTestCase(idTestCase)
                    .nameCp(nameCp)
                    .cpaCreationDate(cpaCreationDate)
                    .exa(exa)
                    .rt(rt)
                    .bbRepositoryName(bbRepositoryName)
                    .isFailed(scenario.isFailed())
                    .updateExecution();
        }
        if (newCellular != null) cellularController.deleteCellular(newCellular);
        System.out.println("<------ FIN PRUEBA ------>");
        System.out.println(" ");
        LocalData.listaScenarios.add(scenario);
    }

    @Given("una linea claro del tipo (.*)")
    public void unaLineaClaro(@NotNull String businessType) {
        LocalData.localData.setNegocio(businessType.toUpperCase());

        if (businessType.equals("PP") || businessType.equals("CR")) {
            try {
                cellularController = new CellularController(PropertyManager.getProperty("environment"), PropertyManager.getProperty("country"), PropertyManager.getProperty("user"), PropertyManager.getProperty("password"), PropertyManager.getProperty("user"), PropertyManager.getProperty("password"));
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }

            newCellular = new Cellular();
            newCellular.setBusinessType(businessType);

            try {
                newCellular = cellularController.cellularProvisioning(newCellular);
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }

            logger.info("Se genero el numero de linea: " + newCellular.getCellularNumber());
            //Cellular Number
            LocalData.localData.setBillNumber(newCellular.getCellularNumber());
            //Prefijo pais + Cellular Number
            LocalData.localData.setSubId(newCellular.getSubid());

        } else if (businessType.equals("CO")) {
            String lineNumber = DbService.getCoLine();
            assert lineNumber != null;

            logger.info("Se genero el numero de linea: " + lineNumber);
            //Cellular Number
            LocalData.localData.setBillNumber(lineNumber);
            //Prefijo pais + Cellular Number
            LocalData.localData.setSubId(PropertyManager.getProperty("prefix.".concat(PropertyManager.getProperty("country").toLowerCase())).concat(lineNumber));
        }
    }

    @And("que la linea es (.*)")
    public void queLaLineaEsTipoNegocio(@NotNull String negocio) {
        LocalData.localData.setNegocio(negocio.toUpperCase());
        try {
            dbService.executeQuerySetNegocio();
            if (negocio.equals("PP") || negocio.equals("CR")) {
                tn3.executeQuerySetProfileTN3();
                LocalData.localData.setPlan(PropertyManager.getProperty(PropertyManager.getProperty("country") + "." + negocio.toUpperCase()));
                dbService.cambiarPlanLinea(LocalData.localData.getPlan());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @And("se realiza una recarga de credito de '(.*)' pesos con vencimiento en '(.*)' dias")
    public void seRealizaUnaRecargaDeCreditoDeMontoRecargaPesosConVencimientoEnDiasDias(String mount, String dias) {
        String expiryDate;
        try {
            expiryDate = DateUtils.editDate(Integer.parseInt(dias), DateUtils.fechaActual("dd/MM/yyyy"));
        } catch (ParseException e) {
            logger.info("Error en seRealizaUnaRecargaDeCreditoDePesos()");
            throw new RuntimeException(e);
        }
        Tn3BalancesService.accountRecharge(mount, expiryDate);
        DbService.setLastRechargeDate(LocalData.localData.getBillNumber(), DateUtils.fechaActual("yyyy-MM-dd HH:mm:ss"));
    }

    @And("se realiza una acreditacion de saldo promocional de pesos '(.*)' con vencimiento en '(.*)' dias")
    public void seRealizaUnaAcreditacionDeSaldoPromocionalDePesosMontoConVencimientoEnDiasDias(String mount, String dias) {
        String expiryDate;
        try {
            expiryDate = DateUtils.editDate(Integer.parseInt(dias), DateUtils.fechaActual("dd/MM/yyyy"));
        } catch (ParseException e) {
            logger.info("Error en seRealizaUnaAcreditacionDeSaldoPromocionalDePesosMonto()");
            throw new RuntimeException(e);
        }
        Tn3BalancesService.bonusRecharge(mount, expiryDate);
    }

    @And("un saldo de abono disponible de pesos '(.*)'")
    public void unSaldoDeAbonoDisponibleDePesos(String monto) {
        Tn3BalancesService.periodicRecharge(monto);
    }

    @And("una linea inexistente")
    public void unaLineaInexistente() {
        unaLineaClaro("CR");
        try {
            cellularController.deleteCellular(newCellular);
            newCellular = null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}