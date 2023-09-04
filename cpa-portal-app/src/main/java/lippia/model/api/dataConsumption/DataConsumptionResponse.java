package lippia.model.api.dataConsumption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataConsumptionResponse {

    public static DataConsumptionResponse dataConsumptionResponse = new DataConsumptionResponse();

    private String resultCode;
    private String resultMessage;
    private List<DataConsumptionDetailsList> dataConsumptionDetailsList;


    @Override
    public String toString() {
        return "RespuestaAPI{" +
                "resultCode='" + resultCode + '\'' +
                ", resultMessage='" + resultMessage + '\'' +
                ", dataConsumptionDetailsList=" + dataConsumptionDetailsList +

                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataConsumptionResponse that = (DataConsumptionResponse) o;
        return Objects.equals(resultCode, that.resultCode) && Objects.equals(resultMessage, that.resultMessage) && Objects.equals(dataConsumptionDetailsList, that.dataConsumptionDetailsList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(resultCode, resultMessage, dataConsumptionDetailsList);
    }
}
