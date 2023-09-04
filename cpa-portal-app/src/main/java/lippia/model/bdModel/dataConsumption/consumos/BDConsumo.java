package lippia.model.bdModel.dataConsumption.consumos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BDConsumo {

    public String DDC_RATING_GROUP;

    public double DDC_SUM_COST;

    public String DDC_CDR_DATE;

    public String DDC_ROAMING;

    public String DDC_SUBSCRIBER_ID;

    public double DDC_SUM_VOLUME;

    public String DDC_KEY_PARTITION;

    @Override
    public String toString() {
        return "Consumo{" +
                "DDC_RATING_GROUP='" + DDC_RATING_GROUP + '\'' +
                ", DDC_SUM_COST=" + DDC_SUM_COST +
                ", DDC_CDR_DATE='" + DDC_CDR_DATE + '\'' +
                ", DDC_ROAMING='" + DDC_ROAMING + '\'' +
                ", DDC_SUBSCRIBER_ID='" + DDC_SUBSCRIBER_ID + '\'' +
                ", DDC_SUM_VOLUME=" + DDC_SUM_VOLUME +
                ", DDC_KEY_PARTITION='" + DDC_KEY_PARTITION + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BDConsumo BDConsumo = (BDConsumo) o;
        return Double.compare(BDConsumo.DDC_SUM_COST, DDC_SUM_COST) == 0 && Double.compare(BDConsumo.DDC_SUM_VOLUME, DDC_SUM_VOLUME) == 0 && Objects.equals(DDC_RATING_GROUP, BDConsumo.DDC_RATING_GROUP) && Objects.equals(DDC_CDR_DATE, BDConsumo.DDC_CDR_DATE) && Objects.equals(DDC_ROAMING, BDConsumo.DDC_ROAMING) && Objects.equals(DDC_SUBSCRIBER_ID, BDConsumo.DDC_SUBSCRIBER_ID) && Objects.equals(DDC_KEY_PARTITION, BDConsumo.DDC_KEY_PARTITION);
    }

    @Override
    public int hashCode() {
        return Objects.hash(DDC_RATING_GROUP, DDC_SUM_COST, DDC_CDR_DATE, DDC_ROAMING, DDC_SUBSCRIBER_ID, DDC_SUM_VOLUME, DDC_KEY_PARTITION);
    }
}
