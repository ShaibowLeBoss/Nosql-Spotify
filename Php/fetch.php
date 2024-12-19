<?php
header('Content-Type: application/json');

$playlists = [
  ['id' => 1, 'title' => 'Chill Vibes', 'image' => 'assets/image.png'],
  ['id' => 2, 'title' => 'Workout Beats', 'image' => 'assets/image.png']
];

echo json_encode($playlists);
?>
<?php
header('Content-Type: application/json');

$data = [
  [
    'id' => 1,
    'title' => 'Chill Vibes',
    'image' => 'assets/image.png',
    'artist' => 'DJ Relax'
  ],
  [
    'id' => 2,
    'title' => 'Workout Beats',
    'image' => 'assets/image.png',
    'artist' => 'The Gym Masters'
  ],
  [
    'id' => 3,
    'title' => 'Acoustic Sessions',
    'image' => 'assets/image.png',
    'artist' => 'Acoustic Duo'
  ]
];

echo json_encode($data);

?>
<?php
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

$data = [
  "playlists" => [
    ["id" => 1, "title" => "Chill Vibes", "image" => "assets/image.png"],
    ["id" => 2, "title" => "Workout Beats", "image" => "assets/image.png"],
  ],
  "tracks" => [
    ["id" => 1, "title" => "Song 1", "artist" => "Artist 1", "src" => "assets/image.png"],
    ["id" => 2, "title" => "Song 2", "artist" => "Artist 2", "src" => "assets/image.png"],
  ],
  "artists" => [
    [
      "id" => 1,
      "name" => "Artist 1",
      "albums" => [
        ["title" => "Album 1", "image" => "assets/image.png"],
        ["title" => "Album 2", "image" => "assets/image.png"],
      ],
      "tracks" => ["Song 1", "Song 2"],
    ],
  ],
];

if ($action === 'playlists') {
  echo json_encode($data["playlists"]);
} elseif ($action === 'tracks') {
  echo json_encode($data["tracks"]);
} elseif ($action === 'artist' && isset($_GET['id'])) {
  $artistId = (int) $_GET['id'];
  $artist = array_filter($data["artists"], fn($a) => $a['id'] === $artistId);
  echo json_encode(array_shift($artist) ?: []);
} elseif ($action === 'favorites') {
  echo json_encode([]); // Simuler une liste vide pour les favoris
} elseif ($action === 'add-favorite') {
  $input = json_decode(file_get_contents('php://input'), true);
  echo json_encode(["success" => true, "added" => $input]);
} elseif ($action === 'user-playlists') {
  echo json_encode([]); // Simuler des playlists vides
} elseif ($action === 'create-playlist') {
  $input = json_decode(file_get_contents('php://input'), true);
  echo json_encode(["success" => true, "created" => $input]);
} else {
  echo json_encode(["error" => "Action invalide"]);
}
?>

