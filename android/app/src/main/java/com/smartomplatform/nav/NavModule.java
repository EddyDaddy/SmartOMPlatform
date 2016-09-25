package com.smartomplatform.nav;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by root on 16-9-24.
 */
public class NavModule extends ReactContextBaseJavaModule{

    private ReactApplicationContext context;
    private NavSdkClient navSdkClient;

    public NavModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        navSdkClient = new NavSdkClient();
    }

    @Override
    public String getName() {
        return "NavModule";
    }

    @ReactMethod
    public void initNavSDK(){
        Log.e("zdebug", "initNavSDK->");
        if(!navSdkClient.isInitSuc()){
            navSdkClient.init(context);
        }
    }

    @ReactMethod
    public void jumpToNav(double sLongitude,double sLatitude,String sName,double dLongitude,double dLatitude,String dName,Promise promise){
        Log.e("zdebug", "jumpToNav->args:\n"
                + "sLongitude:" + sLongitude+"\n"
                + "sLatitude:" + sLatitude+"\n"
                + "sName:" + sName+"\n"
                + "dLongitude:" + dLongitude+"\n"
                + "dLatitude:" + dLatitude+"\n"
                + "dName:"+dName);
        navSdkClient.routeplanToNavi(sLongitude,sLatitude,sName,dLongitude,dLatitude,dName,promise);
    }
}
