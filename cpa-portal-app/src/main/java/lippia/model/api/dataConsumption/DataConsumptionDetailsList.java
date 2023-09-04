package lippia.model.api.dataConsumption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataConsumptionDetailsList {

    private CdrDate cdrDate;
    private Boolean roaming;
    private Cost cost;
    private Volume volume;
    private String ratingGroup;
    private String ratingGroupDescription;
    private boolean socialNetwork;

    public static DataConsumptionDetailsList dataConsumptionDetailsList = new DataConsumptionDetailsList();

    @Override
    public String toString() {
        return "DataConsumptionDetailsList{" +
                "cdrDate=" + cdrDate +
                ", roaming=" + roaming +
                ", cost=" + cost +
                ", volume=" + volume +
                ", ratingGroup='" + ratingGroup + '\'' +
                ", ratingGroupDescription='" + ratingGroupDescription + '\'' +
                ", socialNetwork=" + socialNetwork +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataConsumptionDetailsList that = (DataConsumptionDetailsList) o;
        return roaming == that.roaming && socialNetwork == that.socialNetwork && Objects.equals(cdrDate, that.cdrDate) && Objects.equals(cost, that.cost) && Objects.equals(volume, that.volume) && Objects.equals(ratingGroup, that.ratingGroup) && Objects.equals(ratingGroupDescription, that.ratingGroupDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cdrDate, roaming, cost, volume, ratingGroup, ratingGroupDescription, socialNetwork);
    }
}
