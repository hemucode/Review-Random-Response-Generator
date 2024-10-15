const translate = () => {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll("[data-message]");
    for (const element of elements) {
      const key = element.dataset.message;
      const message = chrome.i18n.getMessage(key);
      if (message) {
        element.textContent = message;
      } else {
        console.error("Missing chrome.i18n message:", key);
      }
    }
    resolve();
  });
}

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

domReady(() => {
  info()
  translate()
  // ratingScript()
})

const ratingScript = () =>{
    let bodyElement = document.body || document.getElementsByTagName("body")[0];
    if (!bodyElement) return void setTimeout((() => {
      ratingScript();
    }), 100);

    if (!document.getElementById("rating-script")) {
      let scriptElement = document.createElement("script");
      scriptElement.id = "rating-script",
      scriptElement.src = `json/${chrome.i18n.getMessage("rating_js_file_name").toLowerCase()}`,
      bodyElement.appendChild(scriptElement);
    }  
};

