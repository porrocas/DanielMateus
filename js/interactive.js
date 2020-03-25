//variables globales
const animationScrolltop = document.getElementsByClassName('animationsScrollTop');
const appFace = document.getElementById('appFace');

// eventos
addEvents();

function addEvents() {
    document.addEventListener('DOMContentLoaded', function() {
        // menu de movil
        const elems = document.querySelectorAll('.sidenav');
        const instances = M.Sidenav.init(elems);

        //slider
        var elemsSlider = document.querySelectorAll('.carousel');
        var instancesSlider = M.Carousel.init(elemsSlider);

        // formulario cotizaciones
        var elems2 = document.querySelectorAll('select');
        var instances2 = M.FormSelect.init(elems2);

        removeClassResponsive();
    });
    window.addEventListener('scroll', () => {
        console.log()
        if (window.scrollY > animationScrolltop[0].scrollHeight + 20) {
            animationScrolltop[0].classList.add('slideRight');
        }
        if (window.scrollY > animationScrolltop[1].scrollHeight + 320) {
            animationScrolltop[1].classList.add('slideRight');
        }
        if (window.scrollY > animationScrolltop[2].scrollHeight + 620) {
            animationScrolltop[2].classList.add('slideRight');
        }
    })
    appFace.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('startApp')) {
            // click en boton start app
        }
    })
}

//funciones
function removeClassResponsive() {
    if (screen.width < 500) {
        document.getElementById('containerMap').classList.remove('valign-wrapper');
    }
}