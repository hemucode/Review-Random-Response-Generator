/**
 * When the app is installed, the date the app was installed and other 
 * information will be stored in the browser.
 * rights only @codehemu.
 */

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      chrome.storage.sync.set({
        installDate: Date.now(),
        installVersion: chrome.runtime.getManifest().version
      });
      chrome.tabs.create({ url: chrome.runtime.getManifest().homepage_url });

    case chrome.runtime.OnInstalledReason.UPDATE:
      chrome.storage.sync.set({
        updateDate: Date.now(),
      });
  }
});

/**
 * If the user uninstalls the app then he will have a new url or windows open.
 * rights only @codehemu.
 */

var uninstallUrl = `${chrome.runtime.getManifest().homepage_url}#uninstall`;
chrome.runtime.setUninstallURL(uninstallUrl);
