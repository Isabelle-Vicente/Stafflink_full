import 'dotenv/config';

import postgres from 'postgres';

const { KEY } = process.env;
const URL = `postgres://postgres.krjkgqzmglevncbdxkqa:${KEY}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`

export const sql = postgres(URL, { ssl: 'require' })
