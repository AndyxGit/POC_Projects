package lippia.model.web.line_data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LineData {
    private String label;
    private Saldo saldoTotalDisponible;
    private Abono abono;
    private Saldo saldoRecarga;
    private Saldo saldoPromocional;
    private Saldo saldoCongelado;
    private Estados estados;
    private Fechas fechas;

    @Override
    public String toString() {
        return "DatosDeLaLinea{" +
                "label='" + label + '\'' +
                ", saldoTotalDisponible=" + saldoTotalDisponible +
                ", abono=" + abono +
                ", saldoRecarga=" + saldoRecarga +
                ", saldoPromocional=" + saldoPromocional +
                ", saldoCongelado=" + saldoCongelado +
                ", estados=" + estados +
                ", fechas=" + fechas +
                '}';
    }
}
