package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Fechas {
    private Fecha creacion;
    private Fecha cancelacion;
    private Fecha ultimaRecarga;
    private Fecha caducidad;
    private Fecha suspension;

    public Fechas(Fecha creacion, Fecha cancelacion, Fecha ultimaRecarga, Fecha caducidad, Fecha suspension) {
        this.creacion = creacion;
        this.cancelacion = cancelacion;
        this.ultimaRecarga = ultimaRecarga;
        this.caducidad = caducidad;
        this.suspension = suspension;
    }

    @Override
    public String toString() {
        return "Fechas{" +
                "creacion=" + creacion +
                ", cancelacion=" + cancelacion +
                ", ultimaRecarga=" + ultimaRecarga +
                ", caducidad=" + caducidad +
                ", suspension=" + suspension +
                '}';
    }
}
