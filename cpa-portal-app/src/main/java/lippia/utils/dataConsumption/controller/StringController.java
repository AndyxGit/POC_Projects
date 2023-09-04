package lippia.utils.dataConsumption.controller;

import lippia.services.web.dataConsumption.DataConsumptionService;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class StringController {

    private static final Logger logg = Logger.getLogger(DataConsumptionService.class.getName());

    public static List<String> formatString(String ppaValue) {
        return Arrays.stream(ppaValue.split("#"))
                .filter(Objects::nonNull)
                .filter(Predicate.not(String::isEmpty))
                .collect(Collectors.toList());
    }

    public static String conviertoList2StringBD(List<String> filtros){

        String delim = "','";
        return String.join(delim, filtros);

    }

    public static String formatoMilesDecimales(double input, String methodName){

        DecimalFormatSymbols simbolos = DecimalFormatSymbols.getInstance(Locale.ITALIAN);

        String pattern = "#,##0.00";

        DecimalFormat myFormatter = new DecimalFormat(pattern, simbolos);

        return myFormatter.format(input);

    }
}
