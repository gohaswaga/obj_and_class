const pleer = {
  tracks: [
    {
      title: "Зима",
      artist: "ooes",
      src: "assets/Ooes - Зима.mp3",
      cover: "https://i1.sndcdn.com/artworks-16e0JlT1xH2KIRFr-CafHmw-t500x500.jpg"
    },
    {
      title: "Судно",
      artist: "MOLCHAT DOMA",
      src: "assets/Молчат Дома - Судно (Борис Рыжий).mp3",
      cover: "https://images.genius.com/0f4fb52bc2b9184f6ea46a9ea6b3589b.1000x1000x1.png"
    },
    {
      title: "В тумане белом",
      artist: "УННВ",
      src: "assets/УННВ - В тумане белом.mp3",
      cover: "https://lastfm.freetls.fastly.net/i/u/ar0/b3f0b32c703ba3d8308e4edf1f22cdfc.jpg"
    },
    {
      title: "Фантом",
      artist: "RADIOTAPOK",
      src: "assets/Radio Tapok - Фантом.mp3",
      cover: "https://radiotapok.ru/templates/rt/img/covers2/t9.jpg"
    }
  ],

  currentTrack: 0,

  init() {
    this.renderTrackList();

    const audio = document.getElementById("audio");
    audio.addEventListener("ended", () => this.nextTrack());

    document.getElementById("play-button").onclick = () => this.playPause();
    document.getElementById("prev-button").onclick = () => this.prevTrack();
    document.getElementById("next-button").onclick = () => this.nextTrack();
    document.getElementById("shuffle-button").onclick = () => this.shuffleTracks();
    document.getElementById("back-button").onclick = () => this.goBack();
  },

  renderTrackList() {
    const list = document.getElementById("track-items");
    list.innerHTML = "";

    this.tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="track-item">
          <img class="image" src="${track.cover}" alt="${track.title}" />
          <span>${track.title} — ${track.artist}</span>
        </div>
      `;
      li.onclick = () => this.selectTrack(index);
      list.appendChild(li);
    });
  },

  selectTrack(index) {
    this.currentTrack = index;
    const track = this.tracks[index];
    const audio = document.getElementById("audio");

    audio.src = track.src;
    audio.load();
    audio.play();

    document.getElementById("cover").src = track.cover;
    document.getElementById("title").textContent = track.title;
    document.getElementById("artist").textContent = track.artist;

    document.getElementById("track-list").classList.add("hidden");
    document.getElementById("player").classList.remove("hidden");

    document.getElementById("play-button").src = "assets/pause.png";
  },

  playPause() {
    const audio = document.getElementById("audio");
    const playButton = document.getElementById("play-button");

    if (audio.paused) {
      audio.play();
      playButton.src = "assets/pause.png";
    } else {
      audio.pause();
      playButton.src = "assets/play.png";
    }
  },

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    this.selectTrack(this.currentTrack);
  },

  prevTrack() {
    this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
    this.selectTrack(this.currentTrack);
  },

  shuffleTracks() {
    for (let i = this.tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
    }
    this.selectTrack(0);
  },

  goBack() {
    document.getElementById("player").classList.add("hidden");
    document.getElementById("track-list").classList.remove("hidden");
  }
};

pleer.init();
