import com.crowdar.bdd.cukes.TestNGSecuencialRunner;
import lippia.utils.Log;
import lippia.utils.managerFile.LeerFichero;
import org.testng.annotations.AfterClass;

public class RunTest extends TestNGSecuencialRunner {
    @AfterClass
    public static void afterAll(){
        Log.logDeSalida();
        String f = LeerFichero.leerFichero("LogDeSalida.txt");
        System.out.println(f);
    }
}
