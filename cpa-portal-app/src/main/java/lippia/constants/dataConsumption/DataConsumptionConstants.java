package lippia.constants.dataConsumption;

public class DataConsumptionConstants {


    public static final String SEARCH_PHONE_INPUT = "name:search";

    public static final String DATE_FROM_INPUT = "id:from-date-input";

    public static final String DATE_TO_INPUT = "id:to-date-input";

    public static final String LABEL_CONSUMO_DE_DATOS = "class:title";
    public static final String BOTON_GEO_HOME = "id:Home";
    public static final String BOTON_GEO_ROAMING = "id:Roaming";

    public static final String BOTON_GEO_TODOS = "id:Todos";

    public static final String BOTON_CONSULTAR_ENABLED = "xpath://BUTTON[@class='activeButton'][text()='Consultar']";

    public static final String BOTON_CONSULTAR_DISABLED = "xpath://BUTTON[@class='disabledButton'][text()='Consultar']";

    public static final String SUMATORIA_COSTO_CONSUMOS = "class:totalValues";

    public static final String TABLE_ROW_ITEM = "class:tableRowItem";

    public static final String ALERT_SIN_CONSUMOS = "xpath://div[@role='alert']";

    public static final String SELECTOR_SERVICIOS = "id:react-select-2-input";

    public static final String SERVICIO_CONEXION_MOVIL = "id:react-select-2-option-1";

    public static final String SERVICIO_WHATSAPP = "id:react-select-2-option-4";

    public static final String SERVICIO_BY_PASS = "id:react-select-2-option-2";

    public static final String SERVICIO_AUTOFLEX = "id:react-select-2-option-6";

    public static final String SERVICIO_NOCHES_LIBRES = "id:react-select-2-option-7";

    public static final String SERVICIO_REDES_SOCIALES = "id:react-select-2-option-8";

    public static final String SERVICIO_FACEBOOK = "id:react-select-2-option-9";
    public static final String SERVICIO_YOUTUBE = "id:react-select-2-option-10";

    public static final String SERVICIO_INSTAGRAM = "id:react-select-2-option-11";

    public static final String SERVICIO_TWITTER = "id:react-select-2-option-12";

    public static final String SERVICIO_TIKTOK = "id:react-select-2-option-13";

    public static final String MESSAGE_TITTLE = "class:messageTitle";

    public static final String MESSAGE_SUBTITTLE = "class:messageSubtitle";

    public static final String NOMBRE_PAIS = "class:countryName";

    public static final String HEADER_SERVICIO = "xpath://*[contains(@class, 'tableRowTitle') and text()='Servicio ']";

    public static final String HEADER_PRECIO = "xpath://*[contains(@class, 'tableRowTitle') and text()='Precio ']";

    public static final String HEADER_FECHA = "xpath://*[contains(@class, 'tableRowTitle') and text()='Fecha ']";

    public static final String SWITCH_FECHAS = "class:react-switch-bg";

    public static final String FILTRO_FECHAS = "id:filters-switch";

    public static final String TOOLTIP = "xpath://*[@alt='tooltip']";

    public static final String MULTIVALUE_SERVICE = "class:css-9jq23d";

    public static final String LBL_TWITTER = "Twitter Gratis";
    public static final String LBL_TIKTOK = "TikTok Gratis";
    public static final String LBL_FACEBOOK = "Facebook Gratis";
    public static final String LBL_INSTAGRAM = "Instag. Gratis";
    public static final String LBL_YOUTUBE = "YouTube Gratis";
    public static final String LBL_CONEXION_MOVIL = "Conexion Movil";
    public static final String LBL_AUTOFLEX = "FB Autoflex/N&R";
    public static final String LBL_BYPASS = "Conexión Móvil Bypass";
    public static final String LBL_NOCHES_LIBRES = "Noches Libres";
    public static final String LBL_WHATSAPP = "WhatsApp Gratis";
    public static final String LBL_REDES_SOCIALES = "Redes Sociales";


    //=================== LOCALIZADORES INESTABLES ===================


    public static final String INPUT_SERVICIOS = "id:filster-multiselect-id";


    //=========================  MENSAJES =========================

    public static final String MSG_CLICK_CONSULTAR = "Aún no se han consultado datos";

    public static final String SUB_MSG_CLICK_CONSULTAR = "Por favor, haga click en \"Consultar\"";

    public static final String MSG_SIN_RESULTADOS = "Sin resultados que coincidan con su búsqueda";

    public static final String SUB_MSG_SIN_RESULTADOS = "Por favor, revise los campos e intente nuevamente.";

    public static final String SUB_MSG_INGRESE_LINEA = "Para realizar una consulta, por favor, ingrese un número de línea.";

    public static final String TITULO_CONSUMO_DE_DATOS = "Consumo de Datos";

    public static final String SELECTOR_SERVICIOS_TODOS = "Todos";

    public static final String MSG_SIN_CONSUMOS = "Número de Línea\n" +
            "No se encontraron consumos para la búsqueda realizada.";


    public static final String MSG_FECHA_INVALIDA = "Fecha inválida\n" +
            "Ingrese fecha con formato dd/mm/aaaa.";

    public static final String MSG_LINEA_INVALIDA = "Número de línea\n" +
            "Por favor, ingrese el número de línea a consultar.";

    public static final String MSG_RANGO_MES = "Rango mayor a un mes, puede demorar la carga de datos.";

}

