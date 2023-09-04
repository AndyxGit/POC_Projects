package lippia.utils.managerFile;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class CrearArchivo {
    public static void crearArchivo(String ruta){
        try {
            File file = new File(ruta);
            // Si el archivo no existe es creado
            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void crearArchivo(String ruta, String contenidoArchivo){
        try {
            File file = new File(ruta);
            // Si el archivo no existe es creado
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(contenidoArchivo);
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}