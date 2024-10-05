// /**
//  * When the app is installed, the date the app was installed and other 
//  * information will be stored in the browser.
//  * rights only @codehemu.
//  */

// chrome.contextMenus.create({
//     title: "😍 5 Star Generated Response Copy",
//     contexts: ["selection"],
//     id: "5star"
// });

// chrome.contextMenus.create({
//     title: "🥰 4 Star Generated Response Copy",
//     contexts: ["selection"],
//     id: "4star"
// });

// chrome.contextMenus.create({
//     title: "😢 3 Star Generated Response Copy",
//     contexts: ["selection"],
//     id: "3star"
// });

// chrome.contextMenus.create({
//     title: "😭 2 Star Generated Response Copy",
//     contexts: ["selection"],
//     id: "2star"
// });

// chrome.contextMenus.create({
//     title: "😑 1 Star Generated Response Copy",
//     contexts: ["selection"],
//     id: "1star"
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
// 	g_response = null;
// 	searchstring = info.selectionText;

//     if (info.menuItemId === "5star") {

//     	g_response ="hemata";
//     }
//     if (g_response == null) return;
    
//     navigator.clipboard.writeText(g_response);
// });

// // function copyToClipboard(text) {
// //     var dummy = document.createElement("textarea");
// //     document.body.appendChild(dummy);
// //     dummy.value = text;
// //     dummy.select();
// //     document.execCommand("copy");
// //     document.body.removeChild(dummy);
// // }


