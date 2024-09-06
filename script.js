const image = document.getElementById("cover"),
    title = document.getElementById("music-title"),
    artist = document.getElementById("music-artist"),
    currentTimeEl = document.getElementById("current-time"),
    durationEl = document.getElementById("duration"),
    prograss = document.getElementById("prograss"),
    playPrograss = document.getElementById("player-prograss"),
    playbtn = document.getElementById("play"),
    prevbtn = document.getElementById("prev"),
    nextbtn = document.getElementById("next");

const music = new Audio();
const songs =[
    {
        path:"/image/lost-in-city-lights-145038.mp3",
        displayName:"Lost in the City Lights",
        artist:"Cosmo Sheldrake",
        cover:"/image/cover-1.png"
    },
    {
        path:"/image/forest-lullaby-110624.mp3",
        displayName:"Forest Lullaby",
        artist:"Lesfm",
        cover:"/image/cover-2.png"
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic()
    }
    else{
        playMusic()
    }
}
function playMusic(){
    isPlaying = true;
    playbtn.src = "/image/pause_icon2.svg";
    playbtn.setAttribute('title','Pause');
    music.play();
}
function pauseMusic(){
    isPlaying = false;
    playbtn.src ="/image/Play_fill.svg";
    playbtn.setAttribute('title','Play');
    music.pause();
}
function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover
}
function changeMusic(direction){
    musicIndex =(musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex])
    playMusic()
}
function updatePrograssBar(){
    const { duration , currentTime} = music;
    const prograssPerecent =(currentTime / duration) * 100;
    prograss.style.width=`${prograssPerecent}%`;

    const formatTime = (time)=> String(Math.floor(time)).padStart(2, "0");
    durationEl.textContent =`${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent =`${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    
}
function setPrograssBar(e){
    const width = playPrograss.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playbtn.addEventListener("click", togglePlay);
prevbtn.addEventListener("click",()=>changeMusic(-1));
nextbtn.addEventListener("click",()=>changeMusic(1));
music.addEventListener("ended", ()=>changeMusic(1));
music.addEventListener("timeupdate", updatePrograssBar);
playPrograss.addEventListener('click',setPrograssBar);

loadMusic(songs[musicIndex]);
