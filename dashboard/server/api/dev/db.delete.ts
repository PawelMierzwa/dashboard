export default defineEventHandler(async () => {
    const db = useDatabase();
    await db.sql`DROP TABLE IF EXISTS users`;
    console.log("Deleted 'users' successfully");
});