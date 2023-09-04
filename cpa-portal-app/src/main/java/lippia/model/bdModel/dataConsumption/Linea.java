package lippia.model.bdModel.dataConsumption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Linea {

    private String numero;

    public static Linea linea = new Linea();

    @Override
    public String toString() {
        return "Linea{" +
                "numero='" + numero + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Linea linea = (Linea) o;
        return Objects.equals(numero, linea.numero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numero);
    }
}
