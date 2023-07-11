const { notarize } = require("electron-notarize");

const appName = "SitStraight";
const appBundleId = "com.sitStraight.electron";
const appPath = "dist/Sit Straight-1.0.1-arm64.dmg";
const appleId = "main@xprtis.com";
const appleIdPassword = "vbbe-zwae-mcaw-ttoe";

async function notarizeApp() {
  console.log("Notarizing the app...");

  try {
    await notarize({
      appBundleId,
      appPath,
      appleId,
      appleIdPassword,
    });

    console.log("App notarized successfully!");
  } catch (error) {
    console.error("App notarization failed:", error);
  }
}

notarizeApp();
