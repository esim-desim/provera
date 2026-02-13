export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL parameter is required" });
    }

    // Dozvola za CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Dozvoljava sve domene
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        // Ako je OPTIONS zahtev, vrati dozvolu i prekini dalje procesiranje
        return res.status(200).end();
    }

    try {
        // Slanje GET zahteva ka API-ju
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.ESIM_TOKEN}`, // ispravno
                'Accept': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ error: data.message || 'API Error' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
