import { connectToDB } from '../configuration/connedctToDB.js';

export const addFavori = async function(userId, element) {
    try {
        const db = await connectToDB();

        const name = element.name || null;
        const sport = element.sport || null;
        const lat = element.lat; 
        const lon = element.lon;

        if (lat === undefined || lon === undefined) {
            db.release();
            throw new Error('Latitude et longitude sont requises');
        };

        if (!userId) {
            db.release();
            throw new Error('ID utilisateur est requis');
        };

        const geom = {
            type: "Point",
            coordinates: [lon, lat]
        };

        const isAlreadyFavoriForUser = await db.query(
            'SELECT id FROM favoris WHERE user_id = $1 AND name = $2 AND sport = $3 AND ST_Equals(geom, ST_SetSRID(ST_GeomFromGeoJSON($4), 4326))',
            [userId, name, sport, JSON.stringify(geom)]
        );

        if (isAlreadyFavoriForUser.rows.length > 0) {
            db.release();
            throw new Error('Ce favori est déjà ajouté pour cet utilisateur');
        }

        console.log("Inserting favori into database with name:", name, "sport:", sport, "geom:", geom);

        const result = await db.query(
            'INSERT INTO favoris (user_id, name, sport, geom, latitude, longitude) VALUES ($1, $2, $3, ST_SetSRID(ST_GeomFromGeoJSON($4), 4326), $5, $6) RETURNING id',
            [userId, name, sport, JSON.stringify(geom), lat, lon]
        );

        db.release();

        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de l\'ajout du favori :', error);
        throw new Error('Erreur lors de l\'ajout du favori : ' + error.message);
    }
    
};


export const getFavorisByUserId = async function(userId) {
    try {
        const db = await connectToDB();

        if (!userId) {
            db.release();
            throw new Error('ID utilisateur est requis');
        };

        const result = await db.query(
            'SELECT id, name, sport, latitude, longitude FROM favoris WHERE user_id = $1',
            [userId]
        );

        db.release();

        return result.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error);
        throw new Error('Erreur lors de la récupération des favoris : ' + error.message);
    }
};

export const deleteFavori = async function(favoriId) {
    try {
        const db = await connectToDB();
        if (!favoriId) {
            db.release();
            throw new Error('ID du favori est requis');
        };

        const result = await db.query(
            'DELETE FROM favoris WHERE id = $1 RETURNING id',
            [favoriId]
        );

        db.release();
        if (result.rowCount === 0) {
            throw new Error('Aucun favori trouvé avec cet ID');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la suppression du favori :', error);
        throw new Error('Erreur lors de la suppression du favori : ' + error.message);
    }
};