const container = document.querySelector('.container');
const PlayerImage = document.querySelector('.song-png');
const SonTitle = document.getElementById('song-name');
const artisName = document.getElementById('artist-name');

const musicplayer = document.querySelector('.music-player');
const back = document.getElementById("back");

const ctrl = document.querySelector(".controls");
// ctrl pasue
const CtrlPause = document.querySelector('.CtrlPause');
// const Ctrlicon = CtrlPause.querySelector

const miniPlayer = document.querySelector(".divMini");
const miniPlayerImage = document.querySelector('.song-png-mini');
const closePlayer = document.getElementById("close");
const miniSongTitle = document.getElementById("song-name-mini");
const miniSongArtist = document.getElementById("artist-name-mini");
miniPlayer.classList.add("miniPosition");

//froward backward operations
const backwardButton = document.getElementById("backward");
const forwardButton = document.getElementById("forward");


let audioPlayer;
let updateTime;

//for songs data from api 
document.addEventListener('DOMContentLoaded', function () {

    let currentlyPlayingAudio = null; //for song playing

    const durationDisplay = document.getElementById('duration');


    // Fetch songs data from the API
    fetch('http://localhost:62237/api/songs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const songs = data.songs;
            // Dynamically create HTML elements for each song
            songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.classList.add('songs');
                songElement.id = song.id;

                const imgElement = document.createElement('img');

                imgElement.src = `/backend/public/${song.song_image}`; // Adjust the image path
                imgElement.classList.add('img-radius2');

                songElement.appendChild(imgElement);
                container.appendChild(songElement);

                // Attach event listener to each song
                songElement.addEventListener('click', function () {

                    
                    // Pause the currently playing audio
                    if (currentlyPlayingAudio) {
                        currentlyPlayingAudio.pause();
                        currentlyPlayingAudio.src = '';
                        currentlyPlayingAudio.load();
                        // removePlayPauseHandler();
                    }

                    musicplayer.classList.add("block");

                    //if Mini-Player is Display the close 
                    miniPlayer.classList.add("miniPosition");

                    // Handle the click event (e.g., play the song)
                    console.log('Clicked on song with ID:', songElement.id);



                    // Remove old images in the playerImage element
                    while (PlayerImage.firstChild) {
                        PlayerImage.removeChild(PlayerImage.firstChild);
                        // for mini player
                        miniPlayerImage.removeChild(miniPlayerImage.firstChild);
                    }

                    let img = document.createElement('img');
                    img.src = `/backend/public/${song.song_image}`;
                    PlayerImage.appendChild(img);

                    let img2 = document.createElement('img');
                    img2.src = img.src;
                    // fro mini player
                    miniPlayerImage.appendChild(img2);

                    //add title
                    SonTitle.innerText = `${song.songname}`;
                    miniSongTitle.innerText = `${song.songname}`;

                    //add artis name
                    artisName.innerHTML = `${song.artistname}`;
                    miniSongArtist.innerHTML = `${song.artistname}`;

                
                    // Create a new Audio instance for each song
                    audioPlayer = new Audio(`/backend/public/${song.song_audio}`);
                    audioPlayer.src = `/backend/public/${song.song_audio}`;
                     

                    // Update the progress bar as the song plays
                    audioPlayer.addEventListener('timeupdate', function () {
                        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                        document.getElementById('progress').value = progress;
                    });

                    // Update the audio playback position when the user interacts with the progress bar
                    document.getElementById('progress').addEventListener('input', function () {
                        const seekTime = (audioPlayer.duration * this.value) / 100;
                        audioPlayer.currentTime = seekTime;
                    });


                    // Play the audio
                    audioPlayer.play().catch(error => console.error('Error playing audio:', error));


                    // Toggle function for toggli Between Play and Pause Button
                    if (audioPlayer.play) {
                        toggle();
                        console.log("song play");
                    }
                    
                    currentlyPlayingAudio = audioPlayer; //set currently playing song

                });

                container.appendChild(songElement);
            });
        })
        .catch(error => console.error('Error fetching songs:', error));
});

//For Back Button
function toggle() {
    // console.log("inside toggle");
    CtrlPause.innerHTML = '';
   

    const newElement = document.createElement('i');
    newElement.classList.add('fa-solid');

    if (audioPlayer.paused) {
        newElement.classList.add('fa-pause');
        CtrlPause.addEventListener('click', playPauseHandler);
        console.log("pause");

    } else {
        newElement.classList.add('fa-play');
        CtrlPause.addEventListener('click', playPauseHandler);
        console.log("play");
    }

    CtrlPause.appendChild(newElement);
}

function playPauseHandler() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    toggle();
}

// Remove event listener before adding new one
function removePlayPauseHandler() {
    CtrlPause.removeEventListener('click', playPauseHandler);
    console.log("remove Eventlistener");
}


back.addEventListener("click", () => {
    musicplayer.classList.remove("block");
    miniPlayer.classList.remove("miniPosition");
    // removePlayPauseHandler();
    toggle();
});

//for Close Button
closePlayer.addEventListener("click", () => {
    audioPlayer.pause();
    musicplayer.classList.remove("block");
    miniPlayer.classList.add("miniPosition");
    // audioPlayer = null; 
    // removePlayPauseHandler();
});

//if player is mini on clicking Big Music Player Open
miniPlayer.addEventListener("click", () => {
    miniPlayer.classList.add("miniPosition");
    musicplayer.classList.add("block");
    // removePlayPauseHandler();
});


