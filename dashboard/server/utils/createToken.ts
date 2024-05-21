import jwt from 'jsonwebtoken';
import { H3Event, EventHandlerRequest } from 'h3';

export function createToken(event: H3Event<EventHandlerRequest>, userId: string, username: string) {
    if (!userId || !username) {
        return false;
    }
    const { jwtSecret, jwtAlg } = useRuntimeConfig();
    const token = jwt.sign({
        userId: userId,
        username: username,
    }, jwtSecret as jwt.Secret, { header: { alg: jwtAlg as jwt.Algorithm } });
    setCookie(event, 'token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 31,
        path: '/',
    });
    return true;
}