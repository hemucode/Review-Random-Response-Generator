var RATING_ARRAY = null,additional,
    LANGUAGE_CODE = "en",
    DEL = RATING_DATA_DE[0], 
    ENL = RATING_DATA_EN[0],
    ESL = RATING_DATA_ES[0],
    JAL = RATING_DATA_JA[0],
    KOL = RATING_DATA_KO[0],
    PTL = RATING_DATA_PT[0],
    RUL = RATING_DATA_RU[0],
    ZHL = RATING_DATA_ZH[0];

const generatedResponse  = async(name, rating, words, product, additionals)=>{
  if (!ENL || rating == null || rating == "" || rating == 0 || rating > 5 || name == null || name == "" || words == "" || words == null ) return null;

  if (browser.storage != undefined) {
      var responsePromise = new Promise(function(resolve, reject){
          browser.storage.local.get({
            "generated": 0,
            "languges": browser.i18n == null ? "en" : browser.i18n.getMessage("language_code"),
            "box1": true,
            "box2": false,
            "additional": ""
          }, function(options){
              resolve(options);
          })
      });
      const responseOptions = await responsePromise;
      generated = responseOptions.generated + 1;
      languges = responseOptions.languges;
      additional = responseOptions.additional;
      box1 = responseOptions.box1;
      box2 = responseOptions.box2;
      await browser.storage.local.set({ generated });
  }else{
    localStorage.generated = localStorage.generated == null ? 1 : 
    typeof Number(localStorage.generated) ==='number' ? Number(localStorage.generated) + 1 : 0;
    languges = localStorage.languges == null ? 'en' : localStorage.languges;
    additional = localStorage.additional == null ? '' : localStorage.additional;
    box1 = localStorage.box1 == null ? true : localStorage.box1 ==='true' ? true : false;
    box2 = localStorage.box2 == null ? true : localStorage.box2 ==='true' ? true : false;

  }

  if (browser.i18n != null) {
    var detectPromise = new Promise(function(resolve, reject){
      browser.i18n.detectLanguage(name,
        function(options){
            resolve(options);
        })     
    });
    var langOptions = await detectPromise;
    detectlang = langOptions.languages[0];
    console.log(detectlang)

    LANGUAGE_CODE = detectlang != null ? LangSwitch(detectlang.language) != null ? detectlang.language :
    LangSwitch(languges) != null ? languges : "en" : browser.i18n.getMessage("language_code");

  }else if(LangSwitch(languges) != null) {
    LANGUAGE_CODE = languges;
  }else{
    LANGUAGE_CODE = "en";
  }

  RATING_ARRAY = LangSwitch(LANGUAGE_CODE);

  rating_array = RATING_ARRAY[`${rating}S${words}WR`];
  random_1 = Math.floor(Math.random() * rating_array.length);
  random_2 = Math.floor(Math.random() * rating_array.length);

  rating_1 = rating_array[random_1].replace("${productName}", product);
  rating_2 = rating_array[random_2].replace("${productName}", product);

  emojis = [newEmoji(rating),koemoji(rating)];
  emoji = box1 && box2 ? emojis[Math.floor(Math.random() * emojis.length)] :
  box1 ? newEmoji(rating) : box2 ? koemoji(rating) : "";

  greeting_array = RATING_ARRAY["GREETING"];

  greeting_1 =  greeting_array[Math.floor(Math.random() * greeting_array.length)].replace("${name}", name).replace("${timing}", timing()).replace("${emoji}", emoji);

  greeting_2 =  greeting_array[Math.floor(Math.random() * greeting_array.length)].replace("${name}", name).replace("${timing}", timing()).replace("${emoji}", emoji);
  
  additional_text = additionals == null ? additional : additionals != "" ? additionals : "";

  response_1 = `${greeting_1}
${rating_1}
${additional_text}`;
    response_2 = `${greeting_2}
${rating_2}
${additional_text}`;

  return {response_1 , response_2, random_1, random_2, LANGUAGE_CODE};
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
    "5SEMOJI":["😱","🙀","🥺","✨","❤","🧡",
      "💛","💚","💙","💜","🤎","🖤","🤍","❣",
      "💕","💘","💌","💟","😍","🥰","😘","🤩",
      "🥺","✨✨✨","🎍🎍🎍","🌹","🏵","🌸","🍁","🍀",
      "🌿","🌟","🌞","☀","🔥","⚡"
    ]
  }
]

