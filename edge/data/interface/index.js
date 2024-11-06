var reviewCode, 
    reviewCode2,
    responsePromise,
    full_response,
    full_response1,
    anime,
    anime1,
    languge,
    oneTime;

const $ = (element)=>{
 return document.querySelector(element);
}

const details = {
  "WEBSTORE": chrome.runtime == undefined ? "" : `https://microsoftedge.microsoft.com/addons/detail/${chrome.runtime.id}`,
  "HOMEPAGE": chrome.runtime == undefined ? "https://www.downloadhub.cloud/2024/10/RandomReviewResponseGenerator.html" : chrome.runtime.getManifest().homepage_url,
  "SITE": "https://www.downloadhub.cloud/"
} 


const linkAdd = () =>{
  $(".extensionurl") ? $(".extensionurl").href = details.WEBSTORE : null;
  $("#extensionurl1") ? $("#extensionurl1").href = details.HOMEPAGE : null;
  $(".complex-string") ? $(".complex-string").href = details.SITE : null;
}


const settingsload = async() =>{
  if (chrome.storage != undefined) {
    responsePromise = new Promise(function(resolve, reject){
        chrome.storage.local.get({
          "generated": 0,
          "languges": chrome.i18n == null ? "en" : chrome.i18n.getMessage("language_code"),
          "top_color": "#313856",
          "buttom_color": "#b2d27d",
          "box1": true,
          "box2": false
        }, function(options){
            resolve(options);
        })
    });

    responseOptions = await responsePromise;
    generated = responseOptions.generated;
    languges = responseOptions.languges;
    top_color = responseOptions.top_color;
    buttom_color = responseOptions.buttom_color;
    box1 = responseOptions.box1;
    box2 = responseOptions.box2;
  }else{
    generated = localStorage.generated == null ? 0 : typeof Number(localStorage.generated) ==='number' ? localStorage.generated : 0;
    languges = localStorage.languges == null ? "en" : localStorage.languges;
    top_color = localStorage.top_color == null ? "#313856" : localStorage.top_color;
    buttom_color = localStorage.buttom_color == null ? "#b2d27d" : localStorage.buttom_color;
    box1 = localStorage.box1 == null ? true : localStorage.box1 ==='true'?true:false;
    box2 = localStorage.box1 == null ? false : localStorage.box2 ==='true'?true:false;
  }

  $("#box1").checked = box1;
  $("#box2").checked = box2;

  $("#color1").value = top_color;
  $("#color2").value = buttom_color;

  $("#label0").innerText = chrome.i18n == null ? "Generated: " + generated : 
  chrome.i18n.getMessage("generated")+": "+generated;

  $("#language").value = languges;

  let like_no = 0;
  let dislike_no = 0;

  $("#label1").innerText = chrome.i18n == null ? "Total Likes: " + like_no : 
      chrome.i18n.getMessage("total_likes")+": "+like_no;

  $("#label2").innerText = chrome.i18n == null ? "Total DisLikes: " + dislike_no : 
      chrome.i18n.getMessage("total_dislikes")+": "+dislike_no;


  for (let i = 0; i < localStorage.length; i++) {
    key_value = localStorage.key(i);
    if (key_value != null) {
      lastChar = key_value.charAt(key_value.length - 1);
      localStorage.getItem(key_value) == "true" ? lastChar == null ? null :
      lastChar == "L" ? like_no++ : lastChar == "D" ? dislike_no++ :null :null;

      $("#label1").innerText = chrome.i18n == null ? "Total Likes: " + like_no : 
          chrome.i18n.getMessage("total_likes")+": "+like_no;

      $("#label2").innerText = chrome.i18n == null ? "Total DisLikes: " + dislike_no : 
          chrome.i18n.getMessage("total_dislikes")+": "+dislike_no;  
    }  
  }

}

