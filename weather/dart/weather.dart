#import('dart:html');
#import('dart:json');

void main() {
  query('#formulary').on.submit.add(newQuery);
  query('#form_login').on.submit.add(login);
  query('#logout').on.click.add(logout);
}

void login(event){
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/login/", true);
  req.withCredentials = true;
  
  InputElement username = query('#user_id');
  var user = username.value;
  InputElement password = query('#pass_id');
  var pass = password.value;
  
  // Add an event handler to call the onSuccess function when the POST call is successful
  req.on.readyStateChange.add((Event e) {
    if (req.readyState == XMLHttpRequest.DONE && (req.status == 200)) {
      DivElement div_loggin = query('#log_form');
      div_loggin.style.display = 'none';
      
      DivElement logged_user = query('#logged_user');
      logged_user.style.display = '';
      logged_user.text = user;
      
      DivElement div_loggout_button = query('#logout_button');
      div_loggout_button.style.display = '';
    } else {
      print(req.status);
      print("ERROR DE LOGIN!!!!");
    }
  });

  var data = JSON.stringify({
    'username' : user,
    'password' : pass
  });
  
  req.send(data);
  event.preventDefault();
}

void logout(event) {
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/logout/", true);
  req.withCredentials = true;
  req.send();
  
  DivElement div_loggin = query('#log_form');
  div_loggin.style.display = '';
  
  DivElement logged_user = query('#logged_user');
  logged_user.style.display = 'none';
  
  DivElement div_loggout_button = query('#logout_button');
  div_loggout_button.style.display = 'none';
  
  DivElement div_query = query('#content');
  div_query.style.display = 'none';
}

void newQuery(event) {
  // Get the city name from the html form
  InputElement input = query("#city");
  var city = input.value;
  
  // Create and open a new request
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
  req.withCredentials = true;
  
  // Add an event handler to call the onSuccess function when the POST call is successful
  req.on.readyStateChange.add((Event e) {
    if (req.readyState == XMLHttpRequest.DONE && (req.status == 200)) {
      var j = JSON.parse(req.responseText);
      if (j.containsKey("data") && j["data"].containsKey("error"))
        print('HELL YEAH');
      else
        onSuccess(req);
    }
  });
  
  // Set the content type of the call and send the data
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({'city': city}));

  event.preventDefault();
}

// Function to call after a successful POST call
void onSuccess(XMLHttpRequest req) {
  DivElement div = query('#content');
  div.style.display = '';
  showJson(req);
}

// Function that shows the desired message in the corresponding element
void showJson(XMLHttpRequest req) {
  var parsedJSON = JSON.parse(req.responseText)["result_json"];
  var currentConditions = parsedJSON["data"]["current_condition"][0];
  query('#observationTime').text = currentConditions["observation_time"];
  query('#description1').text = currentConditions["weatherDesc"][0]["value"];
  query('#tCelsius').text = '${currentConditions["temp_C"]}ºC';
  query('#tFarenheit').text = '${currentConditions["temp_F"]}ºF';
  query('#humidity').text = currentConditions["humidity"];
  query('#precipitation1').text = '${currentConditions["precipMM"]} MM';
  query('#cloudcover').text =  '${currentConditions["cloudcover"]}%';
  query('#visibility').text =  currentConditions["visibility"];
  query('#pressure').text =  currentConditions["pressure"];
  query('#windDirectionDegree1').text =  '${currentConditions["winddirDegree"]}º';
  query('#windDirection16Point1').text =  currentConditions["winddir16Point"];
  query('#windSpeedkmh1').text =  '${currentConditions["windspeedKmph"]}Kmph';
  query('#windSpeedMiles1').text =  '${currentConditions["windspeedMiles"]}Mph';
  ImageElement image = query('#img1');
  image.src = currentConditions["weatherIconUrl"][0]["value"];
  query('#city_name').text = parsedJSON["data"]["request"][0]["query"];
  var weatherToday = parsedJSON["data"]["weather"][0];
  query('#dateToday').text = weatherToday["date"];
  query('#description2').text = weatherToday["weatherDesc"][0]["value"];
  query('#minTCelsius1').text = '${weatherToday["tempMinC"]}ºC';
  query('#minTFarenheit1').text = '${weatherToday["tempMinF"]}ºF';
  query('#maxTCelsius1').text = '${weatherToday["tempMaxC"]}ºC';
  query('#maxTFarenheit1').text = '${weatherToday["tempMaxF"]}ºF';
  query('#precipitation2').text = weatherToday["precipMM"];
  query('#precipitation2').text = weatherToday["precipMM"];
  query('#windDirectionDegree2').text =  '${weatherToday["winddirDegree"]}º';
  query('#windDirection16Point2').text =  weatherToday["winddir16Point"];
  query('#windSpeedkmh2').text =  '${weatherToday["windspeedKmph"]}Kmph';
  query('#windSpeedMiles2').text =  '${weatherToday["windspeedMiles"]}Mph';
  ImageElement image2 = query('#img2');
  image2.src = weatherToday["weatherIconUrl"][0]["value"];
  
  var weatherTomorrow = parsedJSON["data"]["weather"][1];
  query('#dateTomorrow').text = weatherTomorrow["date"];
  query('#description3').text = weatherTomorrow["weatherDesc"][0]["value"];
  query('#minTCelsius2').text = '${weatherTomorrow["tempMinC"]}ºC';
  query('#minTFarenheit2').text = '${weatherTomorrow["tempMinF"]}ºF';
  query('#maxTCelsius2').text = '${weatherTomorrow["tempMaxC"]}ºC';
  query('#maxTFarenheit2').text = '${weatherTomorrow["tempMaxF"]}ºF';
  query('#precipitation3').text = weatherTomorrow["precipMM"];
  query('#precipitation3').text = weatherTomorrow["precipMM"];
  query('#windDirectionDegree3').text =  '${weatherTomorrow["winddirDegree"]}º';
  query('#windDirection16Point3').text =  weatherTomorrow["winddir16Point"];
  query('#windSpeedkmh3').text =  '${weatherTomorrow["windspeedKmph"]}Kmph';
  query('#windSpeedMiles3').text =  '${weatherTomorrow["windspeedMiles"]}Mph';
  ImageElement image3 = query('#img3');
  image3.src = weatherTomorrow["weatherIconUrl"][0]["value"];
}