import api from "@/api.js";

export const addFavoriServiceFrontend = async function(userId, element) {
    try {
        const response = await api.post('/api/favoris/addFavori', { 
            userId: userId, 
            element: element
        });
        return response;
    } catch (error) {
        throw new Error("Erreur lors de l'ajout du favori : " + error.message);
    }
};

export const getFavorisByUserIdServiceFrontend = async function(userId) {
    try {
        const response = await api.get(`/api/favoris/getFavoris/${userId}`);
        return response;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des favoris : " + error.message);
    }
};

export const deleteFavoriServiceFrontend = async function(favoriId) {
    try {
        const response = await api.delete(`/api/favoris/deleteFavori/${favoriId}`);
        return response;
    } catch (error) {
        throw new Error("Erreur lors de la suppression du favori : " + error.message);
    }
};
