
//var searchEl = document.querySelector("#search")

var search_value = "";

function searchFuntion() {

    var searchbtn = document.querySelector("button")
    var searchEl = document.querySelector("#search");

    searchbtn.addEventListener("click", function (event) {
        event.preventDefault();
        var parentEl = this.parentElement;
        search_value = parentEl.querySelector("#search").value;
        if (search_value ===""){
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
    retriveEventData()

    });

}
searchFuntion()

function retriveEventData(){
    //searchFuntion(search_value);
    //console.log("value ", search_value);

    
    // This is my API key
    var APIKey = "42auTpFZzVkA9bQdsnU1TKcaCMoXIyTu";
    city = search_value;
    console.log("v ", city);
    

    // Here I'm building the URL we need to query the database
     
    // queryURL="https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert"&city="+search_value+"&stateCode=NC&radius=50&unit=miles&onsaleOnAfterStartDate=2019-11-21&size=20" + "&appid=" + APIKey;


    // var queryURL="https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&source=FrontGate Tickets,Ticketmaster&keyword=concert" +"&city="+ search_value +"&stateCode=NC&radius=50&unit=miles&onsaleOnAfterStartDate=2019-11-21&size=20" + "&apikey=" + APIKey;

    var queryURL="https://app.ticketmaster.com/discovery/v2/events.json?&city="+search_value+ "&apikey=" + APIKey;
 


    $.ajax({
        url: queryURL,
        method: "GET",
         
    })
        // Im store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log("Event-- ", response)
    
    
    })

}
retriveEventData()





