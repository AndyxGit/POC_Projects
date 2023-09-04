package lippia.model.api.lineData;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Registers {
    private String creation;
    private String lastRecharge;
    private String suspended;
    private String cancelled;
    private String expiration;
}
