import list from '../../music/list.json';

if (location.pathname === "/playlist.html" || location.pathname === "/design-guide.html") {
    const audioPlayer = document.getElementById('audio-player');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playerImg = document.querySelector('.player-img');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTrackName = document.querySelector('.player-music-title');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const musicTimingCurrent = document.querySelector('.player-timing-current');
    const musicTimingEnd = document.querySelector('.player-timing-end');

    const tab = Object.values(list);
    const imageTrack = document.getElementById('player-music-img');
    const scrollul = document.querySelector('.scroll-ul');
    const divAlbum = document.querySelector('.music-album');

    let currentTrackIndex = 0;
    let isProgressBarDragging = false;
    var tracks = tab[0].tracks

    function playTrack(trackIndex) {
        const track = tracks[trackIndex];
        currentTrackName.textContent = tracks[trackIndex].title;
        audioPlayer.src = track.src;
        document.title = track.title;
    }

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
            const play = document.createElement('img');
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

            const minCurrent = Math.floor(audioPlayer.currentTime / 60);
            const secCurrent = Math.floor(audioPlayer.currentTime % 60);

            const minEnd = Math.floor(audioPlayer.duration / 60);
            const secEnd = Math.floor(audioPlayer.duration % 60);

            musicTimingCurrent.textContent = `${minCurrent}:${secCurrent < 10 ? '0' : ''}${secCurrent}`;
            musicTimingEnd.textContent = `${minEnd < 10 ? minEnd : '0'}:${secEnd < 10 ? '0' : ''}${secEnd < 10 ? secEnd : '00'}`;
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
            document.title = tracks[trackNb].title;
            currentTrackName.textContent = tracks[trackNb].title;
            playerImg.src = './images/player/pause_circle.png';
            playerImg.innerHTML = '';
            imageTrack.src = tracks[trackNb].cover;
            imageTrack.style.width = '133px';
            imageTrack.style.height = '133px';
        }
    });

    function createMusicAlbum(imgSrc, title, nb, type) {
        let albumName = '';
        let badgeColor = '';

        const albumElement = document.createElement('article');
        albumElement.classList.add('card-playlist');
        albumElement.setAttribute('data-album', nb);

        const divImg = document.createElement('div');
        divImg.classList.add('card-img');
        const img = document.createElement('img');
        img.src = imgSrc;

        const divBadges = document.createElement('div');
        divBadges.classList.add('card-badges');

        const spanPlaylist = document.createElement('span');
        spanPlaylist.classList.add('badge');
        spanPlaylist.innerHTML = 'Playlist';

        const spanAlbumName = document.createElement('span');
        spanAlbumName.classList.add('badge');

        switch (type) {
            case 'RAP US':
                badgeColor = 'red';
                albumName = 'Rap US';
                break;
            case 'POP':
                badgeColor = 'orange';
                albumName = 'POP';
                break;
            default:
                badgeColor = 'red';
                albumName = 'Album';
        }

        spanAlbumName.classList.add(`badge--${badgeColor}`);
        spanAlbumName.innerHTML = albumName;

        const divBtnListen = document.createElement('div');
        divBtnListen.classList.add('card-overlay');

        const btnListen = document.createElement('a');
        btnListen.classList.add('btn');
        btnListen.classList.add('btn--link');
        btnListen.innerHTML = 'Écouter';
        btnListen.setAttribute('data-album', nb);

        const divTitle = document.createElement('div');
        divTitle.classList.add('card-title');
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        divBadges.appendChild(spanPlaylist);
        divBadges.appendChild(spanAlbumName);

        divBtnListen.appendChild(btnListen);

        divImg.appendChild(divBadges);
        divImg.appendChild(divBtnListen);

        divTitle.appendChild(titleElement);
        divImg.appendChild(img);
        albumElement.appendChild(divImg);
        albumElement.appendChild(divTitle);

        return albumElement;
    }

    function createListAlbum() {
        const listAlbum = document.querySelector('.music-album');
        listAlbum.innerHTML = '';
        for (let i = 0; i < tab.length; i++) {
            const albumElement = createMusicAlbum(tab[i].img, tab[i].title, i, tab[i].type);
            listAlbum.appendChild(albumElement);
        }
    }

    divAlbum.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            console.log(event.target);
            const albumNb = event.target.getAttribute('data-album');
            tracks = tab[albumNb].tracks;
            imageTrack.src = tracks[0].cover;
            currentTrackName.textContent = tracks[0].title;
            document.title = tracks[0].title;
            audioPlayer.src = tracks[0].src;
            playerImg.src = './images/player/pause_circle.png';
            playerImg.innerHTML = '';
            audioPlayer.play();
            createListMusic();
        }
    });
}