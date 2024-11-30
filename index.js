const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Initialiser la liste des utilisateurs
const users = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" }
];

// POST : CRÉER un nouvel utilisateur
app.post("/", (req, res) => {
    const { firstName, lastName } = req.body;
    const lastId = users[users.length - 1]?.id || 0; // Si la liste est vide, dernier ID = 0
    const newId = lastId + 1;

    const newUser = { firstName, lastName, id: newId };
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET : RÉCUPÉRER TOUS les utilisateurs
app.get("/", (req, res) => {
    res.json(users);
});

// GET : RÉCUPÉRER un utilisateur spécifique par ID
app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); // Récupérer l'ID depuis les paramètres de l'URL

    // Trouver l'index de l'utilisateur
    const userIndex = users.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est trouvé, retourner ses données
    res.json(users[userIndex]);
});

// PUT : METTRE À JOUR un utilisateur par ID
app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id); // Récupérer l'ID depuis les paramètres de l'URL

    // Trouver l'index de l'utilisateur
    const userIndex = users.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est trouvé, vérifier les valeurs envoyées
    const { firstName, lastName } = req.body;

    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;

    // Répondre avec l'utilisateur mis à jour
    res.json({
        msg: "Utilisateur mis à jour",
        user: users[userIndex],
    });
});

// DELETE : SUPPRIMER un utilisateur par ID
app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id); // Récupérer l'ID depuis les paramètres de l'URL

    // Trouver l'index de l'utilisateur
    const userIndex = users.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est trouvé, le supprimer
    users.splice(userIndex, 1);

    // Répondre avec un message de confirmation
    res.json({
        msg: "Utilisateur supprimé",
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
