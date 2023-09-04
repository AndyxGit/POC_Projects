package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Abono extends Saldo {
    private Monto disponible;
    private Monto consumo;

    public Abono(Monto monto, String vencimiento, Monto disponible, Monto consumo) {
        super(monto, vencimiento);
        this.disponible = disponible;
        this.consumo = consumo;
    }

    @Override
    public String toString() {
        return "Abono{" +
                "disponible=" + disponible +
                ", consumo=" + consumo +
                '}';
    }
}
