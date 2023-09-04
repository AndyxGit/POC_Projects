package lippia.services.api.dataConsumption;

import com.crowdar.api.rest.APIManager;
import com.crowdar.api.rest.Response;
import com.crowdar.core.PropertyManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Splitter;
import lippia.config.RequestException;
import lippia.model.api.dataConsumption.DataConsumptionDetailsList;
import lippia.model.api.dataConsumption.DataConsumptionResponse;
import lippia.model.bdModel.dataConsumption.consumos.TotalConsumos;
import lippia.model.bdModel.dataConsumption.consumos.impl.TotalConsumosBuilder;
import lippia.model.bdModel.dataConsumption.dias.DiaDesde;
import lippia.model.bdModel.dataConsumption.dias.DiaHasta;
import lippia.services.api.common.BaseService;
import lippia.utils.LocalData;
import lippia.utils.dataConsumption.controller.JsonController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static lippia.utils.LocalData.localData;
import static lippia.utils.dataConsumption.controller.DateController.cambiarGuionesPorBarras;
import static lippia.utils.dataConsumption.controller.FiltrosController.setFiltros;
import static lippia.utils.dataConsumption.controller.StringController.formatoMilesDecimales;

public class DataConsumptionService extends BaseService {

    private DataConsumptionService() {
        throw new IllegalStateException("DataConsumptionService.class");
    }

    public static DataConsumptionResponse getResponse() {
        return (DataConsumptionResponse) APIManager.getLastResponse().getResponse();
    }

    public static Response get(String jsonName) {
        return get(jsonName, DataConsumptionResponse.class);
    }

    public static Response post(String jsonName) {
        return post(jsonName, DataConsumptionResponse.class);
    }

    public static void consultarAPI(String filtro) {

        String methodName = new Object() {}
                .getClass()
                .getEnclosingMethod()
                .getName();

        System.out.println("LINEA = " + LocalData.localData.getBillNumber());

        String path = PropertyManager.getProperty("api");

        ObjectMapper mapper = new ObjectMapper();

        TotalConsumosBuilder builder = new TotalConsumosBuilder();

        double totalPrecio = 0.0;
        double totalVolume = 0.0;

        List<String> consumosParciales = new ArrayList<>();
        List<String> traficosParciales = new ArrayList<>();
        List<String> servicios = new ArrayList<>();
        List<String> roaming = new ArrayList<>();
        List<String> fechas = new ArrayList<>();

        BaseService.PARAMS.get().put("diaDesde", DiaDesde.diaDesde.getDiaInicio().toString());
        BaseService.PARAMS.get().put("diaHasta", DiaHasta.diaHasta.getDiaFin().toString());
        BaseService.PARAMS.get().put("filtros", setFiltros(filtro));

        try {
            BaseService.doRequest("post", "DATA_CONSUMPTION", "dataConsumption/rq_dataConsumption");
        } catch (RequestException e) {
            throw new RuntimeException(e);
        }
        DataConsumptionResponse response = (DataConsumptionResponse) APIManager.getLastResponse().getResponse();


        for (DataConsumptionDetailsList d : response.getDataConsumptionDetailsList()) {
            totalPrecio += d.getCost().getValue();
            totalVolume += d.getVolume().getValue();
            consumosParciales.add(formatoMilesDecimales(d.getCost().getValue(), methodName));
            traficosParciales.add(String.format("%.2f", d.getVolume().getValue()));
            servicios.add(d.getRatingGroupDescription());
            boolean b = d.getRoaming() ? roaming.add("SI") : roaming.add("NO");
            fechas.add(cambiarGuionesPorBarras(d.getCdrDate().getDateTime()));

        }


        TotalConsumos totalConsumos = builder
                .withCost(formatoMilesDecimales(totalPrecio * (-1), methodName))
                .withVolume(formatoMilesDecimales(totalVolume, methodName))
                .withConsumosParciales(consumosParciales)
                .withTraficosParciales(traficosParciales)
                .withServicios(servicios)
                .withRoaming(roaming)
                .withFechas(fechas)
                .build();

        System.out.println("OBJETO CREADO api = " + totalConsumos);
        localData.setApi(totalConsumos);

        System.out.println("OBJETO EN LOCALDATA api = " + localData.getApi());

/*
        try {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File(path), totalConsumos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

 */

    }

