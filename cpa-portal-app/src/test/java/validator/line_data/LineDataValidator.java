package validator.line_data;

import com.crowdar.core.PropertyManager;
import com.crowdar.core.actions.WebActionManager;
import lippia.constants.line_data.LineDataConstants;
import lippia.model.api.lineCheck.LineCheckResponse;
import lippia.model.api.lineData.LineDataResponse;
import lippia.model.web.line_data.*;
import lippia.services.api.line_check.LineCheckService;
import lippia.services.api.line_data.LineDataService;
import lippia.utils.DateUtils;
import lippia.utils.LocalData;
import lippia.utils.Utilities;
import org.testng.Assert;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.logging.Logger;

import static lippia.utils.Utilities.*;

public class LineDataValidator {
    private static final Logger logger = Logger.getLogger(LineDataValidator.class.getName());
    private static LineDataResponse lineDataResponse;
    private static String API_PATTERN;
    private static String currency;
    private static final LineData apiData = new LineData();
    private static final LineData webData = new LineData();
    private static final String FRONT_PATTERN = "dd/MM/yyyy";

    public static void validateLineDataDisplayed(boolean displayed) {
        Field[] campos = LineDataConstants.class.getFields();
        for (Field campo : campos) {
            String nombreCampo = campo.getName();
            if (!(
                    LocalData.localData.getNegocio().equals("PP") && nombreCampo.startsWith("ABONO_MENSUAL") ||
                    nombreCampo.startsWith("DDLL") ||
                    nombreCampo.endsWith("TOOLTIP") ||
                    nombreCampo.equals("SALDO_CONGELADO_VTO") && !PropertyManager.getProperty("country").equals("UY") ||
                    nombreCampo.equals("ULTIMA_RECARGA_DATE")
            ))
            {
                try {
                    String locator = (String) campo.get(null);
                    if (displayed) {
                        WebActionManager.waitVisibility(locator);
                        Assert.assertTrue(WebActionManager.isVisible(locator));
                    } else {
                        Assert.assertTrue(WebActionManager.getElements(locator).isEmpty());
                    }
                } catch (IllegalAccessException e) {
                    System.out.println("Error al acceder al campo " + campo.getName() + ": " + e.getMessage());
                }
            }
        }
    }

    public static void validateLineData() {
        getApiData();
        setApiData();
        setWebData();
        getScreenshot();
        Assert.assertEquals(webData.toString(), apiData.toString());
    }

