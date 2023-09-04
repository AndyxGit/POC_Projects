package lippia.model.bdModel.dataConsumption.bd;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RatingGroup {


    private String RATING_GROUP;

    private String SER_DESCRIPTION;

    @Override
    public String toString() {
        return "RatingGroup{" +
                "RATING_GROUP='" + RATING_GROUP + '\'' +
                ", SER_DESCRIPTION='" + SER_DESCRIPTION + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingGroup that = (RatingGroup) o;
        return Objects.equals(RATING_GROUP, that.RATING_GROUP) && Objects.equals(SER_DESCRIPTION, that.SER_DESCRIPTION);
    }

    @Override
    public int hashCode() {
        return Objects.hash(RATING_GROUP, SER_DESCRIPTION);
    }
}