const styleSheets = async() => {
    let headElement = document.head || document.getElementsByTagName("head")[0];
    let str = chrome.i18n == null ? "Generate Response" : chrome.i18n.getMessage("generate_response");

    if (!headElement) return void setTimeout((() => {
      styleSheets();
    }), 100);
    if (chrome.storage != undefined) {
      responsePromise = new Promise((resolve, reject)=>{
          chrome.storage.local.get({
            "top_color": "#313856",
            "buttom_color": "#b2d27d"
          }, (options)=>{
              resolve(options);
          })
      });

      responseOptions = await responsePromise;
      top_color = responseOptions.top_color;
      buttom_color = responseOptions.buttom_color;
    }else{
      top_color = localStorage.top_color == null ? "#313856" : localStorage.top_color;
      buttom_color = localStorage.buttom_color == null ? "#b2d27d" : localStorage.buttom_color;
    }

    const newCssContent = `
    body {
      --codehemu-color1: ${top_color}!important;
      --codehemu-color2: ${buttom_color}!important;
    }
    .genbtn::after {
      content: "${str}";
      position: absolute;
      display: grid;
      place-items: center;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      color: white;
      font-size: 1rem;
      z-index: 2;
    }`;

    if (!$("#myStyle")) {
      let styleElement = document.createElement("style");
      styleElement.id = "myStyle",
      styleElement.appendChild(document.createTextNode(newCssContent)), 
      headElement.appendChild(styleElement);
    }else{
      $("#myStyle").appendChild(document.createTextNode(newCssContent));
    }

  
}  



const info = async() =>{
  if (chrome.storage != undefined) {
    responsePromise = new Promise((resolve, reject) =>{
        chrome.storage.local.get({
          "additional": "",
        }, (options)=>{
            resolve(options);
        })
    });
    responseOptions = await responsePromise;
    additional = responseOptions.additional;
  }else{
    additional = localStorage.additional == null ? '' : localStorage.additional;
  }
  $("#review-text").value = additional;


  $("#save").addEventListener("click", async() => {
     $("#review-text").style.border = "3px solid #ff0000";
     setTimeout(()=>{
        $("#review-text").style.border = "1px solid #ccc";
     },2000);
     additional = $("#review-text").value;
     chrome.storage != undefined ? await chrome.storage.local.set({ additional }) : null;
     localStorage.additional = additional;
     alert("Additional Response Save!");
  });

  $("#setting").addEventListener("click", () => {
    settingsload();
    $("#codehemu-section-4") ? 
    $("#codehemu-section-4").style.display = $("#codehemu-section-4").style.display == "block" ? "none" : "block" : null;
  });

  window.addEventListener('scroll', ()=> {
       $("#codehemu-section-4") ? $("#codehemu-section-4").style.display = "none" : null;
  });

  $("#label8").addEventListener("click", () => {
    openTab(details.HOMEPAGE);
  });
  $("#label9").addEventListener("click", () => {
    openTab(details.HOMEPAGE+"#uninstall");
  });

  $("#review-text").placeholder = chrome.i18n == null ? 
  "Additional response for the Review Response[contact us/ product or service information]":
  chrome.i18n.getMessage("additional_response_place");

  $("#submit-review").addEventListener("click", () => {
    generatedBtn($("#reviewer-name"), $("#industry-list"));
  });

  $("#refreshPageButton").addEventListener("click", () => {
    generatedBtn($("#reviewer-name"), $("#industry-list"));
  });

  $("#like-button").addEventListener("click", () => {
    storageLikeDislike(reviewCode, $("#like-button") ,$("#dislike-button"));
  });

  $("#like-button2").addEventListener("click", () => {
    storageLikeDislike(reviewCode2, $("#like-button2") ,$("#dislike-button2"));
  });

  $("#dislike-button").addEventListener("click", () => {
    storageLikeDislike(reviewCode, $("#dislike-button"), $("#like-button"));
  });

  $("#dislike-button2").addEventListener("click", () => {
    storageLikeDislike(reviewCode2,$("#dislike-button2"), $("#like-button2"));
  });


  $("#box1").addEventListener("change", async (event) => {
    const box1 = event.currentTarget.checked;
    chrome.storage != undefined ? await chrome.storage.local.set({ box1 }) : null;
    localStorage.box1 = box1;
  });

  $("#box2").addEventListener("change", async (event) => {
    const box2 = event.currentTarget.checked;
    chrome.storage != undefined ? await chrome.storage.local.set({ box2 }) : null;
    localStorage.box2 = box2;
  });

  $("#color1").addEventListener("change", async (event) => {
    const top_color = event.currentTarget.value;
    localStorage.top_color = top_color;
    chrome.storage != undefined ? await chrome.storage.local.set({ top_color }) : null;
    $("#color1").value = top_color;
    styleSheets();
  });

  $("#color2").addEventListener("change", async (event) => {
    const buttom_color = event.currentTarget.value;
    chrome.storage != undefined ? await chrome.storage.local.set({ buttom_color }) : null;
    localStorage.buttom_color = buttom_color;
    $("#color2").value = buttom_color;
    styleSheets();
  });

  $("#label1_del").addEventListener("click", () => {
    for (let i = 0; i < localStorage.length; i++) {
      key_value = localStorage.key(i);
      lastChar = key_value == null ? null : key_value.charAt(key_value.length - 1);
      localStorage.getItem(key_value) == "true" ? lastChar==null ? null: lastChar == "L"? localStorage.setItem(key_value, false) :null :null;
    }

    $("#like-button") ? $("#like-button").style.background = "" : null;
    $("#like-button2") ? $("#like-button2").style.background = "" : null;
    $("#label1").innerText = chrome.i18n == null ? "Total Likes: 0": chrome.i18n.getMessage("total_likes")+": 0";
  });

  $("#label2_del").addEventListener("click", () => {
    for (let i = 0; i < localStorage.length; i++) {
      key_value = localStorage.key(i);
      lastChar = key_value == null ? null : key_value.charAt(key_value.length - 1);
      localStorage.getItem(key_value) == "true" ? lastChar==null ? null: lastChar == "D"? localStorage.setItem(key_value, false) :null :null;
    }

    $("#dislike-button") ? $("#dislike-button").style.background = "" : null;
    $("#dislike-button2")? $("#dislike-button2").style.background = "" : null;
    $("#label2").innerText = chrome.i18n == null ? "Total DisLikes: " + 0 : chrome.i18n.getMessage("total_dislikes")+": 0";
  });

  $("#label0_del").addEventListener("click", async () => {
    const generated = 0;
    $("#label0").innerText = chrome.i18n == null ? "Generated: " + generated : 
    chrome.i18n.getMessage("generated")+": "+generated;
    chrome.storage != undefined ? await chrome.storage.local.set({ generated }) : null;
    localStorage.generated = generated;
  });

  $("#language").addEventListener("change", async (event) => {
    const languges = event.currentTarget.value;
    chrome.storage != undefined ? await chrome.storage.local.set({ languges }) : null;
    localStorage.languges = languges;
  });


  copyResponse();
  chrome.i18n ? translate() : null;
  linkAdd();
  disabledInspect();


  if (speechSynthesis == undefined) return;

  const message = new SpeechSynthesisUtterance();
  message.volume = 1; // Volume range = 0 - 1
  message.rate = 1.1; // Speed of the text read , default 1 // change voice

  $("#speak").addEventListener("click", () => {
    message.lang = languge == null ? 'en' : languge;
    message.text = full_response;
    full_response == null ?  null : full_response == "" ? null : 
    window.speechSynthesis.speak(message);
  });

  $("#speak2").addEventListener("click", () => {
    message.lang = languge == null ? 'en' : languge;
    message.text = full_response1;
    full_response1 == null ?  null : full_response1 == "" ? null : 
    window.speechSynthesis.speak(message);
  });


}

