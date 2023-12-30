import { sql } from "./db.js";

// sql`
//     DROP TABLE registers
// `.then(() => console.log('Table has been deleted'))

sql`
    CREATE TABLE IF NOT EXISTS  registers(
        id SERIAL PRIMARY KEY ,
        name VARCHAR ,
        cnpj VARCHAR ,
        stateRegistration VARCHAR ,
        openingDate VARCHAR ,
        corporateName VARCHAR ,
        cep VARCHAR ,
        address VARCHAR ,
        number VARCHAR ,
        neighborhood VARCHAR ,
        city VARCHAR ,
        state VARCHAR ,
        email VARCHAR ,
        confirmEmail VARCHAR ,
        password VARCHAR ,
        confirmPassword VARCHAR ,
        finalCode VARCHAR 

    )
`.then(() => console.log('Tables has been created'))

// console.log(sql)