$( document ).ready(function() {

    $.ajax({
        //L'URL de la requête
        url: "https://www.spaceflightnewsapi.net/api/v2/articles",
        //La méthode d'envoi (type de requête)
        method: "GET",
        //Le format de réponse attendu
        dataType : "json",



        })

        .done(function(response){
            console.log(response[2].title);

        })





























        .fail(function(error){
            alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
        });

















































});