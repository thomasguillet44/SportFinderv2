import { connectToDB } from '../configuration/connedctToDB.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async function (username, password) {
    const db = await connectToDB();

    const result = await db.query(
        'SELECT id, username, email, password FROM users WHERE username = $1',
        [username]
    );
    db.release();

    const user = result.rows[0];
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    };

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
        throw new Error('Mot de passe incorrect');
    };

    const token = jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '3h' }
    );

    return { 
        token, 
        user: { id: user.id, username: user.username, email: user.email } 
    };

}

export const register = async function (username, email, password) {
    const db = await connectToDB();

    const existingUser = await db.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
    );

    if (existingUser.rows.length > 0) {
        db.release();
        throw new Error('Nom d\'utilisateur ou email déjà utilisé');
    };

    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await db.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
    );

    db.release();

    const user = result.rows[0];

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
    );

    return {
        token,
        user: { id: user.id, username: user.username, email: user.email }
    };
}
