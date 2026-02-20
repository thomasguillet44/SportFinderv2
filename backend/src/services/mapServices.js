export const getSportsFieldInArea = async function(sport, necoordinates, swcoordinates) {
    const [nelat, nelng] = necoordinates.split(',');
    const [swlat, swlng] = swcoordinates.split(',');

    const queryInit = `[out:json][timeout:30];`;
    const queryContent = "nwr[sport=\"" + sport + "\"]";
    const queryCoordinates = `(${swlat},${swlng},${nelat},${nelng});`;
    const queryEnd = "out center;"

    const finalQuery = queryInit + queryContent + queryCoordinates + queryEnd;

    console.log("Final query: ", finalQuery);

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: `data=${encodeURIComponent(finalQuery)}`,
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const text = await response.text();
        const data = JSON.parse(text);
        
        return data;

    } catch (error) {
        throw new Error(`Erreur lors de l'exécution de la requête OSM: ${error.message}`);
    }
}