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
public class DiaDesde {

    private LocalDate diaInicio;

    public static DiaDesde diaDesde = new DiaDesde();

    @Override
    public String toString() {
        return "DiaDesde{" +
                "diaInicio=" + diaInicio +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiaDesde diaDesde = (DiaDesde) o;
        return Objects.equals(diaInicio, diaDesde.diaInicio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(diaInicio);
    }
}
