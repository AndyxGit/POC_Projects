package lippia.model.bdModel.dataConsumption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Roaming {

    private Boolean roam;

    public static Roaming roaming = new Roaming();



    @Override
    public String toString() {
        return "Roaming{" +
                "roam='" + roam + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Roaming roaming = (Roaming) o;
        return Objects.equals(roam, roaming.roam);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roam);
    }
}
