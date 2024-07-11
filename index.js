let body = document.querySelector(".body");

let coverPhoto = document.querySelector(".coverPhoto");
let songName = document.querySelector(".songName");
let singer = document.querySelector(".singer");

let playPause = document.querySelector(".playPause");
let forward = document.querySelector(".forward");
let previous = document.querySelector(".previous");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "The Nights",
    artist: "Avicii",
    image: "images/the-nights.webp",
    path: "Music/The-nights.mp3",
  },
  {
    name: "One Dance",
    artist: "Drake",
    image: "images/one-dance.jpeg",
    path: "Music/12. One Dance (Ft. Wizkid & Kyla).mp3",
  },
  {
    name: "Hymn for the Weekend",
    artist: "Coldplay",
    image: "images/hymm-for-the-weekend.jpeg",
    path: "Music/Hymn For The Weekend.mp3",
  },
  {
    name: "Counting Stars",
    artist: "OneRepublic",
    image: "images/counting-stars.jpeg",
    path: "Music/Counting stars.mp3",
  },
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    image: "images/Blinding-lights.jpeg",
    path: "Music/The Weeknd - Blinding Lights (Official Audio).mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  coverPhoto.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
    songName.textContent = track_list[track_index].name;
  singer.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);

  random_bg_color();
}

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  document.body.style.background = bgColor;
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playPause.innerHTML = '<i class="pauseIcon"><svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 -960 960 960" fill="black"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playPause.innerHTML = '<i class="playIcon"><svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 -960 960 960"  fill="black"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
