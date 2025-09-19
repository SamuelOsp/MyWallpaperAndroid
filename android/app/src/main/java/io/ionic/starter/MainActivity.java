package io.ionic.starter;

import android.os.Bundle;
import io.ionic.starter.WallpaperPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);


    registerPlugin(WallpaperPlugin.class);
  }
}