const disabledInspect = () =>{
  try{
    document.addEventListener("contextmenu", function (e) {
         e.preventDefault();
     }, false);
     document.addEventListener("keydown", function (e) {
         //document.onkeydown = function(e) {
         // "I" key
         if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
             disabledEvent(e);
         }
         // "J" key
         if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
             disabledEvent(e);
         }
         // "S" key + macOS
         if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
             disabledEvent(e);
         }
         // "U" key
         if (e.ctrlKey && e.keyCode == 85) {
             disabledEvent(e);
         }
         // "F12" key
         if (event.keyCode == 123) {
             disabledEvent(e);
         }
     }, false);
     
     function disabledEvent(e) {
         if (e.stopPropagation) {
             e.stopPropagation();
         } else if (window.event) {
             window.event.cancelBubble = true;
         }
         e.preventDefault();
         return false;
     }
  }catch(e){ return; }
}

const generatedBtn = async(reviewerName, productName) => {
    reviewerName.value=="" ? (alert(chrome.i18n == null ? "Please Enter Reviewer Name" : chrome.i18n.getMessage("reviewer_name_error"))) : 
    rating()== 0 ? (alert(chrome.i18n == null ? "Select the ratings of the review received." : chrome.i18n.getMessage("rating_description"))) :
    generatingReview(reviewerName.value, productName.value != "" ? productName.value : "service");
}

