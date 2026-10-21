import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

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
