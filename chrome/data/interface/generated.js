var RATING_ARRAY = null,
    LANGUAGE_CODE = "en",
    DEL = RATING_DATA_DE[0], 
    ENL = RATING_DATA_EN[0],
    ESL = RATING_DATA_ES[0],
    JAL = RATING_DATA_JA[0],
    KOL = RATING_DATA_KO[0],
    PTL = RATING_DATA_PT[0],
    RUL = RATING_DATA_RU[0],
    ZHL = RATING_DATA_ZH[0];

const generatedResponse  = async(name, rating, words, product)=>{
	if (!ENL || rating == null || rating == "" || rating == 0 || rating > 5 || name == null || name == "" || words == "" || words == null ) return null;

  if (chrome.i18n != null) {
    var detectPromise = new Promise(function(resolve, reject){
      chrome.i18n.detectLanguage(name,
        function(options){
            resolve(options);
        })     
    });
    var langOptions = await detectPromise;
    const lang = langOptions.languages[0] == null ? null : langOptions.languages[0].language;
    LANGUAGE_CODE = lang == null ? chrome.i18n.getMessage("language_code") : LangSwitch(lang) != null ? lang : "en";
  }else if (navigator != null) {
    LANGUAGE_CODE = LangSwitch(navigator.language) != null ? navigator.language : "en";
  }else{
    LANGUAGE_CODE = "en";
  }

  RATING_ARRAY = LangSwitch(LANGUAGE_CODE);

  rating_array = RATING_ARRAY[`${rating}S${words}WR`];
  random_1 = Math.floor(Math.random() * rating_array.length);
  random_2 = Math.floor(Math.random() * rating_array.length);

  rating_1 = rating_array[random_1].replace("${productName}", product);
  rating_2 = rating_array[random_2].replace("${productName}", product);

  response_1 = `${greeting(name,rating)}
${rating_1}`;
    response_2 = `${greeting(name,rating)}
${rating_2}`;

    return {response_1 , response_2, random_1, random_2, LANGUAGE_CODE};
}

const greeting = (name, rating) =>{
  greeting_array = RATING_ARRAY["GREETING"];
  return greeting_array[Math.floor(Math.random() * greeting_array.length)].replace("${name}", name).replace("${timing}", timing()).replace("${emoji}", emoji(rating));
}

const timing = () =>{
  var today = new Date(),
  curHr = today.getHours();
  if (curHr < 12) {
    return RATING_ARRAY["TIMING"][0];
  } else if (curHr < 18) {
    return RATING_ARRAY["TIMING"][1];
  } else {
    return RATING_ARRAY["TIMING"][2];
  }
}

const LangSwitch = (lang) =>{
  switch(lang) {
    case 'en':
      return ENL;
      break;
    case 'de':
      return DEL;
      break;
    case 'es':
      return ESL;
      break;
    case 'ja':
      return JAL;
      break;
    case 'ko':
      return KOL;
      break;
    case 'pt':
      return PTL;
      break;
    case 'ru':
      return RUL;
      break;
    case 'zh':
      return ZHL;
      break; 
    case 'zh-CN':
      return ZHL;
      break;                               
    default:
      return null;
  }
}

EMOJIS_DATA = [
  {
    "1SEMOJI":["😥","😶","😓","😔","😟","🙁","☹","😢","😭","😦","😧",
      "😬","😩","😰","🤧","💔"
    ],
    "2SEMOJI":[
      "😥","😐","😶","😓","😔","😟","🙁","☹","😢","😭","😦","😧",
      "😬","😩","😰","🥺","🤧","👍","🤝","💔"
    ],
    "3SEMOJI":[
      "😐","😓","😔","🙁","😦","😧","🥺","🙄","🤐","😮","😯","😄",
      "😅","😉","😲","😨","🥶","😱","😵","🥴","🤒","🤕","😿"
    ],
    "4SEMOJI":[
      "😊","😚","😃","🦉","❤","🧡","💛","💚","💙","💜","🤎","🖤","🤍","❣",
      "💕","💘","💌","💟","😍","🥰","😘","🤩","🥺","🎆","🎇","🧨","✨","🎄",
      "🎋","🎍","🎎","🎏","🎐","🎑","🌹","🏵","🌸","🍁","🍀","🌿","🍂",
      "🌟","🌞","☀","🔥","⚡"
    ],
    "5SEMOJI":["😱","🙀","🙈🙉🙊","🥺🥺🥺","✨✨✨","❤❤❤","🧡🧡🧡",
      "💛💛💛","💚💚💚","💙💙💙","💜💜💜","🤎🤎🤎","🖤🖤🖤","🤍🤍🤍","❣❣❣",
      "💕💕💕","💘💘💘","💌💌💌","💟💟💟","😍😍😍","🥰🥰🥰","😘😘😘","🤩🤩🤩",
      "🥺🥺🥺","✨✨✨","🎍🎍🎍","🌹🌹🌹","🏵🏵🏵","🌸🌸🌸","🍁🍁🍁","🍀🍀🍀",
      "🌿🌿🌿","🌟🌟🌟🌟🌟","🌞🌞🌞🌞🌞","☀☀☀","🔥🔥🔥🔥🔥🔥🔥","⚡⚡⚡⚡⚡⚡"
    ]
  }
]

const emoji = (rating) => {
  const emojis = EMOJIS_DATA[0][`${rating}SEMOJI`];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