const generatingReview = async(name, productName) =>{
  additionals = $("#review-text").value;
  $("#div_block-212").style.display =  window.innerWidth<=400 ? "none":"block";

  var {response_1 , response_2, random_1, random_2, LANGUAGE_CODE} = await generatedResponse(name, rating(), $("#tone").value, productName, additionals);

  if (response_1 == null && response_2 == null) return;
  languge = LANGUAGE_CODE;

  block = ["#refreshPageButton","#code_block-211","#code_block-212"];
  for(b of block){$(b) ? $(b).style.display = "block" : null;}

  disabled_element = ["#copyBtn","#copyBtn2","#speak","#speak2"];
  for(d of disabled_element){$(d) ? $(d).disabled = true : null; }

  $("#ai_dot").style.visibility = "visible";
  $("#ai_dot1").style.visibility = "visible";

  anime != null ? clearInterval(anime) : null;
  anime1 != null ? clearInterval(anime1) : null;

  $(".review-text").innerText = "";
  $(".review-text2").innerText = "";

  full_response = response_1;

  full_response1 = response_2;

  const words2 = full_response.split(" ");
  const words1 = full_response1.split(" ");

  i = 0;
  anime = setInterval(()=>{
    if (i < words2.length) {
      $(".review-text").innerText += ` ${words2[i]}`;
    }else if(i > words2.length){
      $("#ai_dot").style.visibility = "hidden";
      $("#copyBtn").disabled = false;
      $("#speak").disabled = false;
      clearInterval(anime);
    }
    i++;
  },200);


  i2 = 0;
  anime1 = setInterval(()=>{
    if (i2 < words1.length) {
      $(".review-text2").innerText += ` ${words1[i2]}`;
    }else if(i2 > words1.length){
      $("#ai_dot1").style.visibility = "hidden";
      $("#copyBtn2").disabled = false;
      $("#speak2").disabled = false;
      clearInterval(anime1);
    }
    i2++;
  },200);


  window.scrollTo(0, document.body.scrollHeight);

  reviewCode = $("#tone").value.toString() + random_1.toString();
  reviewCode2 = $("#tone").value.toString() + random_2.toString();


  $("#like-button").style.background = JSON.parse(localStorage.getItem(reviewCode+"L")) ? "#35b3ff" : "";
  $("#like-button2").style.background = JSON.parse(localStorage.getItem(reviewCode+"L")) ? "#35b3ff" : "";

  $("#dislike-button").style.background = JSON.parse(localStorage.getItem(reviewCode+"D")) ? "#ff0000" : "";
  $("#dislike-button2").style.background = JSON.parse(localStorage.getItem(reviewCode+"D")) ? "#ff0000" : "";
}



const storageLikeDislike = (reviewCode, target, secend_target) => {
  storage_data = localStorage.getItem(reviewCode + target.value);
  enabled = storage_data == null ? true : JSON.parse(storage_data) ? false : true;
  color = target.value == "L" ? "#35b3ff" : "#ff0000";
  target.style.background = enabled ? color : "" ;
  secend_target.style.background = "";
  localStorage.setItem((reviewCode + target.value), enabled);
  localStorage.setItem((reviewCode + secend_target.value), false);
}


const copyResponse = () =>{
  $("#copyBtn").addEventListener("click", ()=>{
    $("#flymessage").classList.add("in");
    navigator.clipboard.writeText($(".review-text").innerText);
    setTimeout(()=>{$("#flymessage").classList.remove("in")},2000);
  });  
  $("#copyBtn2").addEventListener("click", ()=>{
    $("#flymessage").classList.add("in");
    navigator.clipboard.writeText($(".review-text2").innerText);
    setTimeout(()=>{$("#flymessage").classList.remove("in")},2000);
  });
}

const rating = () =>{
  const rating = document.querySelectorAll("input[name='rating']");
  if (rating[0].checked) {
    return 5;
  }else if (rating[1].checked) {
    return 4;
  }else if (rating[2].checked) {
    return 3;
  }else if (rating[3].checked) {
    return 2;
  }else if (rating[4].checked) {
    return 1;
  }else{
    return 0;
  }
}

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

const openTab = (url) =>{
  window.open(url,'_blank');
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
  styleSheets()
})


