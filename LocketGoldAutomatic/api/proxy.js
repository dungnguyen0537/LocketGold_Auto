export default async function handler(req, res) {
    // 1. Setup CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Handle Preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // TARGET URL
    const targetUrl = 'https://locketgoldvutuan.ct.ws/?i=1';

    try {
        // 3. Get Data from Frontend
        const { _d } = req.body;

        if (!_d) {
            return res.status(400).json({ error: 'Thiếu dữ liệu đầu vào (_d)' });
        }

        // 4. Prepare Form Data for PHP Target
        const formData = new URLSearchParams();
        formData.append('_d', _d);

        // 5. Fetch to Target
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://locketgoldvutuan.ct.ws/'
            }
        });

        // 6. Return Response
        const data = await response.text();
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: 'Lỗi Proxy: ' + error.message });
    }
}