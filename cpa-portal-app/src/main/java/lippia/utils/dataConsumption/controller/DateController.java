package lippia.utils.dataConsumption.controller;


import com.crowdar.core.PropertyManager;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;

import static java.time.temporal.ChronoUnit.DAYS;
import static lippia.model.bdModel.dataConsumption.dias.DiaDesde.diaDesde;
import static lippia.model.bdModel.dataConsumption.dias.DiaHasta.diaHasta;
import static lippia.model.bdModel.dataConsumption.dias.DiasConConsumo.diasConConsumo;


public class DateController {

    private static final Logger logger = Logger.getLogger(DateController.class.getName());


    //Este metodo genera una lista con días aleatorios dentro de los últimos 30 dias
    //en los cuales se generaran consumos para su consulta futura
    public static void setFechas(String f) {

        LocalDate tmpDesde, tmpHasta;

        switch (f) {

            case "hoy":

                diaHasta.setDiaFin(LocalDate.now());
                diaDesde.setDiaInicio(LocalDate.now());

                break;

            case "dia":

                diaHasta.setDiaFin(getFechaRandom());
                diaDesde.setDiaInicio(diaHasta.getDiaFin());

                break;

            case "rango":

                tmpHasta = getFechaRandom();
                tmpDesde = getFechaRandom();

                if (tmpHasta.isBefore(tmpDesde)) {
                    diaDesde.setDiaInicio(tmpHasta);
                    diaHasta.setDiaFin(tmpDesde);

                } else {
                    if (tmpDesde.isBefore(tmpHasta)) {
                        diaDesde.setDiaInicio(tmpDesde);
                        diaHasta.setDiaFin(tmpHasta);
                    } else {

                        setFechas("rango");
                    }
                }

                break;

            default:
                diaHasta.setDiaFin(LocalDate.now());
                diaDesde.setDiaInicio(LocalDate.now().minusDays(2));
                break;
        }

        logger.info("FECHA DESDE = " + diaDesde.getDiaInicio());
        logger.info("FECHA HASTA = " + diaHasta.getDiaFin());

        //Si el rango creado es muy grande
        //se generarán solamente una determinada
        // cantidad de consumos
        setDiasQueTienenConsumo();

    }

    public static void setDiasQueTienenConsumo(){

        List<LocalDate> diasQueTienenConsumo = new ArrayList<>();

        LocalDate tmpDia;

        int cantidadDeDiasConConsumos = Integer.parseInt(PropertyManager.getProperty("cantidadCasos"));

        //genero los días que van a tener consumo
        //debe asegurarse que se encuentren dentro
        //del intervalo diaDesde <-> diaHasta
        int intervalo = (int) DAYS.between(diaDesde.getDiaInicio(), diaHasta.getDiaFin());


        //diaHasta == diaFin; puede ser hoy o cualquier día random
        if (intervalo == 0){

            tmpDia = diaHasta.getDiaFin();
            diasQueTienenConsumo.add(tmpDia);

        }else{

            if (intervalo < cantidadDeDiasConConsumos){

                while (diasQueTienenConsumo.size() < intervalo) {
                    tmpDia = setFechaRndDatetime(diaHasta.getDiaFin(), intervalo);

                    if (!diasQueTienenConsumo.contains(tmpDia)) {
                        diasQueTienenConsumo.add(tmpDia);
                    }

                }
            }else{

                while (diasQueTienenConsumo.size() < cantidadDeDiasConConsumos) {
                    tmpDia = setFechaRndDatetime(diaHasta.getDiaFin(), intervalo);

                    if (!diasQueTienenConsumo.contains(tmpDia)) {
                        diasQueTienenConsumo.add(tmpDia);
                    }

                }
            }

        }

        diasConConsumo.setFechasConConsumo(diasQueTienenConsumo);

        logger.info("*** DIAS QUE TIENEN CONSUMO: ");
        diasConConsumo.getFechasConConsumo().forEach(System.out::println);

    }


    public static LocalDate setFechaRndDatetime(LocalDate lastDay, int intervalo) {

        int diaRandom;

        diaRandom = (int) (Math.random() * intervalo + 1);

        LocalDate fechaActual = lastDay;
        fechaActual = fechaActual.minusDays(diaRandom);

        return fechaActual;

    }

    public static LocalDate getFechaRandom() {

        int diaRandom;

        int rango = Integer.parseInt(PropertyManager.getProperty("rangoMayor"));

        diaRandom = (int) (Math.random() * rango + 1);

        LocalDate fechaActual = LocalDate.now();
        fechaActual = fechaActual.minusDays(diaRandom);

        return fechaActual;

    }

    public static String conviertoLocalDate2StringBD(LocalDate fecha) {

        return fecha.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }



    public static String cambiarBarrasPorGuiones(String fecha){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        LocalDate localDate = LocalDate.parse(fecha, formatter);

        return localDate.toString();
    }

    public static String cambiarGuionesPorBarras(String fecha){

        Date date;

        DateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
        DateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS Z", Locale.US);


        try {
            date = inputFormat.parse(fecha);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return outputFormat.format(date);
    }

    public static String formatoFechaParaElFront(String fechaStr){

        StringBuilder sb = new StringBuilder();
        List<String> valores = Arrays.asList(fechaStr.split("-"));

        for (int i = valores.size()-1; i >= 0 ; i--) {
            sb.append(valores.get(i));
        }

        return sb.toString();
    }

    public static String formatoFechaParaLaBD(String fechaStr){

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM d, yyyy, hh:mm:ss a", Locale.US);
        LocalDateTime localDateTime = LocalDateTime.parse(fechaStr, dateFormatter);

        return conviertoLocalDate2StringBD(localDateTime.toLocalDate());

    }


}
