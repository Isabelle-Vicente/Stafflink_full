import { sql } from "./db.js";

// sql`
//     DROP TABLE employees
// `.then(() => console.log('Table has been deleted'))

// sql`
//     select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS 
//     where TABLE_NAME = 'employees'
// `.then((data) => console.log(data))

// sql`
//     SELECT * FROM employees
// `.then((data) => console.log(data))

// sql`
// CREATE TABLE IF NOT EXISTS employees (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR,
//     birthday VARCHAR(10),
//     age VARCHAR,
//     genderIdentity VARCHAR,
//     pronoun VARCHAR,
//     motherName VARCHAR,
//     fatherName VARCHAR,
//     rg VARCHAR,
//     cpf VARCHAR,
//     pis VARCHAR,
//     employementCard VARCHAR,
//     tel VARCHAR,
//     cel VARCHAR,
//     email VARCHAR,
//     password VARCHAR,
//     cep VARCHAR(10),
//     address VARCHAR,
//     number VARCHAR,
//     neighborhood VARCHAR,
//     city VARCHAR,
//     state VARCHAR,
//     office VARCHAR,
//     sector VARCHAR,
//     contract VARCHAR,
//     journeyInit VARCHAR,
//     journeyEnd VARCHAR,
//     grossSalary VARCHAR,
//     hiring VARCHAR,
//     benefits VARCHAR,
//     bankAccount VARCHAR,
//     bank VARCHAR,
//     agency VARCHAR,
//     employeePhotoName VARCHAR,
//     employeePhoto BYTEA
//   )
// `.then(() => console.log('Tables has been created'))

