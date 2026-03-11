import api from "@/api.js";

export const loginServiceFrontend = async function(username, password) {
    try {
        const response = await api.post("/api/auth/login", {
            username: username,
            password: password           
        });
        
        return response;
    } catch (error) {
        throw new Error("Erreur lors de la connexion : " + error.message);
    }
};