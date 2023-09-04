package lippia.model.bdModel.dataConsumption.dias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiaHasta {

    private LocalDate diaFin;

    public static DiaHasta diaHasta = new DiaHasta();

    @Override
    public String toString() {
        return "DiaDesde{" +
                "diaInicio=" + diaFin +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiaHasta diaHasta = (DiaHasta) o;
        return Objects.equals(diaFin, diaHasta.diaFin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(diaFin);
    }
}
