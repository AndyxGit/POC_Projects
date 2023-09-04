package lippia.services.api.common;

import com.crowdar.core.PropertyManager;
import com.claro.sp.ta.db.DatabasePackage;
import com.claro.sp.ta.db.DatabaseQuery;

import static com.claro.sp.ta.db.DatabaseQuery.databaseQuery;

public class Connection {

    public static DatabaseQuery getConection() {
        return databaseQuery()
                .user(PropertyManager.getProperty("user"))
                .password(PropertyManager.getProperty("password"))
                .environment(PropertyManager.getProperty("environment"))
                .country(PropertyManager.getProperty("country"));
    }

    public static DatabasePackage getPkgConnection() {
        return DatabasePackage
                .databasePackage()
                .user(PropertyManager.getProperty("user"))
                .password(PropertyManager.getProperty("password"))
                .environment(PropertyManager.getProperty("environment"))
                .country(PropertyManager.getProperty("country"));
    }

    public static DatabaseQuery getConectionProd() {

        return databaseQuery()
                .user(PropertyManager.getProperty("user-prod"))
                .password(PropertyManager.getProperty("pass-prod"))
                .environment(PropertyManager.getProperty("environment"))
                .country(PropertyManager.getProperty("country"));
    }

}
