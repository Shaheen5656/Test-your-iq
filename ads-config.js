// AdMob IDs supplied for the native Android/iOS wrapper.
// AdMob does not render directly inside a normal browser website.
window.ADMOB_CONFIG={appId:'ca-app-pub-8009614657292071~1040470068',bannerId:'ca-app-pub-8009614657292071/7765660515',interstitialId:'ca-app-pub-8009614657292071/7793580678'};
// Capacitor/Cordova bridge hook: native wrapper can call this after loading the app.
window.showMindSparkInterstitial=()=>window.AdMob?.showInterstitial?.();
