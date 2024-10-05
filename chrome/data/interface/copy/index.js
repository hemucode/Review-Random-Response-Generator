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
          }, function(options){
              resolve(options);
          })
  });

  const responseOptions = await responsePromise;
  const response = responseOptions.response;

  response == null ? null:
  response =="" ? null:
  generatingReview(response),copyResponse();

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


const generatingReview = (response) =>{
  copyBtn.disabled = true;
  speak.disabled = true;
  ai_dot.style.visibility = "visible";
  const words2 = response.split(" ");

  speak.addEventListener("click",()=>{
    textToSpeech(response);
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


const textToSpeech = (msg) =>{
  var new_msg = new SpeechSynthesisUtterance(msg);
  window.speechSynthesis.speak(new_msg);
}

