import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, email, password } = body;
    if (!username || !email || !password) {
        return {
            status: 422,
            message: 'Insufficient data provided',
        };
    }

    if (username.length < 3 || username.length > 20) {
        return {
            status: 422,
            message: 'Username must be between 3 and 20 characters',
        };
    }

    if (password.length < 6 || password.length > 100) {
        return {
            status: 422,
            message: 'Password must be at least 6 characters long',
        };
    }

    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
        return {
            status: 422,
            message: 'Username can only contain letters, numbers and underscores',
        };
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return {
            status: 422,
            message: 'Invalid email address',
        };
    }

    const db = useDatabase();
    const existingUser = (await db.sql`SELECT * FROM users WHERE username = ${username}`).rows?.[0];
    if (existingUser) {
        console.log("User already exists:", existingUser);
        return {
            status: 409,
            message: 'Username is already taken',
        };
    }
    try {
        const hash = bcrypt.hashSync(password, 10);
        const id = crypto.randomUUID();
        const insert = (await db.sql`INSERT INTO users (id, username, email, password) VALUES (${id}, ${username}, ${email}, ${hash}) RETURNING *`);
        const isTokenCreated = createToken(event, id, username);
        if (!isTokenCreated) {
            return {
                status: 500,
                message: 'Failed to create token',
            };
        }
        return {
            status: 201,
            message: 'User registered',
            user: {
                id: id,
                username: username,
                email: email,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: 'Internal server error',
        };
    }
});
