// Script to wake up Neon database and push schema
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function wakeAndSetup() {
    console.log('Connecting to Neon database...');

    const sql = neon(process.env.DATABASE_URL);

    try {
        // Wake up the database with a simple query
        console.log('Waking up database...');
        const result = await sql`SELECT 1 as wake`;
        console.log('Database is awake!', result);

        // Create users table
        console.log('Creating users table...');
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT,
        name TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

        // Create projects table
        console.log('Creating projects table...');
        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        prompt TEXT NOT NULL,
        template TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

        // Create indexes
        console.log('Creating indexes...');
        await sql`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;

        console.log('✅ Database setup complete!');

        // Verify tables
        const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
        console.log('Tables:', tables.map(t => t.table_name));

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

wakeAndSetup();
