import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();

// ----- middlewares -----
app.use(express.json());

app.use(
  cors({
    origin: 'https://supreme-space-yodel-5173.app.github.dev', // update if your Codespace URL changes
    credentials: true,
  }),
);

// ----- PostgreSQL connection -----
const pool = new Pool({
  host: 'localhost',     // change if your DB is in Docker or remote
  port: 5432,
  user: 'chadmin',       // your db user
  password: 'password', ///change to db password
  database: 'name', /// change to db name 
});

// ----- JWT secret (for tokens) -----
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// ----- helper: get all clubs for a user -----
async function getUserClubs(userId) {
  const result = await pool.query(
    `SELECT c.club_id,
            c.name,
            cm.role,
            cm.is_active,
            cm.dues_paid
     FROM "Club Membership" cm
     JOIN "Club" c ON cm.clubid = c.club_id
     WHERE cm.userid = $1`,
    [userId],
  );

  return result.rows.map((row) => ({
    id: row.club_id,
    name: row.name,
    role: row.role,
    is_active: row.is_active,
    dues_paid: row.dues_paid,
  }));
}

// -----------------------------------------------------------
//  POST /auth/register
//  - creates a new user in "User" with a hashed password
// -----------------------------------------------------------
app.post('/auth/register', async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // 1. check if email already exists
    const existing = await pool.query(
      'SELECT user_id FROM "User" WHERE school_email = $1',
      [email],
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // 2. hash the password (salted hash)
    const passwordHash = await bcrypt.hash(password, 12);

    // 3. insert user into "User"
    const insertResult = await pool.query(
      `INSERT INTO "User"
         (school_email, password, first_name, last_name, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING user_id, school_email, first_name, last_name, role, created_at`,
      [email, passwordHash, first_name, last_name, role || 'student'],
    );

    const user = insertResult.rows[0];

    // 4. create a JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    // new users probably have no clubs yet, but we can still call helper
    const organizations = await getUserClubs(user.user_id);

    res.status(201).json({
      token,
      user: {
        id: user.user_id,
        email: user.school_email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        created_at: user.created_at,
      },
      organizations,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// -----------------------------------------------------------
//  POST /auth/login
//  - checks email + password against "User"
//  - verifies bcrypt hash
//  - issues JWT token
//  - fetches clubs for that user
// -----------------------------------------------------------
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  try {
    // 1. find user by school_email
    const result = await pool.query(
      `SELECT user_id,
              school_email,
              password,
              first_name,
              last_name,
              role,
              created_at
       FROM "User"
       WHERE school_email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];

    // 2. compare submitted password with stored hash
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 3. issue JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    // 4. fetch user's clubs from "Club Membership"
    const organizations = await getUserClubs(user.user_id);

    // 5. send token + basic user info + orgs
    res.json({
      token,
      user: {
        id: user.user_id,
        email: user.school_email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        created_at: user.created_at,
      },
      organizations,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// -----------------------------------------------------------
//  Start server
// -----------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});
