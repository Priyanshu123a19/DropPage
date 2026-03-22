// file: index.js

const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

let users = [];

// Load users from file
function loadUsers() {
    const data = fs.readFileSync("users.json"); // BUG: no error handling
    users = JSON.parse(data); // BUG: crash if invalid JSON
}

// Save users
function saveUsers() {
    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) console.log(err); // BUG: just logs, no recovery
    });
}

// Add user
app.post("/users", (req, res) => {
    const { id, name, email } = req.body;

    // BUG: no validation
    const newUser = { id, name, email };

    users.push(newUser);

    saveUsers();

    res.send({
        message: "User added",
        user: newUser
    });
});

// Get all users
app.get("/users", (req, res) => {
    res.send(users); // BUG: exposes internal data directly
});

// Get user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id); // BUG: loose equality

    if (!user) {
        res.status(404).send("User not found");
    }

    res.send(user); // BUG: still executes after 404
});

// Delete user
app.delete("/users/:id", (req, res) => {
    // BUG: modifying array incorrectly
    users = users.filter(u => {
        if (u.id == req.params.id) {
            return;
        }
        return u;
    });

    saveUsers();

    res.send("User deleted");
});

// Update user email
app.put("/users/:id/email", (req, res) => {
    const user = users.find(u => u.id === req.params.id); // BUG: type mismatch possible

    if (!user) {
        res.status(404).send("User not found");
    }

    user.email = req.body.email; // BUG: no validation

    saveUsers();

    res.send({
        message: "Email updated",
        user
    });
});

// Export users to CSV
app.get("/export", (req, res) => {
    let csv = "id,name,email\n";

    users.forEach(u => {
        csv += `${u.id},${u.name},${u.email}\n`;
    });

    fs.writeFileSync("users.csv", csv); // BUG: blocking call

    res.download("users.csv");
});

// Search users
app.get("/search", (req, res) => {
    const query = req.query.q;

    const result = users.filter(u => {
        return u.name.includes(query); // BUG: case-sensitive, no null check
    });

    res.send(result);
});

// Simulate async bug
app.get("/async-bug", async (req, res) => {
    const data = fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) throw err; // BUG: crashes server
        return JSON.parse(data);
    });

    res.send(data); // BUG: undefined because callback async
});

// Dangerous eval endpoint
app.post("/execute", (req, res) => {
    const { code } = req.body;

    try {
        const result = eval(code); // 🔥 SECURITY BUG
        res.send({ result });
    } catch (e) {
        res.send({ error: e.message });
    }
});

// Initialize
loadUsers();

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});