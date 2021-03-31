$(document).ready(function () {

//Drop down Menu
    myFunction = () => {
        document.getElementById("inside-dropdown").classList.toggle("show");
    }

    window.onclick = function (event) {
        if (!event.target.matches('.drop-btn')) {
            const dropdown = document.getElementsByClassName("inside-dropdown");
            var i;
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

})