    public static void consultarAPIHome(String filtro) {

        String methodName = new Object() {}
                .getClass()
                .getEnclosingMethod()
                .getName();

        System.out.println("LINEA = " + LocalData.localData.getBillNumber());

        String path = PropertyManager.getProperty("api");

        ObjectMapper mapper = new ObjectMapper();

        TotalConsumosBuilder builder = new TotalConsumosBuilder();

        double totalPrecio = 0.0;
        double totalVolume = 0.0;

        List<String> consumosParciales = new ArrayList<>();
        List<String> traficosParciales = new ArrayList<>();
        List<String> servicios = new ArrayList<>();
        List<String> roaming = new ArrayList<>();
        List<String> fechas = new ArrayList<>();

        BaseService.PARAMS.get().put("diaDesde", DiaDesde.diaDesde.getDiaInicio().toString());
        BaseService.PARAMS.get().put("diaHasta", DiaHasta.diaHasta.getDiaFin().toString());
        BaseService.PARAMS.get().put("filtros", setFiltros(filtro));

        try {
            BaseService.doRequest("post", "DATA_CONSUMPTION", "dataConsumption/rq_dataConsumption_home");

        } catch (RequestException e) {
            throw new RuntimeException(e);
        }
        DataConsumptionResponse response = (DataConsumptionResponse) APIManager.getLastResponse().getResponse();


        for (DataConsumptionDetailsList d : response.getDataConsumptionDetailsList()) {
            totalPrecio += d.getCost().getValue();
            totalVolume += d.getVolume().getValue();
            consumosParciales.add(formatoMilesDecimales(d.getCost().getValue(), methodName));
            traficosParciales.add(formatoMilesDecimales(d.getVolume().getValue(), methodName));
            servicios.add(d.getRatingGroupDescription());
            boolean b = d.getRoaming() ? roaming.add("SI") : roaming.add("NO");
            fechas.add(cambiarGuionesPorBarras(d.getCdrDate().getDateTime()));

        }


        TotalConsumos totalConsumos = builder
                .withCost(formatoMilesDecimales(totalPrecio * (-1), methodName))
                .withVolume(formatoMilesDecimales(totalVolume, methodName))
                .withConsumosParciales(consumosParciales)
                .withTraficosParciales(traficosParciales)
                .withServicios(servicios)
                .withRoaming(roaming)
                .withFechas(fechas)
                .build();

        System.out.println("OBJETO CREADO api = " + totalConsumos);
        localData.setApi(totalConsumos);

        System.out.println("OBJETO EN LOCALDATA api = " + localData.getApi());
        /*
        try {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File(path), totalConsumos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

         */

    }

