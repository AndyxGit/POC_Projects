package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Monto {
    private String label;
    private String monto;

    public Monto(String label, String monto) {
        this.label = label;
        this.monto = monto;
    }

    @Override
    public String toString() {
        return "Monto{" +
                "label='" + label + '\'' +
                ", monto='" + monto + '\'' +
                '}';
    }
}
