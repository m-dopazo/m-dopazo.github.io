const express = require("express");
const jwt = require("jsonwebtoken");
const KEY = "abcd";
const planRouter = require("./routes/planRoutes");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /people
function verificarToken (req, res, next) {
  try {
    const decoded = jwt.verify(req.headers["access-token"], KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
};

app.use("/plan", verificarToken, planRouter)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
