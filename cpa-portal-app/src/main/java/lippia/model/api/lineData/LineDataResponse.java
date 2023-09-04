package lippia.model.api.lineData;

import lippia.model.api.common.ServiceDetails;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LineDataResponse {
    private ServiceDetails serviceDetails;
    private Format format;
    private Balance balance;
    private Condition condition;
    private Registers registers;

    @Override
    public String toString() {
        return "LineDataResponse{" +
                "serviceDetails=" + serviceDetails +
                ", format=" + format +
                ", balance=" + balance +
                ", condition=" + condition +
                ", registers=" + registers +
                '}';
    }
}

