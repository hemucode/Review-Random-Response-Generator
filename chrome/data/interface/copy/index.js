var reviewtext,
    ai_dot,
    copyBtnm
    speak;

const info = async () =>{
  reviewtext = document.querySelector(".review-text");
  ai_dot = document.querySelector("#ai_dot");
  copyBtn = document.querySelector("#copyBtn");
  speak = document.querySelector("#speak");

  var responsePromise = new Promise(function(resolve, reject){
          chrome.storage.local.get({
            "response": "",
            "languge": "en",
          }, function(options){
              resolve(options);
          })
  });

  const responseOptions = await responsePromise;
  const response = responseOptions.response;
  const languge = responseOptions.languge;

  response == null ? null:
  response =="" ? null:
  generatingReview(response,languge),copyResponse();

}

const copyResponse = () =>{
  copyBtn.addEventListener("click", ()=>{
     navigator.clipboard.writeText(reviewtext.innerText);
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
})


const generatingReview = (response,languge) =>{
  copyBtn.disabled = true;
  speak.disabled = true;
  ai_dot.style.visibility = "visible";
  const words2 = response.split(" ");

  speak.addEventListener("click",()=>{
    textToSpeech(response,languge);
  },false)

  i = 0;
  anime = setInterval(()=>{
    if (i < words2.length) {
      reviewtext.innerText += ` ${words2[i]}`;
    }else if(i > words2.length){
      ai_dot.style.visibility = "hidden";
      copyBtn.disabled = false;
      speak.disabled = false;
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

