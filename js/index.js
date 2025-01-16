
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB', {enableUtf8Validation: false})
  .then(() => console.log('Connecté à MongoDB'))
  .catch((error) => console.error('Erreur de connexion à MongoDB:', error));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: Number
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
  name: "Roissath",
  email: "wroissath@gmail.com"
});

newUser.save()
  .then(() => console.log('Nouvel utilisateur créé avec succès !'))
  .catch((error) => console.error('Erreur lors de la sauvegarde du nouvel utilisateur:', error));