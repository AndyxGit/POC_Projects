package lippia.utils.managerFile;

import java.io.FileWriter;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class EscribeFichero {

    public static void escribirFichero(String nombreArchivo, String nuevoContenido){
        Path path = FileSystems.getDefault().getPath("");
        String directoryName = path.toAbsolutePath().toString();
        String ruta = directoryName+"/"+nombreArchivo;

        CrearArchivo.crearArchivo(ruta);

        FileWriter fichero = null;
        PrintWriter pw;
        String datoExistenteFichero = LeerFichero.leerFichero(nombreArchivo);
        try {
            fichero = new FileWriter(ruta);
            pw = new PrintWriter(fichero);
            if ((datoExistenteFichero.length() > 0)) {
                pw.println(datoExistenteFichero + "\n" + nuevoContenido);
            } else {
                pw.println(nuevoContenido);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // Nuevamente aprovechamos el finally para
                // asegurarnos que se cierra el fichero.
                if (null != fichero)
                    fichero.close();
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }
}
