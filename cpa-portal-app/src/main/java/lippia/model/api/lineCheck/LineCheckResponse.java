package lippia.model.api.lineCheck;

import lippia.model.api.common.ServiceDetails;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LineCheckResponse {
        private ServiceDetails serviceDetails;
        private String billNumber;
        private String cellularNumber;
        private String stgId;
        private String cluType;
        private String cbtId;
        private String msisdn;
        private String prefix;
        private String rplId;

        @Override
        public String toString() {
                return "LineCheckResponse{" +
                        "serviceDetails=" + serviceDetails +
                        ", billNumber='" + billNumber + '\'' +
                        ", cellularNumber='" + cellularNumber + '\'' +
                        ", stgId='" + stgId + '\'' +
                        ", cluType='" + cluType + '\'' +
                        ", cbtId='" + cbtId + '\'' +
                        ", msisdn='" + msisdn + '\'' +
                        ", prefix='" + prefix + '\'' +
                        ", rplId='" + rplId + '\'' +
                        '}';
        }
}
