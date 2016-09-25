package com.smartomplatform;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.smartomplatform.nav.NavSdkClient;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SmartOMPlatform";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NavSdkClient.regist(MainActivity.this);
    }
}
