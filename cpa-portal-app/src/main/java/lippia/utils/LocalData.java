package lippia.utils;

import com.claro.sp.automation.model.subscriber.Cellular;
import io.cucumber.core.api.Scenario;
import lippia.model.bdModel.dataConsumption.consumos.TotalConsumos;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class LocalData {

    public static LocalData localData = new LocalData();
    private int diasASumar;
    private String billNumber = "";
    private String subId = null;
    private String negocio;
    private int profileIdEnTn3;
    private int accountStatusEnTn3;
    private String plan;
    private String ppiDate;
    private String gift_activation_date;
    private String gift_activation_hour;
    private String idPackTn3;
    private String newProcessDateGap;
    private Float valorPack;
    private Float cantDatosPack;
    private Date fechaHoraActual;
    private Date fechaHoraExpiracion;
    private Date fechaVencSlot;
    private int bandera = 0;
    private String fechaCBH;
    private String fechaUpdatePKG;
    private String razon;
    public static String Operations;
    private String token = null;
    public static ArrayList<Scenario> listaScenarios = new ArrayList<>();
    private String handle;
    public static Cellular cellular;
    public static String monto;
    public Scenario scenario;
    //Carlos
    private List<String> datosDesordenados = new ArrayList<>();
    private List<String> datosOrdenados = new ArrayList<>();

    private TotalConsumos api;
    private TotalConsumos bd;
    private TotalConsumos frontend;

    //Martin
    private String msisdn = "";
    private String rplId = "";
}
