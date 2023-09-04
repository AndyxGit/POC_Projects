package lippia.model.api.lineData;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class RechargePayment {
    private BigDecimal amount;
    private String expiration;
}
