import { Pool } from "pg";

const connectionString = "postgres://jlbhgqfo:dVE0_GEByXoIZpEt_YErOT2QsysXvJQY@tuffi.db.elephantsql.com/jlbhgqfo";
const db = new Pool({ connectionString });

export default db;

