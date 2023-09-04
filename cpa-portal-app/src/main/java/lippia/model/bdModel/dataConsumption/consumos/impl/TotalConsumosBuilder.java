package lippia.model.bdModel.dataConsumption.consumos.impl;

import lippia.model.bdModel.dataConsumption.consumos.IBuilder;
import lippia.model.bdModel.dataConsumption.consumos.TotalConsumos;

import java.util.List;

import static lippia.utils.dataConsumption.controller.StringController.formatoMilesDecimales;

public class TotalConsumosBuilder implements IBuilder {

    private long totalConsumosNumber;

    private String cost;
    private String volume;
    private List<String> consumosParciales;
    private List<String> traficosParciales;
    private List<String> servicios;
    private List<String> roaming;
    private List<String> fechas;

    public TotalConsumosBuilder(){

    }



    public TotalConsumosBuilder withCost(String cost){
        this.cost = cost;
        return this;
    }

    public TotalConsumosBuilder withVolume(String volume){
        this.volume = volume;
        return this;
    }

  public TotalConsumosBuilder withConsumosParciales(List<String> consumosParciales){
        this.consumosParciales = consumosParciales;
        return this;
  }

  public TotalConsumosBuilder withTraficosParciales(List<String> traficosParciales){
        this.traficosParciales = traficosParciales;
        return this;
  }

  public TotalConsumosBuilder withServicios(List<String> servicios){
        this.servicios = servicios;
        return this;
  }

  public TotalConsumosBuilder withRoaming(List<String> roaming){
        this.roaming = roaming;
        return this;
  }

  public TotalConsumosBuilder withFechas(List<String> fechas){
        this.fechas = fechas;
        return this;
  }

    @Override
    public TotalConsumos build() {

        TotalConsumos totalConsumos = new TotalConsumos();

        totalConsumos.setCost(this.cost);
        totalConsumos.setVolume(this.volume);
        totalConsumos.setConsumosParciales(this.consumosParciales);
        totalConsumos.setTraficosParciales(this.traficosParciales);
        totalConsumos.setServicios(this.servicios);
        totalConsumos.setRoaming(this.roaming);
        totalConsumos.setFechas(this.fechas);

        return totalConsumos;
    }



}
