package lippia.constants.line_data;

public class LineDataConstants {
    //DATOS DE LA LINEA CONSTANTS
    public static final String DDLL_LABEL = "XPATH://div[@id='accordion-header']/p";
    public static final String DDLL_DROPDOWN = "CSS:[data-testid='icon-accordion']";
    public static final String DDLL_INGRESE_NUMERO_MSG = "XPATH://div[@class='content-alert-message']";
    //saldo total
    public static final String SALDO_TOTAL_DISPONIBLE_LABEL = "XPATH://div[@class='header subtitle']";
    public static final String SALDO_TOTAL_DISPONIBLE_MONTO = "XPATH://p[@class='total initials']";
    //abono mensual
    public static final String ABONO_MENSUAL_LABEL = "XPATH://p[.='Abono mensual']";
    public static final String ABONO_MENSUAL_MONTO = "XPATH://div[@class='amount-expiration-container']/p[@class='initials']";
    public static final String ABONO_MENSUAL_VENCIMIENTO = "XPATH://div[@class='amount-expiration-container']/p[@class[contains(string(),'body-2')]]";
    public static final String ABONO_MENSUAL_CONSUMEDBAR = "XPATH://div[@class='percent-container']";
    public static final String ABONO_MENSUAL_DISPONIBLE_LABEL = "XPATH://div[@class='footer']/div[@class='footer-item'][1]/p[1]";
    public static final String ABONO_MENSUAL_DISPONIBLE_MONTO = "XPATH://div[@class='footer']/div[@class='footer-item'][1]/p[2]";
    public static final String ABONO_MENSUAL_CONSUMO_LABEL = "XPATH://div[@class='footer']/div[@class='footer-item'][2]/p[1]";
    public static final String ABONO_MENSUAL_CONSUMO_MONTO = "XPATH://div[@class='footer']/div[@class='footer-item'][2]/p[2]";
    //saldo de recarga
    public static final String SALDO_RECARGA_LABEL = "XPATH://p[.='Saldo de recarga']";
    public static final String SALDO_RECARGA_MONTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo de recarga')]//p[@class='initials']";
    public static final String SALDO_RECARGA_VTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo de recarga')]//p[@class='body-2 color-gray-2']";
    //saldo promocional
    public static final String SALDO_PROMOCIONAL_LABEL = "XPATH://p[.='Saldo promocional']";
    public static final String SALDO_PROMOCIONAL_MONTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo promocional')]//p[@class='initials']";
    public static final String SALDO_PROMOCIONAL_VTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo promocional')]//p[@class='body-2 color-gray-2']";
    //saldo congelado
    public static final String SALDO_CONGELADO_LABEL = "XPATH://p[.='Saldo congelado']";
    public static final String SALDO_CONGELADO_MONTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo congelado')]//p[@class='initials']";
    public static final String SALDO_CONGELADO_VTO = "XPATH://div[@class='monthly-payment-balances-container']//div[@class='data-container'][contains(string(),'Saldo congelado')]//p[@class='body-2 color-gray-2']";
    //estados de la linea
    public static final String ESTADOS_DE_LA_LINEA_LABEL = "ID:line-status";
    public static final String ESTADO_ACTUAL_LABEL = "XPATH://p[.='Actual']";
    public static final String ESTADO_ACTUAL = "XPATH://div[@class='blocks-info-container']/div[1]/div[1]/p[2]";
    public static final String ESTADO_ACTUAL_TOOLTIP = "XPATH://div[@class='blocks-info-container']/div[1]/div[1]/p[2]/*";
    public static final String ESTADO_ANTERIOR_LABEL = "XPATH://p[.='Anterior']";
    public static final String ESTADO_ANTERIOR = "XPATH://div[@class='blocks-info-container']/div[1]/div[2]/p[2]";
    public static final String ESTADO_CAMBIO_LABEL = "XPATH://p[.='Cambio de estado']";
    public static final String ESTADO_CAMBIO_DATE = "XPATH://div[@class='blocks-info-container']/div[1]/div[4]/p[2]";
    public static final String ESTADO_DEL_SERVICIO_LABEL = "XPATH://p[.='Del servicio']";
    public static final String ESTADO_DEL_SERVICIO = "XPATH://div[@class='blocks-info-container']/div[1]/div[3]/p[2]";
    public static final String ESTADO_PLAN_LABEL = "XPATH://p[.='Plan']";
    public static final String ESTADO_PLAN = "XPATH://div[@class='blocks-info-container']/div[2]/div[1]/p[2]";
    public static final String ESTADO_PROMO_PLUS_LABEL = "XPATH://p[.='Promo Plus']";
    public static final String ESTADO_PROMO_PLUS_ESTADO = "XPATH://div[@class='blocks-info-container']/div[2]/div[2]/p[2]";
    public static final String ESTADO_ULTIMO_USO_LABEL = "XPATH://p[.='Último uso']";
    public static final String ESTADO_ULTIMO_USO_DATE = "XPATH://div[@class='blocks-info-container']/div[2]/div[3]/p[2]";
    public static final String CREACION_LABEL = "XPATH://p[.='Creación']";
    public static final String CREACION_DATE = "XPATH://div[@class='line-data-footer']/div[1]/p[2]";
    public static final String CANCELACION_LABEL = "XPATH://p[.='Cancelación']";
    public static final String CANCELACION_DATE = "XPATH://div[@class='line-data-footer']/div[4]/p[2]";
    public static final String ULTIMA_RECARGA_LABEL = "XPATH://p[.='Última recarga']";
    public static final String ULTIMA_RECARGA_DATE = "XPATH://div[@class='line-data-footer']/div[2]/p[2]";
    public static final String CADUCIDAD_LABEL = "XPATH://p[.='Caducidad']";
    public static final String CADUCIDAD_DATE = "XPATH://div[@class='line-data-footer']/div[5]/p[2]";
    public static final String SUSPENSION_LABEL = "XPATH://p[.='Suspensión']";
    public static final String SUSPENSION_DATE = "XPATH://div[@class='line-data-footer']/div[3]/p[2]";
}
