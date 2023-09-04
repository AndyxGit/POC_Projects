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
public class Volume {

    public static Volume volume = new Volume();

    private String unit;
    private double value;

    @Override
    public String toString() {
        return "Volume{" +
                "unit='" + unit + '\'' +
                ", value=" + value +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Volume volume = (Volume) o;
        return Double.compare(volume.value, value) == 0 && Objects.equals(unit, volume.unit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(unit, value);
    }
}
