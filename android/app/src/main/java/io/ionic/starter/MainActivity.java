package io.ionic.starter;

import android.os.Bundle;
import io.ionic.starter.WallPaperPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // registrar el plugin
    registerPlugin(WallPaperPlugin.class);
  }
}
