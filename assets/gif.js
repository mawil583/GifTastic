$(document).ready(function () {

    let gifArr = ["skateboarding", "snowboarding",
        "ultimate frisbee", "rock climbing", "motocross",
        "BMX", "UFC", "martial arts", "high dive",
        "slacklining"];

    function makeButtons() {
        $("#buttons").empty();
        for (let i = 0; i < gifArr.length; i++) {
            let btn = $(`<button type="button" class="btn btn-outline-primary m-2">`);
            btn.attr("data-name", gifArr[i]);
            btn.text(gifArr[i]);
            $("#buttons").append(btn);
        }   
    }
    makeButtons();

    // let apiKey = "QPaP2fIctkKZ5QVbYKccw58Ue96VR3Et";
    let query = "";
    function apiCall() {
        // let queryUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&
        //     q=${query}&limit=10&offset=0&rating=G&lang=en`
        // let queryUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=dogs&rating=G`;
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
                    let rating = response.data[i].rating;
                    console.log(rating);
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
    $("#buttons").on("click", ".btn", function () {

        query = $(this).attr("data-name");
        apiCall(query);
    })

    $(document).on("click", ".submit", function(event) {
        event.preventDefault()
        query = $("#input").val();
        
        let btn = $(`<button type="button" class="btn btn-outline-primary">`);
        btn.attr("data-name", query);
        btn.text(query);
        $("#buttons").append(btn);
        
        // apiCall(query);
    })
});
