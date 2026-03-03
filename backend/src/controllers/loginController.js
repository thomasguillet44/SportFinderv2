import * as LoginService from '../services/loginService.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginData = await LoginService.login(username, password);
        res.json(loginData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const registerData = await LoginService.register(username, email, password);
        res.json(registerData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};