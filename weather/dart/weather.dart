#import('dart:html');
#import('dart:json');

void main() {
  //query('#content').hidden = true;
  query('#formulary').on.submit.add(newQuery);
}

void newQuery(event) {
  // Get the city name from the html form
  InputElement input = query("#city");
  var city = input.value;
  
  // Create and open a new request
  XMLHttpRequest req = new XMLHttpRequest();
  req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
  
  // Add an event handler to call the onSuccess function when the POST call is successful
  req.on.readyStateChange.add((Event e) {
    if (req.readyState == XMLHttpRequest.DONE && (req.status == 200)) {
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
  print(req.status);
  //showMessage(req.responseText);
  //query('#content').hidden = false;
  
  DivElement div = query('#content');
  div.style.display='';
  query('#result').text = req.responseText;
}

// Function that shows the desired message in the corresponding element
void showMessage(String message) {
  var textElement = query('#result');

  textElement.text = message;
}