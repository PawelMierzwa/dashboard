import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token') || '';
    if (!token) {
        return {
            status: 401,
            message: 'Unauthorized',
        };
    }
    let username: string | undefined;
    const { jwtSecret, jwtAlg } = useRuntimeConfig(event);
    jwt.verify(token, jwtSecret as jwt.Secret, { algorithms: [jwtAlg as jwt.Algorithm] }, function (err, decoded) {
        if (err) {
            console.log("User get error:", err);
            return {
                status: 401,
                message: 'Unauthorized'
            };
        }
        username = (decoded as jwt.JwtPayload).username as string;
    });
    if (!username) {
        return {
            status: 401,
            message: 'Unauthorized',
        };
    }
    const db = useDatabase();
    const user = (await db.sql`SELECT * FROM users WHERE username = ${username}`).rows?.[0];
    if (!user) {
        return {
            status: 401,
            message: 'Unauthorized',
        };
    }
    return {
        status: 200,
        message: 'Authorized',
        user: user,
    };
});