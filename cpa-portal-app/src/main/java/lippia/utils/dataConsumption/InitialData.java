package lippia.utils.dataConsumption;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class InitialData {

    private List<String> filtrosServiciosLst;
    private List<String> filtrosSocialNetworkLst;
    private List<String> filtrosTodos;
    private Map<String, String> descripciones;

    public static InitialData initialData = new InitialData();


}
