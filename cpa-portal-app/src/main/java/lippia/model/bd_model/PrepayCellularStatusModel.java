package lippia.model.bd_model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PrepayCellularStatusModel {
    String PCS_ID;
    String PCS_DESCRIPTION;
    String PCS_STATUS_CONVERTION;

    @Override
    public String toString() {
        return "PrepayCellularStatusModel{" +
                "PCS_ID='" + PCS_ID + '\'' +
                ", PCS_DESCRIPTION='" + PCS_DESCRIPTION + '\'' +
                ", PCS_STATUS_CONVERTION='" + PCS_STATUS_CONVERTION + '\'' +
                '}';
    }
}
