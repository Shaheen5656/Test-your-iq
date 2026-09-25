package com.mindspark.iq;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private InterstitialAd interstitialAd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        MobileAds.initialize(this, initializationStatus -> {
        });

        AdView adView = findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);

        loadInterstitial();

        webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setSupportZoom(false);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request != null && request.getUrl() != null ? request.getUrl().toString() : null;
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    openExternalUrl(url);
                    return true;
                }
                return false;
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    openExternalUrl(url);
                    return true;
                }
                return false;
            }
        });
        webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");

        webView.loadUrl("file:///android_asset/index.html");
    }

    private void openExternalUrl(String url) {
        if (url == null || url.trim().isEmpty()) return;
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
    }

    private void loadInterstitial() {
        InterstitialAd.load(
                this,
                "ca-app-pub-8009614657292071/7793580678",
                new AdRequest.Builder().build(),
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(InterstitialAd ad) {
                        interstitialAd = ad;
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        interstitialAd = null;
                    }
                }
        );
    }

    private class AndroidBridge {
        @JavascriptInterface
        public void showInterstitial() {
            runOnUiThread(() -> {
                if (interstitialAd != null) {
                    interstitialAd.show(MainActivity.this);
                    interstitialAd = null;
                    loadInterstitial();
                } else {
                    loadInterstitial();
                }
            });
        }

        @JavascriptInterface
        public void openExternalLink(String url) {
            runOnUiThread(() -> openExternalUrl(url));
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
