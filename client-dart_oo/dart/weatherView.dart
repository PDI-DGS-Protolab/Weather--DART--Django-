class WeatherView {

  Element form, login, logout, close;
  InputElement user, pass;
  
  WeatherView() {
    this.form = query('#formulary');
    this.login = query('#form_login');
    this.logout = query('#logout');
    this.close = query('#close');
    this.user = query('#user_id');
    this.pass = query('#pass_id');
  }
  
  /** Shows the error message for when the queried city cannot be found. */
  void cityNotFoundError() {
    print('Error: City not found');
    query('#error_text').text = "City not found";
    query('#error').style.display = '';
  }
  
  /** Retrieves the city name. */
  String getCity() {
    // Get the city name from the html form
    return query("#city").value;
  }
  
  /** Banish the error message. */
  void hideError() {
    query('#error').style.display = 'none';
  }
  
  /** Shows the error message for a login error. */
  void loginError() {
    print("Error: User/password is incorrect");
    query('#error_text').text = "User/password is incorrect";
    query('#error').style.display = '';
  }
  
  /** Shows the correct style after a successful login. */
  void loginSuccess() {
    query('#log_form').style.display = 'none';
    
    query('#logged_user').style.display = '';
    query('#logged_user').text = user.value;
    
    query('#logout_button').style.display = '';
    query('#error').style.display = 'none';
  }
  
  /** Shows the correct style after a logout. */
  void logoutView() {
    query('#log_form').style.display = '';
    query('#logged_user').style.display = 'none';
    query('#logout_button').style.display = 'none';
    query('#content').style.display = 'none';
    query('#error').style.display = 'none';
  }
  
  /** Shows the error message for a non logged in user trying to make a query */
  void notLoggedInError() {
    print('Error: User not logged in');
    query('#error_text').text = "User not logged in";
    query('#error').style.display = '';
  }
  
  /** 
   * Shows the distinct forecast data in the corresponding elements of the html.
   */
  void showJson(var parsedJSON) {
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
}
