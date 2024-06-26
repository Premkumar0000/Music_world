let currentlyPlayingAudio = null;

// Function to toggle play and pause functionality
function togglePlayPause(audioId, buttonId) {
    const audio = document.getElementById(audioId);
    const button = document.getElementById(buttonId);

    // If another audio is playing, pause it and reset its play button
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        const prevButtonId = currentlyPlayingAudio.id.replace('audio', 'playPauseBtn');
        document.getElementById(prevButtonId).textContent = 'Play';
    }

    // Toggle play/pause for the clicked audio
    if (audio.paused) {
        audio.play();
        button.innerHTML = '<i class="fa-solid fa-pause" style="outline:none;"></i>';
        currentlyPlayingAudio = audio;
    } else {
        audio.pause();
        button.innerHTML = '<i class="fa-solid fa-play" style="outline:none;"></i>';
        currentlyPlayingAudio = null;
    }
}

// Function to update the progress bar of the audio
function updateProgress(audioId, progressId, currentTimeId) {
    const audio = document.getElementById(audioId);
    const progress = document.getElementById(progressId);
    const currentTimeElement = document.getElementById(currentTimeId);

    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeElement.textContent = formatTime(currentTime);
}

// Function to display the duration of the audio
function displayDuration(audioId, durationId) {
    const audio = document.getElementById(audioId);
    const durationElement = document.getElementById(durationId);
    durationElement.textContent = formatTime(audio.duration);
}

// Function to seek a specific position in the audio
function seek(event, audioId, progressId) {
    const audio = document.getElementById(audioId);
    const progressContainer = document.getElementById(progressId).parentElement;
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Function to format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to add a song to the playlist
function addToPlaylist(title, imageUrl, audioId, playPauseBtnId) {
    const playlist = document.getElementById('playlist');
    const playlistItem = document.createElement('div');
    playlistItem.classList.add('playlist-item');
    
    // Hide "No songs added yet" text when a song is added
    const sub = document.getElementById('sub');
    sub.style.display = 'none';

    // Create and append the image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;

    // Create and append the song title element
    const span = document.createElement('span');
    span.textContent = title;

    // Create and append the play/pause button
    const playButton = document.createElement('button');
    playButton.classList.add('play-pause');
    playButton.innerHTML = '<i class="fa-solid fa-play" style="outline:none;"></i>';
    playButton.onclick = function() {
        togglePlayPause(audioId, playPauseBtnId);
    };

    // Create and append the delete button
    const del = document.createElement('button');
    del.innerHTML = '<i class="fa-solid fa-circle-xmark" style="outline:none;"></i>';
    del.onclick = function() {
        playlistItem.remove();
    };

    // Append all created elements to the playlist item
    playlistItem.appendChild(img);
    playlistItem.appendChild(span);
    playlistItem.appendChild(playButton);
    playlistItem.appendChild(del);

    // Append the playlist item to the playlist
    playlist.appendChild(playlistItem);
}
