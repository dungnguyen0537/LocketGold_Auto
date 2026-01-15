export default async function handler(req, res) {
    // URL của web gốc mà bạn muốn "mượn" tính năng
    const targetUrl = 'https://locketgoldvutuan.ct.ws/?i=1';

    try {
        // Lấy dữ liệu mã hóa từ giao diện gửi lên
        const { _d } = req.body;

        if (!_d) {
            return res.status(400).json({ error: 'Thiếu dữ liệu.' });
        }

        // Tạo Form Data giả để gửi sang PHP
        const formData = new URLSearchParams();
        formData.append('_d', _d);

        // Gọi sang web gốc (Server-to-Server)
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Giả mạo User-Agent như trình duyệt thật
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                // QUAN TRỌNG NHẤT: Giả mạo Referer để web gốc tưởng request đến từ chính nó
                'Referer': 'https://locketgoldvutuan.ct.ws/'
            }
        });

        // Lấy kết quả trả về
        const data = await response.text();

        // Trả về cho giao diện của bạn
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: 'Lỗi kết nối: ' + error.message });
    }
}
