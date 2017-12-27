var video = document.querySelector('.media-video');
var btnPlay = document.querySelector('.play-pause-button');
var btnfirst = document.querySelector('.btnLayerPlay');
var stop = document.querySelector('.stop')
countPlayPause = 0;

stop.addEventListener('click',function(){
  countPlayPause=0;
  video.pause();
  video.currentTime = 0;
  document.querySelector('.img-play').setAttribute('src', 'img/play-button.png');
  document.querySelector('.btnLayerPlay').textContent = "Play";
});

btnfirst.addEventListener('click', function() {
  var backVideo = document.querySelector('.backContainer')

  if (countPlayPause === 0) {
    video.play();
    countPlayPause++;
    document.querySelector('.img-play').setAttribute('src', 'img/pause-sign.png');
    btnfirst.style.animation = "vanish 1s ease forwards";

  } else {
    video.pause();
    countPlayPause = 0;
    document.querySelector('.img-play').setAttribute('src', 'img/play-button.png');
  }
});


btnPlay.addEventListener('click', function() {
  var backVideo = document.querySelector('.backContainer')

  if (countPlayPause === 0) {
    video.play();
    countPlayPause++;
    document.querySelector('.img-play').setAttribute('src', 'img/pause-sign.png');
    document.querySelector('.btnLayerPlay').textContent = "Pause";
    document.querySelector('.btnLayerPlay').style.animation = "vanish 1s ease forwards";
  } else {
    video.pause();
    countPlayPause = 0;
    document.querySelector('.img-play').setAttribute('src', 'img/play-button.png');
    document.querySelector('.btnLayerPlay').textContent = "Play";
  }








});
//full-screen
var btnScreen = document.querySelector('.full-screen');
var container = document.querySelector('.containerVideo');
var countScreen = 0;
var rfs = container.requestFullscreen //request full screen compatible
  ||
  container.webkitRequestFullScreen ||
  container.mozRequestFullScreen ||
  container.msRequestFullscreen;
var re = document.exitFullscreen //request exit full screen compatible LUL xD
  ||
  document.webkitExitFullscreen ||
  document.mozCancelFullScreen ||
  document.msExitFullscreen;
btnScreen.addEventListener('click', function() {

  if (countScreen === 0) {

    rfs.call(container);
    countScreen++;
    document.querySelector('.screenImg').setAttribute('src', 'img/minimize.png');
  } else {
    re.call(document);
    countScreen = 0;
    document.querySelector('.screenImg').setAttribute('src', 'img/full-screen.png');
  }
});


//volume v2
var sound = document.querySelector('.volume');

sound.addEventListener('change', function() {
  var vol = sound.value;
  video.volume = vol;
  if (vol != 0) {
    document.querySelector('.volumeImg').setAttribute('src', 'img/speaker.png');
  } else {
    document.querySelector('.volumeImg').setAttribute('src', 'img/mute.png');
  }
});

//time update bar
video.addEventListener('timeupdate', function() {
  var duration = video.duration; // Durée totale
  var time = video.currentTime; // Temps écoulé
  var fraction = time / duration;
  var percent = Math.ceil(fraction * 100);
  var progress = document.querySelector('.progressBar');
  progress.style.width = percent + '%';
  if (percent !== 0) {
    document.querySelector('.progressBarImg').style.display = "block";
  }

});

// timerbegin !
var resultBegin = document.querySelector('.timeBegin');
video.addEventListener('timeupdate', function() {
  var time = video.currentTime; // Temps écoulé
  //  var hours = Math.floor(time % 3600);
  var mins = Math.floor((time % 3600) / 60);
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  resultBegin.innerHTML =  mins + ":" + secs; // mm:ss
});


// timerlast !
var resultLast = document.querySelector('.timeLast');
var time = 0;
var mins = 0;
var secs = 0;
video.addEventListener('timeupdate', function() {
  time = video.duration - video.currentTime; // Temps écoulé
  mins = Math.floor((time % 3600) / 60);
  secs = Math.floor(time % 60);
  console.log(time);
  console.log(mins);
  console.log(secs);
  if (secs < 10) {
    secs = "0" + secs;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  resultLast.innerHTML= parseInt(mins) + ":" + parseInt(secs); // mm:ss
  if (isNaN(time))
  {
    resultLast.innerHTML= "00:00"
  }

console.log(resultLast.innerHTML);
});

//progress bar control
var progress = document.querySelector('.progressBarControle');
progress.addEventListener('click', function(e) {
  var pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
  video.currentTime = pos * video.duration;
});
/////////////////////////
///HOVER ANIMATION à revoir///////
/////////////////////////


var media1 = document.querySelector('.media-controls');
var media2 = document.querySelector('.timerContainer');
var containerVideo = document.querySelector('.containerVideo');
containerVideo.addEventListener('mouseover', function() {
  media1.style.animation = "visible 1s ease forwards";
  media2.style.animation = "visible 1s ease forwards";
});
containerVideo.addEventListener('mouseout', function() {
  media1.style.animation = "invisible 1s ease forwards";
  media2.style.animation = "invisible 1s ease forwards";
});
///////////////////////////////////
////////RECUPERATION DONNEES///////
///////////////////////////////////
var title     = document.querySelector('.title');
var author    = document.querySelector('.author');
var category  = document.querySelector('.category');
var note      = document.querySelector('.note');
var descri    = document.querySelector('.description');
var items = document.querySelectorAll('.item');
var language = document.querySelector('.language');
var sub     = document.querySelector('.sub');
var year = document.querySelector('.year');
var del   = document.querySelector('.backContainer');
var duration = document.querySelector('.duration');
var containerMovie = document.querySelector('.movieContainer');

/* INFO */
for (let a = 0; a< items.length; a++) {
  items[a].addEventListener('click', function(){
      containerMovie.style.display = "flex";
      video.innerHTML = "<source src="+data.films[a].src+" type='video/mp4'>";
      video.load();
      title.innerHTML     = ' Titre : '       + data.films[a].title;
      author.innerHTML    = 'Auteur : '       + data.films[a].author;
      category.innerHTML = 'Catégorie : '     + data.films[a].category;
      language.innerHTML = ' Languages : '     + data.films[a].audio_language;
      sub.innerHTML      = 'Sous-titres : '    + data.films[a].sub_language;
      //note.innerHTML      = 'Note : '         + data.films[a].rating + '/5';
      descri.innerHTML      ='Description : ' + data.films[a].description;
      year.innerHTML      ='Année : ' + data.films[a].year;
      duration.innerHTML = " Durée : "+ data.films[a].duration;

      var star ="";
      for (let i = 0; i < data.films[a].rating; i++) {
        var star = star + "<img src='img/star1.png' alt='note' width='35' height='35'>";
        note.innerHTML      = "Note : "+star;
      }

      console.log(data.films[a].rating);
  });

  }



del.addEventListener('click',function(){
  video.load();
    containerMovie.style.display = "none";
    video.currentTime = 0;
    time = 0;
    mins = 0;
    secs = 0;
    });
