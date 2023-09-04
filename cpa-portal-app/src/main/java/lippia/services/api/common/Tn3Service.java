package lippia.services.api.common;

import com.crowdar.core.PropertyManager;
import com.sp.ta.tecno.model.GetSubscriberResponse;
import lippia.utils.LocalData;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.logging.Logger;

import static com.sp.ta.tecno.GetSubscriber.getSubscriber;
import static com.sp.ta.tecno.UpdateSubscriber.updateSubscriber;

public class Tn3Service extends Connection {

    private static final Logger logger = Logger.getLogger(Tn3Service.class.getName());
    private static final String USER = "user";
    private static final String PASSWORD = "password";
    private static final String ENVIRONMENT = "environment";
    private static final String COUNTRY = "country";
    private static final Random rand;

    static {
        try {
            rand = SecureRandom.getInstanceStrong();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    public void setProfileTn3(String profile) {
        String periodicTariffPlan=profile;

        if(LocalData.localData.getNegocio().equalsIgnoreCase("PP")){
            periodicTariffPlan="0";
        }

        info(profile, periodicTariffPlan);

        updateSuscriber(profile, periodicTariffPlan);
    }

    public void executeQuerySetProfileTN3() {
        String profile="1050";
        String periodicTariffPlan="1050";

        if(LocalData.localData.getNegocio().equalsIgnoreCase("PP")){
            profile="675";
            periodicTariffPlan="0";
        }

        info(profile, periodicTariffPlan);

        updateSuscriber(profile, periodicTariffPlan);

        GetSubscriberResponse subscriber = getSubscriber()
                .user(PropertyManager.getProperty(USER))
                .password(PropertyManager.getProperty(PASSWORD))
                .environment(PropertyManager.getProperty(ENVIRONMENT))
                .country(PropertyManager.getProperty(COUNTRY))
                .subId(LocalData.localData.getSubId())
                .execute();
        String msg = "\n{" + "\n\tsubid: " + LocalData.localData.getSubId() + "\n\tprofileId: " + subscriber.getProfileid() + "\n}";
        logger.info(msg);
    }

    private static void updateSuscriber(String profile, String periodicTariffPlan) {
        updateSubscriber()
                .user(PropertyManager.getProperty(USER))
                .password(PropertyManager.getProperty(PASSWORD))
                .environment(PropertyManager.getProperty(ENVIRONMENT))
                .country(PropertyManager.getProperty(COUNTRY))
                .subId(LocalData.localData.getSubId())
                .profileid(profile)
                .periodictariffplan(periodicTariffPlan)
                .execute();
    }

    public static void changeStatusSuscriber(String status) {
        if (status == null) {
            int accountStatusTn3 = Tn3DetailsService.get().getCustomerDetails().getAccountStatus();
            status = String.valueOf(getRandomAccountStatus(accountStatusTn3));
        }

        updateSubscriber()
                .user(PropertyManager.getProperty(USER))
                .password(PropertyManager.getProperty(PASSWORD))
                .environment(PropertyManager.getProperty(ENVIRONMENT))
                .country(PropertyManager.getProperty(COUNTRY))
                .subId(LocalData.localData.getSubId())
                .accountstatus(status)
                .execute();
    }

    private static int getRandomAccountStatus(int accountStatusTn3) {
        if (accountStatusTn3 < 2 || accountStatusTn3 > 5) {
            throw new IllegalArgumentException("Input value must be between 2 and 5");
        }

        int randomNumber;
        do {
            randomNumber = rand.nextInt(4) + 2;
        } while (randomNumber == accountStatusTn3);

        return randomNumber;
    }

    private void info(String profile, String periodicTariffPlan) {
        logger.info("%n \t [INFO] --> Se actualizó Profile en TN3");
        String msg = String.format("%n Profile: %s, PeriodicTariffPlan: %s", profile, periodicTariffPlan);
        logger.info(msg);
    }
}
