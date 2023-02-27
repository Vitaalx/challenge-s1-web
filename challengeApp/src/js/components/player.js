const audioPlayer = document.getElementById('audio-player');
const prevBtn = document.getElementById('prev-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const album = document.getElementById('album');
const list_tracks = document.getElementById('list-tracks');
import list from '../../music/list.json';
const tab = Object.values(list);

let currentTrackIndex = 0;
    let isProgressBarDragging = false;
    var tracks = tab[0].tracks

    function playTrack(trackIndex) {
    const track = tracks[trackIndex];
    audioPlayer.src = track.src;
    audioPlayer.play();
    document.title = track.title;
}

createListTracks();

playTrack(currentTrackIndex);

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Lecture';
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    if (!isProgressBarDragging) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progressPercent + '%';
    }
});

progressBarContainer.addEventListener('mousedown', (event) => {
    isProgressBarDragging = true;
    updateProgressBar(event);
});

document.addEventListener('mousemove', (event) => {
    if (isProgressBarDragging) {
        updateProgressBar(event);
    }
});

document.addEventListener('mouseup', () => {
    isProgressBarDragging = false;
});

function updateProgressBar(event) {
    const progressWidth = progressBarContainer.clientWidth;
    const clickX = event.clientX - progressBarContainer.getBoundingClientRect().left;
    const progressPercent = (clickX / progressWidth) * 100;
    progressBar.style.width = progressPercent + '%';
    audioPlayer.currentTime = (audioPlayer.duration * progressPercent) / 100;
}

audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

album.addEventListener('change', () => {
    const albumNb = album.options[album.selectedIndex].value;
    tracks = tab[albumNb].tracks;
    audioPlayer.src = tracks[0].src;
    audioPlayer.play();
    createListTracks();
});

list_tracks.addEventListener('change', () => {
    const trackNb = list_tracks.options[list_tracks.selectedIndex].value;
    audioPlayer.src = tracks[trackNb].src;
    audioPlayer.play();
});

function createListTracks() {
    list_tracks.innerHTML = '';
    for (let i = 0; i < tracks.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = tracks[i].title;
        console.log(option);
        list_tracks.appendChild(option);
    }

}