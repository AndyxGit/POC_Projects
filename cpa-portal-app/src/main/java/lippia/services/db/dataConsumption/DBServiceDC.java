package lippia.services.db.dataConsumption;


import com.crowdar.core.PropertyManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lippia.model.bdModel.dataConsumption.bd.RatingGroup;
import lippia.model.bdModel.dataConsumption.consumos.BDConsumo;
import lippia.model.bdModel.dataConsumption.consumos.TotalConsumos;
import lippia.model.bdModel.dataConsumption.consumos.impl.TotalConsumosBuilder;
import lippia.services.api.common.Connection;
import lippia.utils.GetFiles;
import lippia.utils.LocalData;

import java.util.*;
import java.util.logging.Logger;

import static lippia.model.bdModel.dataConsumption.Linea.linea;
import static lippia.model.bdModel.dataConsumption.dias.DiaDesde.diaDesde;
import static lippia.model.bdModel.dataConsumption.dias.DiaHasta.diaHasta;
import static lippia.services.web.dataConsumption.DataConsumptionService.getRandomCost;
import static lippia.services.web.dataConsumption.DataConsumptionService.getRandomVolume;
import static lippia.utils.dataConsumption.InitialData.initialData;
import static lippia.utils.dataConsumption.controller.DateController.conviertoLocalDate2StringBD;
import static lippia.utils.dataConsumption.controller.DateController.formatoFechaParaLaBD;
import static lippia.utils.dataConsumption.controller.FiltrosController.setFiltros;
import static lippia.utils.dataConsumption.controller.Sizes.convertSize;
import static lippia.utils.dataConsumption.controller.Sizes.redondeo;
import static lippia.utils.dataConsumption.controller.StringController.conviertoList2StringBD;
import static lippia.utils.dataConsumption.controller.StringController.formatoMilesDecimales;
import static lippia.utils.LocalData.localData;


public class DBServiceDC {

    private static final Logger logg = Logger.getLogger(DBServiceDC.class.getName());

    public static void insertarConsumo(String fecha,
                                       String roaming,
                                       String ratingGroup) {

        try {

            Connection.getConection()
                    .ccard()
                    .insert(GetFiles.getJsonQuery("InsertQueries", "insertCondiciones"))
                    .addParameter(fecha)
                    .addParameter(localData.getBillNumber())
                    .addParameter(roaming)
                    .addParameter(String.format("%f", getRandomCost()))
                    .addParameter(String.format("%f", getRandomVolume()))
                    .addParameter(ratingGroup)
                    .execute();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void borrarConsumo() {

        try {
            Connection.getConection()
                    .ccard()
                    .delete(GetFiles.getJsonQuery("DeleteQueries", "deleteCondiciones"))
                    .addParameter(localData.getBillNumber())
                    .execute();


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getPpaValuesServiciosFromBD() {

        String result;
        try {
            result = Connection.getConectionProd()
                    .prod()
                    .select(GetFiles.getJsonQuery("SelectQueries", "selectCommonServices"))
                    .execute();

            List<String> tmpResult = Arrays.asList(result.split(":"));
            result = tmpResult.get(1);
            result = result.substring(1, result.length() - 3);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return result;

    }

    public static String getPpaValuesSocialNetworkFromBD() {

        String result;

        try {
            result = Connection.getConectionProd()
                    .prod()
                    .select(GetFiles.getJsonQuery("SelectQueries", "selectSocialNetworks"))
                    .execute();

            List<String> tmpResult = Arrays.asList(result.split(":"));
            result = tmpResult.get(1).substring(1, tmpResult.get(1).length() - 3);
            result = result.substring(1, result.length() - 1);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    //metodo que obtiene los ratingGroups y sus correspondientes descripciones
    //desde la BD
    public static void getDescripciones() {

        Map<String, String> descripcionesTmp = new HashMap<>();

        Gson gson = new Gson();

        String result;


        try {

            result = Connection.getConectionProd()
                    .prod()
                    .select(GetFiles.getJsonQuery("SelectQueries", "selectVRatingGroupDescription").replace("%", "'" + conviertoList2StringBD(initialData.getFiltrosTodos()) + "'"))
                    .execute();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        RatingGroup[] ratingGroupList = gson.fromJson(result, RatingGroup[].class);

        Arrays.asList(ratingGroupList).forEach(g -> descripcionesTmp.put(g.getRATING_GROUP(), g.getSER_DESCRIPTION()));

        initialData.setDescripciones(descripcionesTmp);

    }

    public static void getConsumosBD(String filtro) {

        String dateFrom = conviertoLocalDate2StringBD(diaDesde.getDiaInicio());
        String dateTo = conviertoLocalDate2StringBD(diaHasta.getDiaFin());
        String filters = setFiltros(filtro);

        List<BDConsumo> listaDeBDConsumos;

        Gson gson = new Gson();

        try {
            String result =
                    Connection.getConection()
                            .ccard()
                            .select(GetFiles.getJsonQuery("SelectQueries", "selectConsumosEnRango").replace("%", "'" + filters.replaceAll("\"", "'") + "'"))
                            .addParameter(localData.getBillNumber())
                            .addParameter(dateFrom)
                            .addParameter(dateTo)
                            .execute();

            listaDeBDConsumos = List.of(gson.fromJson(result, BDConsumo[].class));

            mapperConsumosBD2TotalConsumos(listaDeBDConsumos);

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

    private static void mapperConsumosBD2TotalConsumos(List<BDConsumo> listaDeBDConsumos) {


        TotalConsumosBuilder builder = new TotalConsumosBuilder();

        ObjectMapper mapper = new ObjectMapper();
        String path = PropertyManager.getProperty("bd");

        double totalPrecio = 0.0;
        double totalVolume = 0.0;

        List<String> consumosParciales = new ArrayList<>();
        List<String> traficosParciales = new ArrayList<>();
        List<String> servicios = new ArrayList<>();
        List<String> roaming = new ArrayList<>();
        List<String> fechas = new ArrayList<>();

        String methodName = new Object() {}
                .getClass()
                .getEnclosingMethod()
                .getName();



        for (BDConsumo consumo : listaDeBDConsumos) {
            totalPrecio += redondeo(consumo.getDDC_SUM_COST());
            totalVolume += convertSize(consumo.getDDC_SUM_VOLUME());
            consumosParciales.add(formatoMilesDecimales(redondeo(consumo.getDDC_SUM_COST()), methodName));
            traficosParciales.add(formatoMilesDecimales(convertSize(consumo.DDC_SUM_VOLUME), methodName));
            servicios.add(initialData.getDescripciones().get(consumo.DDC_RATING_GROUP));
            boolean b = (consumo.DDC_ROAMING.equalsIgnoreCase("N")) ? roaming.add("NO") : roaming.add("SI");
            fechas.add(formatoFechaParaLaBD(consumo.getDDC_CDR_DATE()));
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



        localData.setBd(totalConsumos);




        /*
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        try {
            mapper.writeValue(new File(path), totalConsumos);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

         */

    }

}




