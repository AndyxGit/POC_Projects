package lippia.services.web.dataConsumption;

import com.crowdar.core.PropertyManager;
import com.crowdar.core.actions.WebActionManager;
import com.crowdar.driver.DriverManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import lippia.constants.dataConsumption.DataConsumptionConstants;
import lippia.model.bdModel.dataConsumption.consumos.TotalConsumos;
import lippia.model.bdModel.dataConsumption.consumos.impl.TotalConsumosBuilder;
import lippia.utils.LocalData;
import lippia.utils.dataConsumption.controller.RoamingController;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Paths;
import java.text.NumberFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;

import static com.crowdar.core.actions.ActionManager.*;
import static lippia.model.bdModel.dataConsumption.Linea.linea;
import static lippia.model.bdModel.dataConsumption.Roaming.roaming;
import static lippia.model.bdModel.dataConsumption.dias.DiaDesde.diaDesde;
import static lippia.model.bdModel.dataConsumption.dias.DiaHasta.diaHasta;
import static lippia.model.bdModel.dataConsumption.dias.DiasConConsumo.diasConConsumo;
import static lippia.services.db.dataConsumption.DBServiceDC.insertarConsumo;
import static lippia.utils.LocalData.localData;
import static lippia.utils.dataConsumption.InitialData.initialData;
import static lippia.utils.dataConsumption.controller.DateController.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DataConsumptionService {

    private static final Logger logg = Logger.getLogger(DataConsumptionService.class.getName());

    public static void seGeneraLinea() {

        switch (PropertyManager.getProperty("country").toLowerCase().trim()) {

            case "ar":

                logg.info("generar condiciones para Argentina");

                linea.setNumero(getSuscriberId("11", "%08d", 99999999));

                break;

            case "py":
                logg.info("generar condiciones para Paraguay");

                linea.setNumero(getSuscriberId("9", "%08d", 99999999));

                break;

            case "uy":
                logg.info("generar condiciones para Uruguay");

                linea.setNumero(getSuscriberId("98", "%06d", 999999));

                break;

        }


    }

    public static String getSuscriberId(String prefix, String longitud, int lim) {

        int linea;

        Random rnd = new Random();

        linea = rnd.nextInt(lim);

        String susbscriberId = prefix.concat(String.format(longitud, linea));

        logg.info("--- LINEA GENERADA = " + susbscriberId);

        return susbscriberId;
    }

    public static double getRandomCost() {

        Random rnd = new Random();

        BigDecimal cost = BigDecimal.valueOf(-1000000000 * rnd.nextDouble()).setScale(2, RoundingMode.HALF_EVEN);

        System.out.println("COSTO GENERADO = " + cost);
        return cost.doubleValue();


    }


    public static double getRandomVolume() {
        return Math.random() * 104857700;
    }


    public static void generadorDeConsumos(String ratingGroup) {

        switch (ratingGroup.toLowerCase().trim()) {

            case "redes":

                for (String rating : initialData.getFiltrosSocialNetworkLst()) {
                    for (LocalDate fecha : diasConConsumo.getFechasConConsumo()) {

                        logg.info("SE GENERA CONSUMO PARA FECHA = " + fecha + ", RATINGGROUP = " + rating);

                        insertarConsumo(conviertoLocalDate2StringBD(fecha), RoamingController.getRoamingStr(), rating);


                    }
                }
                break;
            case "null":
                for (String rating : initialData.getFiltrosTodos()) {
                    for (LocalDate fecha : diasConConsumo.getFechasConConsumo()) {

                        logg.info("SE GENERA CONSUMO PARA FECHA = " + fecha + ", RATINGGROUP = " + rating);

                        insertarConsumo(conviertoLocalDate2StringBD(fecha), RoamingController.getRoamingStr(), rating);


                    }
                }
                break;
            case "servicios":

                for (String rating : initialData.getFiltrosServiciosLst()) {
                    for (LocalDate fecha : diasConConsumo.getFechasConConsumo()) {

                        logg.info("SE GENERA CONSUMO PARA FECHA = " + fecha + ", RATINGGROUP = " + rating);

                        insertarConsumo(conviertoLocalDate2StringBD(fecha), RoamingController.getRoamingStr(), rating);


                    }
                }
                break;
            default:
                for (LocalDate fecha : diasConConsumo.getFechasConConsumo()) {

                    logg.info("SE GENERA CONSUMO PARA FECHA = " + fecha + ", RATINGGROUP = " + ratingGroup);

                    insertarConsumo(conviertoLocalDate2StringBD(fecha), RoamingController.getRoamingStr(), ratingGroup);

                }
                break;
        }

    }

    public static String getNumberFromSearch() {

        WebDriver driver = DriverManager.getDriverInstance();

        WebElement searchInput = driver.findElement(By.name("search"));

        return searchInput.getAttribute("value");
    }


    public static void validarFechas() {

        String fechaDesde = cambiarBarrasPorGuiones(getAttribute(DataConsumptionConstants.DATE_FROM_INPUT, "value"));
        String fechaHasta = cambiarBarrasPorGuiones(getAttribute(DataConsumptionConstants.DATE_TO_INPUT, "value"));
        Assert.assertEquals(fechaDesde, diaDesde.getDiaInicio().toString());
        org.junit.Assert.assertEquals(fechaHasta, diaHasta.getDiaFin().toString());

    }


    public static void ingresarFechasFront(String fecha) {

        String s = Keys.chord(Keys.CONTROL, "a");
        String fDesde = formatoFechaParaElFront(diaDesde.getDiaInicio().toString());
        String fHasta = formatoFechaParaElFront(diaHasta.getDiaFin().toString());

        switch (fecha) {

            case "rango":

                waitVisibility(DataConsumptionConstants.DATE_FROM_INPUT);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, s);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, fDesde);

                waitVisibility(DataConsumptionConstants.DATE_TO_INPUT);
                setInput(DataConsumptionConstants.DATE_TO_INPUT, s);
                setInput(DataConsumptionConstants.DATE_TO_INPUT, fHasta);

                break;
            case "dia":

                click(DataConsumptionConstants.SWITCH_FECHAS);
                waitVisibility(DataConsumptionConstants.DATE_FROM_INPUT);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, s);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, fDesde);

                break;

            case "hoy":
                click(DataConsumptionConstants.SWITCH_FECHAS);
                waitVisibility(DataConsumptionConstants.DATE_FROM_INPUT);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, s);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, fHasta);
                break;
            case "invalido":
                waitVisibility(DataConsumptionConstants.DATE_FROM_INPUT);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, s);
                setInput(DataConsumptionConstants.DATE_FROM_INPUT, fHasta);

                waitVisibility(DataConsumptionConstants.DATE_TO_INPUT);
                setInput(DataConsumptionConstants.DATE_TO_INPUT, s);
                setInput(DataConsumptionConstants.DATE_TO_INPUT, fDesde);
                break;
            default:
                validarFechas();
                break;

        }


    }

    public static void verificarFechaActual() {

        WebDriver driver = DriverManager.getDriverInstance();

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String fechaSeleccionada = driver.findElement(By.id("from-date-input")).getAttribute("value");

        String hoy = LocalDate.now().format(dateTimeFormatter);

        assertEquals(fechaSeleccionada, hoy);

    }

    public static void verificarFechasPorDefecto() {

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String fechaAnteayer = getAttribute(DataConsumptionConstants.DATE_FROM_INPUT, "value");

        String fechaHoy = getAttribute(DataConsumptionConstants.DATE_TO_INPUT, "value");

        String hoy = LocalDate.now().format(dateTimeFormatter);

        String anteayer = LocalDate.now().minusDays(2).format(dateTimeFormatter);

        assertEquals(fechaHoy, hoy);
        assertEquals(fechaAnteayer, anteayer);

    }

    public static void ingresarLinea() {

        setInput(DataConsumptionConstants.SEARCH_PHONE_INPUT, localData.getBillNumber());
        String s = Keys.chord(Keys.CONTROL, "a");
        setInput(DataConsumptionConstants.SEARCH_PHONE_INPUT, s);
        setInput(DataConsumptionConstants.SEARCH_PHONE_INPUT, String.valueOf(Keys.ENTER));

    }

    public static void seleccionarRoaming() {

        Assert.assertTrue(isEnabled(DataConsumptionConstants.BOTON_GEO_TODOS));

        //Selecciono Geolocalizacion
        if (roaming.getRoam() != null) {
            if (Boolean.FALSE.equals(roaming.getRoam())) {
                click(DataConsumptionConstants.BOTON_GEO_HOME);
            } else {
                click(DataConsumptionConstants.BOTON_GEO_ROAMING);
            }
        }

    }

    public static void seleccionarServicio(String filtro) {

        String servicio, rGroup;

        if (filtro.equalsIgnoreCase("null")) {

            Assert.assertEquals(DataConsumptionConstants.SELECTOR_SERVICIOS_TODOS, getText(DataConsumptionConstants.INPUT_SERVICIOS));

        } else {

            click(DataConsumptionConstants.SELECTOR_SERVICIOS);

            if (filtro.equalsIgnoreCase("redes")) {

                setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Redes");
                setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_REDES_SOCIALES);


            } else {

                servicio = initialData.getDescripciones().get(filtro);
                rGroup = initialData.getDescripciones().entrySet().stream()
                        .filter(entry -> servicio.equals(entry.getValue()))
                        .findFirst().map(Map.Entry::getKey)
                        .orElse(null);

                logg.info("SERVICIO CONSULTADO = " + servicio);
                logg.info("RATING GROUP = " + rGroup);

                click(DataConsumptionConstants.SELECTOR_SERVICIOS);

                switch (Objects.requireNonNull(rGroup)) {

                    case "80":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Whatsapp");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_WHATSAPP);
                        break;
                    case "996":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Noches");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_NOCHES_LIBRES);
                        break;
                    case "50":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Bypass");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_BYPASS);
                        break;
                    case "991":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Autoflex");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_AUTOFLEX);
                        break;
                    case "5":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Conexion");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_CONEXION_MOVIL);
                        break;
                    case "993":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Youtube");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_YOUTUBE);
                        break;
                    case "994":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Instag.");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_INSTAGRAM);
                        break;
                    case "992":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Facebook");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_FACEBOOK);
                        break;
                    case "997":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "TikTok");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_TIKTOK);
                        break;
                    case "995":
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, "Twitter");
                        setInput(DataConsumptionConstants.SELECTOR_SERVICIOS, String.valueOf(Keys.ENTER));
                        logg.info("SERVICIO SELECCIONADO EN INPUT FRONT = " + getText(DataConsumptionConstants.MULTIVALUE_SERVICE));
                        Assert.assertEquals(getText(DataConsumptionConstants.MULTIVALUE_SERVICE), DataConsumptionConstants.LBL_TWITTER);
                        break;

                }
            }
        }
    }


    public static void presionarConsultar() {

        espera(2000);


        click(DataConsumptionConstants.BOTON_CONSULTAR_ENABLED);

        String sumatoriaCosto = getText(DataConsumptionConstants.SUMATORIA_COSTO_CONSUMOS);

        logg.info(sumatoriaCosto);

        espera(2000);

    }

    public static void clickEnBotonConsultar() {

        TotalConsumos totalConsumos = new TotalConsumos();
        TotalConsumosBuilder builder = new TotalConsumosBuilder();
        String unit;

        if (isPresent(DataConsumptionConstants.BOTON_CONSULTAR_ENABLED)) {

            click(DataConsumptionConstants.BOTON_CONSULTAR_ENABLED);

            try {

                waitVisibility(DataConsumptionConstants.SUMATORIA_COSTO_CONSUMOS);

                String sumatoriaCosto = getText(DataConsumptionConstants.SUMATORIA_COSTO_CONSUMOS);
                List<String> valores = Arrays.asList(sumatoriaCosto.split("\n"));

                logg.info(sumatoriaCosto);


                List<String> consumosParciales = getConsumosParciales();
                List<String> traficosParciales = getDatosSubList(2);
                List<String> servicios = getPlainText(0);
                List<String> roaming = getDatosSubList(3);
                List<String> fechas = getPlainText(4);

                try {

                    while (WebActionManager.getElement("XPATH://*[local-name()='svg'][contains(@aria-labelledby,'icon_labelledby')]/*[contains(text(),'iconRight')]") != null) {

                        WebElement arrow = WebActionManager.getElement("XPATH://*[local-name()='svg'][contains(@aria-labelledby,'icon_labelledby')]/*[contains(text(),'iconRight')]");
                        WebElement elem = arrow.findElement(By.xpath("./parent::*"));
                        elem.click();

                        servicios.addAll(getPlainText(0));

                        consumosParciales.addAll(getConsumosParciales());

                        traficosParciales.addAll(getDatosSubList(2));

                        roaming.addAll(getDatosSubList(3));

                        fechas.addAll(getPlainText(4));

                    }

                } catch (Exception e) {
                    System.out.println("*** last page ***");
                }

                totalConsumos = builder
                        .withCost(valores.get(0).split(" ")[1])
                        .withVolume(valores.get(1).split(" ")[0])
                        .withConsumosParciales(consumosParciales)
                        .withTraficosParciales(traficosParciales)
                        .withServicios(servicios)
                        .withRoaming(roaming)
                        .withFechas(fechas)
                        .build();

                localData.setFrontend(totalConsumos);
                unit = valores.get(1).substring(valores.get(1).length() - 2);
                assertEquals(unit, PropertyManager.getProperty("unit"));

            } catch (Exception e) {

                logg.severe("LINEA SIN CONSUMOS");
                logg.info("MESSAGE TITTLE = " + getText(DataConsumptionConstants.MESSAGE_TITTLE));
                logg.info("MESSAGE SUBTITTLE = " + getText(DataConsumptionConstants.MESSAGE_SUBTITTLE));

            }

        } else {

            logg.severe("ha ocurrido un error");

        }

    }

    public static List<String> getPlainText(int columna) {


        List<WebElement> resultados = getElements(DataConsumptionConstants.TABLE_ROW_ITEM);
        List<String> datosParciales = new ArrayList<>();

        for (int i = columna; i < resultados.size(); i += 5) {
            datosParciales.add(resultados.get(i).getText());
        }

        return datosParciales;

    }

    public static List<String> getDatosSubList(int columna) {

        List<WebElement> resultados = getElements(DataConsumptionConstants.TABLE_ROW_ITEM);
        List<String> datosSubList = new ArrayList<>();

        for (int i = columna; i <= resultados.size(); i += 5) {
            datosSubList.add(resultados.get(i).getText().split(" ")[0]);
        }

        return datosSubList;

    }


    public static List<String> getConsumosParciales() {


        List<WebElement> resultados = getElements(DataConsumptionConstants.TABLE_ROW_ITEM);

        List<String> consumosParciales = new ArrayList<>();

        for (int i = 1; i <= resultados.size(); i += 5) {
            consumosParciales.add("-".concat(resultados.get(i).getText().split(" ")[1]));
        }

        return consumosParciales;

    }


    public static void clickHeaderServicios() {

        System.out.println("DESORDENADO = " + localData.getFrontend().getServicios());

        List<String> reOrdenados =  localData.getFrontend().getServicios();

        reOrdenados.sort(String.CASE_INSENSITIVE_ORDER);

        click(DataConsumptionConstants.HEADER_SERVICIO);

        clickEnBotonConsultar();

       Assert.assertEquals( localData.getFrontend().getServicios(), reOrdenados);

        click(DataConsumptionConstants.HEADER_SERVICIO);

        clickEnBotonConsultar();

        System.out.println("descendente = " + localData.getFrontend().getServicios());

        List<String> descendente =  localData.getFrontend().getServicios();

        Collections.reverse(reOrdenados);

        Assert.assertEquals(descendente, reOrdenados);

    }

    public static void clickHeaderFecha() {

        System.out.println("FECHAS DESDE EL FRONT = " + localData.getFrontend().getFechas());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<LocalDate> dates = new ArrayList<>();

        localData.getFrontend().getFechas().forEach(f-> dates.add(LocalDate.parse(f,formatter)));
        List<LocalDate> datesOrdenadas = new ArrayList<>(dates);
        Collections.sort(datesOrdenadas);

        Assert.assertEquals(dates, datesOrdenadas);

        click(DataConsumptionConstants.HEADER_FECHA);
        click(DataConsumptionConstants.HEADER_FECHA);

        clickEnBotonConsultar();

        dates.clear();

        localData.getFrontend().getFechas().forEach(f-> dates.add(LocalDate.parse(f,formatter)));
        List<LocalDate> datesReversed = new ArrayList<>(dates);
        Collections.sort(datesReversed);
        Collections.reverse(datesReversed);
        Assert.assertEquals(dates, datesReversed);

    }


    public static void clickHeaderPrecio() {

       //List<Double> doubleConsumosParciales = lstStr2lstDouble(localData.getFrontend().getConsumosParciales());


        List<Double> reOrdenados = lstStr2lstDouble(localData.getFrontend().getConsumosParciales());

        Collections.sort(reOrdenados);

        click(DataConsumptionConstants.HEADER_PRECIO);

        clickEnBotonConsultar();

        Assert.assertEquals(lstStr2lstDouble(localData.getFrontend().getConsumosParciales()), reOrdenados);

        click(DataConsumptionConstants.HEADER_PRECIO);

        clickEnBotonConsultar();

        Collections.reverse(reOrdenados);

        Assert.assertEquals(lstStr2lstDouble(localData.getFrontend().getConsumosParciales()), reOrdenados);




    }


    private static List<Double> lstStr2lstDouble(List<String> stringList){

        List<Double> doubleList = new ArrayList<>();

        for (String s : stringList){

            StringBuilder stringBuilder = new StringBuilder(s.replace(".", ""));
            stringBuilder.setCharAt(stringBuilder.length()-3, '.');
            doubleList.add(Double.valueOf(stringBuilder.toString()));

        }

        return doubleList;

    }


    public static void verificarOrdenServiciosDesc() {

        List<String> datosReOrdenados = localData.getDatosDesordenados();

        Collections.sort(datosReOrdenados);

        Collections.reverse(datosReOrdenados);

        assertEquals(datosReOrdenados, localData.getDatosOrdenados());

    }

    public static void verificarOrdenPreciosDesc() {

        List<Double> datosReOrdenados = new ArrayList<>();
        List<Double> datosOrdenados = new ArrayList<>();

        NumberFormat nf = NumberFormat.getInstance();

        localData.getDatosDesordenados().forEach(s -> {
            try {
                datosReOrdenados.add(nf.parse(s).doubleValue());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        Collections.sort(datosReOrdenados);


        localData.getDatosOrdenados().forEach(s -> {
            try {
                datosOrdenados.add(nf.parse(s).doubleValue());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        assertEquals(datosReOrdenados, datosOrdenados);

    }

    public static void verificarOrdenPreciosAsc() {

        List<Double> datosReOrdenados = new ArrayList<>();
        List<Double> datosOrdenados = new ArrayList<>();

        NumberFormat nf = NumberFormat.getInstance();

        localData.getDatosDesordenados().forEach(s -> {
            try {
                datosReOrdenados.add(nf.parse(s).doubleValue());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        Collections.sort(datosReOrdenados);

        Collections.reverse(datosReOrdenados);

        localData.getDatosOrdenados().forEach(s -> {
            try {
                datosOrdenados.add(nf.parse(s).doubleValue());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        assertEquals(datosReOrdenados, datosOrdenados);

    }

    public static void verificarOrdenFechasDesc() {

        List<String> fechas = localData.getDatosDesordenados();

        Collections.sort(fechas);

        //por defecto, al cargar la pagina, las fechas están ordenadas
        assertEquals(fechas, localData.getDatosDesordenados());

    }




    public static void verificarRespuestas() {

        System.out.println("VERIFICAR RESPUESTAS - BD = " +localData.getBd());
        System.out.println("VERIFICAR RESPUESTAS - API = " + localData.getApi());
        System.out.println("VERIFICAR RESPUESTAS - FRONTEnd = " + localData.getFrontend());

        Assert.assertEquals(localData.getBd(), localData.getApi());
        Assert.assertEquals(localData.getBd(), localData.getFrontend());

        LocalData.localData.setApi(null);
        LocalData.localData.setFrontend(null);
        LocalData.localData.setBd(null);




    }

    public static void verificarIngreseNumero() {

        WebDriver driver = DriverManager.getDriverInstance();

        logg.info("MESSAGE SUBTITTLE = " + getText(DataConsumptionConstants.MESSAGE_SUBTITTLE));

        WebElement searchPhoneInput = driver.findElement(By.id("searchPhoneInput"));

        searchPhoneInput.sendKeys(Keys.ENTER);

        assertEquals(getText(DataConsumptionConstants.MESSAGE_SUBTITTLE), DataConsumptionConstants.SUB_MSG_INGRESE_LINEA);

        logg.info("Mensaje en AlertBox = " + getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS));

        assertTrue(isPresent(DataConsumptionConstants.ALERT_SIN_CONSUMOS));
        assertEquals(getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS), DataConsumptionConstants.MSG_LINEA_INVALIDA);


    }

    public static void verificarTooltip() {

        waitVisibility(DataConsumptionConstants.TOOLTIP);

        logg.info(getAttribute(DataConsumptionConstants.TOOLTIP, "aria-label"));

        assertEquals(DataConsumptionConstants.MSG_RANGO_MES, getAttribute(DataConsumptionConstants.TOOLTIP, "aria-label"));

    }


    public static void verificarSinConsumos() {

        logg.info("Mensaje en AlertBox = " + getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS));

        assertTrue(isPresent(DataConsumptionConstants.ALERT_SIN_CONSUMOS));
        assertEquals(getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS), DataConsumptionConstants.MSG_SIN_CONSUMOS);
        assertEquals(getText(DataConsumptionConstants.MESSAGE_TITTLE), DataConsumptionConstants.MSG_SIN_RESULTADOS);
        assertEquals(getText(DataConsumptionConstants.MESSAGE_SUBTITTLE), DataConsumptionConstants.SUB_MSG_SIN_RESULTADOS);

    }


    public static void verificarDatosNoConsultados() {

        logg.info("MESSAGE TITTLE = " + getText(DataConsumptionConstants.MESSAGE_TITTLE));
        logg.info("MESSAGE SUBTITTLE = " + getText(DataConsumptionConstants.MESSAGE_SUBTITTLE));

        assertEquals(getText(DataConsumptionConstants.MESSAGE_TITTLE), DataConsumptionConstants.MSG_CLICK_CONSULTAR);
        assertEquals(getText(DataConsumptionConstants.MESSAGE_SUBTITTLE), DataConsumptionConstants.SUB_MSG_CLICK_CONSULTAR);

    }


    public static void verificarFormatoFecha() {

        logg.info("Mensaje en AlertBox = " + getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS));

        assertTrue(isPresent(DataConsumptionConstants.ALERT_SIN_CONSUMOS));
        assertEquals(getText(DataConsumptionConstants.ALERT_SIN_CONSUMOS), DataConsumptionConstants.MSG_FECHA_INVALIDA);

    }


    public static TotalConsumos getDataFromJson(String json) {

        ObjectMapper mapper = new ObjectMapper();

        TotalConsumos consumos;

        try {

            consumos = mapper.readValue(Paths.get(PropertyManager.getProperty(json)).toFile(), TotalConsumos.class);

        } catch (IOException e) {

            throw new RuntimeException(e);

        }

        return consumos;

    }


    public static void espera(long t) {

        try {
            Thread.sleep(t);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }


    public static void verificarIconoPais() {

        String pais = PropertyManager.getProperty("country");

        Assert.assertEquals(getText(DataConsumptionConstants.NOMBRE_PAIS), pais);


    }




}
