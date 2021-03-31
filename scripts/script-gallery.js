$(document).ready(function () {

    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=qcgxUerfNimMJQsZCI7fIBqJALVduWZVyrjYLV9Q&count=15`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then(data => {
            let i = 0
            data.forEach(function(item) {
                    $(" <div class='picture-row'>\
                        <img id='img"+ i +"' src='"+ item.url +"' alt=''>\
                        </div>\
                    ").appendTo(".div-picture-row")
                i++;
            });
        });

    // When click on "format" icon i replace the row-classes by column-classes
        $("#column-format").click(function() {
            $(".div-picture-row").toggleClass("div-picture-row div-picture-column")
            $(".picture-row").toggleClass("picture-row picture-column")
            })

        $("#row-format").click(function() {
            $(".div-picture-column").toggleClass("div-picture-column div-picture-row")
            $(".picture-column").toggleClass("picture-column picture-row")
        })

})