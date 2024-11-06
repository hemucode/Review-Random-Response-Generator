var app = {};

app.error = function () {
  return browser.runtime.lastError;
};

app.button = {
  "on": {
    "clicked": function (callback) {
      browser.browserAction.onClicked.addListener(function (e) {
        app.storage.load(function () {
          callback(e);
        }); 
      });
    }
  }
};

app.contextmenu = {
  "create": function (options, callback) {
    if (browser.contextMenus) {
      browser.contextMenus.create(options, function (e) {
        if (callback) callback(e);
      });
    }
  },
  "on": {
    "clicked": function (callback) {
      if (browser.contextMenus) {
        browser.contextMenus.onClicked.addListener(function (info, tab) {
          app.storage.load(function () {
            callback(info, tab);
          });
        });
      }
    }
  }
};

app.storage = {
  "local": {},
  "read": function (id) {
    return app.storage.local[id];
  },
  "update": function (callback) {
    if (app.session) app.session.load();
    /*  */
    browser.storage.local.get(null, function (e) {
      app.storage.local = e;
      if (callback) {
        callback("update");
      }
    });
  },
  "write": function (id, data, callback) {
    let tmp = {};
    tmp[id] = data;
    app.storage.local[id] = data;
    /*  */
    browser.storage.local.set(tmp, function (e) {
      if (callback) {
        callback(e);
      }
    });
  },
  "load": function (callback) {
    const keys = Object.keys(app.storage.local);
    if (keys && keys.length) {
      if (callback) {
        callback("cache");
      }
    } else {
      app.storage.update(function () {
        if (callback) callback("disk");
      });
    }
  } 
};

app.window = {
  set id (e) {
    app.storage.write("window.id", e);
  },
  get id () {
    return app.storage.read("window.id") !== undefined ? app.storage.read("window.id") : '';
  },
  "create": function (options, callback) {
    browser.windows.create(options, function (e) {
      if (callback) callback(e);
    });
  },
  "get": function (windowId, callback) {
    browser.windows.get(windowId, function (e) {
      if (callback) callback(e);
    });
  },
  "update": function (windowId, options, callback) {
    browser.windows.update(windowId, options, function (e) {
      if (callback) callback(e);
    });
  },
  "remove": function (windowId, callback) {
    browser.windows.remove(windowId, function (e) {
      if (callback) callback(e);
    });
  },
  "query": {
    "current": function (callback) {
      browser.windows.getCurrent(callback);
    }
  },
  "on": {
    "removed": function (callback) {
      browser.windows.onRemoved.addListener(function (e) {
        app.storage.load(function () {
          callback(e);
        }); 
      });
    }
  }
};


app.on = {
  "management": function (callback) {
    browser.management.getSelf(callback);
  },
  "uninstalled": function (url) {
    browser.runtime.setUninstallURL(url, function () {});
  },
  "installed": function (callback) {
    browser.runtime.onInstalled.addListener(function (e) {
      app.storage.load(function () {
        callback(e);
      });
    });
  },
  "startup": function (callback) {
    browser.runtime.onStartup.addListener(function (e) {
      app.storage.load(function () {
        callback(e);
      });
    });
  },
  "connect": function (callback) {
    browser.runtime.onConnect.addListener(function (e) {
      app.storage.load(function () {
        if (callback) callback(e);
      });
    });
  },
  "storage": function (callback) {
    browser.storage.onChanged.addListener(function (changes, namespace) {
      app.storage.update(function () {
        if (callback) {
          callback(changes, namespace);
        }
      });
    });
  },
  "message": function (callback) {
    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      app.storage.load(function () {
        callback(request, sender, sendResponse);
      });
      /*  */
      return true;
    });
  }
};

app.tab = {
  "get": function (tabId, callback) {
    browser.tabs.get(tabId, function (e) {
      if (callback) callback(e);
    });
  },
  "remove": function (tabId, callback) {
    browser.tabs.remove(tabId, function (e) {
      if (callback) callback(e);
    });
  },
  "query": {
    "index": function (callback) {
      browser.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
        let tmp = browser.runtime.lastError;
        if (tabs && tabs.length) {
          callback(tabs[0].index);
        } else callback(undefined);
      });
    }
  },
  "update": function (tabId, options, callback) {
    if (tabId) {
      browser.tabs.update(tabId, options, function (e) {
        if (callback) callback(e);
      });
    } else {
      browser.tabs.update(options, function (e) {
        if (callback) callback(e);
      });
    }
  },
  "open": function (url, index, active, callback) {
    let properties = {
      "url": url, 
      "active": active !== undefined ? active : true
    };
    /*  */
    if (index !== undefined) {
      if (typeof index === "number") {
        properties.index = index + 1;
      }
    }
    /*  */
    browser.tabs.create(properties, function (tab) {
      if (callback) callback(tab);
    }); 
  }
};

app.interface = {
  "port": null,
  "message": {},
  "path": browser.runtime.getURL("data/interface/index.html"),
  "new_path": browser.runtime.getURL("data/interface/copy/index.html"),
  set id (e) {
    app.storage.write("interface.id", e);
  },
  get id () {
    return app.storage.read("interface.id") !== undefined ? app.storage.read("interface.id") : '';
  },
  "receive": function (id, callback) {
    app.interface.message[id] = callback;
  },
  "send": function (id, data) {
    if (id) {
      browser.runtime.sendMessage({"data": data, "method": id, "path": "background-to-interface"});
    }
  },
  "post": function (id, data) {
    if (id) {
      if (app.interface.port) {
        app.interface.port.postMessage({"data": data, "method": id, "path": "background-to-interface"});
      }
    }
  },
  "close": function (context) {
    if (app.interface.id) {
      try {
        if (context === "popup") {/*  */}
        if (context === "tab") app.tab.remove(app.interface.id);
        if (context === "win") app.window.remove(app.interface.id);
      } catch (e) {}
    }
  },
  "height": function (response){
    countWords = response.trim().split(/\s+/).length; 
    return countWords < 23 ? 380 : countWords > 30 ? 420 : 400;
  },
  "create": function (url, width, height, callback) {
    app.window.query.current(function (win) {
      app.window.id = win.id;
      url = url ? url : app.interface.path;
      /*  */
      width = width ? width : config.interface.size.width;
      height = height ? height : config.interface.size.height;
      const top = config.interface.size.top || (win.top + Math.round((win.height - height) / 2));
      const left = config.interface.size.left || (win.left + Math.round((win.width - width) / 2));
      /*  */
      app.window.create({
        "url": url,
        "top": top,
        "left": left,
        "width": width,
        "type": "popup",
        "height": height
      }, function (e) {
        app.interface.id = e.id;
        if (callback) callback(true);
      });
    });
  }
};
