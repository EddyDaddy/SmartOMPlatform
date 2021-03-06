package com.smartomplatform;

import android.app.Application;

import com.facebook.react.ReactApplication;

import fr.bamlab.rnimageresizer.ImageResizerPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.kh.tencentxg.TencentXGPackage;
import com.smartomplatform.CommonUtils.CommonPackage;
import com.smartomplatform.nav.NavPackage;
import com.tencent.bugly.Bugly;

import org.lovebing.reactnative.baidumap.BaiduMapPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication
{

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this)
    {
        @Override
        public boolean getUseDeveloperSupport()
        {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages()
        {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new ImageResizerPackage(),
                    new ImagePickerPackage(),
                    new BaiduMapPackage(getApplicationContext()),
                    new TencentXGPackage(),
                    new NavPackage(),
                    new CommonPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost()
    {
        return mReactNativeHost;
    }

    @Override
    public void onCreate()
    {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        Bugly.init(getApplicationContext(), "e532314018", BuildConfig.DEBUG);
    }
}
