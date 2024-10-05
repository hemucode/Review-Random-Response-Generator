const generatedResponse  = (name, rating, words, product)=>{
	if (!rating_data[0] 
		|| rating == null 
		|| rating == "" 
		|| name == null 
		|| name == "" 
		|| rating == 0
		|| words == ""
		|| words == null
		|| rating > 5) return null;

	rating_array = rating_data[0][`${rating}S${words}WR`];

  random_1 = Math.floor(Math.random() * rating_array.length);
  random_2 = Math.floor(Math.random() * rating_array.length);

  rating_1 = rating_array[random_1].replace("${productName}", product);
  rating_2 = rating_array[random_2].replace("${productName}", product);

  response_1 = `${labelValue(name,rating)}
${rating_1}`;
    response_2 = `${labelValue(name,rating)}
${rating_2}`;

    return {response_1 , response_2, random_1, random_2};
}

const labelValue = (name, rating) =>{
  const label = [
    `Hi.. ${name}`,
    `Hi, ${name}`,
    `Hiii, ${name}`,
    `Hey! ${name}`,
    `Hey! ${name}. How’s everything?`,
    `Hello ${name}`,
    `Hello there, ${name}!`,
    `Hello how are you ${name}?`,
    `Hello ${name}!, can I help you with something?`,
    `How are you, ${name}?`,
    `What’s up, ${name}`,
    `${timing()} ${name}`,
    `${timing()} ${name} ${emoji(rating)}`,
    `Hi.. ${name} ${timing()}`,
    `Hi, ${name} ${timing()}`,
    `Hiii, ${name} ${timing()}`,
    `Hey! ${name}, ${timing()}`,
    `Hello ${name} ${timing()}`,
    `Hello there, ${name} ${timing()}`,
    `Hi.. ${name} ${emoji(rating)}`,
    `Hi, ${name} ${emoji(rating)}`,
    `Hiii, ${name} ${emoji(rating)}`,
    `Hey! ${name} ${emoji(rating)}`,
    `Hello ${name} ${emoji(rating)}`,
    `Hello there, ${name} ${emoji(rating)}`
  ];
  return label[Math.floor(Math.random() * label.length)];
}

const timing = () =>{
  var today = new Date(),
  curHr = today.getHours();
  if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

const emoji = (rating) => {
  const emojis = rating_data[0][`${rating}SEMOJI`];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
