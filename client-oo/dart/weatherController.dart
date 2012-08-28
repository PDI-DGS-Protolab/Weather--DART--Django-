
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
      
      model = new WeatherModel(this);
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
    
    model.login(view.user.value, view.pass.value);
  }
  
  /**
   * Asks the model to logout and changes the view accordingly
   */
  void logout(event) {
    model.logout();
    view.logoutView();
  }
  
  /**
   * Tells the model to make a new query to the server with data retrieved from 
   * the view
   */
  void newQuery(event) {
  // Prevent to execute the default action for "submit"
    event.preventDefault();
  
    model.newQuery(view.getCity());
  }
  
  /**
   * If the login success, calls the view to change accordingly. *Appropiate 
   * custom event treatment pending until development*
   */
  void loginSuccess() {
    view.loginSuccess();
  }
  
  /**
   * If the login fails, shows the corresponding error message. *Appropiate 
   * custom event treatment pending until development*
   */
  void loginError() {
    view.loginError();
  }
  
  /**
   * If a user that's not logged in tries to make a query shows the 
   * corresponding error message. *Appropiate custom event treatment pending 
   * until development*
   */
  void notLoggedInError() {
    view.notLoggedInError();
  }
  
  /**
   * If the city you ask for cannot be found shows the corresponding error 
   * message. *Appropiate custom event treatment pending until development*
   */
  void cityNotFoundError() {
    view.cityNotFoundError();
  }
  
  /**
   * After a succesful query changes the view to show all the data retrieved.
   * *Appropiate custom event treatment pending until development*
   */
  void showJson(j) {
    view.showJson(j);
  }

}