    private static void setApiData() {
        apiData.setLabel("Datos de la línea");

        apiData.setSaldoTotalDisponible(
                new Saldo(
                        new Monto(
                                "Saldo total disponible",
                                currency.concat(decimalFormat(lineDataResponse.getBalance().getAvailablePayment().getAmount()))
                        ),
                        null
                )
        );

        if (!LocalData.localData.getNegocio().equals("CR")) {
            apiData.setAbono(null);
        } else {
            apiData.setAbono(new Abono(
                    new Monto(
                            "Abono mensual",
                            currency.concat(decimalFormat(lineDataResponse.getBalance().getMonthlyPayment().getAmount()))
                    ),
                    "Vto. ".concat(DateUtils.changeFormat(lineDataResponse.getBalance().getMonthlyPayment().getExpiration(), API_PATTERN, FRONT_PATTERN)),
                    new Monto(
                            "Disponible",
                            currency.concat(decimalFormat(lineDataResponse.getBalance().getMonthlyPayment().getAvailable()))
                    ),
                    new Monto(
                            "Consumo",
                            currency.concat(decimalFormat(lineDataResponse.getBalance().getMonthlyPayment().getConsumed()))
                    )
            ));
        }

        apiData.setSaldoRecarga(new Saldo(
                new Monto(
                        "Saldo de recarga",
                        currency.concat(decimalFormat(lineDataResponse.getBalance().getRechargePayment().getAmount()))
                ),
                "Vto. ".concat(DateUtils.changeFormat(lineDataResponse.getBalance().getRechargePayment().getExpiration(), API_PATTERN, FRONT_PATTERN))
        ));

        apiData.setSaldoPromocional(new Saldo(
                new Monto(
                        "Saldo promocional",
                        currency.concat(decimalFormat(lineDataResponse.getBalance().getPromotionPayment().getAmount()))
                ),
                "Vto. ".concat(DateUtils.changeFormat(lineDataResponse.getBalance().getPromotionPayment().getExpiration(), API_PATTERN, FRONT_PATTERN))
        ));

        apiData.setSaldoCongelado(new Saldo(
                new Monto(
                        "Saldo congelado",
                        currency.concat(decimalFormat(lineDataResponse.getBalance().getFrozenPayment().getAmount()))
                ),
                (PropertyManager.getProperty("country").equals("UY")) ?
                        "Vto. ".concat(DateUtils.changeFormat(lineDataResponse.getBalance().getFrozenPayment().getExpiration(), API_PATTERN, FRONT_PATTERN)) : ""
        ));

        apiData.setEstados(new Estados(
                "Estados de la línea",
                new Estado(
                        "Actual",
                        capitalFormat(lineDataResponse.getCondition().getCurrentStatus().getDescription())
                ),
                new Estado(
                        "Anterior",
                        capitalFormat(lineDataResponse.getCondition().getLastStatus().getDescription())
                ),
                new Estado(
                        "Cambio de estado",
                        DateUtils.changeFormat(lineDataResponse.getCondition().getChange(), API_PATTERN, FRONT_PATTERN)
                ),
                new Estado(
                        "Del servicio",
                        capitalFormat(lineDataResponse.getCondition().getServiceStatus().getDescription())
                ),
                new Estado(
                        "Plan",
                        lineDataResponse.getCondition().getProfileId().getConcat()
                ),
                new Estado(
                        "Promo Plus",
                        (lineDataResponse.getCondition().getPromoPlus()) ? "Habilitado" : "Deshabilitado"
                ),
                new Estado(
                        "Último uso",
                        DateUtils.changeFormat(lineDataResponse.getCondition().getLastUsed(), API_PATTERN, FRONT_PATTERN)
                )
        ));

        apiData.setFechas(new Fechas(
                new Fecha(
                        "Creación",
                        DateUtils.changeFormat(lineDataResponse.getRegisters().getCreation(), API_PATTERN, FRONT_PATTERN)
                ),
                new Fecha(
                        "Cancelación",
                        DateUtils.changeFormat(lineDataResponse.getRegisters().getCancelled(), API_PATTERN, FRONT_PATTERN)
                ),
                new Fecha(
                        "Última recarga",
                        (lineDataResponse.getRegisters().getLastRecharge().equals("")) ? "" : DateUtils.changeFormat(lineDataResponse.getRegisters().getLastRecharge(), API_PATTERN, FRONT_PATTERN)
                ),
                new Fecha(
                        "Caducidad",
                        DateUtils.changeFormat(lineDataResponse.getRegisters().getExpiration(), API_PATTERN, FRONT_PATTERN)
                ),
                new Fecha(
                        "Suspensión",
                        DateUtils.changeFormat(lineDataResponse.getRegisters().getSuspended(), API_PATTERN, FRONT_PATTERN)
                )
        ));
    }

