const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Initialiser la liste des utilisateurs
const users = [
    { id: 1, firstName: "John", lastName: "Doe" }
];

// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
app.post("/", (req, res) => {
    const { firstName, lastName } = req.body;
    const lastId = users[users.length - 1]?.id || 0; // Si la liste est vide, dernier ID = 0
    const newId = lastId + 1;

    const newUser = { firstName, lastName, id: newId };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/", (req, res) => {
    res.json({
        msg: "hello rest api ici le PUT",
    });
});

app.delete("/", (req, res) => {
    res.json({
        msg: "hello rest api ici le DELETE",
    });
});

// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
