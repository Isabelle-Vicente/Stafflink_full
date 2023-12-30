import { sql } from "./db.js";



sql`
    CREATE TABLE IF NOT EXISTS vacation(
        id SERIAL PRIMARY KEY ,
        name VARCHAR,
        email VARCHAR,
        description VARCHAR,
        cpf VARCHAR,
        date DATE,
        time TIME,
        finished BOOLEAN,
        notified BOOLEAN

    )
`.then(() => console.log('Tables has been created'))

