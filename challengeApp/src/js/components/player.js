import list from '../../music/list.json';
if (location.pathname === '/playlist.html') {
    const audioPlayer = document.getElementById('audio-player');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const list_tracks = document.getElementById('list-tracks');

    const tab = Object.values(list);
    const imageTrack = document.getElementById('player-music-img');
    const scrollul = document.querySelector('.scroll-ul');
    const divAlbum = document.querySelector('.music-album');

    let currentTrackIndex = 0;
    let isProgressBarDragging = false;
    var tracks = tab[0].tracks

    function playTrack(trackIndex) {
        const track = tracks[trackIndex];
        audioPlayer.src = track.src;
        audioPlayer.play();
        document.title = track.title;
    }

//createListTracks();
    createListMusic();
    createListAlbum();

    playTrack(currentTrackIndex);
    imageTrack.src = tracks[currentTrackIndex].cover;
    imageTrack.style.width = '133px';
    imageTrack.style.height = '133px';

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        playTrack(currentTrackIndex);
        imageTrack.src = tracks[currentTrackIndex].cover;
        imageTrack.style.width = '133px';
        imageTrack.style.height = '133px';
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrack(currentTrackIndex);
        imageTrack.src = tracks[currentTrackIndex].cover;
        imageTrack.style.width = '133px';
        imageTrack.style.height = '133px';
    });

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            const  play = document.createElement('img');
            play.src = './images/player/pause_circle.png';
            playPauseBtn.innerHTML = '';
            playPauseBtn.appendChild(play);
        } else {
            audioPlayer.pause();
            const pause = document.createElement('img');
            pause.src = './images/player/play_circle.png';
            playPauseBtn.innerHTML = '';
            playPauseBtn.appendChild(pause);
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
        imageTrack.src = tracks[currentTrackIndex].cover;
        imageTrack.style.width = '133px';
        imageTrack.style.height = '133px';
    });
    /*
    album.addEventListener('change', () => {
        const albumNb = album.options[album.selectedIndex].value;
        tracks = tab[albumNb].tracks;
        audioPlayer.src = tracks[0].src;
        audioPlayer.play();
        createListTracks();
        createListMusic();
    });

    list_tracks.addEventListener('change', () => {
        const trackNb = list_tracks.options[list_tracks.selectedIndex].value;
        audioPlayer.src = tracks[trackNb].src;
        audioPlayer.play();
    });

    */

    function createListTracks() {
        list_tracks.innerHTML = '';
        for (let i = 0; i < tracks.length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = tracks[i].title;
            list_tracks.appendChild(option);
        }

    }

    function createMusicElement(imgSrc, title, duration, nb) {

        const musicElement = document.createElement('li');
        musicElement.classList.add('music-element');
        musicElement.setAttribute('data-track', nb);
        const img = document.createElement('img');
        img.src = imgSrc;

        const titleElement = document.createElement('p');
        titleElement.classList.add('text-music-element');
        titleElement.textContent = title;

        const durationElement = document.createElement('p');
        durationElement.classList.add('timer-music-element');
        durationElement.textContent = duration;

        musicElement.appendChild(img);
        musicElement.appendChild(titleElement);
        musicElement.appendChild(durationElement);

        return musicElement;
    }

    function createListMusic() {
        const listMusic = document.querySelector('.scroll-ul');
        listMusic.innerHTML = '';
        for (let i = 0; i < tracks.length; i++) {
            const musicElement = createMusicElement(tracks[i].cover, tracks[i].title, tracks[i].duration, i);
            listMusic.appendChild(musicElement);
        }
    }

    scrollul.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const trackNb = event.target.getAttribute('data-track');
            audioPlayer.src = tracks[trackNb].src;
            audioPlayer.play();
        }
    });

    function createMusicAlbum(imgSrc, title, nb) {

        const albumElement = document.createElement('article');
        albumElement.classList.add('card-playlist');
        albumElement.setAttribute('data-album', nb);

        const divimg = document.createElement('div');
        divimg.classList.add('card-img');
        const img = document.createElement('img');
        img.src = imgSrc;

        const divTitle = document.createElement('div');
        divTitle.classList.add('card-title');
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        divTitle.appendChild(titleElement);
        divimg.appendChild(img);
        albumElement.appendChild(divimg);
        albumElement.appendChild(divTitle);

        return albumElement;
    }

    function createListAlbum() {
        const listAlbum = document.querySelector('.music-album');
        listAlbum.innerHTML = '';
        for (let i = 0; i < tab.length; i++) {
            const albumElement = createMusicAlbum(tab[i].img, tab[i].title, i);
            listAlbum.appendChild(albumElement);
        }
    }

    divAlbum.addEventListener('click', (event) => {
        if (event.target.tagName === 'ARTICLE') {
            console.log(event.target);
            const albumNb = event.target.getAttribute('data-album');
            tracks = tab[albumNb].tracks;
            audioPlayer.src = tracks[0].src;
            audioPlayer.play();
            createListTracks();
            createListMusic();
        }
    });
}