    function login_fun() {
        var user = document.getElementById("user_id").value;
        var pass = document.getElementById("pass_id").value;

        var req_login = new XMLHttpRequest();
        req_login.open("POST", "http://192.168.1.63:8000/weather/login/", true);
        req_login.setRequestHeader('Content-Type', 'application/json');
        req_login.withCredentials = true;
        req_login.onreadystatechange = function() {
            if (req_login.readyState == XMLHttpRequest.DONE) {
                if (req_login.status == 200) {        
                    document.getElementById("log_form").style.display = 'none';
                    document.getElementById("logged_user").style.display = 'block';
                    document.getElementById("logged_user").textContent = document.getElementById("user_id").value;
                    document.getElementById("logout_button").style.display = 'block';
                    document.getElementById("error").style.display = 'none';
                } 
                else if (req_login.status == 401) {
                    document.getElementById('error_text').textContent = "The user and/or the password are not correct";
                    document.getElementById('error').style.display="";
                }
            }
        }
        req_login.send(JSON.stringify({username: user, password: pass}));
    }

    function logout_fun() {
        var req_logout = new XMLHttpRequest();
        req_logout.open("POST", "http://192.168.1.63:8000/weather/logout/", true);
        req_logout.withCredentials = true;
        req_logout.send();

        document.getElementById('log_form').style.display = '';
        document.getElementById('logged_user').style.display = 'none';
        document.getElementById('logout_button').style.display = 'none';
        document.getElementById('content').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    }

    function search_fun() {
        var city = document.getElementById("city").value;

        var req_search = new XMLHttpRequest();
        req_search.open("POST", "http://192.168.1.63:8000/weather/querys/", true);
        req_search.setRequestHeader('Content-Type', 'application/json');
        req_search.withCredentials = true;
        req_search.onreadystatechange = function() {
            if (req_search.readyState == XMLHttpRequest.DONE) {
                if (req_search.status == 200) {
                    var j = JSON.parse(req_search.responseText);
                    if (j.hasOwnProperty("result_json")){
                        document.getElementById('error').style.display = 'none';
                        document.getElementById('content').style.display = '';
                        onSuccess(j["result_json"]);
                    } 
                    else {
                    document.getElementById('error_text').textContent = "City " + city + " not found";
                    document.getElementById('error').style.display = '';
                    }
                } 
                else if (req_search.status == 401) {
                    document.getElementById('error_text').textContent = "You are not logged in";
                    document.getElementById('error').style.display = '';
                }
            }   
        };
        req_search.send(JSON.stringify({city: city}));
    }

    function onSuccess(j) {
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

    document.getElementById("form_login").addEventListener('submit',  function (eventObject) { eventObject.preventDefault(); login_fun(); }, false);
    document.getElementById("formulary").addEventListener('submit',  function (eventObject) { search_fun(); eventObject.preventDefault(); }, false);
    document.getElementById("close").addEventListener('click',  function (eventObject) { hide_error();}, false);
    document.getElementById("logout").addEventListener('click',  function (eventObject) { logout_fun();}, false);
