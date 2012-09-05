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
