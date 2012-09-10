    function login() {
        var user = document.getElementById("user_id").value;
        var pass = document.getElementById("pass_id").value;

        var req = new XMLHttpRequest();
        req.open("POST", "http://192.168.1.63:8000/weather/login/", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.withCredentials = true;
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (req.status == 200) {        
                    document.getElementById("log_form").style.display = 'none';
                    document.getElementById("logged_user").style.display = 'block';
                    document.getElementById("logged_user").textContent = document.getElementById("user_id").value;
                    document.getElementById("logout_button").style.display = 'block';
                    hide_error();
                } 
                else if (req.status == 401) {
                    document.getElementById('error_text').textContent = "User/password is incorrect";
                    document.getElementById('error').style.display="";
                }
            }
        }
        req.send(JSON.stringify({username: user, password: pass}));
    }

    function logout() {
        var req = new XMLHttpRequest();
        req.open("POST", "http://192.168.1.63:8000/weather/logout/", true);
        req.withCredentials = true;
        req.send();

        document.getElementById('log_form').style.display = '';
        document.getElementById('logged_user').style.display = 'none';
        document.getElementById('logout_button').style.display = 'none';
        document.getElementById('content').style.display = 'none';
        hide_error();
    }

    function newQuery() {
        var city = document.getElementById("city").value;

        var req = new XMLHttpRequest();
        req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
        req.withCredentials = true;
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (req.status == 200) {
                    var j = JSON.parse(req.responseText);
                    if (j.hasOwnProperty("result_json")){
                        hide_error();
                        onSuccess(j["result_json"]);
                    } 
                    else {
                    document.getElementById('error_text').textContent = "City not found";
                    document.getElementById('error').style.display = '';
                    }
                } 
                else if (req.status == 401) {
                    document.getElementById('error_text').textContent = "User not logged in";
                    document.getElementById('error').style.display = '';
                }
            }   
        };
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({city: city}));
    }

    function onSuccess(j) {
        document.getElementById('content').style.display = '';
        document.getElementById('city_name').textContent = j["data"]["request"][0]["query"];

        // Current condition
        var currentConditions = j["data"]["current_condition"][0];
        document.getElementById('observationTime').textContent = currentConditions["observation_time"];
        document.getElementById('description1').textContent = currentConditions["weatherDesc"][0]["value"];
        document.getElementById('tCelsius').textContent = currentConditions["temp_C"] + 'ºC';
        document.getElementById('tFarenheit').textContent = currentConditions["temp_F"]+ 'ºF';
        document.getElementById('humidity').textContent = currentConditions["humidity"]+ '%';
        document.getElementById('precipitation1').textContent = currentConditions["precipMM"]+ ' MM';
        document.getElementById('cloudcover').textContent =  currentConditions["cloudcover"]+ '%';
        document.getElementById('visibility').textContent =  currentConditions["visibility"]+ 'Km';
        document.getElementById('pressure').textContent =  currentConditions["pressure"];
        document.getElementById('windDirectionDegree1').textContent =  currentConditions["winddirDegree"]+ 'º';
        document.getElementById('windDirection16Point1').textContent =  currentConditions["winddir16Point"];
        document.getElementById('windSpeedkmh1').textContent =  currentConditions["windspeedKmph"]+ 'Kmph';
        document.getElementById('windSpeedMiles1').textContent =  currentConditions["windspeedMiles"]+ 'Mph';
        document.getElementById('img1').src = currentConditions["weatherIconUrl"][0]["value"];

        // Today's forecast
        var weatherToday = j["data"]["weather"][0];
        document.getElementById('dateToday').textContent = weatherToday["date"];
        document.getElementById('description2').textContent = weatherToday["weatherDesc"][0]["value"];
        document.getElementById('minTCelsius1').textContent = weatherToday["tempMinC"]+ 'ºC';
        document.getElementById('minTFarenheit1').textContent = weatherToday["tempMinF"]+ 'ºF';
        document.getElementById('maxTCelsius1').textContent = weatherToday["tempMaxC"]+ 'ºC';
        document.getElementById('maxTFarenheit1').textContent = weatherToday["tempMaxF"]+ 'ºF';
        document.getElementById('precipitation2').textContent = weatherToday["precipMM"]+ 'MM';
        document.getElementById('windDirectionDegree2').textContent =  weatherToday["winddirDegree"]+ 'º';
        document.getElementById('windDirection16Point2').textContent =  weatherToday["winddir16Point"];
        document.getElementById('windSpeedkmh2').textContent =  weatherToday["windspeedKmph"]+ 'Kmph';
        document.getElementById('windSpeedMiles2').textContent =  weatherToday["windspeedMiles"]+ 'Mph';
        document.getElementById('img2').src = weatherToday["weatherIconUrl"][0]["value"];

        // Tomorrow's forecast
        var weatherTomorrow = j["data"]["weather"][1];
        document.getElementById('dateTomorrow').textContent = weatherTomorrow["date"];
        document.getElementById('description3').textContent = weatherTomorrow["weatherDesc"][0]["value"];
        document.getElementById('minTCelsius2').textContent = weatherTomorrow["tempMinC"]+ 'ºC';
        document.getElementById('minTFarenheit2').textContent = weatherTomorrow["tempMinF"]+ 'ºF';
        document.getElementById('maxTCelsius2').textContent = weatherTomorrow["tempMaxC"]+ 'ºC';
        document.getElementById('maxTFarenheit2').textContent = weatherTomorrow["tempMaxF"]+ 'ºF';
        document.getElementById('precipitation3').textContent = weatherTomorrow["precipMM"]+ 'MM';
        document.getElementById('windDirectionDegree3').textContent =  weatherTomorrow["winddirDegree"]+ 'º';
        document.getElementById('windDirection16Point3').textContent =  weatherTomorrow["winddir16Point"];
        document.getElementById('windSpeedkmh3').textContent =  weatherTomorrow["windspeedKmph"]+ 'Kmph';
        document.getElementById('windSpeedMiles3').textContent =  weatherTomorrow["windspeedMiles"]+ 'Mph';
        document.getElementById('img3').src = weatherTomorrow["weatherIconUrl"][0]["value"];
    }

    function hide_error() {
        document.getElementById('error').style.display = 'none';
    }

    document.getElementById("form_login").addEventListener('submit',  function (eventObject) { eventObject.preventDefault(); login(); }, false);
    document.getElementById("formulary").addEventListener('submit',  function (eventObject) { newQuery(); eventObject.preventDefault(); }, false);
    document.getElementById("close").addEventListener('click',  function (eventObject) { hide_error();}, false);
    document.getElementById("logout").addEventListener('click',  function (eventObject) { logout();}, false);
    
    
