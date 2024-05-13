var indexTitle = 0;
var title = [ "Introduzione",
    "Codice Sorgente",
    "Descrizione"
];

document.getElementById("island").addEventListener("click", function(event) {
    indexTitle++;
    indexTitle = indexTitle % title.length;
    changeTitle();
    document.getElementById(indexTitle).scrollIntoView({ behavior: 'smooth' }); // Scroll to footer with smooth behavior
});

function changeTitle() {
    document.getElementById("island").innerHTML = '<li>'+title[indexTitle]+'</li>';
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        forward();
    } else if (event.key === "ArrowLeft") {
        back();
    }
});


document.addEventListener("scroll", _.throttle(function() {
    var viewportY = window.scrollY;
    if (viewportY <= (document.getElementById("1").offsetTop / 2 - 50)) {
        indexTitle = 0;
        changeTitle();
    } else if (viewportY <= document.getElementById("2").offsetTop - 200) {
        indexTitle = 1;
        changeTitle();
    } else {
        indexTitle = 2;
        changeTitle();
    }
}, 250));


var footer = new Typewriter(document.getElementById("github"), {
    strings: ["<a href='https://github.com/pallax03'>"
        +"Made by @pallax03</a>"],
    loop: true,
    autoStart: true
});



var island = document.getElementById('island');

var touchstartX = 0;
var touchstartY = 0;

island.addEventListener('touchstart', function(event) {
    touchstartX = event.touches[0].clientX;
    touchstartY = event.touches[0].clientY;
});

island.addEventListener('touchend', function(event) {
    var touchendX = event.changedTouches[0].clientX;
    var touchendY = event.changedTouches[0].clientY;

    var deltaX = touchendX - touchstartX;
    var deltaY = touchendY - touchstartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            forward();
        } else {
            back();
        }
    }
});