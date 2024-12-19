// Point de base pour vos requêtes API
const API_BASE_URL = "php/";

// Fonction générique pour envoyer une requête à une API
async function fetchFromAPI(endpoint, options = {}) {
  try {
    const response = await fetch(API_BASE_URL + endpoint, options);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de l'appel API à ${endpoint} :`, error);
    return null;
  }
}

// Récupérer toutes les playlists disponibles
export async function getPlaylists() {
  return await fetchFromAPI("fetch.php?action=playlists");
}

// Récupérer les données d'un artiste spécifique
export async function getArtistData(artistId) {
  return await fetchFromAPI(`fetch.php?action=artist&id=${artistId}`);
}

// Récupérer toutes les chansons
export async function getTracks() {
  return await fetchFromAPI("fetch.php?action=tracks");
}

// Récupérer les favoris de l'utilisateur
export async function getUserFavorites() {
  return await fetchFromAPI("fetch.php?action=favorites");
}

// Ajouter une chanson ou une playlist aux favoris
export async function addToFavorites(item) {
  return await fetchFromAPI("fetch.php?action=add-favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

// Récupérer toutes les playlists d'un utilisateur
export async function getUserPlaylists() {
  return await fetchFromAPI("fetch.php?action=user-playlists");
}

// Créer une nouvelle playlist pour un utilisateur
export async function createPlaylist(playlistName) {
  return await fetchFromAPI("fetch.php?action=create-playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: playlistName }),
  });
}
