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

        retriveEventData(search_value)

    });

}

searchFuntion()

function retriveEventData() {

    // This is my API key
    var APIKey = "42auTpFZzVkA9bQdsnU1TKcaCMoXIyTu";
    city = search_value;

    // Here I'm building the URL we need to query the database
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert" + "&city=" + search_value + "&size=40" + "&apikey=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",

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
                var eventImageURL = allEvents[i].images[i].url;
                var eventDate = allEvents[i].dates.start.localDate;
                var eventTime = allEvents[i].dates.start.localTime;
                var eventLocation = allEvents[i]._embedded.venues[0].name;
                var eventCity = allEvents[i]._embedded.venues[0].city.name;
                var eventState = allEvents[i]._embedded.venues[0].state.stateCode;
                var eventTicket = allEvents[i].url;

                //Set the date 
                console.log("date ", eventDate)
                var eventDay = moment(eventDate).format("ddd");
                var eventDate = moment(eventDate).format("LL")

                console.log(" time ", eventTime)

                if (search_value === null) {
                    return;

                } else {
                    var tableRow = $("<tr>");
                    tableRow.addClass("cityRow");
                    var tableTd1 = $("<td>");
                    var tableTd2 = $("<td>");
                    var tableTd3 = $("<td>");
                    var tableTd4 = $("<td>");

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

            }
        })

}