//************************************TESTING************************************

    function test() {
        var jsonString1 = '{"data": {"current_condition": [{"windspeedMiles": "4", "winddirDegree": "50", "observation_time": "08:08 AM", "temp_F": "64", "temp_C": "18", "humidity": "68", "winddir16Point": "NE", "pressure": "1019", "precipMM": "0.0", "visibility": "10", "cloudcover": "0", "weatherCode": "113", "weatherDesc": [{"value": "Sunny"}], "windspeedKmph": "7", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "weather": [{"windspeedMiles": "9", "tempMaxC": "31", "tempMaxF": "87", "tempMinC": "17", "tempMinF": "63", "winddir16Point": "E", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "90", "winddirection": "E", "date": "2012-09-05", "windspeedKmph": "15", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}, {"windspeedMiles": "9", "tempMaxC": "31", "tempMaxF": "87", "tempMinC": "17", "tempMinF": "63", "winddir16Point": "SE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "129", "winddirection": "SE", "date": "2012-09-06", "windspeedKmph": "14", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "request": [{"query": "Madrid, Spain", "type": "City"}]}}';
        var jsonString2 = '{"data": {"current_condition": [{"windspeedMiles": "7", "winddirDegree": "110", "observation_time": "08:18 AM", "temp_F": "77", "temp_C": "25", "humidity": "41", "winddir16Point": "ESE", "pressure": "1017", "precipMM": "0.0", "visibility": "10", "cloudcover": "0", "weatherCode": "113", "weatherDesc": [{"value": "Sunny"}], "windspeedKmph": "11", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "weather": [{"windspeedMiles": "6", "tempMaxC": "28", "tempMaxF": "83", "tempMinC": "15", "tempMinF": "59", "winddir16Point": "ESE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "102", "winddirection": "ESE", "date": "2012-09-05", "windspeedKmph": "10", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}, {"windspeedMiles": "5", "tempMaxC": "29", "tempMaxF": "84", "tempMinC": "16", "tempMinF": "61", "winddir16Point": "SE", "weatherCode": "113", "precipMM": "0.0", "weatherDesc": [{"value": "Sunny"}], "winddirDegree": "132", "winddirection": "SE", "date": "2012-09-06", "windspeedKmph": "8", "weatherIconUrl": [{"value": "http://www.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}]}], "request": [{"query": "Bucharest, Romania", "type": "City"}]}}';
        var json1 = JSON.parse(jsonString1);
        var json2 = JSON.parse(jsonString2);
        testView(json1, json2, 10000);
        testJson(jsonString1, 10000);
        testXHR(1000);
    }
    
    function testXHR(n) {
        testLogin(n, "admin", "admin");
    }
    
    function testLogin(n, user, pass) {
    
        var json = {
            username : user,
            password : pass
        };

        var URL = "http://192.168.1.63:8000/weather/login/";
		
        console.log('Executing ' + n + ' calls to login...');
        var l = 0;
        var start = new Date().getTime();
		for (var i=0; i<n; i++){
		    var req = new XMLHttpRequest();
            req.open("POST", "http://192.168.1.63:8000/weather/login/", true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.withCredentials = true;
            req.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    l++;
                    if (l == n){
                        var end = new Date().getTime();
                        var elapsed = end - start;
                        var average = elapsed / n;
                        console.log('Average time for ' + n + ' logins = ' + average + ' ms');
                        testQuery(n, "Budapest");
                    }
                }
            };
            req.send(JSON.stringify(json));
        }
    }
    
    function testQuery(n, city) {
	    
        var json = {
            city : city
        };
		
		var URL = "http://192.168.1.63:8000/weather/querys/";
		
		console.log('Executing ' + n + ' calls to newQuery...');
        var q = 0;
        var start = new Date().getTime();

        for (var i=0; i<n; i++){
		    var req = new XMLHttpRequest();
            req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
            req.withCredentials = true;
            req.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    q++;
                    if (q == n){
                        var end = new Date().getTime();
                        var elapsed = end - start;
                        var average = elapsed / n;
                        console.log('Average time for ' + n + ' querys = ' + average + ' ms');
                        testQueryView(n, "Yokohama", "Madrid");
                    }
                }
		    };
		    req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(json));
		}
    } 
    
    function testQueryView(n, city1, city2) {
	    
	    var json;
        var json1 = {
            city : city1
        };
        var json2 = {
            city : city2
        };
		
		var URL = "http://192.168.1.63:8000/weather/querys/";
		
		console.log('Executing ' + n + ' calls to newQuery with view update...');
        var v = 0;
        var start = new Date().getTime();
        for (var i=0; i<n; i++){
            if (i % 2 == 0){
                json = json1;
            }
            else {
                json = json2;
            }
            var req = new XMLHttpRequest();
            req.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
            req.withCredentials = true;
            req.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        var j = JSON.parse(this.responseText);
                        if (j.hasOwnProperty("result_json")){
                            hide_error();
                            onSuccess(j["result_json"]);
                        } 
                        else {
                        document.getElementById('error_text').textContent = "City not found";
                        document.getElementById('error').style.display = '';
                        }
                    }
                    v++;
                    if (v == n){
                        var end = new Date().getTime();
                        var elapsed = end - start;
                        var average = elapsed / n;
                        console.log('Average time for ' + n + ' querys with view update = ' + average + ' ms');
                    }
                }
		    };
		    req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(json));
        }
    } 
    
    function testView(json1,json2, n){
        var start = new Date().getTime();
        console.log('Executing ' + n + ' view switches...');
        for(var i = 0; i < n; i++){
            onSuccess(json1);
            onSuccess(json2);
        }
        var end = new Date().getTime();
        var elapsed = end - start;
        var average = elapsed / n;
        console.log('Average time for ' + n + ' view switches = ' + average + ' ms');
    }
    
    function testJson(jsonString1, n){
        var start = new Date().getTime();
        console.log('Executing ' + n + ' json parses...');
        for(var i = 0; i < n; i++){
            JSON.parse(jsonString1);
        }
        var end = new Date().getTime();
        var elapsed = end - start;
        var average = elapsed / n;
        console.log('Average time for ' + n + ' json parses = ' + average + ' ms');
    }
    
    // Test event handler
    window.addEventListener("keypress",  function (event) {
        if (event.which == 13) {
            test();
        }
    }, false);

