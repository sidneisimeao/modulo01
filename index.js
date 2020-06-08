const express = require("express");

const server = express();

server.use(express.json());

const ckeckUserExists = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
};

const checkUserInArray = (req, res, next) => {
  const { index } = req.params;
  const user = users[index];
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  req.user = user;
  return next();
};

server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  return next();
});

const users = ["Diego", "Cláudio", "Vitor"];

server.get("/users", (req, res) => res.json(users));

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users/", ckeckUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:index", checkUserInArray, ckeckUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send("Usuário removido");
});

server.listen(3000);
