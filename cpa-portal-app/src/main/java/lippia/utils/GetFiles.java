package lippia.utils;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;

public class GetFiles {

    private GetFiles() {
        throw new IllegalStateException("GetFiles class");
    }

    public static String getJsonQuery(String sqlCommand, String nombreQuery) throws IOException, ParseException {

        Path path = FileSystems.getDefault().getPath("");
        String directoryName = path.toAbsolutePath().toString();

        String pathFile = directoryName + "/src/test/resources/DBQueries/{{name}}.json";
        JSONParser jsonP = new JSONParser();
        org.json.simple.JSONObject jsonO = (org.json.simple.JSONObject) jsonP.parse(new FileReader(String.valueOf(Paths.get(pathFile.replace("{{name}}", sqlCommand)))));
        return (String) jsonO.get(nombreQuery);
    }
}
