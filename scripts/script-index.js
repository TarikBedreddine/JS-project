$(document).ready(function () {
const idArticles = [];

let apiUpdate = (suffix) => {
    let apiUrl = `https://spaceflightnewsapi.net/api/v2/${suffix}`;
    fetch(apiUrl).then((response) => response.json().then(data => {
        for (let i = 0; i < data.length; i++) {
            idArticles.push(data[i].id)
        }
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                $("<article>\
                <div class='flex-post'>\
                <h2>'" + data[i].title + "'</h2>\
                <span>'" + data[i]['publishedAt'] + "'</span>\
                </div>\
                <div class='content'>\
                <img src='" + data[i].imageUrl + "' alt=''>\
                <p>'" + data[i]['summary'] + "'</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
            }
        } else {
            console.log(data)
            $("<article>\
                <div class='flex-post'>\
                <h2>'" + data.title + "'</h2>\
                <span>'" + data['publishedAt'] + "'</span>\
                </div>\
                <div class='content'>\
                <img src='" + data.imageUrl + "' alt=''>\
                <p>'" + data['summary'] + "'</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
        }
        }
        )
    );
}

apiUpdate("articles");


// CREATE AN REFRESH ICON
    $('.container-main').append("<span><a href='#' ><img alt='' src='images/refresh.png'></a></span>")
    $('.container-main span a img').addClass('imageRefresh')

    $('.imageRefresh').click(function () {
        $('.feed-article article').remove();
        let x = 0;
        while (x < idArticles.length) {
            const random = Math.floor(Math.random() * idArticles.length);
            apiUpdate(`articles/${idArticles[random]}`);
            x++;
        }
    })
})



