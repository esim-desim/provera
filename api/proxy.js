export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL parameter is required" });
    }

    // Postavljanje CORS zaglavlja
    res.setHeader('Access-Control-Allow-Origin', '*'); // Dozvoljava sve domene
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        // Ako je OPTIONS zahtev, vrati dozvolu i prekini dalje procesiranje
        return res.status(200).end();
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6MTk1MDc2fQ.eyJzdWIiOjE5NTA3NiwiaXNzIjoiIiwiYXVkIjoiIiwiaWF0IjoxNzcwOTg0OTU2LCJleHAiOjM1NzI3MjgzMTIsImp0aSI6ImIwMzFmYjBhMGFiOTU4MSIsImlkIjoxOTUwNzYsInRva2VuX3ZlcnNpb24iOjF9.BGNAy6AWIJz8yamz3Rg2piJr23cJJCpKsfEj-z7Jsf8',
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
