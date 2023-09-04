package lippia.utils;

import com.crowdar.core.PropertyManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class DateUtils {

    private DateUtils(){
        throw new IllegalStateException("DateUtils Class");
    }

    /**
     * Toma una fecha y le suma o resta un número de días.
     *
     * @param amount La cantidad de días para sumar o restar de la fecha.
     * @param fecha La fecha que desea editar.
     * @return Una cadena con la fecha en formato dd/MM/yyyy
     */
    public static String editDate(int amount, String fecha) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        Date date = formatter.parse(fecha);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, amount);

        Date newDate = calendar.getTime();

        return formatter.format(newDate);
    }

    /**
     * > Toma una cadena de fecha y una cadena de patrón y devuelve verdadero si la cadena de fecha es anterior a la fecha
     * actual
     *
     * @param dateStr La cadena de fecha que se va a analizar.
     * @param pattern El patrón de la cadena de fecha.
     * @return Un valor booleano.
     */
    public static boolean isBefore(String dateStr, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        ZonedDateTime expirationZDT = ZonedDateTime.parse(dateStr, formatter);
        ZonedDateTime now = ZonedDateTime.now();

        return expirationZDT.isBefore(now);
    }

    /**
     * Toma una fecha en un formato determinado, la convierte en un objeto ZonedDateTime y luego le da el formato de salida
     * deseado.
     *
     * @param inputDate La fecha que se va a convertir.
     * @param inputPattern El patrón de la fecha de entrada.
     * @param outputPattern El formato al que desea convertir.
     * @return Una cuerda
     */
    public static String changeFormat(String inputDate, String inputPattern, String outputPattern) {
        if (inputDate == null) {
            throw new IllegalArgumentException("La fecha de entrada no puede ser nula");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(inputPattern, Locale.ENGLISH);
        LocalDateTime dateTime = LocalDateTime.parse(inputDate, formatter);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(dateTime, ZoneId.of(getZoneId()));
        return DateTimeFormatter.ofPattern(outputPattern).format(zonedDateTime);
    }

    /**
     * Devuelve el id de zona horaria del país especificado en el archivo de propiedades
     *
     * @return El valor de la clave "país" en el archivo de propiedades.
     */
    private static String getZoneId() {
        Map<String, String> mapZoneId = new HashMap<>();
        mapZoneId.put("AR","America/Argentina/Buenos_Aires");
        mapZoneId.put("UY","America/Montevideo");
        mapZoneId.put("PY","America/Asuncion");
        return mapZoneId.get(PropertyManager.getProperty("country"));
    }

    /**
     * Devuelve la fecha actual formateada según el patrón especificado.
     *
     * @param pattern el patrón de formato de fecha a utilizar
     * @return la fecha actual formateada según el patrón especificado
     */
    public static String fechaActual(String pattern) {
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        return formatter.format(now);
    }

    public static boolean validarFormatoFecha(String fecha, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        formatter.setLenient(false);  // Desactiva el ajuste flexible de la fecha

        try {
            formatter.parse(fecha);
            return true;  // La fecha tiene el formato correcto
        } catch (ParseException e) {
            return false;  // La fecha no tiene el formato correcto
        }
    }
}
