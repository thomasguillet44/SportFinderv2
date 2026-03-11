const MAX_RETRY = 5;
const RETRY_DELAY = 1000;

export const getSportsFieldInArea = async function(sport, necoordinates, swcoordinates) {
    const [nelat, nelng] = necoordinates.split(',');
    const [swlat, swlng] = swcoordinates.split(',');

    const queryInit = `[out:json][timeout:30];`;
    const queryContent = "nwr[sport=\"" + sport + "\"]";
    const queryCoordinates = `(${swlat},${swlng},${nelat},${nelng});`;
    const queryEnd = "out center;"

    const finalQuery = queryInit + queryContent + queryCoordinates + queryEnd;

    let attempt = 0;
    while (attempt < MAX_RETRY) {

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
            attempt++;

            if (attempt >= MAX_RETRY) {
                console.error(`Échec après ${MAX_RETRY} tentatives:`, error);
                throw new Error(`Échec après ${MAX_RETRY} tentatives: ${error.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); //ajout de délai entre les tentatives
        }
    }   
}