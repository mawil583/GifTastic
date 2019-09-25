$(document).ready(function () {

    let gifArr = ["Skateboarding", "Snowboarding",
        "Ultimate Frisbee", "Rock Climbing", "Motocross",
        "BMX", "UFC", "Martial Arts", "High Dive",
        "Slacklining"];

    function makeButtons() {
        // $("#buttons").empty();
        for (let i = 0; i < gifArr.length; i++) {
            let btn = $(`<button type="button" class="btn btn-outline-primary m-2">`);
            btn.attr("data-name", gifArr[i]);
            btn.text(gifArr[i]);
            $("#buttons").append(btn);
        }   
    }
    makeButtons();

    let query = "";
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
                    let gifUrl = response.data[i].images.fixed_height.url;
                    let gifImage = $("<img>");
                    gifImage.attr("src", gifUrl);
                    // gifDiv.append(gifHeading);
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

    // This is the onclick event for the form submission
    $(document).on("click", ".submit", function(event) {
        event.preventDefault();
        query = $("#input").val();
        if (query && gifArr.indexOf(query) == -1) {
            gifArr.push(query);
            let btn = $(`<button type="button" class="btn btn-outline-primary m-2">`);
            btn.attr("data-name", query);
            btn.text(query);
            $("#buttons").append(btn);
        };
    })
});
