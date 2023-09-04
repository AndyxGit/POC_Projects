package lippia.model.bdModel.dataConsumption.consumos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TotalConsumos {

    public static TotalConsumos totalConsumos = new TotalConsumos();

    private String cost;
    private String volume;
    private List<String> consumosParciales;
    private List<String> traficosParciales;
    private List<String> servicios;
    private List<String> roaming;
    private List<String> fechas;

    @Override
    public String toString() {
        return "TotalConsumos{" +
                "cost='" + cost + '\'' +
                ", volume='" + volume + '\'' +
                ", consumosParciales=" + consumosParciales +
                ", traficosParciales=" + traficosParciales +
                ", servicios=" + servicios +
                ", roaming=" + roaming +
                ", fechas=" + fechas +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TotalConsumos that = (TotalConsumos) o;
        return Objects.equals(cost, that.cost) && Objects.equals(volume, that.volume) && Objects.equals(consumosParciales, that.consumosParciales) && Objects.equals(traficosParciales, that.traficosParciales) && Objects.equals(servicios, that.servicios) && Objects.equals(roaming, that.roaming) && Objects.equals(fechas, that.fechas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cost, volume, consumosParciales, traficosParciales, servicios, roaming, fechas);
    }
}
