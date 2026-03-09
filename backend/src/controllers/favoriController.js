import * as FavoriService from '../services/favoriService.js';

export const addFavori = async (req, res) => {
    const { userId, element } = req.body;
    try {
        const result = await FavoriService.addFavori(userId, element);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFavorisByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const favoris = await FavoriService.getFavorisByUserId(userId);
        res.json(favoris);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFavori = async (req, res) => {
    const favoriId = req.params.favoriId;
    try {
        await FavoriService.deleteFavori(favoriId);
        res.json({ message: 'Favori supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};