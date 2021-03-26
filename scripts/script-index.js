$(document).ready(function () {

    $.ajax({
        //L'URL de la requête
        url: "https://test.spaceflightnewsapi.net/api/v2/articles?_limit=10",
        //La méthode d'envoi (type de requête)
        method: "GET",
        //Le format de réponse attendu
        dataType: "json",
    })

        .done(function (response) {
            function test() {
                console.log(response);
                // STORE THE JSON ARRAY
                let result = response
                // FOR EACH INDEX OF THE ARRAY I CREATE AN ARTICLE
                for (var i = 0; i < result.length; i++) {
                    $("<article>\
                <div class='flex-post'>\
                <h2>'" + result[i].title + "'</h2>\
                <span>'" + result[i]['publishedAt'] + "'</span>\
                </div>\
                <div class='content'>\
                <img src='" + result[i].imageUrl + "' alt=''>\
                <p>'" + result[i]['summary'] + "'</p>\
                </div>\
                </article>\
                ").appendTo(".feed-article")
                }

            }

            test();

            // CREATE AN REFRESH ICON
            $('.container-main').append("<span><a><img src='C:\\Users\\33769\\Desktop\\JS-project\\images\\refresh.png'></a></span>")
            $('.container-main span a img').addClass('imageRefresh')

            $('.imageRefresh').click(function () {
                $('.feed-article article').remove();
                test();
            })

        })


        .fail(function (error) {
            alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
        })






})



// $.get("https://test.spaceflightnewsapi.net/api/v2/articles?_limit=20", function (response) {
//     let allArticles = []
//     allArticles.push(response.id)
//     for (let i = 1; i < response.length; i++) {
//         allArticles.push(response[i].id)
//     }
//     const random = Math.floor(Math.random() * allArticles.length);
// })
// $.get("https://test.spaceflightnewsapi.net/api/v2/articles?_limit=20", function (response) {
//     let allArticles = []
//     allArticles.push(response.id)
//     for (let i = 1; i < response.length; i++) {
//         allArticles.push(response[i].id)
//     }
//     const random = Math.floor(Math.random() * allArticles.length);
// })

