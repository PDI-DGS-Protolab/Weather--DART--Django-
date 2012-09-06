class WeatherTest {
  
  WeatherModel model;
  WeatherView view;
  var json1, json2, jsonString1, jsonString2; 
  
  WeatherTest() {
    //Declaration of variables
    model = new WeatherModel();
    view = new WeatherView();
    jsonString1 = '{"data": {"current_condition": [{"windspeedMiles": "4", "winddirDegree": "50", "observation_time": "08:08 AM", "temp_F": "64", "temp_C": "18", "humidity": "68", "winddir16Point": "NE", "pressure": "1019", "precipMM": "0.0", "visibility": "10", "cloudcover": "0", "weatherCode": "113", "weatherDesc": [{"value": "Sunny"}], "windspeedKmph": "7", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "weather": [{"windspeedMiles": "9", "tempMaxC": "31", "tempMaxF": "87", "tempMinC": "17", "tempMinF": "63", "winddir16Point": "E", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "90", "winddirection": "E", "date": "2012-09-05", "windspeedKmph": "15", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}, {"windspeedMiles": "9", "tempMaxC": "31", "tempMaxF": "87", "tempMinC": "17", "tempMinF": "63", "winddir16Point": "SE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "129", "winddirection": "SE", "date": "2012-09-06", "windspeedKmph": "14", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "request": [{"query": "Madrid, Spain", "type": "City"}]}}';
    jsonString2 = '{"data": {"current_condition": [{"windspeedMiles": "7", "winddirDegree": "110", "observation_time": "08:18 AM", "temp_F": "77", "temp_C": "25", "humidity": "41", "winddir16Point": "ESE", "pressure": "1017", "precipMM": "0.0", "visibility": "10", "cloudcover": "0", "weatherCode": "113", "weatherDesc": [{"value": "Sunny"}], "windspeedKmph": "11", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "weather": [{"windspeedMiles": "6", "tempMaxC": "28", "tempMaxF": "83", "tempMinC": "15", "tempMinF": "59", "winddir16Point": "ESE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "102", "winddirection": "ESE", "date": "2012-09-05", "windspeedKmph": "10", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}, {"windspeedMiles": "5", "tempMaxC": "29", "tempMaxF": "84", "tempMinC": "16", "tempMinF": "61", "winddir16Point": "SE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "132", "winddirection": "SE", "date": "2012-09-06", "windspeedKmph": "8", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "request": [{"query": "Bucharest, Romania", "type": "City"}]}}';
    json1 = JSON.parse(jsonString1);
    json2 = JSON.parse(jsonString2);
    //Begin tests
    //testXHR(1000);
    //testView(10000);
    testJson(10000);
  }
  
  /**
   * Test efficiency in n calls to testLogin, testQuery and testQueryView
   */
  void testXHR(num n){
    testLogin(n);
  }
  
  /**
   * Tests efficiency in n calls to login
   */
  void testLogin(num n) {
    
    print('Executing $n calls to login...');
    var l = 0;
    var start = new Date.now();
    
    for (var i=0; i<n; i++){
      var req = model.login('admin', 'admin');
      req.on.readyStateChange.add((Event e) {
        if (req.readyState == XMLHttpRequest.DONE) {
          l++;
          if (l == n){
            var end = new Date.now();
            var elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            var average = elapsed / n;
            print('Average time for $n logins = $average ms');
            testQuery(n, 'Budapest');
          }
        }
      });
    }
  }
  
  /**
   * Tests efficiency in n calls to query without view update
   */
  void testQuery(num n, String city) {
    
    print('Executing $n calls to newQuery...');
    var q = 0;
    var start = new Date.now();
    
    for (var i=0; i<n; i++){
      var req = model.newQuery(city);
      req.on.readyStateChange.add((Event e) {
        if (req.readyState == XMLHttpRequest.DONE) {
          q++;
          if (q == n){
            var end = new Date.now();
            var elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            var average = elapsed / n;
            print('Average time for $n querys = $average ms');
            testQueryView(n, 'Yokohama', 'Madrid');          }
        }
      });
    }
  }
  
  /**
   * Tests efficiency in n calls to query with view update
   */
  void testQueryView(num n, String city1, String city2) {
    
    print('Executing $n calls to newQuery with view update...');
    var v = 0;
    var start = new Date.now();
    for (var i=0; i<n; i++){
      // Alternate the city to assure view changes
      var req;
      if (i % 2 == 0){
        req = model.newQuery(city1);
      }
      else {
        req = model.newQuery(city2);
      }
      req.on.readyStateChange.add((Event e) {
        if (req.readyState == XMLHttpRequest.DONE) {
          v++;
          if (req.status == 200) {
            var j = JSON.parse(req.responseText);
            view.showJson(j["result_json"]);
          }
          if (v == n){
            var end = new Date.now();
            var elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            var average = elapsed / n;
            print('Average time for $n querys with view update = $average ms');
          }
        }
      });
    }
  }
  
  /**
  *  Tests the efficiency of n view switches
  */
  testView(num n){
    var start = new Date.now();
    print('Executing $n view switches...');
    for(var i = 0; i < n; i++){
      view.showJson(json1);
      view.showJson(json2);
    }
    var end = new Date.now();
    var elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
    var average = elapsed / n;
    print('Average time for $n view switches = $average ms');
  }
  
  /**
  *  Tests the efficiency of n parses of the same json
  */
  testJson(num n){
    var start = new Date.now();
    print('Executing $n json parses...');
    for(var i = 0; i < n; i++){
      JSON.parse(jsonString1);
    }
    var end = new Date.now();
    var elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
    var average = elapsed / n;
    print('Average time for $n json parses = $average ms');
  }
}