package lippia.model.bd_model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class PrepayCellularModel {
    String PCE_PCS_ID_ACTUAL;
    String PCE_LAST_STATUS_UPDATE;
    String PCE_PCS_ID_BEFORE;
    String PCE_LAST_UPDATE;
    String PCE_ADD_DATE;
    String PCE_LAST_RECHARGE_DATE;
    String PCE_SUSPEND_DATE;
    String PCE_CANCEL_DATE;

    @Override
    public String toString() {
        return "PrepayCellularModel{" +
                "PCE_PCS_ID_ACTUAL='" + PCE_PCS_ID_ACTUAL + '\'' +
                ", PCE_LAST_STATUS_UPDATE='" + PCE_LAST_STATUS_UPDATE + '\'' +
                ", PCE_PCS_ID_BEFORE='" + PCE_PCS_ID_BEFORE + '\'' +
                ", PCE_LAST_UPDATE='" + PCE_LAST_UPDATE + '\'' +
                ", PCE_ADD_DATE='" + PCE_ADD_DATE + '\'' +
                ", PCE_LAST_RECHARGE_DATE='" + PCE_LAST_RECHARGE_DATE + '\'' +
                ", PCE_SUSPEND_DATE='" + PCE_SUSPEND_DATE + '\'' +
                ", PCE_CANCEL_DATE='" + PCE_CANCEL_DATE + '\'' +
                '}';
    }
}
