package io.ionic.starter;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name= "WallpaperPlugin")
public class WallPaperPlugin extends Plugin {
  @PluginMethod
  public void setWallpaper(PluginCall call) {
    String imageUrl = call.getString("url");
    String type = call.getString("type");
    if (imageUrl == null || type == null) {
      call.reject("Missing parameters: url y type");
      return;
    }
  }
}
