# Thuốc Lá Lâm Thịnh

Trang web giới thiệu & nhận đặt hàng của cửa hàng Lâm Thịnh – sợi thuốc lá cho tẩu và phụ kiện tẩu.
Trang tĩnh (HTML/CSS/JS thuần), không cần build — mở `index.html` là chạy.

## Tính năng
- Cổng xác nhận 18+ khi vào trang, cảnh báo sức khỏe luôn hiển thị.
- Sản phẩm: sợi thuốc lá ủ đinh hương, sợi thuốc mộc (bán theo lạng), lọc tẩu 9 mm, que thông tẩu; lọc theo loại, tìm kiếm.
- Giỏ hàng (lưu trên trình duyệt): sợi thuốc tẩu bán theo lạng, phụ kiện theo hộp/túi.
- Gửi đơn qua Zalo (tự sao chép nội dung đơn) hoặc gọi điện; nhận & thanh toán tại cửa hàng.
- Thông tin liên hệ, giờ mở cửa, số giấy phép, bản đồ Google Maps.
- Giao diện sáng/tối tự động, hiển thị tốt trên điện thoại.

## Chỉnh sửa
Toàn bộ thông tin cửa hàng và sản phẩm nằm trong **`data.js`**:
- `SHOP` – địa chỉ, điện thoại, Zalo, giờ mở cửa, số giấy phép, địa chỉ bản đồ.
- `PRODUCTS` – tên, loại, mô tả, giá (`price`), đơn vị (`unit`), ghi chú quy cách, màu minh họa.

## Ảnh sản phẩm
Tải ảnh thật vào thư mục `images/`, đặt tên đúng như sau (nên là ảnh vuông hoặc ngang, dưới 500 KB):

| Sản phẩm | Tên file |
|---|---|
| Sợi thuốc lá ủ đinh hương | `images/soi-dinh-huong.jpg` |
| Sợi thuốc mộc | `images/soi-moc.jpg` |
| Hộp lọc tẩu 9 mm | `images/loc-9mm.jpg` |
| Túi que thông tẩu | `images/que-thong.jpg` |

Sản phẩm nào chưa có ảnh thì trang tự hiện hình minh họa như cũ.

## Phiên bản Streamlit
File `streamlit_app.py` là bản web viết bằng Streamlit (cùng sản phẩm, giỏ hàng, tạo đơn gửi Zalo).
Thông tin cửa hàng và sản phẩm của bản này sửa trực tiếp ở đầu file `streamlit_app.py` (`SHOP`, `PRODUCTS`).

Chạy trên máy:
```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

Đăng miễn phí lên Streamlit Community Cloud: vào https://share.streamlit.io → *Create app* →
chọn repo `lamcomuu/thuoclalamthinh`, nhánh `main`, file `streamlit_app.py` → *Deploy*.

## Đăng lên mạng (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → chọn `main` / `/ (root)` → Save.

## Lưu ý pháp lý
Luật Phòng, chống tác hại của thuốc lá 2012 cấm quảng cáo, khuyến mại thuốc lá
và cấm bán cho người dưới 18 tuổi. Trang được thiết kế theo hướng *niêm yết thông tin
& nhận đặt trước, giao nhận tại cửa hàng*, không có khuyến mại. Nên hỏi ý kiến cơ quan
quản lý / luật sư trước khi công khai trang để chắc chắn phù hợp quy định hiện hành.
