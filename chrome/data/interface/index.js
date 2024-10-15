var reviewCode, 
    reviewCode2,
    reviewerName,
    productName,
    regenerate,
    submitReview,
    additionalResponse,
    words,
    reviewText,
    reviewText2,
    regenerate,
    generatedReview,
    generatedReview2,
    reviewLike1,
    reviewLike2,
    reviewDislike1,
    reviewDislike2,
    full_response,
    full_response1,
    ai_dot,
    ai_dot1,
    copyBtn,
    copyBtn2,
    speak,
    speak2,
    anime,
    anime1,
    languge;

const info = () =>{
  reviewerName = document.querySelector("#reviewer-name");
  productName = document.querySelector("#industry-list");
  regenerate = document.querySelector("#refreshPageButton");
  submitReview = document.querySelector("#submit-review");
  additionalResponse = document.querySelector("#review-text");
  words = document.querySelector("#tone");
  reviewText = document.querySelector(".review-text");
  reviewText2 = document.querySelector(".review-text2");
  regenerate = document.querySelector("#refreshPageButton");
  generatedReview = document.querySelector("#code_block-211");
  generatedReview2 = document.querySelector("#code_block-212");
  reviewLike1 = document.querySelector("#like-button");
  reviewLike2 = document.querySelector("#like-button2");
  reviewDislike1 = document.querySelector("#dislike-button");
  reviewDislike2 = document.querySelector("#dislike-button2");
  ai_dot = document.querySelector("#ai_dot");
  ai_dot1 = document.querySelector("#ai_dot1");
  copyBtn = document.querySelector("#copyBtn");
  copyBtn2 = document.querySelector("#copyBtn2");
  speak = document.querySelector("#speak");
  speak2 = document.querySelector("#speak2");

  
  str = chrome.i18n == null ? "Generate Response" : chrome.i18n.getMessage("generate_response");
  document.styleSheets[0].addRule('.genbtn::after','content: "'+str+'";');

  additionalResponse.placeholder = chrome.i18n == null ? 
  "Additional response for the Review Response[contact us/ product or service information]":
  chrome.i18n.getMessage("additional_response_place");

  submitReview.addEventListener("click", () => {
    generatedBtn(reviewerName, productName);
  });

  regenerate.addEventListener("click", () => {
    generatedBtn(reviewerName, productName);
  });

  reviewLike1.addEventListener("click", () => {
    storageLikeDislike(reviewCode, reviewLike1 ,reviewDislike1);
    // console.log(reviewCode);
  });

  reviewDislike1.addEventListener("click", () => {
    storageLikeDislike(reviewCode, reviewDislike1, reviewLike1);
  });

  reviewLike2.addEventListener("click", () => {
    storageLikeDislike(reviewCode2, reviewLike2 ,reviewDislike2);
    console.log(reviewCode);
  });

  reviewDislike2.addEventListener("click", () => {
    storageLikeDislike(reviewCode2, reviewDislike2, reviewLike2);
  });

  if (speechSynthesis == undefined) return;

  const message = new SpeechSynthesisUtterance();
  message.volume = 1; // Volume range = 0 - 1
  message.rate = 1.1; // Speed of the text read , default 1 // change voice

  speak.addEventListener("click", () => {
    message.lang = languge == null ? 'en' : languge;
    message.text = full_response;
    full_response == null ?  null : full_response == "" ? null : 
    window.speechSynthesis.speak(message);
  });

  speak2.addEventListener("click", () => {
    message.lang = languge == null ? 'en' : languge;
    message.text = full_response1;
    full_response1 == null ?  null : full_response1 == "" ? null : 
    window.speechSynthesis.speak(message);
  });

  copyResponse();
  // disabledInspect();

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

const generatedBtn = (reviewerName, productName) => {
    reviewerName.value=="" ? (alert(chrome.i18n == null ? "Please Enter Reviewer Name" : chrome.i18n.getMessage("reviewer_name_error"))) : 
    rating()== 0 ? (alert(chrome.i18n == null ? "Select the ratings of the review received." : chrome.i18n.getMessage("rating_description"))) :
    generatingReview(reviewerName.value, productName.value != "" ? productName.value : "service");
}

const generatingReview = async(name, productName) =>{
  var {response_1 , response_2, random_1, random_2, LANGUAGE_CODE} = await generatedResponse(name, rating(), words.value, productName);
  if (response_1 == null && response_2 == null) return;
  languge = LANGUAGE_CODE;
  regenerate.style.display = "block";
  generatedReview.style.display = "block";
  generatedReview2.style.display = "block";
  ai_dot.style.visibility = "visible";
  ai_dot1.style.visibility = "visible";
  copyBtn.disabled = true;
  copyBtn2.disabled = true;
  speak.disabled = true;
  speak2.disabled = true;

  anime != null ? clearInterval(anime) : null;
  anime1 != null ? clearInterval(anime1) : null;

  reviewText.innerText = "";
  reviewText2.innerText = "";

  full_response = `${response_1}
  ${additionalResponse.value}`;

  full_response1 = `${response_2}
  ${additionalResponse.value}`;

  const words2 = full_response.split(" ");
  const words1 = full_response1.split(" ");

  i = 0;
  anime = setInterval(()=>{
    if (i < words2.length) {
      reviewText.innerText += ` ${words2[i]}`;
    }else if(i > words2.length){
      ai_dot.style.visibility = "hidden";
      copyBtn.disabled = false;
      speak.disabled = false;
      clearInterval(anime);
    }
    i++;
  },200);


  i2 = 0;
  anime1 = setInterval(()=>{
    if (i2 < words1.length) {
      reviewText2.innerText += ` ${words1[i2]}`;
    }else if(i2 > words1.length){
      ai_dot1.style.visibility = "hidden";
      copyBtn2.disabled = false;
      speak2.disabled = false;
      clearInterval(anime1);
    }
    i2++;
  },200);


  window.scrollTo(0, document.body.scrollHeight);

  reviewCode = words.value.toString() + random_1.toString();
  reviewCode2 = words.value.toString() + random_2.toString();


  reviewLike1.style.background = JSON.parse(localStorage.getItem(reviewCode+"L")) ? "#35b3ff" : "";
  reviewLike2.style.background = JSON.parse(localStorage.getItem(reviewCode+"L")) ? "#35b3ff" : "";

  reviewDislike1.style.background = JSON.parse(localStorage.getItem(reviewCode+"D")) ? "#ff0000" : "";
  reviewDislike2.style.background = JSON.parse(localStorage.getItem(reviewCode+"D")) ? "#ff0000" : "";
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

  copyBtn.addEventListener("click", ()=>{
     navigator.clipboard.writeText(reviewText.innerText);
  });  
  copyBtn2.addEventListener("click", ()=>{
     navigator.clipboard.writeText(reviewText2.innerText);
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
})


