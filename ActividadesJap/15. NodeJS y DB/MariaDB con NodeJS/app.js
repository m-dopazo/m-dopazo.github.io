const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "planning",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});



app.get("/plan", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, description, status, created_at, updated_at FROM todo"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.get("/plan/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, description, status, created_at, updated_at FROM todo WHERE id=?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.post("/plan", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let now = new Date();
    const response = await conn.query(
      `INSERT INTO todo(name, description, status, created_at) VALUE(?, ?, ?, ?)`,
      [req.body.name, req.body.description, req.body.status, now]
    );
    res.json({ id: parseInt(response.insertId), ...req.body, created_at: now });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.put("/plan/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let now = new Date();
    const response = await conn.query(
      `UPDATE todo SET name=?, description=?, status=?, updated_at=? WHERE id=?`,
      [req.body.name, req.body.description, req.body.status, now, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body, updated_at: now });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.delete("/plan/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("DELETE FROM todo WHERE id=?", [
      req.params.id,
    ]);
    res.json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
