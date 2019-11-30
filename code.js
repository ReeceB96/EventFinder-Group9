
//var searchEl = document.querySelector("#search")

var search_value = "";

function searchFuntion() {

    var searchbtn = document.querySelector("button")
    var searchEl = document.querySelector("#search");

    searchEl.addEventListener("change", function (event) {
        event.preventDefault();
        var parentEl = this.parentElement;
        search_value = parentEl.querySelector("#search").value;
        if (search_value === "") {
            return;

        }
        //search_value = searchEl.value;
        //console.log("value ", search_value);
        //       //This if condition will display an error  message if the search field is empty and save the city to the local storage
        // if (search_value === "") {
        //     $('#errorMsg').attr("style", "color:red")
        //     $('#errorMsg').text("Please enter a valid City name");
        // } else {
        //     //search_value.empty();
        //     //searchHistory.cities.push(searchVal);

        //     localStorage.setItem('searched', search_value );
        //     console.log("value ", search_value);

        // }
        retriveEventData(search_value)

    });

}
searchFuntion()

function retriveEventData() {
    //searchFuntion(search_value);
    //console.log("value ", search_value);


    // This is my API key
    var APIKey = "42auTpFZzVkA9bQdsnU1TKcaCMoXIyTu";
    city = search_value;
    console.log("v ", city);


    // Here I'm building the URL we need to query the database

    // queryURL="https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert"&city="+search_value+"&stateCode=NC&radius=50&unit=miles&onsaleOnAfterStartDate=2019-11-21&size=20" + "&appid=" + APIKey;


    // var queryURL="https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert" +"&city="+ search_value +"&stateCode=NC&radius=50&unit=miles&onsaleOnAfterStartDate=2019-11-21&size=20" + "&apikey=" + APIKey;

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert" + "&city=" + search_value + "&size=40" + "&apikey=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET",

    })
        // Im store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log("Event-- ", response)



            var image = $("<img>");
            image.addClass("eventImage");

            var mybtn =$("<button>")
            mybtn.addClass("ticketButton")

            //var imageUrl = "http://openweathermap.org/img/wn/13d@2x.png";
            //image.attr("src", eventImageURL );
            // //set events information from the response 
            var eventName = response._embedded.events[0].name;
            var eventImageURL = response._embedded.events[0].images[0].url;
            image.attr("src", eventImageURL );
            //displayEvent(search_value)

            if (search_value === null) {
                return;

            } else {
                //search_value.forEach(function (city) {
                var tableRow = $("<tr>");
                tableRow.addClass("cityRow");
                var tableTd1 = $("<td>");
                var tableTd2 = $("<td>");
                var tableTd3 = $("<td>");
                //tableTd.addClass("searchCity")
                var eventImageURL = response._embedded.events[0].images[0].url;
                //var tableContent1 = tableTd1.append(image);
                tableTd1.append(image);
                tableRow.append(tableTd1);

                var tableContent2 = tableTd2.text(eventName);
                tableTd2.append(tableContent2);
                tableRow.append(tableTd2);

                //var tableContent3 = tableTd3.text(eventName);
                tableTd3.append(mybtn);
                tableRow.append(tableTd3);


                $(".table").append(tableRow);

                //})

            }



            // //Convert the temparature into F
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // //truncate it to 2 digits
            // var temparature = tempF.toFixed(2);
            // //Set humidity variable and content
            // var humidity = response.main.humidity
            // //Set wind variable and content
            // var wind = response.wind.speed
            // //Create a new Div and set its attribute to append all the weather items   
            // var weather = $("<div>");
            // weather.addClass(".displayCity")
            // weather.css("border", "0.5px solid gray ");
            // weather.css("margin", "5px");
            // weather.css("padding", "5px");
            // weather.css("border-radius", "5px");

            // //display the concert name and  appended to the div container1
            // var firstContainer = $(".Container1");
            // cityEl.addClass("city");
            // cityEl.attr("margin:10px")
            // cityEl.text(searchVal + "(" + date + ")");
            // cityEl.append(image)
            // weather.append(cityEl);

            // //display the Temparature in a li  tag appended to the div container
            // var name = $("<p>");
            // name.addClass("eventname");
            // name.text("Event: " + eventName+);
            // .append(temp);

            // //display the Humidity in an li tag appended to the div container
            // var Humidity = $("<p>");
            // Humidity.addClass("humidity");
            // Humidity.text("Humidity: " + humidity + " %")
            // weather.append(Humidity);

            // //display the Wind in an li tag appended to the div container
            // var Wind = $("<p>");
            // Wind.addClass("humidity");
            // Wind.text("Wind-Speed:  " + wind + " mph")
            // weather.append(Wind);

            // //prepend all the city weather information to the div main container
            // $(".currentForcast").append(weather);


        })





}
//retriveEventData()

function displayEvent(search_value) {
    if (search_value === null) {
        return;

    } else {
        //search_value.forEach(function (city) {
        var tableRow = $("<tr>");
        tableRow.addClass("cityRow");
        var tableTd1 = $("<td>");
        var tableTd2 = $("<td>");
        var tableTd3 = $("<td>");
        //tableTd.addClass("searchCity")
        var tableContent1 = tableTd1.text(name);
        tableTd1.append(tableContent1);
        tableRow.append(tableTd1);

        var tableContent2 = tableTd2.text(eventImage);
        tableTd2.append(tableContent2);
        tableRow.append(tableTd2);

        var tableContent3 = tableTd3.text(name);
        tableTd3.append(tableContent3);
        tableRow.append(tableTd3);


        $(".table").append(tableRow);

        //})

    }
}

//var cityHistory = "";








