package lippia.utils.dataConsumption.controller;


import static lippia.model.bdModel.dataConsumption.Roaming.roaming;

public class RoamingController {

    public static RoamingController roamingController;

    static {
        roamingController = new RoamingController();
    }

    public static void setRoaming(String r){

        if (r.toLowerCase().trim().equalsIgnoreCase("null")){
            roaming.setRoam(null);
        }else{
            roaming.setRoam(!r.toLowerCase().trim().equalsIgnoreCase("n"));
        }

    }

    public static String getRoamingStr(){

        String roamingStr;

        if (roaming.getRoam() == null || !roaming.getRoam()) {
            roamingStr = "N";
        } else {
            roamingStr = "Y";
        }

        return roamingStr;
    }
}
