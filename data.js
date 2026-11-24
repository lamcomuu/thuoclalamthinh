// =====================================================
//  CẤU HÌNH CỬA HÀNG – sửa thông tin thật tại đây
// =====================================================
window.SHOP = {
  name: "Thuốc Lá Lâm Thịnh",
  address: "Định Công Hà Nội",   // TODO: địa chỉ thật
  phone: "0347653354",                          // TODO: số điện thoại thật
  zalo: "0347653354",                             // TODO: số Zalo (viết liền)
  hours: "7:00 – 21:00, tất cả các ngày",
  license: "……/GP-…",                             // TODO: số giấy phép bán lẻ thuốc lá
  mapQuery: "Định Công, Hà Nội"
};

// =====================================================
//  DANH SÁCH SẢN PHẨM (giá VNĐ)
//  image: ảnh thật trong thư mục images/ (chưa có thì hiện hình minh họa)
//  desc: mô tả ngắn, specs: thông số [tên, giá trị], usage: cách dùng
//  unit: đơn vị bán, art: kiểu hình minh họa ("tin" | "box" | "sticks")
// =====================================================
window.PRODUCTS = [
  {
    id: "soi-dinh-huong",
    image: "images/soi-dinh-huong.jpg",
    name: "Sợi thuốc lá ủ đinh hương",
    category: "Sợi thuốc tẩu",
    desc: "Sợi thuốc lá dành cho tẩu, được ủ cùng đinh hương cho hương thơm ấm, cay nhẹ đặc trưng.",
    specs: [["Loại", "Sợi thuốc lá dùng cho tẩu"], ["Hương vị", "Thơm ấm, cay nhẹ của đinh hương"], ["Quy cách", "Bán theo lạng (100 g), cân tại cửa hàng"], ["Bảo quản", "Đựng trong túi hoặc hũ kín, để nơi khô ráo, thoáng mát, tránh ánh nắng"]],
    usage: "Nhồi sợi vào nõ tẩu vừa tay, không nén quá chặt để tẩu cháy đều.",
    price: 140000, unit: "lạng", unitNote: "1 lạng = 100 g",
    art: "tin", short: "Đinh hương", color: "#7a3b22"
  },
  {
    id: "soi-moc",
    image: "images/soi-moc.jpg",
    name: "Sợi thuốc mộc",
    category: "Sợi thuốc tẩu",
    desc: "Sợi thuốc lá mộc nguyên vị, không tẩm hương, giữ vị thuốc nguyên bản.",
    specs: [["Loại", "Sợi thuốc lá dùng cho tẩu"], ["Hương vị", "Nguyên vị, không tẩm hương liệu"], ["Quy cách", "Bán theo lạng (100 g), cân tại cửa hàng"], ["Bảo quản", "Đựng trong túi hoặc hũ kín, để nơi khô ráo, thoáng mát, tránh ánh nắng"]],
    usage: "Nhồi sợi vào nõ tẩu vừa tay, không nén quá chặt để tẩu cháy đều.",
    price: 70000, unit: "lạng", unitNote: "1 lạng = 100 g",
    art: "tin", short: "Mộc", color: "#8a6a32"
  },
  {
    id: "loc-9mm",
    image: "images/loc-9mm.jpg",
    name: "Hộp lọc tẩu 9 mm",
    category: "Phụ kiện",
    desc: "Lọc tẩu Vauen Dr. Perl junior Systemfilter Plus, lõi than hoạt tính, đường kính 9 mm.",
    specs: [["Thương hiệu", "Vauen – Dr. Perl junior (Đức)"], ["Dòng", "Systemfilter Plus"], ["Chất liệu lọc", "Than hoạt tính (activated carbon)"], ["Kích thước", "Đường kính 9 mm"], ["Quy cách", "250 cái / hộp"], ["Phù hợp", "Tẩu có ngàm lắp lọc 9 mm"]],
    usage: "Lắp lọc vào ngàm lọc của tẩu. Thay lọc mới khi lọc đã ẩm hoặc sau vài lần hút.",
    price: 240000, unit: "hộp", unitNote: "250 cái / hộp",
    art: "box", short: "Lọc 9 mm", color: "#2f4f4a"
  },
  {
    id: "que-thong",
    image: "images/que-thong.jpg",
    name: "Túi que thông tẩu",
    category: "Phụ kiện",
    desc: "Que thông tẩu SL Pipes bằng cotton, thấm hút tốt, dùng vệ sinh ống ngậm và lòng tẩu.",
    specs: [["Thương hiệu", "SL Pipes"], ["Chất liệu", "Cotton thấm hút (extra absorbent)"], ["Kích thước", "4 mm × 15,5 cm"], ["Quy cách", "50 que / túi"], ["Công dụng", "Làm sạch ống ngậm, cổ tẩu và lòng tẩu"]],
    usage: "Luồn que qua ống ngậm và cổ tẩu, đẩy kéo nhẹ nhiều lần để hút sạch hơi ẩm và cặn.",
    price: 24000, unit: "túi", unitNote: "50 que / túi",
    art: "sticks", short: "Que thông", color: "#5a4a6b"
  }
];
