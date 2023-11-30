const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "planning",
    connectionLimit: 5,
});

async function getUsers() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT id, name, description, status, created_at, updated_at FROM todo"
        );
        return rows;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}

async function getUserById (id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, name, description, status, created_at, updated_at FROM todo WHERE id=?",
        [id]
      );
      return rows[0];
    } catch (error) {
        console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
}

async function createUser (user) {
    let conn;
    try {
      conn = await pool.getConnection();
      let now = new Date();
      const response = await conn.query(
        `INSERT INTO todo(name, description, status, created_at) VALUE(?, ?, ?, ?)`,
        [user.name, user.description, user.status, now]
      );
      return {id: parseInt(response.insertId), ...user, created_at: now };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
}

async function updateUser (id,user) {
    let conn;
    try {
      conn = await pool.getConnection();
      let now = new Date();
      const response = await conn.query(
        `UPDATE todo SET name=?, description=?, status=?, updated_at=? WHERE id=?`,
        [user.name, user.description, user.status, now, id]
      );
      return { id: id, ...user, updated_at: now };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
}

async function deleteUser (id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("DELETE FROM todo WHERE id=?", [id]);
        return true;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}