$(document).ready(function () {

//Drop down Menu 
myFunction = () => {
    document.getElementById("inside-dropdown").classList.toggle("show");
  }

window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
      const dropdown = document.getElementsByClassName("inside-dropdown");
      var i;
      console.log(dropdown.length)
      for (i = 0; i < dropdown.length; i++) {
        var openDropdown = dropdown[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

// Carousel with the plugin slick
$('.carousel').slick({
    slideToShow: 1,
    slideToScroll: 1,
    speed: 300,
    autoplay: true,
    autoplayspeed: 2000,
    infinite: true,
    dots: true,

})


// This Array will contain all articles id's 
const idArticles = [];

//the function apiUpdate has the suffix of the URL API 
// v2/articles display all articles - v2/articles/id display one article
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
                <span>" + new Date (data[i]['publishedAt']).toLocaleDateString('FR', { timeZone: 'UTC' }) + "</span>\
                </div>\
                <div class='content'>\
                <img src=" + data[i].imageUrl + " alt=''>\
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
                <span>" + new Date (data['publishedAt']).toLocaleDateString('FR', { timeZone: 'UTC' }) + "</span>\
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
})

// ADD AN ARTICLE


