package lippia.model.api.dataConsumption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CdrDate {

    private String dateTime;
    private String format = "yyyy-MM-dd HH:mm:ss.SSS Z";

    public static CdrDate cdrDate = new CdrDate();

    public CdrDate(String dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public String toString() {
        return "CdrDate{" +
                "dateTime='" + dateTime + '\'' +
                ", format='" + format + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CdrDate cdrDate = (CdrDate) o;
        return Objects.equals(dateTime, cdrDate.dateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dateTime);
    }
}
