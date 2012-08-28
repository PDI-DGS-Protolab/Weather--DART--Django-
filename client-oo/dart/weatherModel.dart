class WeatherModel {
  
  WeatherController controller;
  
  WeatherModel(controller) {
    this.controller = controller; 
  }
  
  /** 
   * Function that handles the login of a user. Takes the [user] and the 
   * [pass] given by the controller and sends a POST request to the server.
   * On success calls the controller to hide the login form and show the logout
   * button.
   * On failure shows an error message saying:"User/password is incorrect".
   */
  void login(String user, String pass){

    // Request creation, enabling the use of credentials for user identification
    // HttpRequests are still under development, so it has to be done this way.
    XMLHttpRequest req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.63:8000/weather/login/", true);
    req.withCredentials = true;
    
    // Add an event handler to call the onSuccess function when the POST call is 
    // successful
    req.on.readyStateChange.add((Event e) {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          // Calling the controller is a horrible work-around. It should send a
          // custom event for the controller to handle (not yet developed by google).
          controller.loginSuccess();
        } 
        else if (req.status == 401) {
          // Calling the controller is a horrible work-around. It should send a
          // custom event for the controller to handle (not yet developed by google).
          controller.loginError();
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
  }
  
  /**
   * Function that handles the logout of a user. Sends a POST request asking the
   * server for a session termination, then hides the logout form and the query
   * that is being shown (if there is one), and shows the login form again
   */
  void logout() {
    // Request a logout from the system
    // HttpRequests are still under development, so it has to be done this way.
    XMLHttpRequest req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.63:8000/weather/logout/", true);
    req.withCredentials = true;
    req.send();
  }
  
  /**
   * Function that creates a new query to the server. It does this via a POST
   * request with the city to look for, then, on success calls to the showJson
   * function with the response recieved. On error:
   * 
   * * If the user is not logged in shows a "User not logged in" message
   * * If the city is not found shows a "City not found" message
   */
  void newQuery(String city) {
    
    // Create and open a new request
    // HttpRequests are still under development, so it has to be done this way.
    XMLHttpRequest req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
    req.withCredentials = true;
    
    // Add an event handler to call the onSuccess function when the POST call is successful
    req.on.readyStateChange.add((Event e) {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          onSuccess(req.responseText);
        }
        // Login error handling
        else if (req.status == 401) {
          // Calling the controller is a horrible work-around. It should send a
          // custom event for the controller to handle (not yet developed by google).
          controller.notLoggedInError();
        }
    }
  });
  
  // Set the content type of the call and send the data
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({'city': city}));
  }
  
  /** Function to call after a successful POST call. Calls the showJson function 
   * to display the response in the html view
   */
  void onSuccess(String req) {
    var j = JSON.parse(req);
    if (j.containsKey("result_json")) {
      // Calling the controller is a horrible work-around. It should send a
      // custom event for the controller to handle (not yet developed by google).
      controller.hideError(null);
      controller.showJson(j["result_json"]);
    }
    // City not found error handling
    else {
      // Calling the controller is a horrible work-around. It should send a
      // custom event for the controller to handle (not yet developed by google).
      controller.cityNotFoundError();
    }
  }
}
