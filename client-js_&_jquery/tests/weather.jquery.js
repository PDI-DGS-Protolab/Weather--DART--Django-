    function login(event) {

        event.preventDefault();

        var json = {
            username : $('#user_id').val(),
            password : $('#pass_id').val()
        };
		
		var URL = "http://192.168.1.63:8000/weather/login/";
		$.ajax({
                url : URL,
                type: "POST",	
                data: JSON.stringify(json),
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                }, 
        }).success(function(res) {
                    $('#log_form').css({ 'display' : 'none' });
                    $('#logged_user').css({ 'display' : 'block' });
                    $('#logged_user').text( json.username );
                    $('#logout_button').css({ 'display' : 'block' });
                    hide_error();
         }).error(function(res) {
                    $('#error_text').text("User/password is incorrect");
                    $('#error').css({ 'display' : '' });
		});
    }


    function logout(event) {
        event.preventDefault();
		var URL = "http://192.168.1.63:8000/weather/logout/";
		$.ajax({
                url : URL,
                type: "POST",
                xhrFields: {
                    withCredentials: true
                }
		}).success(function(res) {
	    console.log(res);
            $('#log_form').css({ 'display' : '' });
            $('#logged_user').css({ 'display' : 'none' });
            $('#logout_button').css({ 'display' : 'none' });
            $('#content').css({ 'display' : 'none' });
            hide_error();
        }).error(function(res) {
        console.log(res);	  
        });
    }


    function newQuery(event) {
	
        event.preventDefault();
        var city1 = $('#city').val();
        var json = {
            city : city1
        };
		
		var URL = "http://192.168.1.63:8000/weather/querys/";
		$.ajax({
                url : URL,
                type: "POST",	
                data: JSON.stringify(json),
                contentType: "application/json",
    		    xhrFields: {
                    withCredentials: true
                }
        }).success(function(j) {
            if (j.hasOwnProperty("result_json")){
                hide_error();
                onSuccess(j["result_json"]);
            }
            else {
                $('#error_text').text("City not found");
                $('#error').css({ 'display' : '' });
            }

        }).error(function(res) {
            $('#error_text').text("User not logged in");
            $('#error').css({ 'display' : '' });
        });
		
    } 
	

    function onSuccess(json) {
        $('#content').css({ 'display' : '' });
        $('#city_name').text( json["data"]["request"][0]["query"] );
    	  
        // Current condition
        var currentConditions = json["data"]["current_condition"][0];
        $('#observationTime').text( currentConditions["observation_time"] );
        $('#description1').text( currentConditions["weatherDesc"][0]["value"] );
        $('#tCelsius').text( currentConditions["temp_C"] + 'ºC' );
        $('#tFarenheit').text( currentConditions["temp_F"]+ 'ºF' );
        $('#humidity').text( currentConditions["humidity"]+ '%' );
        $('#precipitation1').text( currentConditions["precipMM"]+ ' MM' );
        $('#cloudcover').text( currentConditions["cloudcover"]+ '%' );
        $('#visibility').text( currentConditions["visibility"]+ 'Km' );
        $('#pressure').text( currentConditions["pressure"] );
        $('#windDirectionDegree1').text( currentConditions["winddirDegree"]+ 'º' );
        $('#windDirection16Point1').text( currentConditions["winddir16Point"] );
        $('#windSpeedkmh1').text( currentConditions["windspeedKmph"]+ 'Kmph' );
        $('#windSpeedMiles1').text( currentConditions["windspeedMiles"]+ 'Mph' );       
        $('#img1').attr("src",currentConditions["weatherIconUrl"][0]["value"]);
     
		 
        // Today's forecast
        var weatherToday = json["data"]["weather"][0];      
        $('#dateToday').text( weatherToday["date"] );
        $('#description2').text( weatherToday["weatherDesc"][0]["value"] );
        $('#minTCelsius1').text( weatherToday["tempMinC"]+ 'ºC' );
        $('#minTFarenheit1').text( weatherToday["tempMinF"]+ 'ºF' );
        $('#maxTCelsius1').text( weatherToday["tempMaxC"]+ 'ºC' );
        $('#maxTFarenheit1').text( weatherToday["tempMaxF"]+ 'ºF' );
        $('#precipitation2').text( weatherToday["precipMM"]+ 'MM' );
        $('#windDirectionDegree2').text( weatherToday["winddirDegree"]+ 'º' );
        $('#windDirection16Point2').text( weatherToday["winddir16Point"] );
        $('#windSpeedkmh2').text( weatherToday["windspeedKmph"]+ 'Kmph' );
        $('#windSpeedMiles2').text( weatherToday["windspeedMiles"]+ 'Mph' );        
        $('#img2').attr("src",weatherToday["weatherIconUrl"][0]["value"]);
		

        // Tomorrow's forecast
        var weatherTomorrow = json["data"]["weather"][1];
        $('#dateTomorrow').text( weatherTomorrow["date"] );
        $('#description3').text( weatherTomorrow["weatherDesc"][0]["value"] );
        $('#minTCelsius2').text( weatherTomorrow["tempMinC"]+ 'ºC' );
       	$('#minTFarenheit2').text( weatherTomorrow["tempMinF"]+ 'ºF' );
        $('#maxTCelsius2').text( weatherTomorrow["tempMaxC"]+ 'ºC' );
        $('#maxTFarenheit2').text( weatherTomorrow["tempMaxF"]+ 'ºF' );
        $('#precipitation3').text( weatherTomorrow["precipMM"]+ 'MM' );
        $('#windDirectionDegree3').text( weatherTomorrow["winddirDegree"]+ 'º' );
        $('#windDirection16Point3').text( weatherTomorrow["winddir16Point"] );
        $('#windSpeedkmh3').text( weatherTomorrow["windspeedKmph"]+ 'Kmph' );
        $('#windSpeedMiles3').text( weatherTomorrow["windspeedMiles"]+ 'Mph' );       
       	$('#img3').attr("src",weatherTomorrow["weatherIconUrl"][0]["value"]);
    }


    function hide_error() {
        $('#error').css({ 'display' : 'none' });
    }
	
	
    // Event Handlers Assignment
    $('#form_login').on('submit', login);
    $('#formulary').on('submit', newQuery);
    $('#close').on('click', hide_error);
    $('#logout').on('click', logout);


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
        var start = $.now();
		for (var i=0; i<n; i++){
		    $.ajax({
                    url : URL,
                    type: "POST",	
                    data: JSON.stringify(json),
                    contentType: "application/json",
                    xhrFields: {
                        withCredentials: true
                    }, 
            }).always(function(res) {
                l++;
                if (l == n){
                    var end = $.now();
                    var elapsed = end - start;
                    var average = elapsed / n;
                    console.log('Average time for ' + n + ' logins = ' + average + ' ms');
                    testQuery(n, "Budapest");
                }
		    });
		}
    }
    
    function testQuery(n, city) {
	    
        var json = {
            city : city
        };
		
		var URL = "http://192.168.1.63:8000/weather/querys/";
		
		console.log('Executing ' + n + ' calls to newQuery...');
        var q = 0;
        var start = $.now();
        for (var i=0; i<n; i++){
		    $.ajax({
                    url : URL,
                    type: "POST",	
                    data: JSON.stringify(json),
                    contentType: "application/json",
        		    xhrFields: {
                        withCredentials: true
                    }
            }).always(function(res) {
                q++;
                if (q == n){
                    var end = $.now();
                    var elapsed = end - start;
                    var average = elapsed / n;
                    console.log('Average time for ' + n + ' querys = ' + average + ' ms');
                    testQueryView(n, "Yokohama", "Madrid");
                }
            });
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
        var start = $.now();
        for (var i=0; i<n; i++){
            if (i % 2 == 0){
                json = json1;
            }
            else {
                json = json2;
            }
		    $.ajax({
                    url : URL,
                    type: "POST",	
                    data: JSON.stringify(json),
                    contentType: "application/json",
        		    xhrFields: {
                        withCredentials: true
                    }
            }).success(function(j) {
                if (j.hasOwnProperty("result_json")){
                    hide_error();
                    onSuccess(j["result_json"]);
                }
                else {
                    $('#error_text').text("City not found");
                    $('#error').css({ 'display' : '' });
                }

            }).always(function(res) {
                v++;
                if (v == n){
                    var end = $.now();
                    var elapsed = end - start;
                    var average = elapsed / n;
                    console.log('Average time for ' + n + ' querys with view update = ' + average + ' ms');
                }
            });
		}
    } 
    
    function testView(json1, json2, n){
        var start = $.now();
        console.log('Executing ' + n + ' view switches...');
        for(var i = 0; i < n; i++){
            onSuccess(json1);
            onSuccess(json2);
        }
        var end = $.now();
        var elapsed = end - start;
        var average = elapsed / n;
        console.log('Average time for ' + n + ' view switches = ' + average + ' ms');
    }
    
    function testJson(jsonString1, n){
        var start = $.now();
        console.log('Executing ' + n + ' json parses...');
        for(var i = 0; i < n; i++){
            JSON.parse(jsonString1);
        }
        var end = $.now();
        var elapsed = end - start;
        var average = elapsed / n;
        console.log('Average time for ' + n + ' json parses = ' + average + ' ms');
    }
    
    // Test event handler
    $(document).keypress(function(event) {
        if (event.which == 13) {
            test();
        }
    });

