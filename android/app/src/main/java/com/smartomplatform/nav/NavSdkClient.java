package com.smartomplatform.nav;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;

import com.baidu.navisdk.adapter.BNOuterLogUtil;
import com.baidu.navisdk.adapter.BNRoutePlanNode;
import com.baidu.navisdk.adapter.BNaviSettingManager;
import com.baidu.navisdk.adapter.BaiduNaviManager;
import com.facebook.react.bridge.Promise;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by root on 16-9-24.
 */
public class NavSdkClient {

    private String mSDCardPath = null;
    private static final String APP_FOLDER_NAME = "BNSDK";

    public static final String ROUTE_PLAN_NODE = "routePlanNode";
    private Context mContext;

    private static Activity sActivity = null;

    private String authResult = null;
    private String initResult = null;


    public boolean isInitSuc(){
        return null!=initResult&&"suc".equals(initResult)
                &&null!=authResult&&"suc".equals(authResult);
    }

    public void routeplanToNavi(double sLongitude,double sLatitude,String sName,double dLongitude,double dLatitude,String dName,Promise promise) {
        if(null==initResult||!"suc".equals(initResult)){
            Log.e("zdebug", "routeplanToNavi initResult fai:");
            promise.reject("-1","BDSDK init fai");
            tryInitAgain();
            return;
        }
        /*if(null==authResult||!"suc".equals(authResult)){
            Log.e("zdebug", "routeplanToNavi authResult fai:");
            promise.reject("-1","BDSDK auth fai");
            tryInitAgain();
            return;
        }*/
        BNRoutePlanNode sNode = new BNRoutePlanNode(sLongitude, sLatitude, sName, null, BNRoutePlanNode.CoordinateType.BD09LL);
        BNRoutePlanNode eNode = new BNRoutePlanNode(dLongitude, dLatitude, dName, null, BNRoutePlanNode.CoordinateType.BD09LL);
        if (sActivity != null) {
            List<BNRoutePlanNode> list = new ArrayList<BNRoutePlanNode>();
            list.add(sNode);
            list.add(eNode);
            BaiduNaviManager.getInstance().launchNavigator(sActivity, list, 1, true, new DemoRoutePlanListener(sNode, promise));
            Log.e("zdebug", "launchNavigator:");
        }
    }

    public static void regist(Activity activity){
        Log.e("zdebug","regist activity:"+activity);
        sActivity = activity;
    }

    private void tryInitAgain(){
        init(mContext);
    }

    public void init(Context context){
        mContext = context;
        BNOuterLogUtil.setLogSwitcher(true);
        if (initDirs()) {
            initNavi();
        }else{
            Log.e("zdebug","initDirs fai");
            initResult = "fai";
        }
    }

    private boolean initDirs() {
        mSDCardPath = getSdcardDir();
        if (mSDCardPath == null) {
            return false;
        }
        File f = new File(mSDCardPath, APP_FOLDER_NAME);
        if (!f.exists()) {
            try {
                f.mkdir();
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

    private void initNavi() {

        if(null==sActivity){
            Log.e("zdebug","initNavi->null==sActivity");
            initResult = "fai";
            return;
        }

        BaiduNaviManager.getInstance().init(sActivity, mSDCardPath, APP_FOLDER_NAME, new BaiduNaviManager.NaviInitListener() {
            @Override
            public void onAuthResult(int status, String msg) {
                if (0 == status) {
                    authResult = "suc";
                    Log.e("zdebug","onAuthResult->suc:"+msg);
                } else {
                    authResult = "fai";
                    Log.e("zdebug","onAuthResult->fai"+msg);
                }
            }

            public void initSuccess() {
                Log.e("zdebug","initSuccess");
                initResult = "suc";
                initSetting();
                /*routeplanToNavi();
                initSetting();*/
            }

            public void initStart() {
                Log.e("zdebug","initStart");
            }

            public void initFailed() {
                Log.e("zdebug","initFailed");
                initResult = "fai";
            }
        }, null, null, null);
    }

    private String getSdcardDir() {
        if (Environment.getExternalStorageState().equalsIgnoreCase(Environment.MEDIA_MOUNTED)) {
            return Environment.getExternalStorageDirectory().toString();
        }
        return null;
    }

    private void initSetting(){
        BNaviSettingManager.setShowTotalRoadConditionBar(BNaviSettingManager.PreViewRoadCondition.ROAD_CONDITION_BAR_SHOW_ON);
        BNaviSettingManager.setVoiceMode(BNaviSettingManager.VoiceMode.Veteran);
        BNaviSettingManager.setRealRoadCondition(BNaviSettingManager.RealRoadCondition.NAVI_ITS_ON);
    }

    public class DemoRoutePlanListener implements BaiduNaviManager.RoutePlanListener {

        private BNRoutePlanNode mBNRoutePlanNode = null;
        private Promise mPromise;

        public DemoRoutePlanListener(BNRoutePlanNode node,Promise promise) {
            mBNRoutePlanNode = node;
            mPromise = promise;
        }

        @Override
        public void onJumpToNavigator() {
            Log.e("zdebug","onJumpToNavigator");
            Intent intent = new Intent(mContext, NavGuideActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            Bundle bundle = new Bundle();
            bundle.putSerializable(ROUTE_PLAN_NODE, (BNRoutePlanNode) mBNRoutePlanNode);
            intent.putExtras(bundle);
            mContext.startActivity(intent);
            mPromise.resolve("suc");
        }

        @Override
        public void onRoutePlanFailed() {
            Log.e("zdebug","onRoutePlanFailed");
            mPromise.reject("-2","RoutePlanFai");
        }
    }
}
