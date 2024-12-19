// Gestion du lecteur audio
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const progressBar = document.getElementById("progress-bar");

// Simuler une liste de morceaux
const tracks = [
  { title: "Chanson 1", artist: "Artiste 1", src: "assets/image.png" },
  { title: "Chanson 2", artist: "Artiste 2", src: "assets/image.png" },
];
let currentTrackIndex = 0;

// Charger un morceau
function loadTrack(index) {
  const track = tracks[index];
  audioPlayer.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
}

// Gestion du bouton lecture/pause
playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "⏯️";
  }
});

// Gestion des boutons précédent et suivant
prevBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

nextBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

// Mise à jour de la barre de progression
audioPlayer.addEventListener("timeupdate", () => {
  if (!audioPlayer.duration) return;
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

// Charger le premier morceau au démarrage
loadTrack(currentTrackIndex);

// Gestion de la recherche dynamique
function searchMusic() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  if (!query) {
    resultsContainer.innerHTML = "<p>Entrez un mot clé pour commencer.</p>";
    return;
  }

  // Simuler une requête API locale (fetch.php)
  fetch("php/fetch.php")
    .then((response) => response.json())
    .then((data) => {
      const results = data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.artist && item.artist.toLowerCase().includes(query))
      );

      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
      } else {
        resultsContainer.innerHTML = results
          .map(
            (result) => `
          <div class="search-card">
            <img src="${result.image}" alt="${result.title}">
            <h3>${result.title}</h3>
          </div>`
          )
          .join("");
      }
    });
}

// Gestion des favoris
let favorites = [];

function addToFavorites(playlist) {
  if (!favorites.some((fav) => fav.id === playlist.id)) {
    favorites.push(playlist);
    alert(`${playlist.title} a été ajouté à vos favoris !`);
    updateLibrary();
  } else {
    alert(`${playlist.title} est déjà dans vos favoris.`);
  }
}

function updateLibrary() {
  const libraryGrid = document.getElementById("library-grid");
  if (!libraryGrid) return;

  if (favorites.length === 0) {
    libraryGrid.innerHTML = "<p>Votre bibliothèque est vide.</p>";
  } else {
    libraryGrid.innerHTML = favorites
      .map(
        (fav) => `
      <div class="playlist-card">
        <img src="${fav.image}" alt="${fav.title}">
        <h3>${fav.title}</h3>
      </div>`
      )
      .join("");
  }
}

// Gestion des données d'artistes
function loadArtistData(artistId) {
  fetch("php/fetch.php")
    .then((response) => response.json())
    .then((data) => {
      const artist = data.artists.find((a) => a.id === artistId);
      if (!artist) return;

      document.getElementById("artist-name").textContent = artist.name;

      const albumsGrid = document.getElementById("albums-grid");
      albumsGrid.innerHTML = artist.albums
        .map(
          (album) => `
          <div class="playlist-card">
            <img src="${album.image}" alt="${album.title}">
            <h3>${album.title}</h3>
          </div>`
        )
        .join("");

      const tracksList = document.getElementById("tracks-list");
      tracksList.innerHTML = artist.tracks
        .map((track) => `<li>${track}</li>`)
        .join("");
    });
}

// Exemple : Charger les données d'un artiste avec l'ID 1
loadArtistData(1);

// Gestion des playlists utilisateur
const userPlaylists = [];

document.getElementById("create-playlist-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const playlistName = document.getElementById("playlist-name").value;
  userPlaylists.push({ name: playlistName, tracks: [] });
  updateUserPlaylists();
});

function updateUserPlaylists() {
  const playlistsGrid = document.getElementById("user-playlists");
  if (!playlistsGrid) return;

  playlistsGrid.innerHTML = userPlaylists
    .map(
      (playlist) => `
      <div class="playlist-card">
        <h3>${playlist.name}</h3>
        <button onclick="viewPlaylist('${playlist.name}')">Voir</button>
      </div>`
    )
    .join("");
}

function viewPlaylist(name) {
  alert(`Affichage de la playlist : ${name}`);
}
import { getPlaylists } from "./api.js";

async function loadPlaylists() {
  const playlists = await getPlaylists();
  const playlistsGrid = document.getElementById("library-grid");

  if (playlists && playlists.length > 0) {
    playlistsGrid.innerHTML = playlists
      .map(
        (playlist) => `
      <div class="playlist-card">
        <img src="${playlist.image}" alt="${playlist.title}">
        <h3>${playlist.title}</h3>
      </div>`
      )
      .join("");
  } else {
    playlistsGrid.innerHTML = "<p>Aucune playlist disponible.</p>";
  }
}

loadPlaylists();
import { addToFavorites } from "./api.js";

async function handleAddToFavorites(item) {
  const response = await addToFavorites(item);

  if (response && response.success) {
    alert(`${item.title} a été ajouté à vos favoris !`);
  } else {
    alert("Erreur lors de l'ajout aux favoris.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
    const popularPlaylists = [
      { title: "Chill Vibes", image: "assets/image.png" },
      { title: "Workout Beats", image: "assets/image.png" },
      { title: "Acoustic Relaxation", image: "assets/image.png" },
    ];
  
    const favoriteArtists = [
      { name: "Ed Sheeran", image: "assets/image.png" },
      { name: "Billie Eilish", image: "assets/image.png" },
      { name: "Drake", image: "assets/image.png" },
    ];
  
    const suggestions = [
      { title: "Morning Boost", image: "assets/image.png" },
      { title: "Focus Now", image: "assets/image.png" },
      { title: "Late Night Chill", image: "assets/image.png" },
    ];
  
    const loadCards = (containerId, items, type) => {
      const container = document.getElementById(containerId);
      container.innerHTML = items
        .map(
          (item) =>
            `<div class="${type}-card">
               <img src="${item.image}" alt="${item.title || item.name}">
               <h3>${item.title || item.name}</h3>
             </div>`
        )
        .join("");
    };
  
    loadCards("popular-playlists", popularPlaylists, "playlist");
    loadCards("favorite-artists", favoriteArtists, "artist");
    loadCards("suggestions", suggestions, "suggestion");
  });
  
