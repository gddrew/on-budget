import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    await pool.end();
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

main();
