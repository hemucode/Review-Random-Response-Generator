var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    app.interface.id = '';
    /*  */
    app.contextmenu.create({
      "id": "tab", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in tab",  
      "checked": config.interface.context === "tab"
    }, app.error);
    /*  */
    app.contextmenu.create({
      "id": "win", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in win",  
      "checked": config.interface.context === "win"
    }, app.error);
    /*  */
    app.contextmenu.create({
      "contexts": ["selection"],
      "id": "5star",
      "title": chrome.i18n.getMessage("v_star_rating")
    }, app.error);

    app.contextmenu.create({
      "contexts": ["selection"],
      "id": "4star",
      "title": chrome.i18n.getMessage("iv_star_rating")
    }, app.error);

    app.contextmenu.create({
      "contexts": ["selection"],
      "id": "3star",
      "title": chrome.i18n.getMessage("iii_star_rating")
    }, app.error);

    app.contextmenu.create({
      "contexts": ["selection"],
      "id": "2star",
      "title": chrome.i18n.getMessage("ii_star_rating")
    }, app.error);

    app.contextmenu.create({
      "contexts": ["selection"],
      "id": "1star",
      "title": chrome.i18n.getMessage("i_star_rating")
    }, app.error);

  },
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    },
    "contextmenu":async function (info,tab) {
      reviewerName = info.selectionText || '';
      menu_Id = info.menuItemId;
      console.log(reviewerName)

      rating = 0;
      switch(menu_Id) {
        case "1star":
          rating = 1;
          break;
        case "2star":
          rating = 2;
          break;
        case "3star":
          rating = 3;
          break;
        case "4star":
          rating = 4;
          break;
        case "5star":
          rating = 5;
          break;
        default:
          app.interface.close(config.interface.context);
          config.interface.context = menu_Id;
      }

      if (tab && rating !=0 && rating < 6 && reviewerName != "") {
          var {response_1 , response_2, random_1, random_2, LANGUAGE_CODE} = await generatedResponse(reviewerName, rating, 50, "service");
          if (response_1 == null) return;
          config.clipboard = response_1;
          app.storage.write("response", response_1);
          app.storage.write("languge", LANGUAGE_CODE);
          const url = app.interface.new_path + '?' + menu_Id;
          interface_height = app.interface.height(response_1);
          app.interface.create(url,510,interface_height,null);
        }

    },
    "removed": function (e) {
      if (e === app.interface.id) {
        app.interface.id = '';
      }
    },
    "button": function () {
      const context = config.interface.context;
      const url = app.interface.path + '?' + context;
      /*  */
      if (app.interface.id) {
        if (context === "tab") {
          app.tab.get(app.interface.id, function (tab) {
            if (tab) {
              app.tab.update(app.interface.id, {"active": true});
            } else {
              app.interface.id = '';
              app.tab.open(url);
            }
          });
        }
        /*  */
        if (context === "win") {
          app.window.get(app.interface.id, function (win) {
            if (win) {
              app.window.update(app.interface.id, {"focused": true});
            } else {
              app.interface.id = '';
              app.interface.create();
            }
          });
        }
      } else {
        if (context === "tab") app.tab.open(url);
        if (context === "win") app.interface.create(url);
      }
    }
  }
};

app.button.on.clicked(core.action.button);
app.window.on.removed(core.action.removed);
app.contextmenu.on.clicked(core.action.contextmenu);

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
