package app.letrin.learning;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(LetrinBillingPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
