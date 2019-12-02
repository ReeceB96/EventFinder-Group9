
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
        //$("#search").empty();
    });

}
searchFuntion()

function retriveEventData() {

    // This is my API key
    var APIKey = "42auTpFZzVkA9bQdsnU1TKcaCMoXIyTu";
 

    // Here I'm building the URL we need to query the database
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert" + "&city=" + search_value +"&stateCode=NC&radius=50&unit=miles&size=40" + "&apikey=" + APIKey;

    var queryURL1 = "https://developers.zomato.com/api/v2.1/geocode?lat=35.2295&lon=-81.7492"



    $.ajax({
        url: queryURL,
        method: "GET",
        // url: queryURL1,
        // method: "GET",
        // "headers": {
        //     "accept": "application/json",
        //     "user-key": "01076abed27547fdb6b4bf0fb551be22"
        //   }
    })
        // Im store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            console.log("Event-- ", response)
 
            var allEvents = response._embedded.events

            console.log(allEvents.length)
            for (var i = 0; i < allEvents.length; i++) {

                var image = $("<img>");
                image.addClass("eventImage");

                // //set events information from the response 
                var eventName = allEvents[i].name;
                //var eventImageURL = allEvents[i].images[i].url;
                var eventDate = allEvents[i].dates.start.localDate;
                var eventTime = allEvents[i].dates.start.localTime;
                var eventLocation = allEvents[i]._embedded.venues[0].name;
                var eventCity = allEvents[i]._embedded.venues[0].city.name;
                var eventLat = allEvents[i]._embedded.venues[0].location.latitude;
                var eventLong = allEvents[i]._embedded.venues[0].location.longitude;
  

                

                var eventState = allEvents[i]._embedded.venues[0].state.stateCode;
                var eventTicket = allEvents[i].url;


                //Set the date 
                 var eventDay = moment(eventDate).format("ddd");
                var eventDate = moment(eventDate).format("LL")

                if (search_value === null) {
                    return;

                } else {
                    var tableRow = $("<tr>");
                    tableRow.addClass("cityRow");
                    var tableTd1 = $("<td>");
                    var tableTd2 = $("<td>");
                    var tableTd3 = $("<td>");
                    var tableTd4 = $("<td>");
                    var tableTd5 = $("<td>");

                    var eventImageURL = response._embedded.events[i].images[i].url;
                    image.attr("src", eventImageURL);
                    tableTd1.append(image);
                    tableRow.append(tableTd1);

                    //create a h tag to append  each content
                    var hTag1 = $("<h6>");
                    hTag1.text(eventDate)
                    var hTag2 = $("<h6>");
                    hTag2.text(eventDay + " : " + eventTime)
                    tableTd2.append(hTag1, hTag2);
                    tableRow.append(tableTd2);


                    //create a h tag to append  each content
                    var hTag1 = $("<h6>");
                    hTag1.text(eventName)
                    var hTag2 = $("<h6>");
                    hTag2.text(eventLocation + " - " + eventCity + ", " + eventState)
                    tableTd3.append(hTag1, hTag2);
                    tableRow.append(tableTd3);

                    //add a button to the td 4
                    var mybtn = $("<button>");
                    var atag = $("<a>");
                    atag.attr("href", eventTicket)
                    mybtn.addClass("ticketButton");
                    atag.text("E-Ticket");
                    atag.attr('target', '_blank')
                    mybtn.append(atag);
                    tableTd4.append(mybtn);
                    tableRow.append(tableTd4);

                    $(".table").append(tableRow);

                }
                retriveRestaurantData(eventLat, eventLong)


            }

        })

}


function retriveRestaurantData(eventLat, eventLong) {

    var queryURL1 = "https://developers.zomato.com/api/v2.1/geocode?lat=" + eventLat + "&lon=" + eventLong;



    $.ajax({
        
        url: queryURL1,
        method: "GET",
        "headers": {
            "accept": "application/json",
            "user-key": "01076abed27547fdb6b4bf0fb551be22"
        }
    })
        // Im store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            var i = 0;
            var result = response;
            console.log("Restaurant-- ", result)
            var eventRestaurant = result.link;
            var eventRestName= result.location.title;
            var eventRestCity= result.location.city_name;
            var eventCuisin = result.popularity.top_cuisines
  
            //add a new table
            var tableRow = $("<tr>");
            tableRow.addClass("cityRow2");
            var Td = $("<td>");
            

             //create a h tag to append  each content
             var hTag1 = $("<h6>");
             hTag1.text("Title: " + eventRestName)
             var hTag2 = $("<h6>");
             hTag2.text(eventRestCity + " - " + eventCuisin)
             Td.append(hTag1, hTag2);
             tableRow.append(Td);


            //add a button to append to the td 
            var mybtn = $("<button>");
            var atag = $("<a>");
            atag.attr("href", eventRestaurant)
            mybtn.addClass("restaurantButton");
            atag.text("View Restaraunts: "  )
            atag.attr('target', '_blank')
            mybtn.append(atag);
            Td.append(mybtn);
            tableRow.append(Td);
            $(".table2").append(tableRow)
          
        })

}
















