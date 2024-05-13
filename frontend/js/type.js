var indexWindow = 0;

function forward() {
  	indexWindow++;
  	indexWindow = indexWindow % data.length;
    changeWindow(indexWindow);
}

function back() {
    indexWindow--;
    indexWindow < 0 ? indexWindow = data.length-1 : indexWindow = indexWindow % data.length;
    indexWindow = indexWindow % data.length;
    changeWindow(indexWindow);
}

function writeAll() {
    indexWindow = -1;
    document.getElementById('title').innerHTML = "server.py";
    document.getElementById('content').innerHTML = "";
    document.getElementById('description').innerHTML = "";
    var count = 0;
    for (let i = 0; i < data.length; i++) {
        document.getElementById('content').innerHTML += '<div class="row"><div class="nrow">'+(count+1)+'</div><span class="code"></span></div>';
        parseToHTML(document.querySelectorAll('.code')[count++], '|c8:'+data[i].title+'|');
        
        count = writeCode(i, count);
        writeDescription(i);
    }
    document.getElementById('content').innerHTML += '<div class="row"><div class="nrow"></div><span class="code"></span></div>';
}

function writeCode(index, count) {
    for (let j = 0; j < data[index].code.length; j++) {
        document.getElementById('content').innerHTML+='<div class="row"><div class="nrow">'+(count+1)+'</div><span class="code"></span></div>';
        parseToHTML(document.querySelectorAll('.code')[count++], data[index].code[j].text);
    }
    document.getElementById('content').innerHTML += '<div class="row"><div class="nrow">'+(++count)+'</div><span class="code"></span></div>';
    return count;
}

function writeDescription(index) {
    document.getElementById('description').innerHTML += '<h1>'+data[index].title+'</h1>';
    document.getElementById('description').innerHTML += data[index].description;
}

function changeWindow(index) {
    document.getElementById('title').innerHTML = data[index].title;

    document.getElementById('content').innerHTML = "";
    writeCode(index, 0);
    document.getElementById('content').innerHTML += '<div class="row"><div class="nrow"></div><span class="code"></span></div>';

    document.getElementById('description').innerHTML = "";
    writeDescription(index);
}

function parseToHTML(element, text) {
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) == '|') {
            if(text.charAt(i+1) == 't') {
                element.innerHTML += "&emsp;&emsp;&emsp;&emsp;"
                i+=1;
            } else if(text.charAt(i+1) == 'c') {
                var colorIndex = text.charAt(i+2);
                var word = text.substring(i+4, text.indexOf('|', i+4));
                element.innerHTML += '<span class="c'+colorIndex+'">'+word+'</span>';
                i = text.indexOf('|', i+4);
            }
        } else if (text.charAt(i) == ' '){
            element.innerHTML += "&emsp;";
        } else {
            element.innerHTML += text.charAt(i);
        }
    }
}

// function typewriter(element, text, delay) {
//     var typewriter = new Typewriter(element, {
//         loop: true,
//         delay: 75,
//       });
      
//       typewriter
//         .pauseFor(2500)
//         .typeString('A simple yet powerful native javascript')
//         .pauseFor(300)
//         .deleteChars(10)
//         .typeString('<strong>JS</strong> plugin for a cool typewriter effect and ')
//         .typeString('<strong>only <span class="c1">5kb</span> Gzipped!</strong>')
//         .pauseFor(1000)
//         .start();
// }
writeAll();