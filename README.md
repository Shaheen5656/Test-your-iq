# MindSpark IQ Test

This repository now includes both the web app and a native Android wrapper project based on a WebView.

## Android project structure
- `app/` — Android app module
- `settings.gradle` — project configuration
- `build.gradle` — root Gradle plugin setup
- `app/src/main/...` — Android app source and assets

## AdMob IDs included
- App ID: `ca-app-pub-8009614657292071~1040470068`
- Banner: `ca-app-pub-8009614657292071/7765660515`
- Interstitial: `ca-app-pub-8009614657292071/7793580678`

## How to open in Android Studio
1. Open Android Studio
2. Choose "Open an existing project"
3. Select this repository folder
4. Let Gradle sync complete
5. Build and run on an emulator or Android device

## Build note
This app uses a WebView to load the game from local assets, while the banner and interstitial ads are configured with AdMob in the native Android layer.

## Publish to Google Play
Before publishing, create a signed release build and upload the `.aab` file to Google Play Console.
