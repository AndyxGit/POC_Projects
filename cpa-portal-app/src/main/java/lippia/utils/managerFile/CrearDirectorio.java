
        package lippia.utils.managerFile;
import java.io.File;

public class CrearDirectorio {

    /**
     * Metodo para crear directorio.
     *
     * @param nuevoDirectorio se envia el la ruta de creacion del directorio (EJ:C:\NuevoDirectorio)
     * @return devuelve un objeto de tipo boolean (True: Se crea directorio, False: No se crea directorio)
     */
    public static boolean crearDirectorio(String nuevoDirectorio){
        File directorio = new File("ruta");
        if (!directorio.exists()) {
            if (directorio.mkdirs()) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
