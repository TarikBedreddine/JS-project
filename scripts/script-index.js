$(document).ready(function () {
/*
$('.bg-header .container-main').prepend("<div class='carousel'>"); 
$('.carousel').append("<div><img src=''></div><img src=''><div><img src=''></div><div></div>");*/

$('.carousel').slick({
    slideToShow: 1,
    slideToScroll: 1,
    speed: 300,
    autoplay: true,
    autoplayspeed: 2000,
    infinite: true,
    dots: true,

});
























const idArticles = [];

const apiUpdate = (suffix) => {
    let apiUrl = `https://spaceflightnewsapi.net/api/v2/${suffix}`;
    fetch(apiUrl).then((response) => response.json().then(data => {
        
        if (data.length > 0) {
        
            for (let i = 0; i < data.length; i++) {
                idArticles.push(data[i].id)
            }
            for (var i = 0; i < data.length; i++) {
                $("<article>\
                <div class='flex-post'>\
                <h2>" + data[i].title + "</h2>\
                <span>" + new Date (data[i]['publishedAt']).toLocaleDateString('FR', { timeZone: 'UTC' }) + "</span>\
                </div>\
                <div class='content'>\
                <img src=" + data[i].imageUrl + " alt=''>\
                <p>" + data[i]['summary'] + "</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
            }
        } else {
            $("<article>\
                <div class='flex-post'>\
                <h2>" + data.title + "</h2>\
                <span>" + new Date (data['publishedAt']).toLocaleDateString('FR', { timeZone: 'UTC' }) + "</span>\
                </div>\
                <div class='content'>\
                <img src=" + data.imageUrl + " alt=''>\
                <p>" + data['summary'] + "</p>\
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
    $('.container-main').append("<span id='refresh-span'><a href='#feed-section' ><img alt='' src='images/refresh.png'></a></span>")
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


