package lippia.model.api.common;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ServiceDetails {
    private String error;
    private String result;
    private String level;

    @Override
    public String toString() {
        return "ServiceDetails{" +
                "error='" + error + '\'' +
                ", result='" + result + '\'' +
                ", level='" + level + '\'' +
                '}';
    }
}
