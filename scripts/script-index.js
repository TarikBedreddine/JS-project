$(document).ready(function () {

// This Array will contain all articles id's 
    const idArticles = [];

    /* the function apiUpdate has the suffix of the URL API
    v2/articles display all articles - v2/articles/id display one article */
    const apiUpdate = (suffix) => {
        let apiUrl = `https://spaceflightnewsapi.net/api/v2/${suffix}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {

                //If the api Response is an array then
                if (data.length > 0) {

                    // I send all id's to the idArticles array
                    for (let i = 0; i < data.length; i++) {
                        idArticles.push(data[i].id)
                    }
                    for (var i = 0; i < data.length; i++) {
                        $("<article>\
                <div class='flex-post'>\
                <h2>" + data[i].title + "</h2>\
                <span>" + new Date(data[i]['publishedAt']).toLocaleDateString('FR', {timeZone: 'UTC'}) + "</span>\
                </div>\
                <div class='content'>\
                <img src=" + data[i].imageUrl + " alt=>\
                <p>" + data[i]['summary'] + "</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
                    }
                }

                //if it's only one article to display i don't need an index
                else {
                    $("<article>\
                    <div class='flex-post'>\
                    <h2>" + data.title + "</h2>\
                    <span>" + new Date(data['publishedAt']).toLocaleDateString('FR', {timeZone: 'UTC'}) + "</span>\
                    </div>\
                    <div class='content'>\
                    <img src=" + data.imageUrl + " alt=''>\
                    <p>" + data['summary'] + "</p>\
                    </div>\
                    </article>\
                    ").appendTo(".feed-article")
                }
            });
    }

    // Call the function to get all articles
    apiUpdate("articles");

    // CREATE AN REFRESH ICON (random results)
    $('.container-main').append("<span id='refresh-span'><a href='#feed-section' ><img alt='' src='images/refresh.png'></a></span>")
    $('.container-main span a img').addClass('imageRefresh')

    // When the button refresh is clicked, a loop get random articles (thanks to the idArticles array)
    $('.imageRefresh').click(function () {
        $('.feed-article article').remove();
        let x = 0;
        while (x < idArticles.length) {
            const random = Math.floor(Math.random() * idArticles.length);
            apiUpdate(`articles/${idArticles[random]}`);
            x++;
        }
    })

    // ADD ARTICLE
    createPost = (data) => {
        $("<article>\
                <div class='flex-post'>\
                <h2>" + data.title + "</h2>\
                <span>" + new Date(data['publishedAt']).toLocaleDateString('FR', {timeZone: 'UTC'}) + "</span>\
                </div>\
                <div class='content'>\
                <img src=" + data.imageUrl + " alt=>\
                <p>" + data['summary'] + "</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
    }

    // Check if it's a blank field
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
    // Check the URL given by the user, if it's valid it will return a boolean
    function isValidUrl(url) {
        let validUrl = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
        let regex = new RegExp(validUrl);

        if (url.match(regex)) {
            return true
        } else {
            return console.log("nul")
        }
    }

    // Store all inputs values in variables and set the condition if we click on the submit button
    const articleSubmit = document.getElementById("article-submit")
    articleSubmit.onclick = function () {
        let title = document.getElementById("title").value
        let publishedAt = document.getElementById("publishedAt").value
        let imageUrl = document.getElementById('imageUrl').value
        let summary = document.getElementById("summary").value

    // I check if all the inputs are filled and if the image URL is valid
        if (!isBlank(title) && !isBlank(publishedAt) && !isBlank(imageUrl) && !isBlank(summary)) {
            if (isValidUrl(imageUrl)) {
                const data = {
                    title: title,
                    publishedAt: publishedAt,
                    imageUrl: imageUrl,
                    summary: summary
                }
                createPost(data)
            } else {
                alert("Enter a valid image URL please !")
            }
        } else {
            alert("Fill all the inputs form please !")
        }
        console.log(isValidUrl(imageUrl))

    // This function permit to don't send the form
        event.preventDefault()
    }
})




