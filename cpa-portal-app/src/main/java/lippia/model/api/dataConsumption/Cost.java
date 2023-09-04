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
public class Cost {

    private String currency;
    private double value;

    @Override
    public String toString() {
        return "Cost{" +
                "currency='" + currency + '\'' +
                ", value=" + value +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cost cost = (Cost) o;
        return Double.compare(cost.value, value) == 0 && Objects.equals(currency, cost.currency);
    }

    @Override
    public int hashCode() {
        return Objects.hash(currency, value);
    }
}
