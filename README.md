# MindSpark IQ Test

Game-style IQ level test with 10 timed questions and responsive UI.

## AdMob setup
The supplied IDs are stored in `ads-config.js`:

- App ID: `ca-app-pub-8009614657292071~1040470068`
- Banner ad unit: `ca-app-pub-8009614657292071/7765660515`
- Interstitial ad unit: `ca-app-pub-8009614657292071/7793580678`

AdMob is a **native mobile SDK**, so it cannot display inside a plain browser HTML page. To show the ads in an Android/iOS app, wrap this web app with Capacitor or Cordova and configure the native AdMob plugin with the IDs above. The app calls `window.showMindSparkInterstitial()` after the result screen; a native bridge can connect that function to the interstitial SDK.

For testing, use Google test ad units until the app is published and your production units are approved.
