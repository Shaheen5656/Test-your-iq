window.ADMOB_CONFIG = {
  appId: 'ca-app-pub-8009614657292071~1040470068',
  bannerId: 'ca-app-pub-8009614657292071/7765660515',
  interstitialId: 'ca-app-pub-8009614657292071/7793580678'
};

window.showMindSparkInterstitial = function () {
  if (window.AndroidBridge && typeof window.AndroidBridge.showInterstitial === 'function') {
    window.AndroidBridge.showInterstitial();
    return;
  }

  if (window.AdMob && typeof window.AdMob.showInterstitial === 'function') {
    window.AdMob.showInterstitial();
  }
};
