package lippia.model.api.lineData;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Condition {
    private CurrentStatus currentStatus;
    private AccountStatus accountStatus;
    private PcePcsActual pcePcsActual;
    private LastStatus lastStatus;
    private ServiceStatus serviceStatus;
    private ProfileId profileId;
    private String change;
    private Boolean promoPlus;
    private String lastUsed;
}
