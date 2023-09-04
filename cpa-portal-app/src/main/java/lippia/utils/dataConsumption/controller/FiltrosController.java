package lippia.utils.dataConsumption.controller;

import java.util.ArrayList;
import java.util.List;

import static lippia.services.db.dataConsumption.DBServiceDC.getPpaValuesServiciosFromBD;
import static lippia.services.db.dataConsumption.DBServiceDC.getPpaValuesSocialNetworkFromBD;
import static lippia.utils.dataConsumption.InitialData.initialData;

public class FiltrosController {

    public static String setFiltros(String filtro){

        filtro = filtro.toLowerCase().trim();

        String delim = "\",\"";

        String filtrosLst;

        switch (filtro){

            case "null":
                filtrosLst = String.join(delim,initialData.getFiltrosTodos());
                break;
            case "redes":
                filtrosLst = String.join(delim,initialData.getFiltrosSocialNetworkLst());
                break;
            case "servicios":
                filtrosLst = String.join(delim,initialData.getFiltrosServiciosLst());
                break;
            default:
                filtrosLst = filtro;
                break;
        }

        return filtrosLst;

    }

    public static void getFiltros() {

        List<String> filtrosTodos = new ArrayList<>();
        List<String> filtrosServicios = new ArrayList<>(StringController.formatString(getPpaValuesServiciosFromBD()));
        List<String> filtrosSocialNetwork = new ArrayList<>(StringController.formatString(getPpaValuesSocialNetworkFromBD()));

        initialData.setFiltrosServiciosLst(filtrosServicios);
        initialData.setFiltrosSocialNetworkLst(filtrosSocialNetwork);

        filtrosTodos.addAll(filtrosServicios);
        filtrosTodos.addAll(filtrosSocialNetwork);
        initialData.setFiltrosTodos(filtrosTodos);

    }

}


