package lippia.model.api.lineData;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class FrozenPayment {
    private BigDecimal amount;
    private String expiration;
}
