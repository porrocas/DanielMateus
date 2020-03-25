// eventos
document.addEventListener('DOMContentLoaded', function() {
    // menu de movil
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);

    // parallax
    reloadImgQuerys();
    var elems1 = document.querySelectorAll('.parallax');
    var instances1 = M.Parallax.init(elems1);

    // formulario cotizaciones
    var elems2 = document.querySelectorAll('select');
    var instances2 = M.FormSelect.init(elems2);
});

//funciones
//funcion para cambiar imagen segun tamaño de pantalla
function reloadImgQuerys() {
    if (screen.width <= 425) {
        document.getElementById('imgParallax1').src = './img/ps0.jpg';
        document.getElementById('imgParallax2').src = './img/ps1.jpg';
    }
}