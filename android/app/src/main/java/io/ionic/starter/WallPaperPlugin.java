package io.ionic.starter;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Rect;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@CapacitorPlugin(name = "WallpaperPlugin")
public class WallPaperPlugin extends Plugin {


  private final ExecutorService executor = Executors.newSingleThreadExecutor();
  private static final int WALLPAPER_TYPE_HOME = WallpaperManager.FLAG_SYSTEM;
  private static final int WALLPAPER_TYPE_LOCK = WallpaperManager.FLAG_LOCK;
  private static final int WALLPAPER_TYPE_BOTH = WALLPAPER_TYPE_HOME | WALLPAPER_TYPE_LOCK;

  @PluginMethod
  public void setWallpaper(PluginCall call) {
    String imageUrl = call.getString("imageUrl");
    int wallpaperType = call.getInt("type", WALLPAPER_TYPE_HOME);

    if (imageUrl == null || imageUrl.isEmpty()) {
      call.reject("Must provide an imageUrl");
      return;
    }

    executor.execute(() -> {
      try {
        URL url = new URL(imageUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoInput(true);
        connection.connect();
        InputStream input = connection.getInputStream();
        Bitmap myBitmap = BitmapFactory.decodeStream(input);

        if (myBitmap == null) {
          call.reject("Failed to decode image from URL");
          return;
        }

        WallpaperManager myWallpaperManager = WallpaperManager.getInstance(getContext());


        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
          myWallpaperManager.setBitmap(myBitmap, null, true, wallpaperType);
        } else {

          if (wallpaperType == WALLPAPER_TYPE_LOCK || wallpaperType == WALLPAPER_TYPE_BOTH) {
            call.reject("Setting lock screen wallpaper is not supported on this Android version (< Android 7.0).");
            return;
          }
          myWallpaperManager.setBitmap(myBitmap);
        }

        JSObject ret = new JSObject();
        ret.put("success", true);
        ret.put("message", "Wallpaper set successfully for type: " + wallpaperType);
        call.resolve(ret);

      } catch (IOException e) {
        e.printStackTrace();
        call.reject("Error setting wallpaper: " + e.getLocalizedMessage());
      } catch (Exception e) {
        e.printStackTrace();
        call.reject("An unexpected error occurred: " + e.getLocalizedMessage());
      }
    });
  }
}
