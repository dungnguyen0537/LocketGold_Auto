export default async function handler(req, res) {
    // 1. Setup CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const targetUrl = 'https://locketgoldvutuan.ct.ws/?i=1';

    try {
        const { _d } = req.body;
        if (!_d) return res.status(400).json({ error: 'Thiếu dữ liệu (_d)' });

        const formData = new URLSearchParams();
        formData.append('_d', _d);

        // 2. GIẢ MẠO TRÌNH DUYỆT CỰC MẠNH
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // User-Agent của Chrome mới nhất
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                // Các header đánh lừa server
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
                'Referer': 'https://locketgoldvutuan.ct.ws/',
                'Origin': 'https://locketgoldvutuan.ct.ws',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                // Thử thêm Cookie bypass (nếu web gốc dùng cơ chế cookie __test phổ biến của ByetHost)
                'Cookie': '__test=1; visited=1' 
            }
        });

        const data = await response.text();

        // Kiểm tra xem data trả về có phải HTML lỗi không
        if (data.trim().startsWith('<')) {
            console.log("Bị chặn bởi Anti-Bot:", data); // Xem log trên Vercel nếu cần
            return res.status(503).json({ 
                error: 'Server gốc (.ct.ws) đang chặn kết nối từ Proxy. Không thể bypass lớp bảo mật này.' 
            });
        }

        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: 'Lỗi Proxy: ' + error.message });
    }
}
