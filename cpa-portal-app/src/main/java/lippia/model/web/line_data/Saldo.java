package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Saldo {
    private Monto monto;
    private String vencimiento;

    public Saldo(Monto monto, String vencimiento) {
        this.monto = monto;
        this.vencimiento = vencimiento;
    }

    @Override
    public String toString() {
        return "Saldo{" +
                "monto=" + monto +
                ", vencimiento='" + vencimiento + '\'' +
                '}';
    }
}
