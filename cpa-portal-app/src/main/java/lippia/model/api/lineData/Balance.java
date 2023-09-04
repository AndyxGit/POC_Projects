package lippia.model.api.lineData;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Balance {
    private AvailablePayment availablePayment;
    private MonthlyPayment monthlyPayment;
    private RechargePayment rechargePayment;
    private PromotionPayment promotionPayment;
    private FrozenPayment frozenPayment;
}
