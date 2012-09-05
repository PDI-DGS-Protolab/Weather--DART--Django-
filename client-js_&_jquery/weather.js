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
                    document.getElementById("error").style.display = 'none';
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
