// on utilise une promesse et un async pour attendre d'avoir la pos avant de générer 
// le marker 
export const centerMapOnCurrentLocation = async function(map) {
    let defaultCoordinates = [47.218102, -1.552800];

    // cas ou il y a pas de géoloc (navigateur.geoloc est synchrone on peut vérifier direct
    // si on va pouvoir l'utiliser ou non), on retourne quand meme une promesse, résolue
    // immédiatement
    if (!navigator.geolocation) {
        map.setView(defaultCoordinates, 13);
        return Promise.resolve(defaultCoordinates);
    }

    // si on peut utiliser la geoloc : 
    // on retourne une promesse, et le await qui appelle la fonction signifie on attend
    // que la promesse soit résolue 
    // dans la promesse on a deux fonctions callback, une en cas de réussite, et une en cas d'echec
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const coordinates = [position.coords.latitude, position.coords.longitude];
                map.flyTo(coordinates, 13);
                resolve(coordinates);
            },
            error => {
                console.error("Error getting current location: ", error);
                map.setView(defaultCoordinates, 13);
                resolve(defaultCoordinates);
            }
        );
    });
}

export const getBoudingBox = function(coordinates, distance) {
    const lat = coordinates[0];
    const lon = coordinates[1];
    
    const earthRadiusLat = 111; // km per degree latitude
    const earthRadiusLon = 111 * Math.cos((lat * Math.PI) / 180);

    const deltaLat = distance / earthRadiusLat;
    const deltaLon = distance / earthRadiusLon;

    return {
        northEast: {
            lat: lat + deltaLat,
            lon: lon + deltaLon
        },
        southWest: {
            lat: lat - deltaLat,
            lon: lon - deltaLon
        }
    };
};
