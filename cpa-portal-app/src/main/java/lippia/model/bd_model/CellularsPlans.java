package lippia.model.bd_model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CellularsPlans {
    private String CPL_RPL_ID;
    private String CPL_STG_ID;
    private Date CPL_START_DATE;

    public String getCPL_RPL_ID() {
        return CPL_RPL_ID;
    }

    public void setCPL_RPL_ID(String CPL_RPL_ID) {
        this.CPL_RPL_ID = CPL_RPL_ID;
    }

    public String getCPL_STG_ID() {
        return CPL_STG_ID;
    }

    public void setCPL_STG_ID(String CPL_STG_ID) {
        this.CPL_STG_ID = CPL_STG_ID;
    }

    public String getCPL_START_DATE() {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
        return formato.format(CPL_START_DATE);
    }

    public void setCPL_START_DATE(Date CPL_START_DATE) {
        this.CPL_START_DATE = CPL_START_DATE;
    }
}
