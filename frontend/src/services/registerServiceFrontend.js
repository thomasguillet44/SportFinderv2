import api from "@/api.js";

export const registerServiceFrontend = async function(username, email, password) {
    try {
        const response = await api.post("/api/auth/register", {
            username: username,
            email: email,
            password: password           
        });
        
        return response;
    } catch (error) {
        throw new Error("Erreur lors de l'enregistrement : " + error.message);
    }
};