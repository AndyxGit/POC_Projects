package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Fecha {
    private String label;
    private String fecha;

    public Fecha(String label, String fecha) {
        this.label = label;
        this.fecha = fecha;
    }

    @Override
    public String toString() {
        return "Fecha{" +
                "label='" + label + '\'' +
                ", fecha='" + fecha + '\'' +
                '}';
    }
}
