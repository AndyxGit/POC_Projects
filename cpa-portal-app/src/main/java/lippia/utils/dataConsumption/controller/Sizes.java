package lippia.utils.dataConsumption.controller;




import com.crowdar.core.PropertyManager;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.logging.Logger;

public class Sizes {

    private static final Logger logg = Logger.getLogger(Sizes.class.getName());

    private static final BigDecimal base = BigDecimal.valueOf(1024);

    private static final BigDecimal BYTES = BigDecimal.valueOf(1024);

    private static final BigDecimal MB = BYTES.multiply(base);
    private static final BigDecimal GB = MB.multiply(base);
    private static final BigDecimal TB = GB.multiply(base);
    private static final BigDecimal PB = TB.multiply(base);
    private static final BigDecimal EB = PB.multiply(base);



   public static double convertSize(Double bytes){

       BigDecimal salida = null;

      String s = PropertyManager.getProperty("unit");

      switch (s){
          case "MB":
              salida = BigDecimal.valueOf(bytes).divide(MB);
              break;
          case "GB":
              salida = BigDecimal.valueOf(bytes).divide(GB);
              break;
          case "TB":
              salida = BigDecimal.valueOf(bytes).divide(TB);
              break;
          case "PB":
              salida = BigDecimal.valueOf(bytes).divide(PB);
              break;
          case "EB":
              salida = BigDecimal.valueOf(bytes).divide(EB);
              break;
          default:
              salida = BigDecimal.valueOf(bytes);

      }

      return salida.setScale(2, RoundingMode.HALF_EVEN).doubleValue();

   }

    public static double redondeo(Double doble){

        DecimalFormat formatoDoubleDosDecimales = new DecimalFormat("0.00");

        double gsmDdecimalDivisor = 1;

        switch (PropertyManager.getProperty("country").toUpperCase().trim()){

            case "AR":
                gsmDdecimalDivisor = 100000;
                break;
            case "PY":
                gsmDdecimalDivisor = 100;
                break;
            case "UY":
                gsmDdecimalDivisor = 100000;
                break;
            default:
                logg.severe("--- PREFIJO DE PAIS INVALIDO ---");
                break;
        }

        BigDecimal bd = new BigDecimal(doble)
                .divide(BigDecimal.valueOf(gsmDdecimalDivisor), 2, RoundingMode.HALF_EVEN);

        return bd.doubleValue();
    }

}
