package lippia.utils;

import io.cucumber.core.api.Scenario;
import lippia.model.api.common.RegistroLogModel;
import lippia.utils.managerFile.*;

import java.util.*;

public class Log {

    /**
     * Esta función crea un archivo de registro con el nombre "LogDeSalida.txt" y escribe en él los resultados de los casos
     * de prueba.
     */
    public static void logDeSalida() {
        Map<String, RegistroLogModel> aCargar = new HashMap<>();
        String nombreArchivo = "LogDeSalida.txt";
        int contPass = 0;
        int contFail = 0;

        CrearDirectorio.crearDirectorio("failsafe-reports");
        CrearArchivo.crearArchivo(nombreArchivo, String.format("%-10s%-20s%-120s%6s%6s", "JLR>", "ID   TSC/TC", "NOMBRE TSC/TC", "PASS", "FAIL"));

        for (Scenario s : LocalData.listaScenarios) {
            String tag, pass = "", fail = "", nameScenario;
            List<String> tags = (List<String>) s.getSourceTagNames();
            String busqueda2 = "@PSP-";
            for (String i : tags) {
                if (i.contains(busqueda2)) {
                    tag = i.replace("@", "");
                    nameScenario = s.getName();
                    if (s.getStatus().toString().equalsIgnoreCase("PASSED")) {
                        pass = "1";
                        fail = "0";
                        contPass++;
                    } else if (s.getStatus().toString().equalsIgnoreCase("FAILED")) {
                        pass = "0";
                        fail = "1";
                        contFail++;
                    }

                    if (aCargar.isEmpty()) {
                        aCargar.put(tag, new RegistroLogModel(tag, nameScenario, pass, fail));
                    } else {
                        if (aCargar.containsKey(tag)) {
                            if (fail.equalsIgnoreCase("1")) {
                                aCargar.replace(tag, new RegistroLogModel(tag, nameScenario, pass, fail));
                            }
                        } else {
                            aCargar.put(tag, new RegistroLogModel(tag, nameScenario, pass, fail));
                        }
                    }
                }
            }
        }
        for (Map.Entry<String, RegistroLogModel> rows : aCargar.entrySet()) {
            EscribeFichero.escribirFichero(nombreArchivo, String.format("%-10s%-20s%-120s%6s%6s", "JLR>", rows.getValue().getTag(), "TC_" + rows.getValue().getNameScenario(), rows.getValue().getPass(), rows.getValue().getFail()));
        }
        EscribeFichero.escribirFichero(nombreArchivo, String.format("%-10s%-20s%-20s%-30s%-30s", "JLR>", "Resumen_Regresion", "TC PASADOS:" + contPass, "TC FALLADOS:" + contFail, "TC TOTALES:" + LocalData.listaScenarios.size()));
    }
}