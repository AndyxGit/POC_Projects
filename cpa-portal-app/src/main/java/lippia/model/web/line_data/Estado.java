package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Estado {
    private String label;
    private String valor;

    public Estado(String label, String valor) {
        this.label = label;
        this.valor = valor;
    }

    @Override
    public String toString() {
        return "Estado{" +
                "label='" + label + '\'' +
                ", valor='" + valor + '\'' +
                '}';
    }
}
