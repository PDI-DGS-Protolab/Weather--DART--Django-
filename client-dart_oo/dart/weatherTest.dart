class WeatherTest {
  
  WeatherModel model;
  WeatherView view;
  var start, end, elapsed, average, l,q,v;
  
  WeatherTest() {
    model = new WeatherModel();
    view = new WeatherView();
    testLogin(1000);
//    testQuery(1000, 'Budapest');
//    testQueryView(1000, 'Yokohama', 'Madrid');
  }
  
  /**
   * Tests efficiency in n calls to login
   */
  void testLogin(num n) {
    
    print('Executing $n calls to login...');
    l = 0;
    start = new Date.now();
    
    for (var i=0; i<n; i++){
      var req = model.login('admin', 'admin');
      req.on.readyStateChange.add((Event e) {
        if (req.readyState == XMLHttpRequest.DONE) {
          l++;
          if (l == n){
            end = new Date.now();
            elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            average = elapsed / n;
            print('Average time for $n logins = $average ms');
            testQuery(1000, 'Budapest');
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
    q = 0;
    start = new Date.now();
    
    for (var i=0; i<n; i++){
      var req = model.newQuery(city);
      req.on.readyStateChange.add((Event e) {
        if (req.readyState == XMLHttpRequest.DONE) {
          q++;
          if (q == n){
            end = new Date.now();
            elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            average = elapsed / n;
            print('Average time for $n querys = $average ms');
            testQueryView(1000, 'Yokohama', 'Madrid');          }
        }
      });
    }
  }
  
  /**
   * Tests efficiency in n calls to query with view update
   */
  void testQueryView(num n, String city1, String city2) {
    
    print('Executing $n calls to newQuery with view update...');
    v = 0;
    start = new Date.now();
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
            end = new Date.now();
            elapsed = end.millisecondsSinceEpoch - start.millisecondsSinceEpoch;
            average = elapsed / n;
            print('Average time for $n querys with view update = $average ms');
          }
        }
      });
    }
  }
}