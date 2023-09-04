package lippia.model.bd_model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class RatePlanProfilesModel {
    private String RPPR_RPL_ID;
    private String RPPR_GPRF_ID;

    public String getRPPR_RPL_ID() {
        return RPPR_RPL_ID;
    }

    public void setRPPR_RPL_ID(String RPPR_RPL_ID) {
        this.RPPR_RPL_ID = RPPR_RPL_ID;
    }

    public String getRPPR_GPRF_ID() {
        return RPPR_GPRF_ID;
    }

    public void setRPPR_GPRF_ID(String RPPR_GPRF_ID) {
        this.RPPR_GPRF_ID = RPPR_GPRF_ID;
    }
}