KOMOJIS_DATA = [
  {
    "1SEMOJI":["~(>_<~)","☆⌒(> _ <)","☆⌒(>。<)","(☆_@)",
      "(×_×)","(x_x)","(×_×)⌒☆","(x_x)⌒☆","(×﹏×)","☆(＃××)","(＋_＋)","[ ± _ ± ]",
      "٩(× ×)۶","_:(´ཀ`」 ∠):_","(ﾒ﹏ﾒ)","(ノ_<。)","(-_-)","(´-ω-`)",".･ﾟﾟ･(／ω＼)･ﾟﾟ･.",
      "(μ_μ)","(ﾉД`)","(-ω-、)","。゜゜(´Ｏ`) ゜゜。","o(TヘTo) ","( ; ω ; )","(｡╯︵╰｡)",
      "｡･ﾟﾟ*(>д<)*ﾟﾟ･｡","( ﾟ，_ゝ｀)","(个_个)","(╯︵╰,)","｡･ﾟ(ﾟ><ﾟ)ﾟ･｡","( ╥ω╥ )","(╯_╰)",
      "(╥_╥)",".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.","(／ˍ・、)","(ノ_<、)","(╥﹏╥)","｡ﾟ(｡ﾉωヽ｡)ﾟ｡","(つω`｡)","(｡T ω T｡)",
      "(ﾉω･､)","･ﾟ･(｡>ω<｡)･ﾟ･","(T_T)","(>_<)","(っ˘̩╭╮˘̩)っ","｡ﾟ･ (>﹏<) ･ﾟ｡","o(〒﹏〒)o",
      "(￢_￢)","(→_→)","(￢ ￢)","(￢‿￢ )","(¬_¬ )","(←_←)","(¬ ¬ )","(¬‿¬ )","(↼_↼)","(⇀_⇀)","(ᓀ ᓀ)","(„¬ᴗ¬„)",
      "(｡•́︿•̀｡)","(ಥ﹏ಥ)","(ಡ‸ಡ)"
    ],
    "2SEMOJI":["~(>_<~)","☆⌒(> _ <)","☆⌒(>。<)","(☆_@)","(×_×)","(x_x)","(×_×)⌒☆",
      "(x_x)⌒☆","(×﹏×)","☆(＃××)","(＋_＋)","[ ± _ ± ]","٩(× ×)۶","_:(´ཀ`」 ∠):_","(ﾒ﹏ﾒ)",
      "(￢_￢)","(→_→)","(￢ ￢)","(￢‿￢ )","(¬_¬ )","(←_←)","(¬ ¬ )","(¬‿¬ )","(↼_↼)","(⇀_⇀)","(ᓀ ᓀ)","(„¬ᴗ¬„)",
    ],
    "3SEMOJI":["(＃＞＜)","(；⌣̀_⌣́)","☆ｏ(＞＜；)○","(￣ ￣|||)","(；￣Д￣)","(￣□￣」)","(＃￣0￣)","(＃￣ω￣)",
      "(￢_￢;)","(＞ｍ＜)","(」°ロ°)」","(〃＞＿＜;〃)","(＾＾＃)","(︶︹︺)","(￣ヘ￣)",
      "<(￣ ﹌ ￣)>","(￣︿￣)","(＞﹏＜)","(--_--)","(￣ヘ￣)","ヾ( ￣O￣)ツ ","(⇀‸↼‶)","o(>< )o","(」＞＜)」",
      "(ᗒᗣᗕ)՞ ","(눈_눈)",
      "(￢_￢)","(→_→)","(￢ ￢)","(￢‿￢ )","(¬_¬ )","(←_←)","(¬ ¬ )","(¬‿¬ )","(↼_↼)","(⇀_⇀)","(ᓀ ᓀ)","(„¬ᴗ¬„)",
      "(o_O) (O_O;)","(O.O)","(°ロ°)","! (o_O) !","(□_□)","Σ(□_□)","∑(O_O;)","( : ౦ ‸ ౦ : )"


    ],
    "4SEMOJI":["(* ^ ω ^)","(´ ∀ ` *)"," ٩(◕‿◕｡)۶","☆*:.｡.o(≧▽≦)o.｡.:*☆",
      "(o^▽^o)","(⌒▽⌒)☆","<(￣︶￣)>"," 。.:☆*:･'(*⌒―⌒*)))",
      "ヽ(・∀・)ﾉ","(´｡• ω •｡`)","(￣ω￣)",";:゛;｀;･(°ε° )","(o･ω･o)","(＠＾◡＾)","ヽ(*・ω・)ﾉ","(o_ _)ﾉ彡☆",
      "(^人^)","(o´▽`o)","(*´▽`*)","｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡","( ´ ω ` )","(((o(*°▽°*)o)))","(≧◡≦)","(o´∀`o)",
      "(´• ω •`)","(＾▽＾)","(⌒ω⌒)","∑d(°∀°d)","╰(▔∀▔)╯","(─‿‿─)","(*^‿^*)","ヽ(o^ ^o)ﾉ","(✯◡✯)","(◕‿◕)","(*≧ω≦*)",
      "(☆▽☆)","(⌒‿⌒)","＼(≧▽≦)／","ヽ(o＾▽＾o)ノ","☆ ～('▽^人)","(*°▽°*)","٩(｡•́‿•̀｡)۶","(✧ω✧)","ヽ(*⌒▽⌒*)ﾉ",
      "(´｡• ᵕ •｡`)","( ´ ▽ ` )","(￣▽￣)","╰(*´︶`*)╯","ヽ(>∀<☆)ノ","o(≧▽≦)o","(☆ω☆)","(っ˘ω˘ς )",
      "＼(￣▽￣)／","(*¯︶¯*)","＼(＾▽＾)／","٩(◕‿◕)۶","(o˘◡˘o)","\(★ω★)/","\(^ヮ^)/","(〃＾▽＾〃)","(╯✧▽✧)╯",
      "o(>ω<)o","o( ❛ᴗ❛ )o","｡ﾟ(TヮT)ﾟ｡","( ‾́ ◡ ‾́ )","(ﾉ´ヮ`)ﾉ*: ･ﾟ","(b ᵔ▽ᵔ)b","(๑˃ᴗ˂)ﻭ","(๑˘︶˘๑)","(*꒦ິ꒳꒦ີ)","°˖✧◝(⁰▿⁰)◜✧˖°",
      "(´･ᴗ･ ` )","(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ","(„• ֊ •„)","(.❛ ᴗ ❛.)","(⁀ᗢ⁀)","(￢‿￢ )","(¬‿¬ )","(*￣▽￣)b","( ˙▿˙ )","(¯▿¯)","( ◕▿◕ )","＼(٥⁀▽⁀ )／",
      "(„• ᴗ •„)","(ᵔ◡ᵔ)","( ´ ▿ ` )","(๑>◡<๑)","( = ⩊ = )","( ´ ꒳ ` )","⸜( ´ ꒳ ` )⸝","⸜(⸝⸝⸝´꒳`⸝⸝⸝)⸝",
      "⸜(*ˊᗜˋ*)⸝","⸜( *ˊᵕˋ* )⸝","(>⩊<)","(ᗒ⩊ᗕ)","(ᵔ⩊ᵔ)","( ᵔ ⩊ ᵔ )","(•⩊•)","( • ⩊ • )]",
      "w(°ｏ°)w","ヽ(°〇°)ﾉ","Σ(O_O)","Σ(°ロ°)","(°ロ°)"
      ],
    "5SEMOJI":["(❁´◡`❁)","ヾ(≧▽≦*)o","⋆౨ৎ˚⟡˖ ࣪","꒰ᐢ. .ᐢ꒱₊˚⊹","⋆˙⟡ —","˚ʚ♡ɞ˚","˚₊‧꒰ა ☆ ໒꒱ ‧₊˚","⊹₊｡ꕤ˚₊⊹",
      "`⎚⩊⎚´ -✧","✩₊˚.⋆☾⋆⁺₊✧","₍ᐢ.  ̫.ᐢ₎","₍^ >ヮ<^₎ .ᐟ.ᐟ","౨ৎ⋆˚｡⋆","૮₍ ˃ ⤙ ˂ ₎ა","⊹ ࣪ ˖₊˚⊹⋆","˗ˏˋ ★ ˎˊ˗",
      "𓍢ִ໋🌷͙֒"," ପ(๑•ᴗ•๑)ଓ ♡","‧₊˚🖇️✩ ₊˚🎧⊹♡","⋆ ˚｡⋆୨୧˚","/ᐠ˵- ⩊ -˵マ/ᐠ > ˕ <マ","｡ﾟ 𝜗𝜚 ‧ ₊ ꒱","⊹₊ ⋆",
      "ദ്ദി๑>؂•̀๑)","˙✧˖°📷 ༘ ⋆｡˚","໒꒰ྀིっ˕ -｡꒱ྀི১","(˶ˆᗜˆ˵)","(˶◜ᵕ◝˶)","⋆ ˚｡⋆୨ ʚɞ ୧⋆ ˚｡⋆","(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ",
      "(ෆ˙ᵕ˙ෆ)♡","⋆.˚🦋༘⋆","જ⁀➴","ᡣ𐭩ྀིྀིྀི°❀⋆.ೃ࿔*:･","★彡","໒꒰ྀི⸝⸝-   -⸝⸝꒱ྀི১","(ﾉ´ з `)ノ","(♡μ_μ)","(*^^*)♡","☆⌒ヽ(*'､^*)chu",
      "(♡-_-♡)","(￣ε￣＠)","ヽ(♡‿♡)ノ","( ´ ∀ `)ノ～ ♡","(─‿‿─)♡","(´｡• ᵕ •｡`) ♡"," (*♡∀♡)","(｡・//ε//・｡)",
      "(´ ω `♡)","♡( ◡‿◡ )","(◕‿◕)♡","(/▽＼*)｡o○♡","(ღ˘⌣˘ღ)","(♡°▽°♡)","♡(｡- ω -)","♡ ～('▽^人)",
      "(´• ω •`) ♡","(´ ε ` )♡","(´｡• ω •｡`) ♡","( ´ ▽ ` ).｡ｏ♡","╰(*´︶`*)╯♡","(*˘︶˘*).｡.:*♡","(♡˙︶˙♡)","♡＼(￣▽￣)／♡","(≧◡≦) ♡",
      " (⌒▽⌒)♡","(*¯ ³¯*)♡","٩(♡ε♡)۶","σ(≧ε≦σ) ♡","♡ (⇀ 3 ↼) ♡","(￣З￣)","(❤ω❤)","(˘∀˘)","/(μ‿μ) ❤",
      "(´♡‿♡`)","(°◡°♡)","Σ>―(〃°ω°〃)♡→ ","(´,,•ω•,,)♡","(´꒳`)♡","♡(>ᴗ•)","(❤⩊❤)","[=_=]","(☆ε☆)",
      "w(°ｏ°)w","ヽ(°〇°)ﾉ","Σ(O_O)","Σ(°ロ°)","(°ロ°)"

    ]
  }
]

const newEmoji = (rating) => {
  const emojis = EMOJIS_DATA[0][`${rating}SEMOJI`];
  var lengths = Math.floor(Math.random() * rating) + 1,retVal = "";
  for (let i = 0; i < lengths; i++) {
    retVal += emojis[Math.floor(Math.random() * emojis.length)];
  }
  return retVal;
}

const koemoji = (rating) => {
  const koemoji = KOMOJIS_DATA[0][`${rating}SEMOJI`];
  return koemoji[Math.floor(Math.random() * koemoji.length)];
}
