export default async function handler(req, res) {
  // Dobijamo URL kao query parametar
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is missing' });
  }

  try {
    // Pravimo fetch ka ciljanom URL-u
    const response = await fetch(url);
    const data = await response.json();

    // Vraćamo podatke kao JSON
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
