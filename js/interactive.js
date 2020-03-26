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
            startAppFace();
        }
    })
}

//funciones
function removeClassResponsive() {
    if (screen.width < 500) {
        document.getElementById('containerMap').classList.remove('valign-wrapper');
    }
}


// app camera face recognition

faceapi.nets.tinyFaceDetector.loadFromUri('./models')
faceapi.nets.faceLandmark68Net.loadFromUri('./models')
faceapi.nets.faceRecognitionNet.loadFromUri('./models')
faceapi.nets.faceExpressionNet.loadFromUri('./models')

async function startAppFace() {
    appFace.innerHTML = await '';
    appFace.innerHTML = await `
        <div id="contAppFaceDraw" class="m12" style="border: solid 2px aqua; position: relative;">
            <video id="video" autoplay muted width="100%" style="z-index: 0;"></video>
        </div>
    `;
    const video = await document.getElementById('video');
    const container = await document.getElementById('contAppFaceDraw');
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
    navigator.getMedia(

        // Restricciones (contraints) *Requerido
        {
            video: true,
            audio: false
        },

        // Funcion de finalizacion (Succes-Callback) *Requerido
        function(localMediaStream) {
            video.srcObject = localMediaStream;
        },

        function(err) {
            console.log("Ocurrió el siguiente error: " + err);
        }

    );
    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        container.appendChild(canvas)
        console.log('estoy aca')
        const displaySize = { width: video.clientWidth, height: video.clientHeight }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async() => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }, 100)
    })
}