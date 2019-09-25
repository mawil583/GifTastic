$(document).ready(function () {
// global declarations
    let gifArr = ["Skateboarding", "Snowboarding",
        "Ultimate Frisbee", "Rock Climbing", "Motocross",
        "BMX", "UFC", "Martial Arts", "High Dive",
        "Slacklining"];
    let lowerCaseGifArr = [];
    for (let i = 0;i < gifArr.length; i++) {
        lowerCaseGifArr.push(gifArr[i].toLowerCase())
    }
    let lowerCaseQuery;
    let query = "";

    function makeButtons() {
        for (let i = 0; i < gifArr.length; i++) {
            let btn = $(`<button type="button" class="btn btn-outline-primary m-2">`);
            btn.attr("data-name", gifArr[i]);
            btn.text(gifArr[i]);
            $("#buttons").append(btn);
        }   
    }
    makeButtons();

    function apiCall() {
        let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=QPaP2fIctkKZ5QVbYKccw58Ue96VR3Et&q=${query}&limit=10&offset=0&lang=en`
        $.ajax(
            {
                url: queryUrl,
                method: "GET"
            }
        ).then(
            response => {
                console.log(response);
                $("#gif-display").empty();
                for (let i = 0; i < 10; i++) {
                    let rating = response.data[i].rating.toUpperCase();
                    let gifDiv = $("<div class='gif'>");
                    let gifHeading = $("<h2>");
                    gifHeading.attr("data-rating", rating);
                    gifHeading.text(`Rating: ${rating}`);
                    gifDiv.append(gifHeading);
                    let gifUrl = response.data[i].images.fixed_height_still.url;
                    let gifImage = $("<img>");
                    gifImage.attr("data-animate", response.data[i].images.fixed_height.url);
                    gifImage.attr("data-still", response.data[i].images.fixed_height_still.url)
                    gifImage.attr("src", gifUrl);
                    gifDiv.append(gifImage);
                    $("#gif-display").append(gifDiv);
                }
            },
            error => console.error(error)
        )
    }
apiCall();

    // This is the onclick event for top buttons
    $("#buttons").on("click", ".btn", function () {
        query = $(this).attr("data-name");
        apiCall(query);
    })

    // this is onclick event for animating gifs
    $("#gif-display").on("click", "img", function() {
        let still = $(this).attr("data-still");
        let animate = $(this).attr("data-animate")
        if ($(this).attr("src") == still) {
            $(this).attr("src", animate);
        } else {
            $(this).attr("src", still);
        }
    })
    // This is the onclick event for the form submission
    $(document).on("click", ".submit", function(event) {
        event.preventDefault();
        lowerCaseQuery = $("#input").val().toLowerCase();
        query = $("#input").val()
        if (query && lowerCaseGifArr.indexOf(lowerCaseQuery) == -1) {
            lowerCaseGifArr.push(lowerCaseQuery);
            let btn = $(`<button type="button" class="btn btn-outline-primary m-2">`);
            btn.attr("data-name", query);
            btn.text(query);
            $("#buttons").append(btn);
        };
    })
});
