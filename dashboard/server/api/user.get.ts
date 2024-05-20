import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token') || '';
    if (!token) {
        return {
            status: 401,
            body: {
                message: 'Unauthorized',
            },
        };
    }
    let userId: string | undefined;
    const { jwtSecret, jwtAlg } = useRuntimeConfig(event);
    jwt.verify(token, jwtSecret as jwt.Secret, { algorithms: [jwtAlg as jwt.Algorithm] }, function (err, decoded) {
        if (err) {
            console.log("User get error:", err);
            return {
                status: 401,
                body: {
                    message: 'Unauthorized'
                },
            };
        }
        userId = (decoded as jwt.JwtPayload).userId as string;
    });
    if (!userId) {
        return {
            status: 401,
            body: { message: 'Unauthorized' },
        };
    }
    const db = useDatabase();
    const user = (await db.sql`SELECT * FROM users WHERE id = ${userId}`).rows?.[0];
    if (!user) {
        return {
            status: 401,
            body: { message: 'Unauthorized' },
        };
    }
    return {
        status: 200,
        body: user,
    };
});