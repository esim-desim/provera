// api/proxy.js

export default async function handler(req, res) {
    // Uzmi URL iz query parametra
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL parameter is required" });
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6MTk1MDc2fQ.eyJzdWIiOjE5NTA3NiwiaXNzIjoiIiwiYXVkIjoiIiwiaWF0IjoxNzM2NTU5ODI3LCJleHAiOjE3NjgwOTU4MjcsImp0aSI6IjIzNTlmY2VkMWE0NjViZCIsImlkIjoxOTUwNzZ9.w4gJxi2AHlx-3r-Hu3w-Wvd8XIIOyVFnto_hnGQXAvI', // Dodajte vaš token
                'Accept': 'application/json',
            }
        });

        const data = await response.json();

        // Proveri status i vrati odgovor
        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ error: data.message || 'Neuspešan zahtev' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}