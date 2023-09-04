package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Estados {
    private String label;
    private Estado actual;
    private Estado anterior;
    private Estado cambioDeEstado;
    private Estado delServicio;
    private Estado plan;
    private Estado promoPlus;
    private Estado ultimoUso;

    public Estados(String label, Estado actual, Estado anterior, Estado cambioDeEstado, Estado delServicio, Estado plan, Estado promoPlus, Estado ultimoUso) {
        this.label = label;
        this.actual = actual;
        this.anterior = anterior;
        this.cambioDeEstado = cambioDeEstado;
        this.delServicio = delServicio;
        this.plan = plan;
        this.promoPlus = promoPlus;
        this.ultimoUso = ultimoUso;
    }

    @Override
    public String toString() {
        return "Estados{" +
                "label='" + label + '\'' +
                ", actual=" + actual +
                ", anterior=" + anterior +
                ", cambioDeEstado=" + cambioDeEstado +
                ", delServicio=" + delServicio +
                ", plan=" + plan +
                ", promoPlus=" + promoPlus +
                ", ultimoUso=" + ultimoUso +
                '}';
    }
}
