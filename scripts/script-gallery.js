$(document).ready(function () {
    // function to add pictures in the gallery (i allow me to give a different id for each picture)
    let i = 0
    const updatePicture = (url) => {
        $(" <div class='picture-row'>\
            <img id='img"+ i +"' src='" + url + "' alt=''>\
            </div>\
            ").appendTo(".div-picture-row")
    }

    // Check if the URL is valid
    function isValidUrl(url) {
        var regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.jpg)$/;
        if (regex.test(url)) {
            return true
        }
    }

    // Call NASA Api to get pictures, then i do foreach with the response and call the function to add pictures
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=qcgxUerfNimMJQsZCI7fIBqJALVduWZVyrjYLV9Q&count=15`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then(data => {
            data.forEach(function (item) {
                if (isValidUrl(item.url)) {
                    updatePicture(item.url)
                    i++
                }
            });
        });

    // When click to get simple format
    $("#column-format").click(function () {
        $(".div-picture-row").toggleClass("div-picture-row div-picture-column")
        $(".picture-row").toggleClass("picture-row picture-column")
    })

    // When click to get mosaic format
    $("#row-format").click(function () {
        $(".div-picture-column").toggleClass("div-picture-column div-picture-row")
        $(".picture-column").toggleClass("picture-column picture-row")
    })
    // To see the input image URL & button when the user click on icon "add"
    $("#icon-add-picture").click(function () {
        $(".add-picture input, label").toggleClass("invisible visible")
        $("#submit-picture").toggleClass("invisible visible")
        $('#icon-add-picture').toggleClass("visible invisible")
        $('#icon-cancel-picture').toggleClass("invisible visible")
    })
    $("#icon-cancel-picture").click(function () {
        $(".add-picture input, label").toggleClass("visible invisible")
        $("#submit-picture").toggleClass("visible invisible")
        $('#icon-cancel-picture').toggleClass("visible invisible")
        $('#icon-add-picture').toggleClass("invisible visible")
    })




    //On submit button click, i check if the URL is valid and call the function to add a new picture
    $('#submit-picture').click(function() {
        const imageUrl = $('#imageUrl').val()
        if (isValidUrl(imageUrl)) {
            i++
            updatePicture(imageUrl)
            alert ("Your image has been succesfully added to the Gallery")
        } else {
            alert("URL is not valid !")
        }
    })


})