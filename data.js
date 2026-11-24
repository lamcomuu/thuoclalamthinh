// =====================================================
//  CẤU HÌNH CỬA HÀNG – sửa thông tin thật tại đây
// =====================================================
window.SHOP = {
  name: "Thuốc Lá Lâm Thịnh",
  address: "123 Đường ABC, Phường XYZ, TP. ...",   // TODO: địa chỉ thật
  phone: "0900 000 000",                          // TODO: số điện thoại thật
  zalo: "0900000000",                             // TODO: số Zalo (viết liền)
  hours: "7:00 – 21:00, tất cả các ngày",
  license: "……/GP-…",                             // TODO: số giấy phép bán lẻ thuốc lá
  mapQuery: "Hà Nội"                              // TODO: địa chỉ để hiện Google Maps
};

// =====================================================
//  DANH SÁCH SẢN PHẨM – giá tham khảo (VNĐ), sửa theo giá thực tế
//  unit: "bao" (20 điếu) hoặc "cây" (10 bao)
// =====================================================
window.PRODUCTS = [
  { id: "vinataba",     name: "Vinataba",            category: "Trong nước", pack: 30000, carton: 290000, color: "#b8862f" },
  { id: "thanglong",    name: "Thăng Long",          category: "Trong nước", pack: 15000, carton: 145000, color: "#a23b2a" },
  { id: "thanglong-xl", name: "Thăng Long Xanh",     category: "Trong nước", pack: 16000, carton: 155000, color: "#2f6f5b" },
  { id: "hero",         name: "Hero",                category: "Trong nước", pack: 22000, carton: 210000, color: "#7a2430" },
  { id: "craven",       name: "Craven A",            category: "Trong nước", pack: 26000, carton: 250000, color: "#c23a2b" },
  { id: "bastos",       name: "Bastos Xanh",         category: "Trong nước", pack: 14000, carton: 135000, color: "#2c4f8a" },
  { id: "555",          name: "555 State Express",   category: "Nhập khẩu",  pack: 35000, carton: 340000, color: "#1f3f86" },
  { id: "marlboro",     name: "Marlboro Đỏ",         category: "Nhập khẩu",  pack: 33000, carton: 320000, color: "#b5202b" },
  { id: "marlboro-g",   name: "Marlboro Gold",       category: "Nhập khẩu",  pack: 33000, carton: 320000, color: "#b8912f" },
  { id: "esse",         name: "Esse Change",         category: "Nhập khẩu",  pack: 32000, carton: 310000, color: "#5f6b78" },
  { id: "jet",          name: "Jet",                 category: "Trong nước", pack: 18000, carton: 175000, color: "#3a3a3a" },
  { id: "white-horse",  name: "White Horse",         category: "Trong nước", pack: 12000, carton: 115000, color: "#6b5a3b" }
];
