package lippia.utils.dataConsumption.controller;

import static lippia.model.bdModel.dataConsumption.Roaming.roaming;
import static lippia.model.bdModel.dataConsumption.dias.DiaDesde.diaDesde;
import static lippia.model.bdModel.dataConsumption.dias.DiaHasta.diaHasta;
import static lippia.utils.dataConsumption.controller.FiltrosController.setFiltros;

public class JsonController {
    public static String createJsonBodyRequest(String filtros) {

        return "{" +
                "\"dateFrom\": {\"dateTime\":\"" +
                diaDesde.getDiaInicio() +
                " 00:00:00.000 -0300\",\"format\":\"yyyy-MM-dd HH:mm:ss.SSS Z\"}," +
                "\"dateTo\":{\"dateTime\":\"" +
                diaHasta.getDiaFin() +
                " 00:00:00.000 -0300\",\"format\":\"yyyy-MM-dd HH:mm:ss.SSS Z\"}," +
                "\"filterList\":" +
                "{\"roaming\":" +
                roaming.getRoam() +
                ",\"ratingGroupList\":[\"" +
                setFiltros(filtros) +
                "\"]" +
                "}}\n";


    }

    public static String createJsonBodyRoamingRequest(String filtros) {

        return "{" +
                "\"dateFrom\": {\"dateTime\":\"" +
                diaDesde.getDiaInicio() +
                " 00:00:00.000 -0300\",\"format\":\"yyyy-MM-dd HH:mm:ss.SSS Z\"}," +
                "\"dateTo\":{\"dateTime\":\"" +
                diaHasta.getDiaFin() +
                " 00:00:00.000 -0300\",\"format\":\"yyyy-MM-dd HH:mm:ss.SSS Z\"}," +
                "\"filterList\":" +
                "{\"roaming\":" +
                roaming.getRoam() +
                ",\"ratingGroupList\":[\"" +
                setFiltros(filtros) +
                "\"]" +
                "}}\n";


    }
}
