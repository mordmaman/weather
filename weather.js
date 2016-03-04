/* global $ */
$(document).ready(function(){

    $(window).load(function() {
     
     getLocation();

});

 
 var lat = "";
 var lng = "";
 var weather = "";
 var temp = 1.6;
 var tempf;
 
 


function getLocation() {
    console.log("getLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        $('#location').html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("showposition");
    	
    console.log(position.coords.latitude + "," + position.coords.longitude );

    lat = position.coords.latitude;
    lng = position.coords.longitude;
    console.log (lat);
    console.log (lng);
    run(lat, lng);
    
}

function run() {
    var url = ("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=48a5069aa848f39180b9c5558f5bfdb1&units=metric");

    console.log(url);
    console.log("fish");
    
    $.ajax({
    type: 'GET',

    url: url,
    success: function(data) {
        console.log("I have friends!", data); //returns all of johnbob's friends
        console.log(data.name);
        console.log(data.weather[0].main);
        console.log(data.main.temp);
        var location = data.name;
        temp = data.main.temp.toFixed(1);
        weather = data.weather[0].main;
        $('.json').text(location);
        $(".weather").text(weather);
        displayIcon(weather, temp);
        
    }
    });


    function displayIcon(){
        console.log("displayIcon");
        console.log(weather);
        switch(weather) {
            case "Rain":
            $(".icon").text(temp + "°C");
            $(".img").attr("src", 'images/brolly.png')
            break; 
            case "Snow":
            $(".icon").text(temp + "°C");
            $(".img").attr("src", 'images/snowflake.png')
            break;  
            case "Clear":
            $(".icon").text(temp + "°C");
            $(".img").attr("src", 'images/sun.png')
            break;    
            case "Clouds":
            $(".icon").text(temp + "°C");
            $(".img").attr("src", 'images/clouds.png')
            break; 
        }
    
}

}

$(document).on("click", ".convert", function(){
   tempf = temp * 9 /5 + 32;
   $(".icon").text(tempf.toFixed(0) + "°F");
   $(".convert").html("Prefer your temperature in Celsius?");
   $(".convert").addClass("convertC"); 
   $(".convert").removeClass("convert"); 
});

$(document).on("click", ".convertC", function(){
   temp = (tempf -32) * 5 /9;
   $(".icon").text(temp.toFixed(1) + "°C");
   $(".convertC").html("Prefer your temperature in Fahrenheit?");
   $(".convertC").addClass("convert"); 
   $(".convertC").removeClass("convertC"); 
});
  
});//closes doc ready


