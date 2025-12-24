import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.status(200).json({ success: true, message: "Users found", data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.password]
    );

    res
      .status(201)
      .json({ success: true, message: "Users created", data: rows[0] });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.send(rows);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const { rows, rowCount } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [user.name, user.email, id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.send({ message: `Users updated ${id}`, data: rows[0] });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.sendStatus(204);
};
