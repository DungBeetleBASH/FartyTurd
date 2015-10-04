package com.DungBeetleBASH.OrientationLock;

import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.pm.ActivityInfo;

public class OrientationLock extends CordovaPlugin {

  public boolean execute(String action, JSONArray args) throws JSONException {
    if (action.equals("setOrientation")) {
      this.setOrientation(args.getString(0));
      return true;
    }
    return false;
  }

  private void setOrientation(String orientation) {
    Activity activity = cordova.getActivity();
    if (orientation.equalsIgnoreCase("landscape")) {
      activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    } else if (orientation.equalsIgnoreCase("portrait")) {
      activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    } else {
      activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    } 
  }

}