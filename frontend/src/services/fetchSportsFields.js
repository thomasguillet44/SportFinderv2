import api from "@/api.js";

export const fetchSportsFields = async function(sport, boudingBox) {
    try {
        const response = await api.get("/api/map/sportsfacilities", {
            params: {
                sport: sport,
                necoordinates: boudingBox.northEast.lat + "," + boudingBox.northEast.lon,
                swcoordinates: boudingBox.southWest.lat + "," + boudingBox.southWest.lon
            }
        });
        console.log("response: ", response);
        return response.data;
    } catch (error) {
        throw new Error("Erreur dans la récupération des sports fields: " + error.message);
    }
};