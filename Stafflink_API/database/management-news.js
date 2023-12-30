import { sql } from "./db.js";
sql`
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    expirationDate VARCHAR,
    description VARCHAR,
    bannerFileName VARCHAR,
    bannerFile BYTEA
  )
`.then(() => console.log('Tables has been created'))

