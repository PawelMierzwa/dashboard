export default defineEventHandler(async () => {
    const db = useDatabase();
    await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "username" TEXT, "password" TEXT)`;
});