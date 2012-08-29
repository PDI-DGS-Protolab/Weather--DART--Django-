
	function login_fun() {
    	var json = {
    	    user : $("user_id").text(),
    	    pass : $("pass_id").text()
    	};
  		
  		$.post("http://127.0.0.1:8000/weather/login", json)
  		    .success(function() {
					$("log_form").style.display = 'none';
					$("logged_user").style.display = 'block';
					$("logged_user").textContent = $("user_id").value;
					$("logout_button").style.display = 'block';
					$("error").style.display = 'none';
  		    }).failure(function() {
		 			$('error_text').textContent = "The user and/or the password are not correct";
		 			$('error').style.display="";
  		    });
  	}

	function logout_fun() {
    	$.post("http://127.0.0.1:8000/weather/logout", {}, function() {
    		  $('log_form').style.display = '';
	          $('logged_user').style.display = 'none';
	          $('logout_button').style.display = 'none';
	          $('content').style.display = 'none';
	          $('error').style.display = 'none';
    	});
	
	  // Poner equivalente a : req_logout.withCredentials = true;
	  
	}

	function search_fun() {

		var city = $("city").value;
		  
		// Create and open a new request
		var req_search = new XMLHttpRequest();
		req_search.open("GET", "http://127.0.0.1:8000/weather/" + city +"/", true);
		req_search.withCredentials = true;
		req_search.onreadystatechange = function() {
			// Add an event handler to call the onSuccess function when the POST call is successful
			if (req_search.readyState == XMLHttpRequest.DONE) {
				if (req_search.status == 200) {
					$('error').style.display = 'none';
					$('content').style.display = '';
			 		onSuccess(req_search.responseText);
			     	} else if (req_search.status == 404) {
					$('error_text').textContent = "City " + city + " not found";
			 		$('error').style.display = '';
			     	} else if (req_search.status == 403) {
			 		$('error_text').textContent = "You are not logged in";
			 		$('error').style.display = '';
			 	}
			}
		};

		// Set the content type of the call and send the data
		req_search.send();

	}

	function onSuccess(json) {
		var parsedJSON = JSON.parse(json);

		$('city_name').textContent = parsedJSON["data"]["request"][0]["query"];
		  
		// Current condition
		var currentConditions = parsedJSON["data"]["current_condition"][0];
		
		$('observationTime').text(currentConditions["observation_time"]);
		
		$('description1').textContent = currentConditions["weatherDesc"][0]["value"];
		$('tCelsius').textContent = currentConditions["temp_C"] + 'ºC';
		$('tFarenheit').textContent = currentConditions["temp_F"]+ 'ºF';
		$('humidity').textContent = currentConditions["humidity"]+ '%';
		$('precipitation1').textContent = currentConditions["precipMM"]+ ' MM';
		$('cloudcover').textContent =  currentConditions["cloudcover"]+ '%';
		$('visibility').textContent =  currentConditions["visibility"]+ 'Km';
		$('pressure').textContent =  currentConditions["pressure"];
		$('windDirectionDegree1').textContent =  currentConditions["winddirDegree"]+ 'º';
		$('windDirection16Point1').textContent =  currentConditions["winddir16Point"];
		$('windSpeedkmh1').textContent =  currentConditions["windspeedKmph"]+ 'Kmph';
		$('windSpeedMiles1').textContent =  currentConditions["windspeedMiles"]+ 'Mph';
		$('img1').src = currentConditions["weatherIconUrl"][0]["value"];
		 
		// Today's forecast
		var weatherToday = parsedJSON["data"]["weather"][0];
		$('dateToday').textContent = weatherToday["date"];
		$('description2').textContent = weatherToday["weatherDesc"][0]["value"];
		$('minTCelsius1').textContent = weatherToday["tempMinC"]+ 'ºC';
		$('minTFarenheit1').textContent = weatherToday["tempMinF"]+ 'ºF';
		$('maxTCelsius1').textContent = weatherToday["tempMaxC"]+ 'ºC';
		$('maxTFarenheit1').textContent = weatherToday["tempMaxF"]+ 'ºF';
		$('precipitation2').textContent = weatherToday["precipMM"]+ 'MM';
		$('windDirectionDegree2').textContent =  weatherToday["winddirDegree"]+ 'º';
		$('windDirection16Point2').textContent =  weatherToday["winddir16Point"];
		$('windSpeedkmh2').textContent =  weatherToday["windspeedKmph"]+ 'Kmph';
		$('windSpeedMiles2').textContent =  weatherToday["windspeedMiles"]+ 'Mph';
		$('img2').src = weatherToday["weatherIconUrl"][0]["value"];
		  
		// Tomorrow's forecast
		var weatherTomorrow = parsedJSON["data"]["weather"][1];
		$('dateTomorrow').textContent = weatherTomorrow["date"];
		$('description3').textContent = weatherTomorrow["weatherDesc"][0]["value"];
		$('minTCelsius2').textContent = weatherTomorrow["tempMinC"]+ 'ºC';
		$('minTFarenheit2').textContent = weatherTomorrow["tempMinF"]+ 'ºF';
		$('maxTCelsius2').textContent = weatherTomorrow["tempMaxC"]+ 'ºC';
		$('maxTFarenheit2').textContent = weatherTomorrow["tempMaxF"]+ 'ºF';
		$('precipitation3').textContent = weatherTomorrow["precipMM"]+ 'MM';
		$('windDirectionDegree3').textContent =  weatherTomorrow["winddirDegree"]+ 'º';
		$('windDirection16Point3').textContent =  weatherTomorrow["winddir16Point"];
		$('windSpeedkmh3').textContent =  weatherTomorrow["windspeedKmph"]+ 'Kmph';
		$('windSpeedMiles3').textContent =  weatherTomorrow["windspeedMiles"]+ 'Mph';
		$('img3').src = weatherTomorrow["weatherIconUrl"][0]["value"];
	}

	function hide_error() {
		$('error').style.display = 'none';
	}
	
	$("formu_login").on('submit', login_fun);
	$("formulary").on('submit', search_fun);

