package lippia.model.api.common.tn3_balances;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BalancesDetails {
    private int transferResult;
    private int accountStatus;
    private int profileId;
    private double amountBalanceTecnoValue;
    private double accountBalanceTecnoValue;
    private double periodicBalanceTecnoValue;
    private double bonusBalanceTecnoValue;
    private double smBalanceTecnoValue;
    private double dataBalanceTecnoValue;
    private double overdraftBalanceTecnoValue;
    private double voiceBalance4TecnoValue;
    private double amountBalance;
    private double accountBalance;
    private double periodicBalance;
    private double bonusBalance;
    private double smBalance;
    private double dataBalance;
    private double overdraftBalance;
    private double voiceBalance4;
    private ExpiryDate expiryDate;
    private PeriodicExpiry periodicExpiry;
    private BonusExpiry bonusExpiry;
    private SmExpiry smExpiry;
    private DataExpiry dataExpiry;
    private VoiceExpiry4 voiceExpiry4;
    private int serviceStatus;
    private double subOptions;
    private IvrQueryExpiryDate ivrQueryExpiryDate;
    private int ivrQueryCounter;
    private LastRechargeDate lastRechargeDate;
}
