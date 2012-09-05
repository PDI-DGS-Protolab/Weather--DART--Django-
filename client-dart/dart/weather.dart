#import('dart:html');
#import('dart:json');

/** Main function. Intializes all the buttons and fucntions for future use. */
void main() {
  query('#formulary').on.submit.add(newQuery);
  query('#form_login').on.submit.add(login);
  query('#logout').on.click.add(logout);
  query('#close').on.click.add(hideError);
}

/** 
 * Function that handles the login of a user. Takes the [user] and the 
 * [pass] from the html form and sends a POST request to the server.
 * If the user or password are incorrect shows an error message saying:
 * "User/password is incorrect".
 * On success hides the login form and shows the logout button
 */
void login(event){
  
  // Request creation, enabling the use of credentials for user identification
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/login/", true);
  req.withCredentials = true;
  
  // Retrieval of [username] and [pass]
  var user = query('#user_id').value;
  var pass = query('#pass_id').value;
  
  // Add an event handler to call the onSuccess function when the POST call is successful
  req.on.readyStateChange.add((Event e) {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status == 200) {        
        query('#log_form').style.display = 'none';
        
        query('#logged_user').style.display = '';
        query('#logged_user').text = user;
        
        query('#logout_button').style.display = '';
        hide_error(null);
      } 
      else if (req.status == 401) {
         query('#error_text').text = "User/password is incorrect";
         query('#error').style.display = '';
      }
    }
  });
  
  // Creation of a JSON object, containing the plain [user] and [pass]. *Not secure, should IMPROVE*
  var data = JSON.stringify({
      'username' : user,
      'password' : pass
  });
  
  // Send the request
  req.send(data);
  
  // Prevent to execute the default action for "submit"
  event.preventDefault();
}

/**
 * Function that handles the logout of a user. Sends a POST request asking the
 * server for a session termination, then hides the logout form and the query
 * that is being shown (if there is one), and shows the login form again
 */
void logout(event) {
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/logout/", true);
  req.withCredentials = true;
  req.send();
  
  query('#log_form').style.display = '';
  query('#logged_user').style.display = 'none';
  query('#logout_button').style.display = 'none';
  query('#content').style.display = 'none';
  hide_error(null);
}

/**
 * Function that creates a new query to the server. It does this via a POST
 * request with the city to look for, then, on success calls to the onSuccess
 * function with the response recieved. On error:
 * 
 * * If the user is not logged in shows a "User not logged in" message
 * * If the city is not found shows a "City not found" message
 */
void newQuery(event) {
  // Get the city name from the html form
  var city = query("#city").value;
  
  // Create and open a new request
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
  req.withCredentials = true;
  
  // Add an event handler to call the onSuccess function when the POST call is successful
  req.on.readyStateChange.add((Event e) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          var j = JSON.parse(req.responseText);
          if (j.containsKey("result_json")) {
            hide_error(null);
            onSuccess(j["result_json"]);
          }
          // City not found error handling
          else {
            query('#error_text').text = "City not found";
            query('#error').style.display = '';
          }
        }
        // Login error handling
        else if (req.status == 401) {
          query('#error_text').text = "User not logged in";
          query('#error').style.display = '';
        }
    }
  });
  
  // Set the content type of the call and send the data
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({'city': city}));

  // Prevent to execute the default action for "submit"
  event.preventDefault();
}

/** 
 * Function to call after a successful POST call. Shows the distinct forecast 
 * data in the corresponding elements of the html
 */
void onSuccess(var parsedJSON) {
  query('#content').style.display = '';
  query('#city_name').text = parsedJSON["data"]["request"][0]["query"];
  
  // Current condition
  var currentConditions = parsedJSON["data"]["current_condition"][0];
  query('#observationTime').text = currentConditions["observation_time"];
  query('#description1').text = currentConditions["weatherDesc"][0]["value"];
  query('#tCelsius').text = '${currentConditions["temp_C"]}ºC';
  query('#tFarenheit').text = '${currentConditions["temp_F"]}ºF';
  query('#humidity').text = '${currentConditions["humidity"]}%';
  query('#precipitation1').text = '${currentConditions["precipMM"]} MM';
  query('#cloudcover').text =  '${currentConditions["cloudcover"]}%';
  query('#visibility').text =  '${currentConditions["visibility"]}Km';
  query('#pressure').text =  currentConditions["pressure"];
  query('#windDirectionDegree1').text =  '${currentConditions["winddirDegree"]}º';
  query('#windDirection16Point1').text =  currentConditions["winddir16Point"];
  query('#windSpeedkmh1').text =  '${currentConditions["windspeedKmph"]}Kmph';
  query('#windSpeedMiles1').text =  '${currentConditions["windspeedMiles"]}Mph';
  query('#img1').src = currentConditions["weatherIconUrl"][0]["value"];
  
  // Today's forecast
  var weatherToday = parsedJSON["data"]["weather"][0];
  query('#dateToday').text = weatherToday["date"];
  query('#description2').text = weatherToday["weatherDesc"][0]["value"];
  query('#minTCelsius1').text = '${weatherToday["tempMinC"]}ºC';
  query('#minTFarenheit1').text = '${weatherToday["tempMinF"]}ºF';
  query('#maxTCelsius1').text = '${weatherToday["tempMaxC"]}ºC';
  query('#maxTFarenheit1').text = '${weatherToday["tempMaxF"]}ºF';
  query('#precipitation2').text = '${weatherToday["precipMM"]}MM';
  query('#windDirectionDegree2').text =  '${weatherToday["winddirDegree"]}º';
  query('#windDirection16Point2').text =  weatherToday["winddir16Point"];
  query('#windSpeedkmh2').text =  '${weatherToday["windspeedKmph"]}Kmph';
  query('#windSpeedMiles2').text =  '${weatherToday["windspeedMiles"]}Mph';
  query('#img2').src = weatherToday["weatherIconUrl"][0]["value"];
  
  // Tomorrow's forecast
  var weatherTomorrow = parsedJSON["data"]["weather"][1];
  query('#dateTomorrow').text = weatherTomorrow["date"];
  query('#description3').text = weatherTomorrow["weatherDesc"][0]["value"];
  query('#minTCelsius2').text = '${weatherTomorrow["tempMinC"]}ºC';
  query('#minTFarenheit2').text = '${weatherTomorrow["tempMinF"]}ºF';
  query('#maxTCelsius2').text = '${weatherTomorrow["tempMaxC"]}ºC';
  query('#maxTFarenheit2').text = '${weatherTomorrow["tempMaxF"]}ºF';
  query('#precipitation3').text = '${weatherTomorrow["precipMM"]}MM';
  query('#windDirectionDegree3').text =  '${weatherTomorrow["winddirDegree"]}º';
  query('#windDirection16Point3').text =  weatherTomorrow["winddir16Point"];
  query('#windSpeedkmh3').text =  '${weatherTomorrow["windspeedKmph"]}Kmph';
  query('#windSpeedMiles3').text =  '${weatherTomorrow["windspeedMiles"]}Mph';
  query('#img3').src = weatherTomorrow["weatherIconUrl"][0]["value"];
}

/** Handler that closes the error message. */
void hideError (event) {
  query('#error').style.display = 'none';
}
