import * as MapService from '../services/mapServices.js';

export const getSportsFacilities = async (req, res) => {
    const { sport, necoordinates, swcoordinates } = req.query;
    try {
        const sportsFields = await MapService.getSportsFieldInArea(sport, necoordinates, swcoordinates);
        res.json(sportsFields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};