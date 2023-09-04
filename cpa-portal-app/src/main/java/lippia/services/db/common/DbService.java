package lippia.services.db.common;

import com.crowdar.core.PropertyManager;
import com.claro.sp.ta.db.DatabaseQuery;
import com.google.gson.Gson;
import lippia.model.bd_model.RatePlanProfilesModel;
import lippia.services.api.common.Connection;
import lippia.services.api.common.Tn3Service;
import lippia.utils.DateUtils;
import lippia.utils.GetFiles;
import lippia.utils.LocalData;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import java.util.Map;

public class DbService extends Connection {
    private static final String SELECT = "SelectQueries";
    private static final String UPDATE = "UpdateQueries";
    private static final String QUERY = "Query: %n \t %s";
    private static final Log LOGG = LogFactory.getLog(DbService.class);
    Tn3Service tn3 = new Tn3Service();

    public static void setLastRechargeDate(String billNumber, String fecha) {
        if (!DateUtils.validarFormatoFecha(fecha, "yyyy-MM-dd HH:mm:ss")) {
            throw new IllegalArgumentException("El formato de fecha no es válido");
        }

        DatabaseQuery dq = getConection();
        try {
            dq
                    .ccard()
                    .update(GetFiles.getJsonQuery(UPDATE, "updateLastRechargeDate")
                            .replace("$lastRechargeDate", fecha)
                            .replace("$billNumber", billNumber))
                    .execute();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void setProfileTn3(String profile) {
        tn3.setProfileTn3(profile);
    }

    private void setPlanStl(String plan) throws Exception {
        DatabaseQuery dq = getConection();
        dq
                .prod()
                .update(GetFiles.getJsonQuery(UPDATE, "updateCellularPlan"))
                .addParameter(plan)
                .addParameter(LocalData.localData.getBillNumber())
                .execute();
    }

    public void executeQuerySetNegocio() throws Exception {
        getConection()
                .prod()
                .update(GetFiles.getJsonQuery(UPDATE, "updateBusinessCellulars"))
                .log("\n\t[INFO] --> Se actualizó tabla CELLULARS:\n")
                .addParameter(LocalData.localData.getNegocio())
                .addParameter(LocalData.localData.getBillNumber())
                .execute();
    }

    public void cambiarPlanLinea(String plan) {

        String profile = "1";
        try {
            profile = getProfileByPlan(PropertyManager.getProperty(PropertyManager.getProperty("country") + "." + LocalData.localData.getNegocio()));
        } catch (Exception e) {
            e.printStackTrace();
            String mensaje = "Se produjo un error al obtener el profile correspondiente al plan: " + plan;
            LOGG.info(mensaje);
        }

        try {
            setPlanStl(plan);
        } catch (Exception e) {
            String mensaje = "Se produjo un error al setear el plan " + plan + " en STL: " + e.getMessage();
            LOGG.info(mensaje);
        }

        try {
            setProfileTn3(profile);
        } catch (Exception e) {
            String mensaje = "Se produjo un error al setear el plan en STL: " + plan;
            LOGG.info(mensaje);
        }
    }

    private String getProfileByPlan(String plan) throws Exception {
        DatabaseQuery dq = getConection();
        String jsonResponse;
        String profile;
        dq
                .prod()
                .select(GetFiles.getJsonQuery(SELECT, "selectRatePlansProfile"))
                .addParameter(plan);

        jsonResponse = dq.execute();

        jsonResponse = jsonResponse.substring(1, jsonResponse.length() - 1);
        Gson gson = new Gson();
        RatePlanProfilesModel qr;
        qr = gson.fromJson(jsonResponse, RatePlanProfilesModel.class);
        profile = qr.getRPPR_GPRF_ID();
        return profile;
    }

    public static String getCoLine() {
        try {
            DatabaseQuery dq = getConection();
            String jsonQuery;
            String jsonString;
            jsonQuery = GetFiles.getJsonQuery(SELECT, "selectCoLine");
            LOGG.info(String.format(QUERY, jsonQuery));

            dq
                    .prod()
                    .select(jsonQuery);
            jsonString = dq.execute();
            Gson gson = new Gson();
            Map<String, String>[] celularArray = gson.fromJson(jsonString, Map[].class);

            return celularArray[0].get("CLU_CELLULAR_NUMBER");
        } catch (Exception e) {
            LOGG.info("Se produjo un error al obtener la linea CO");
        }
        return null;
    }
}
