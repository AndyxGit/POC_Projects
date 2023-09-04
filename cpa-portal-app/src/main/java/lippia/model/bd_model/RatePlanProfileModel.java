package lippia.model.bd_model;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class RatePlanProfileModel {
    private String RPPR_GPRF_ID;

    public String getRppr_gprf_id() {
        return RPPR_GPRF_ID;
    }
}
