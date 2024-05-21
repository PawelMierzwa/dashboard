import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;
    if (!username || !password) {
        return {
            status: 422,
            message: 'Username and password are required',
        };
    }
    const db = useDatabase();
    const user = (await db.sql`SELECT * FROM users WHERE username = ${username}`).rows?.[0];
    if (!user) {
        return {
            status: 401,
            message: 'Invalid username or password',
        };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
        return {
            status: 401,
            message: 'Invalid username or password',
        };
    }
    // @ts-expect-error
    const isTokenCreated = createToken(event, user.id, user.username);
    if (!isTokenCreated) {
        return {
            status: 500,
            message: 'Failed to create token',
        };
    }
    return {
        status: 200,
        message: 'Logged in',
        user: user,
    };
});