    private static void setWebData() {
        Utilities.getScreenshot();
        webData.setLabel(WebActionManager.getElement(LineDataConstants.DDLL_LABEL).getText());

        webData.setSaldoTotalDisponible(
                new Saldo(
                        new Monto(
                                WebActionManager.getElement(LineDataConstants.SALDO_TOTAL_DISPONIBLE_LABEL).getText(),
                                WebActionManager.getElement(LineDataConstants.SALDO_TOTAL_DISPONIBLE_MONTO).getText()
                        ),
                        null
                )
        );

        if (!LocalData.localData.getNegocio().equals("CR")) {
            webData.setAbono(null);
        } else {
            webData.setAbono(new Abono(
                    new Monto(
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_LABEL).getText(),
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_MONTO).getText()
                    ),
                    WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_VENCIMIENTO).getText(),
                    new Monto(
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_DISPONIBLE_LABEL).getText(),
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_DISPONIBLE_MONTO).getText()
                    ),
                    new Monto(
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_CONSUMO_LABEL).getText(),
                            WebActionManager.getElement(LineDataConstants.ABONO_MENSUAL_CONSUMO_MONTO).getText()
                    )
            ));
        }

        webData.setSaldoRecarga(new Saldo(
                new Monto(
                        WebActionManager.getElement(LineDataConstants.SALDO_RECARGA_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.SALDO_RECARGA_MONTO).getText()
                ),
                WebActionManager.getElement(LineDataConstants.SALDO_RECARGA_VTO).getText()
        ));

        webData.setSaldoPromocional(new Saldo(
                new Monto(
                        WebActionManager.getElement(LineDataConstants.SALDO_PROMOCIONAL_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.SALDO_PROMOCIONAL_MONTO).getText()
                ),
                WebActionManager.getElement(LineDataConstants.SALDO_PROMOCIONAL_VTO).getText()
        ));

        webData.setSaldoCongelado(new Saldo(
                new Monto(
                        WebActionManager.getElement(LineDataConstants.SALDO_CONGELADO_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.SALDO_CONGELADO_MONTO).getText()
                ),
                (PropertyManager.getProperty("country").equals("UY")) ?
                        WebActionManager.getElement(LineDataConstants.SALDO_CONGELADO_VTO).getText() : ""
        ));

        webData.setEstados(new Estados(
                WebActionManager.getElement(LineDataConstants.ESTADOS_DE_LA_LINEA_LABEL).getText(),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_ACTUAL_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_ACTUAL).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_ANTERIOR_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_ANTERIOR).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_CAMBIO_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_CAMBIO_DATE).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_DEL_SERVICIO_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_DEL_SERVICIO).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_PLAN_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_PLAN).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_PROMO_PLUS_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_PROMO_PLUS_ESTADO).getText()
                ),
                new Estado(
                        WebActionManager.getElement(LineDataConstants.ESTADO_ULTIMO_USO_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ESTADO_ULTIMO_USO_DATE).getText()
                )
        ));
        webData.setFechas(new Fechas(
                new Fecha(
                        WebActionManager.getElement(LineDataConstants.CREACION_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.CREACION_DATE).getText()
                ),
                new Fecha(
                        WebActionManager.getElement(LineDataConstants.CANCELACION_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.CANCELACION_DATE).getText()
                ),
                new Fecha(
                        WebActionManager.getElement(LineDataConstants.ULTIMA_RECARGA_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.ULTIMA_RECARGA_DATE).getText()
                ),
                new Fecha(
                        WebActionManager.getElement(LineDataConstants.CADUCIDAD_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.CADUCIDAD_DATE).getText()
                ),
                new Fecha(
                        WebActionManager.getElement(LineDataConstants.SUSPENSION_LABEL).getText(),
                        WebActionManager.getElement(LineDataConstants.SUSPENSION_DATE).getText()
                )
        ));
    }

    private static void getApiData() {
        LineCheckResponse lineCheckResponse = LineCheckService.get();
        LocalData.localData.setMsisdn(lineCheckResponse.getMsisdn());
        LocalData.localData.setRplId(lineCheckResponse.getRplId());
        lineDataResponse = LineDataService.get();
        currency = lineDataResponse.getFormat().getCurrency();
        API_PATTERN = lineDataResponse.getFormat().getDate();
    }

    public static void validateInconsistentState() {
        String estadoActual = WebActionManager.getText(LineDataConstants.ESTADO_ACTUAL);
        Assert.assertEquals(estadoActual, "Inconsistente", "El estado actual de la linea no es correcto");

        String[] estados = WebActionManager.getAttribute(LineDataConstants.ESTADO_ACTUAL, "aria-label").split(",");
        String v1 = estados[1].split(":")[1].trim();
        String v2 = estados[2].split(":")[1].trim();
        Assert.assertNotEquals(v1, v2, "Los estados no son inconsistentes.");
    }

    public static void validateRecharge(String monto, String dias) {
        Saldo esperado;
        BigDecimal montoBd = new BigDecimal(monto);
        //valido saldo de recarga
        try {
            esperado = new Saldo(
                    new Monto(
                            WebActionManager.getElement(LineDataConstants.SALDO_RECARGA_LABEL).getText(),
                            currency.concat(decimalFormat(montoBd))
                    ),
                    "Vto. ".concat(DateUtils.editDate(Integer.parseInt(dias), DateUtils.fechaActual("dd/MM/yyyy")))
            );
        } catch (ParseException e) {
            logger.info("Error al parsear fecha en validateRecharge()");
            throw new RuntimeException(e);
        }
        Saldo web = webData.getSaldoRecarga();
        Assert.assertEquals(esperado.toString(), web.toString());
    }

    public static void validatePromotionalRecharge(String monto, String dias) {
        Saldo esperado;
        BigDecimal montoBd = new BigDecimal(monto);
        try {
            esperado = new Saldo(
                    new Monto(
                            WebActionManager.getElement(LineDataConstants.SALDO_PROMOCIONAL_LABEL).getText(),
                            currency.concat(decimalFormat(montoBd))
                    ),
                    "Vto. ".concat(DateUtils.editDate(Integer.parseInt(dias), DateUtils.fechaActual("dd/MM/yyyy")))
            );
        } catch (ParseException e) {
            logger.info("Error al parsear fecha en validatePromotionalRecharge()");
            throw new RuntimeException(e);
        }
        Saldo web = webData.getSaldoPromocional();
        Assert.assertEquals(esperado.toString(), web.toString());
    }

    public static void validateAvailableMonthlyPayment(String monto) {
        BigDecimal montoBd = new BigDecimal(monto);
        Assert.assertEquals("$".concat(decimalFormat(montoBd)), webData.getAbono().getDisponible().getMonto(), "El saldo disponible de abono no es correcto.");
    }

    public static void validateContracted() {
        String style = WebActionManager.getAttribute("xpath://div[@class='accordion-body']", "style");
        String visibility = extractAttributeValue(style, "visibility");
        Assert.assertEquals(visibility, "hidden", "Error: Datos de la línea no está contraído");
    }
}
