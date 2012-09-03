	function login_fun() {
	
    		var json = {
    	    		user : $('#user_id').text(),
    	    		pass : $('#pass_id').text()
    		};
  		
  		$.post("http://127.0.0.1:8000/weather/login", json)
  			.success(function() {
				$('#log_form').style.display = 'none';
				$('#logged_user').style.display = 'block';
				$('#logged_user').text( user );
				$('#logout_button').style.display = 'block';
				$('#error').style.display = 'none';
			
  			}).error(function() {
		 		$('#error_text').text("The user and/or the password are not correct");
		 		$('#error').style.display= '';
		 	
			});

	}


	function logout_fun() {
		
    		$.post("http://127.0.0.1:8000/weather/logout", {}, function() {
    			$('#log_form').style.display = '';
	        	$('#logged_user').style.display = 'none';
	        	$('#logout_button').style.display = 'none';
	        	$('#content').style.display = 'none';
	        	$('#error').style.display = 'none';
    		});
	
	  	// Poner equivalente a : req_logout.withCredentials = true;
	  
	}


	function search_fun() {

		var city = $('#city').text();
		  
		// Create and open a new request
		var URL = "http://127.0.0.1:8000/weather/" + city +"/";
		$.get(URL).success(function(data) {
			$('#error').style.display = 'none';
			$('#content').style.display = '';
			onSuccess(data);
			
		}).error(function(res) {
			if (res.status == 404) {
				$('#error_text').text("City " + city + " not found");
				$('#error').style.display = '';
			} else if (res.status == 403) {
				$('#error_text').text("You are not logged in");
			 	$('#error').style.display = '';
			}
		});
		
	} 
	

	function onSuccess(json) {
		var parsedJSON = JSON.parse(json);

		$('#city_name').text( parsedJSON["data"]["request"][0]["query"] );
		  
		// Current condition
		var currentConditions = parsedJSON["data"]["current_condition"][0];
		
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
		
		$('#img1').src = currentConditions["weatherIconUrl"][0]["value"];
		 
		 
		// Today's forecast
		var weatherToday = parsedJSON["data"]["weather"][0];

		$('#dateToday').text( weatherToday["date"] );
		$('#description2').text( weatherToday["weatherDesc"][0]["value"] );
		$('#minTCelsius1').text( weatherToday["tempMinC"]+ 'ºC' ) );
		$('#minTFarenheit1').text( weatherToday["tempMinF"]+ 'ºF' ) );
		$('#maxTCelsius1').text( weatherToday["tempMaxC"]+ 'ºC' );
		$('#maxTFarenheit1').text( weatherToday["tempMaxF"]+ 'ºF' );
		$('#precipitation2').text( weatherToday["precipMM"]+ 'MM' );
		$('#windDirectionDegree2').text( weatherToday["winddirDegree"]+ 'º' );
		$('#windDirection16Point2').text( weatherToday["winddir16Point"] );
		$('#windSpeedkmh2').text( weatherToday["windspeedKmph"]+ 'Kmph' );
		$('#windSpeedMiles2').text( weatherToday["windspeedMiles"]+ 'Mph' );
		
		$('#img2').src = weatherToday["weatherIconUrl"][0]["value"];
		

		// Tomorrow's forecast
		var weatherTomorrow = parsedJSON["data"]["weather"][1];

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

		$('#img3').src = weatherTomorrow["weatherIconUrl"][0]["value"];
	}


	function hide_error() {
		$('#error').style.display = 'none';
	}
	
	
	// Event Handlers Assignment
	$('#formu_login').on('submit', login_fun);
	$('#formulary').on('submit', search_fun);

