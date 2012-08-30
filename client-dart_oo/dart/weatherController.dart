
/**
 * Controller class. This class decide what is the next step to be taken by
 * the program.
 */
class WeatherController {

  WeatherView view;
  WeatherModel model;
  
  
  /**
   * Constructor of the class. Creates a new instance of view and model, and 
   * defines the initial event listeners.
   */
  WeatherController() {
      view = new WeatherView();
      view.form.on.submit.add(newQuery);
      view.login.on.submit.add(login);
      view.logout.on.click.add(logout);
      view.close.on.click.add(hideError);
      
      model = new WeatherModel();
  }
  
  /**
   * Calls the view to hide the error message
   */  
  void hideError(event) {
    view.hideError();
  }
  
  /**
   * Asks the model to try a login
   */
  void login(event) {
  //  Prevent to execute the default action for "submit"
    event.preventDefault();
    
    var req = model.login(view.user.value, view.pass.value);
    
    // Add an event handler to call the onSuccess function when the POST call is 
    // successful
    req.on.readyStateChange.add((Event e) {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          // Calling the controller is a horrible work-around. It should send a
          // custom event for the controller to handle (not yet developed by google).
          view.loginSuccess();
        } 
        else if (req.status == 401) {
          // Calling the controller is a horrible work-around. It should send a
          // custom event for the controller to handle (not yet developed by google).
          view.loginError();
        }
      }
    });
  }
  
  /**
   * Asks the model to logout and changes the view accordingly
   */
  void logout(event) {
    var req = model.logout();
    req.on.readyStateChange.add((Event e) {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          view.logoutView();
        }
        else {
          print('Logout Error');
        }
      }
    });
  }
  
  /**
   * Tells the model to make a new query to the server with data retrieved from 
   * the view
   */
  void newQuery(event) {
  // Prevent to execute the default action for "submit"
    event.preventDefault();
  
    var req = model.newQuery(view.getCity());
    
    // Add an event handler to call the onSuccess function when the POST call is successful
    req.on.readyStateChange.add((Event e) {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          var j = JSON.parse(req.responseText);
            if (j.containsKey("result_json")) {
              view.hideError();
              view.showJson(j["result_json"]);
            }
            // City not found error handling
            else {
              view.cityNotFoundError();
            }
          }
        // Login error handling
        else if (req.status == 401) {
          view.notLoggedInError();
        }
      } 
    });
  }
}