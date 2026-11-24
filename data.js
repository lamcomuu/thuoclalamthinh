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
//  unit: đơn vị bán, art: kiểu hình minh họa ("tin" | "box" | "sticks")
// =====================================================
window.PRODUCTS = [
  {
    id: "soi-dinh-huong",
    name: "Sợi thuốc lá ủ đinh hương",
    category: "Sợi thuốc tẩu",
    desc: "Sợi thuốc ủ cùng đinh hương, hương thơm ấm, dành cho người hút tẩu.",
    price: 140000, unit: "lạng", unitNote: "1 lạng = 100 g",
    art: "tin", short: "Đinh hương", color: "#7a3b22"
  },
  {
    id: "soi-moc",
    name: "Sợi thuốc mộc",
    category: "Sợi thuốc tẩu",
    desc: "Sợi thuốc mộc nguyên vị, không tẩm hương, dành cho người hút tẩu.",
    price: 70000, unit: "lạng", unitNote: "1 lạng = 100 g",
    art: "tin", short: "Mộc", color: "#8a6a32"
  },
  {
    id: "loc-9mm",
    name: "Hộp lọc tẩu 9 mm",
    category: "Phụ kiện",
    desc: "Lọc than hoạt tính 9 mm cho tẩu, hộp 250 cái.",
    price: 240000, unit: "hộp", unitNote: "250 cái / hộp",
    art: "box", short: "Lọc 9 mm", color: "#2f4f4a"
  },
  {
    id: "que-thong",
    name: "Túi que thông tẩu",
    category: "Phụ kiện",
    desc: "Que thông vệ sinh tẩu, túi 50 que.",
    price: 24000, unit: "túi", unitNote: "50 que / túi",
    art: "sticks", short: "Que thông", color: "#5a4a6b"
  }
];
