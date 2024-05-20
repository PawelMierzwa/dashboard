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
    const { jwtSecret, jwtAlg } = useRuntimeConfig(event);
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

    const token = jwt.sign({
        userId: user.id,
        username: user.username
    }, jwtSecret as jwt.Secret, { header: { alg: jwtAlg as jwt.Algorithm } });

    setCookie(event, 'token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 31,
        path: '/',
    });

    return {
        status: 200,
        message: 'Logged in',
        user: user,
    };
});