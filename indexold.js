
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());


let users = [
    {id: 1, name : "Sadqiui", age: 25},
    {id: 2, name: "Anna", age: 28}
];
// Home route

app.get("", (req, res) => {
    res.send("Hello from node.js + Express!")
});

// Return JSON

app.get("/api/info", (req, res) => {
    res.json({
        status: "success",
        message: "This is a JSON response"
    });
});

// Route with params

app.get("/api/user/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).json({message: "user not found!"});
    }
    res.json({user: user});
});

// POST route

app.post("/api/user", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

app.get("/api/users", (req, res) => {
    res.json({
        message: "All users",
        count: users.length,
        data: users
    });

});

app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({message: "user not found"});
  }
  user.name = req.body.name || user.name
  user.age = req.body.age || user.age
  res.json({
    message: "User update successfully!",
    user
  });
});


app.delete("/api/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1 ) {
        return res.status(404).json({message: "user not found!"});
    }
    const deleteUser = users.splice(userIndex, 1);
    res.json({
        message: "user delete successfully",
        deleteUser: deleteUser
    });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});