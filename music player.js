const songs = [
  { title: "Track 1", artist: "Artist 1", src: "asse/audio music.mp3" },
  { title: "Track 2", artist: "Artist 2", src: "asse/audio music 1.mp3" },
  { title: "Track 3", artist: "Artist 3", src: "asse/audio music 2.mp3" }
];

let currentSong = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;

  document.querySelectorAll('.playlist li').forEach(li => li.classList.remove('active'));
  playlist.children[currentSong].classList.add('active');
}

function playSong() {
  playBtn.textContent = '⏸';
  audio.play();
}

function pauseSong() {
  playBtn.textContent = '▶️';
  audio.pause();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  const min = Math.floor(currentTime / 60);
  const sec = Math.floor(currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${min}:${sec}`;

  if (duration) {
    const dMin = Math.floor(duration / 60);
    const dSec = Math.floor(duration % 60).toString().padStart(2, '0');
    durationEl.textContent = `${dMin}:${dSec}`;
  }
}

progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

volume.addEventListener('input', e => {
  audio.volume = e.target.value;
});

audio.addEventListener('ended', nextSong);

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    currentSong = index;
    loadSong(song);
    playSong();
  });
  playlist.appendChild(li);
});

loadSong(songs[currentSong]);
