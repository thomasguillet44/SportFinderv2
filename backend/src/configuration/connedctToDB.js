import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';
import config from './config.js';

const pool = new Pool(config);

export async function connectToDB() {
  console.log('Variables de connexion DB:', {
    host: config.host,
    port: config.port
  });

  try {
    const client = await pool.connect();
    console.log('Connexion à la base de données réussie !');
    return client;
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
}