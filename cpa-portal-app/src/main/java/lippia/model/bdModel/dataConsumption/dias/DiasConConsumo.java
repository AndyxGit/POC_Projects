package lippia.model.bdModel.dataConsumption.dias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiasConConsumo {

    private List<LocalDate> fechasConConsumo;

    public static DiasConConsumo diasConConsumo = new DiasConConsumo();

    @Override
    public String toString() {
        return "DiasConConsumo{" +
                "fechasConConsumo=" + fechasConConsumo +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiasConConsumo that = (DiasConConsumo) o;
        return Objects.equals(fechasConConsumo, that.fechasConConsumo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fechasConConsumo);
    }
}
