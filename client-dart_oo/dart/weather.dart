#library("weather");

#import('dart:html');
#import('dart:json');

#source('weatherController.dart');
#source('weatherView.dart');
#source('weatherModel.dart');

// Used for testing purposes
#source('weatherTest.dart');

/** Main function. Intializes all the buttons and fucntions for future use. */
void main() {
  var c = new WeatherController();
  
  // Used for testing purposes
//  document.on.keyPress.add((KeyboardEvent e) {
//    if (e.keyCode == 13) {
//      var t = new WeatherTest();
//    }
//  });
  
}
