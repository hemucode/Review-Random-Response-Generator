var languge = 'en',anime;
const $ = (elem)=>{
  return document.querySelector(elem);
}    

const info = async () =>{
  var responsePromise = new Promise(function(resolve, reject){
          chrome.storage.local.get({
            "reviewerName": "",
            "rating": 5,
            "response": "",
            "languge": "en",
          }, function(options){
              resolve(options);
          })
  });

  const responseOptions = await responsePromise;
  reviewerName = responseOptions.reviewerName;
  rating = responseOptions.rating;
  response = responseOptions.response;
  languge = responseOptions.languge;

  response == null ? null:
  response =="" ? null:
  generatingReview(response),copyResponse();


  $("#re_generate").addEventListener("click", async ()=>{
    if (reviewerName == "" || reviewerName == null) return;
    if (rating == "" || rating == null) return;
    anime != null ? clearInterval(anime) : null;
    var {response_1 , response_2, random_1, random_2, LANGUAGE_CODE} = await generatedResponse(reviewerName, rating, 50, "service", null);
    response_1 == null ? null:
    response_1 == "" ? null:
    $(".review-text").innerText = "",
    generatingReview(response_1);
  },false);


  $("#speak").addEventListener("click",()=>{
    textToSpeech($(".review-text").innerText, languge);
  },false)
}

const copyResponse = () =>{
  $("#copyBtn").addEventListener("click", ()=>{
     $("#flymessage").classList.add("in");
     navigator.clipboard.writeText($(".review-text").innerText);
     setTimeout(()=>{$("#flymessage").classList.remove("in")},2000);
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
  disabledInspect()
})


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

const generatingReview = (response) =>{
  $("#copyBtn").disabled = true;
  $("#speak").disabled = true;
  $("#ai_dot").style.visibility = "visible";
  const words2 = response.split(" ");
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
  },100);

}


const textToSpeech = (msg, voice) =>{
  if (speechSynthesis == undefined) return;
  const message = new SpeechSynthesisUtterance();
  message.volume = 1; // Volume range = 0 - 1
  message.rate = 1.1; // Speed of the text read , default 1 // change voice
  message.lang = voice;
  console.log(voice)
  message.text = msg;
  window.speechSynthesis.speak(message);
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

