package com.smartomplatform.CommonUtils;

import android.content.Context;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by demon on 2016/11/22.
 */
public class CommonModule extends ReactContextBaseJavaModule
{
    private ReactApplicationContext context;
    public CommonModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName()
    {
        return "CommonModule";
    }

    @ReactMethod
    public void getIMEI(Callback resultBack){
        TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        String IMEI = tm.getDeviceId();
        resultBack.invoke(IMEI);
    }
}
