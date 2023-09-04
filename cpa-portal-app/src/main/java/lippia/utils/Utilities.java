package lippia.utils;

import com.crowdar.driver.DriverManager;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.io.FileHandler;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;
import java.util.UUID;

public class Utilities {

    private Utilities() {
    }

    public static String extractAttributeValue(String style, String attributeName) {
        String[] attributes = style.split(";");
        for (String attribute : attributes) {
            String[] parts = attribute.trim().split(":");
            if (parts.length == 2) {
                String name = parts[0].trim();
                String value = parts[1].trim();
                if (name.equalsIgnoreCase(attributeName)) {
                    return value;
                }
            }
        }
        return null;
    }

    public static String decimalFormat(BigDecimal input) {
        Locale locale = new Locale("es", "AR");
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(locale);
        DecimalFormat decimalFormat = new DecimalFormat("#,##0.00", symbols);
        return decimalFormat.format(input);
    }

    public static String capitalFormat(String texto) {
        texto = texto.toLowerCase();
        return (Character.toUpperCase(texto.charAt(0)) + texto.substring(1)).trim();
    }

    public static void getScreenshot() {
        // Toma el screenshot como un objeto de tipo File
        File screenshotFile = DriverManager.getDriverInstance().getScreenshotAs(OutputType.FILE);

        // Define la ubicación y el nombre del archivo de salida
        Path path = FileSystems.getDefault().getPath("");
        String directoryName = path.toAbsolutePath().toString();
        String outputPath = directoryName.concat("/").concat(generateScreenshotName());

        // Guarda el screenshot en el archivo de salida
        try {
            FileHandler.copy(screenshotFile, new File(outputPath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static String generateScreenshotName() {
        // Genera un UUID aleatorio
        UUID uuid = UUID.randomUUID();

        // Crea el nombre del archivo concatenando el UUID con la extensión ".png"
        return "screenshot".concat("_").concat(LocalData.localData.getScenario().getName()).concat("_").concat(String.valueOf(uuid)).concat(".png");
    }
}