    public static void consultarAPIRoaming(String filtro) {

        String methodName = new Object() {}
                .getClass()
                .getEnclosingMethod()
                .getName();

        System.out.println("LINEA = " + LocalData.localData.getBillNumber());

        String path = PropertyManager.getProperty("api");

        ObjectMapper mapper = new ObjectMapper();

        TotalConsumosBuilder builder = new TotalConsumosBuilder();

        double totalPrecio = 0.0;
        double totalVolume = 0.0;

        List<String> consumosParciales = new ArrayList<>();
        List<String> traficosParciales = new ArrayList<>();
        List<String> servicios = new ArrayList<>();
        List<String> roaming = new ArrayList<>();
        List<String> fechas = new ArrayList<>();

        BaseService.PARAMS.get().put("diaDesde", DiaDesde.diaDesde.getDiaInicio().toString());
        BaseService.PARAMS.get().put("diaHasta", DiaHasta.diaHasta.getDiaFin().toString());
        BaseService.PARAMS.get().put("filtros", setFiltros(filtro));

        try {
            BaseService.doRequest("post", "DATA_CONSUMPTION", "dataConsumption/rq_dataConsumption_roaming");
        } catch (RequestException e) {
            throw new RuntimeException(e);
        }
        DataConsumptionResponse response = (DataConsumptionResponse) APIManager.getLastResponse().getResponse();


        for (DataConsumptionDetailsList d : response.getDataConsumptionDetailsList()) {
            totalPrecio += d.getCost().getValue();
            totalVolume += d.getVolume().getValue();
            consumosParciales.add(formatoMilesDecimales(d.getCost().getValue(), methodName));
            traficosParciales.add(String.format("%.2f", d.getVolume().getValue()));
            servicios.add(d.getRatingGroupDescription());
            boolean b = d.getRoaming() ? roaming.add("SI") : roaming.add("NO");
            fechas.add(cambiarGuionesPorBarras(d.getCdrDate().getDateTime()));

        }


        TotalConsumos totalConsumos = builder
                .withCost(formatoMilesDecimales(totalPrecio * (-1), methodName))
                .withVolume(formatoMilesDecimales(totalVolume, methodName))
                .withConsumosParciales(consumosParciales)
                .withTraficosParciales(traficosParciales)
                .withServicios(servicios)
                .withRoaming(roaming)
                .withFechas(fechas)
                .build();

        System.out.println("OBJETO CREADO api = " + totalConsumos);
        localData.setApi(totalConsumos);

        System.out.println("OBJETO EN LOCALDATA api = " + localData.getApi());
        /*

        try {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File(path), totalConsumos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

         */

    }

    public static void getAPIResponse(String filtro){

        String path = PropertyManager.getProperty("api");

        ObjectMapper mapper = new ObjectMapper();

        TotalConsumosBuilder builder = new TotalConsumosBuilder();

        double totalPrecio = 0.0;
        double totalVolume = 0.0;

        List<String> consumosParciales = new ArrayList<>();
        List<String> traficosParciales = new ArrayList<>();
        List<String> servicios = new ArrayList<>();
        List<String> roaming = new ArrayList<>();
        List<String> fechas = new ArrayList<>();

        io.restassured.response.Response response;

        DataConsumptionResponse dataConsumptionResponse;

        String url = PropertyManager.getProperty("base.url").replace("%pais%", PropertyManager.getProperty("country").toLowerCase());

        response = given()
                .baseUri(url)
                .headers(setHeaders())
                .header("BillNumber", localData.getBillNumber())
                .relaxedHTTPSValidation()
                .body(JsonController.createJsonBodyRequest(setFiltros(filtro)))
                .when()
                .post("/dataConsumption");

        dataConsumptionResponse = response.as(DataConsumptionResponse.class);

        String methodName = new Object() {}
                .getClass()
                .getEnclosingMethod()
                .getName();

        for (DataConsumptionDetailsList d : dataConsumptionResponse.getDataConsumptionDetailsList()) {
            totalPrecio += d.getCost().getValue();
            totalVolume += d.getVolume().getValue();
            consumosParciales.add(formatoMilesDecimales(d.getCost().getValue(), methodName));
           // traficosParciales.add(String.format("%.2f", d.getVolume().getValue()));
            traficosParciales.add(formatoMilesDecimales(d.getVolume().getValue(), methodName));
            servicios.add(d.getRatingGroupDescription());
            boolean b = d.getRoaming() ? roaming.add("SI") : roaming.add("NO");
            fechas.add(cambiarGuionesPorBarras(d.getCdrDate().getDateTime()));

        }

        TotalConsumos totalConsumos = builder
                .withCost(formatoMilesDecimales(totalPrecio * (-1), methodName))
                .withVolume(formatoMilesDecimales(totalVolume, methodName))
                .withConsumosParciales(consumosParciales)
                .withTraficosParciales(traficosParciales)
                .withServicios(servicios)
                .withRoaming(roaming)
                .withFechas(fechas)
                .build();

        localData.setApi(totalConsumos);
/*
        try {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File(path), totalConsumos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

 */




    }

    public static Map<String, String> setHeaders() {
        Map<String, String> hdrs;
        String headerConcatenado = PropertyManager.getProperty("headers");
        hdrs = Splitter.on(",").withKeyValueSeparator(":").split(headerConcatenado);
        return hdrs;
    }

}
