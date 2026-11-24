"""Trang bán hàng Thuốc Lá Lâm Thịnh – phiên bản Streamlit.

Chạy:  streamlit run streamlit_app.py
"""
from pathlib import Path
from urllib.parse import quote

import streamlit as st

# =====================================================
#  CẤU HÌNH CỬA HÀNG – sửa thông tin thật tại đây
# =====================================================
SHOP = {
    "name": "Thuốc Lá Lâm Thịnh",
    "address": "Định Công, Hà Nội",
    "phone": "0347653354",
    "zalo": "0347653354",
    "hours": "7:00 – 21:00, tất cả các ngày",
    "license": "……/GP-…",                            # TODO: số giấy phép bán lẻ thuốc lá
    "map_query": "Định Công, Hà Nội",
}

# =====================================================
#  SẢN PHẨM (giá VNĐ)
# =====================================================
PRODUCTS = [
    {
        "id": "soi-dinh-huong",
        "name": "Sợi thuốc lá ủ đinh hương",
        "category": "Sợi thuốc tẩu",
        "desc": "Sợi thuốc ủ cùng đinh hương, hương thơm ấm, dành cho người hút tẩu.",
        "price": 140_000, "unit": "lạng", "note": "1 lạng = 100 g",
        "icon": "🍂", "color": "#7a3b22",
    },
    {
        "id": "soi-moc",
        "name": "Sợi thuốc mộc",
        "category": "Sợi thuốc tẩu",
        "desc": "Sợi thuốc mộc nguyên vị, không tẩm hương, dành cho người hút tẩu.",
        "price": 70_000, "unit": "lạng", "note": "1 lạng = 100 g",
        "icon": "🌾", "color": "#8a6a32",
    },
    {
        "id": "loc-9mm",
        "name": "Hộp lọc tẩu 9 mm",
        "category": "Phụ kiện",
        "desc": "Lọc than hoạt tính 9 mm cho tẩu.",
        "price": 240_000, "unit": "hộp", "note": "250 cái / hộp",
        "icon": "📦", "color": "#2f4f4a",
    },
    {
        "id": "que-thong",
        "name": "Túi que thông tẩu",
        "category": "Phụ kiện",
        "desc": "Que thông vệ sinh tẩu.",
        "price": 24_000, "unit": "túi", "note": "50 que / túi",
        "icon": "🪶", "color": "#5a4a6b",
    },
]
BY_ID = {p["id"]: p for p in PRODUCTS}
IMAGE_DIR = Path(__file__).parent / "images"


def product_image(p):
    """Ảnh thật: images/<id>.jpg (hoặc .jpeg/.png/.webp). Chưa có thì trả về None."""
    for ext in ("jpg", "jpeg", "png", "webp"):
        f = IMAGE_DIR / f"{p['id']}.{ext}"
        if f.exists():
            return f
    return None
HEALTH_WARNING = (
    "⚠️ HÚT THUỐC LÁ GÂY UNG THƯ PHỔI, BỆNH TIM MẠCH VÀ NHIỀU BỆNH NGUY HIỂM KHÁC "
    "· KHÔNG BÁN CHO NGƯỜI DƯỚI 18 TUỔI"
)


def vnd(n: int) -> str:
    return f"{n:,}".replace(",", ".") + " ₫"


st.set_page_config(page_title=SHOP["name"], page_icon="🍂", layout="wide")

st.markdown(
    """
    <style>
      .health-bar {background:#1e1a16;color:#ffd76a;font-weight:600;font-size:.8rem;
        text-align:center;padding:.5em 1em;border-radius:10px;margin-bottom:1rem;}
      .hero h1 {font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.2rem);margin:0;}
      .eyebrow {color:#8a5a1f;font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.8rem;}
      .art {height:120px;border-radius:12px;display:grid;place-items:center;font-size:3rem;margin-bottom:.6rem;}
      .price {font-size:1.25rem;font-weight:700;}
      .muted {color:#6f655a;font-size:.9rem;}
      .quote {background:linear-gradient(160deg,#b8862f,#8a5a1f);color:#fff;border-radius:16px;
        padding:2rem 1.5rem;text-align:center;font-family:Georgia,serif;font-size:1.3rem;}
      .quote small {font-family:sans-serif;font-size:.85rem;opacity:.85;}
      .footer {text-align:center;font-size:.9rem;margin-top:2rem;padding-top:1rem;border-top:1px solid #e5dccd;}
    </style>
    """,
    unsafe_allow_html=True,
)

state = st.session_state
state.setdefault("age_ok", False)
state.setdefault("age_denied", False)
state.setdefault("cart", {})  # id -> qty

st.markdown(f'<div class="health-bar">{HEALTH_WARNING}</div>', unsafe_allow_html=True)

# ---------- Cổng xác nhận tuổi ----------
if not state.age_ok:
    _, mid, _ = st.columns([1, 2, 1])
    with mid:
        st.markdown("## Xác nhận độ tuổi")
        st.write(
            "Trang web này giới thiệu sản phẩm thuốc lá và chỉ dành cho người "
            "**từ 18 tuổi trở lên**."
        )
        st.caption("Theo Luật Phòng, chống tác hại của thuốc lá, cửa hàng không bán cho người dưới 18 tuổi.")
        if state.age_denied:
            st.error("Rất tiếc, bạn chưa đủ tuổi để truy cập trang này.")
        else:
            c1, c2 = st.columns(2)
            if c1.button("Tôi đủ 18 tuổi", type="primary", width="stretch"):
                state.age_ok = True
                st.rerun()
            if c2.button("Tôi chưa đủ 18 tuổi", width="stretch"):
                state.age_denied = True
                st.rerun()
    st.stop()


# ---------- Giỏ hàng (sidebar) ----------
def cart_lines():
    return [(BY_ID[i], q) for i, q in state.cart.items() if q > 0 and i in BY_ID]


with st.sidebar:
    st.header("🛒 Giỏ hàng")
    lines = cart_lines()
    if not lines:
        st.caption("Giỏ hàng đang trống.")
    for p, q in lines:
        c1, c2 = st.columns([3, 2])
        c1.markdown(f"**{p['name']}**  \n{vnd(p['price'])} / {p['unit']}")
        new_q = c2.number_input(
            "Số lượng", min_value=0, max_value=999, value=q, step=1,
            key=f"cart_{p['id']}", label_visibility="collapsed",
        )
        if new_q != q:
            state.cart[p["id"]] = new_q
            st.rerun()
    total = sum(p["price"] * q for p, q in lines)
    st.divider()
    st.markdown(f"### Tạm tính: {vnd(total)}")
    if lines and st.button("Xóa giỏ hàng"):
        state.cart = {}
        st.rerun()

# ---------- Hero ----------
left, right = st.columns([3, 2], vertical_alignment="center")
with left:
    st.markdown(
        f"""<div class="hero"><p class="eyebrow">Sợi thuốc tẩu &amp; phụ kiện</p>
        <h1>{SHOP['name']}</h1></div>""",
        unsafe_allow_html=True,
    )
    st.write(
        "Sợi thuốc lá ủ đinh hương, sợi thuốc mộc bán theo lạng cùng lọc tẩu và que thông tẩu "
        "– dành cho người hút tẩu. Phục vụ khách lẻ và khách sỉ."
    )
    st.caption("✔ Cân đủ lạng  ·  ✔ Sợi ủ kỹ, thơm đều  ·  ✔ Giá niêm yết rõ ràng")
with right:
    st.markdown(
        '<div class="quote">“Sợi thơm cho tẩu – Uy tín, tận tâm”<br><small>Cửa hàng Lâm Thịnh</small></div>',
        unsafe_allow_html=True,
    )

tab_sp, tab_dh, tab_gt, tab_lh = st.tabs(["Sản phẩm", "Đặt hàng", "Giới thiệu", "Liên hệ"])

# ---------- Sản phẩm ----------
with tab_sp:
    st.subheader("Sản phẩm & bảng giá")
    st.caption("Sợi thuốc bán theo lạng (100 g). Giá niêm yết, có thể thay đổi theo thời điểm.")
    cats = ["Tất cả"] + sorted({p["category"] for p in PRODUCTS}, reverse=True)
    cat = st.radio("Loại", cats, horizontal=True, label_visibility="collapsed")
    shown = [p for p in PRODUCTS if cat == "Tất cả" or p["category"] == cat]
    cols = st.columns(min(4, len(shown)) or 1)
    for col, p in zip(cols * 4, shown):
        with col.container(border=True):
            img = product_image(p)
            if img:
                st.image(str(img), width="stretch")
            else:
                st.markdown(
                    f'<div class="art" style="background:linear-gradient(160deg,{p["color"]},#1e1a16)">{p["icon"]}</div>',
                    unsafe_allow_html=True,
                )
            st.markdown(f"**{p['name']}**")
            st.caption(p["category"])
            st.markdown(f'<span class="muted">{p["desc"]}</span>', unsafe_allow_html=True)
            st.markdown(
                f'<span class="price">{vnd(p["price"])}</span> / {p["unit"]}  \n'
                f'<span class="muted">{p["note"]}</span>',
                unsafe_allow_html=True,
            )
            qty = st.number_input(
                f"Số {p['unit']}", min_value=1, max_value=999, value=1, step=1, key=f"q_{p['id']}"
            )
            if st.button("+ Thêm vào giỏ", key=f"add_{p['id']}", type="primary", width="stretch"):
                state.cart[p["id"]] = state.cart.get(p["id"], 0) + qty
                st.toast(f"Đã thêm {qty} {p['unit']} {p['name']}")
                st.rerun()

# ---------- Đặt hàng ----------
with tab_dh:
    st.subheader("Đặt hàng")
    st.caption("Đặt trước qua Zalo / điện thoại, nhận hàng và thanh toán trực tiếp tại cửa hàng.")
    s1, s2, s3, s4 = st.columns(4)
    s1.markdown("**1. Chọn sản phẩm**  \nThêm vào giỏ ở tab Sản phẩm.")
    s2.markdown("**2. Điền thông tin**  \nHọ tên, số điện thoại bên dưới.")
    s3.markdown("**3. Gửi đơn**  \nSao chép đơn, gửi qua Zalo hoặc gọi điện.")
    s4.markdown("**4. Nhận tại cửa hàng**  \nXuất trình CCCD và thanh toán.")
    st.divider()

    lines = cart_lines()
    if not lines:
        st.warning("Giỏ hàng đang trống – hãy chọn sản phẩm ở tab **Sản phẩm**.")
    else:
        st.table(
            [
                {"Sản phẩm": p["name"], "Số lượng": f"{q} {p['unit']}",
                 "Đơn giá": vnd(p["price"]), "Thành tiền": vnd(p["price"] * q)}
                for p, q in lines
            ]
        )
        total = sum(p["price"] * q for p, q in lines)
        st.markdown(f"#### Tạm tính: {vnd(total)}")

        with st.form("order"):
            name = st.text_input("Họ tên")
            phone = st.text_input("Số điện thoại")
            age = st.checkbox("Tôi xác nhận đủ 18 tuổi và sẽ xuất trình CCCD khi nhận hàng.")
            submitted = st.form_submit_button("Tạo đơn hàng", type="primary")

        if submitted:
            digits = "".join(ch for ch in phone if ch.isdigit())
            if not name.strip() or not 9 <= len(digits) <= 12:
                st.error("Vui lòng nhập họ tên và số điện thoại hợp lệ.")
            elif not age:
                st.error("Vui lòng xác nhận bạn đủ 18 tuổi.")
            else:
                order = "\n".join(
                    [f"ĐƠN ĐẶT HÀNG – {SHOP['name']}", f"Khách: {name.strip()} – {phone.strip()}", ""]
                    + [f"• {p['name']}: {q} {p['unit']} = {vnd(p['price'] * q)}" for p, q in lines]
                    + ["", f"Tạm tính: {vnd(total)}", "Nhận hàng tại cửa hàng. Tôi xác nhận đủ 18 tuổi."]
                )
                st.success("Đơn đã sẵn sàng! Bấm biểu tượng sao chép ở góc khung bên dưới rồi dán vào Zalo.")
                st.code(order, language=None)
                b1, b2 = st.columns(2)
                b1.link_button("💬 Mở Zalo cửa hàng", f"https://zalo.me/{SHOP['zalo']}", width="stretch")
                b2.link_button("📞 Gọi đặt hàng", f"tel:{SHOP['phone'].replace(' ', '')}", width="stretch")

# ---------- Giới thiệu ----------
with tab_gt:
    st.subheader("Về Lâm Thịnh")
    st.write(
        "Thuốc Lá Lâm Thịnh là cửa hàng bán lẻ thuốc lá được cấp **Giấy phép bán lẻ sản phẩm thuốc lá** "
        "theo quy định. Cửa hàng chuyên sợi thuốc lá dành cho tẩu – sợi ủ đinh hương và sợi thuốc mộc – "
        "cùng các phụ kiện tẩu như lọc 9 mm và que thông tẩu."
    )
    st.write(
        "Cửa hàng cam kết tuân thủ pháp luật: không bán cho người dưới 18 tuổi, "
        "không kinh doanh hàng nhập lậu, không khuyến mại sản phẩm thuốc lá."
    )
    f1, f2, f3, f4 = st.columns(4)
    f1.markdown("#### 🍂 Sợi ủ kỹ\nSợi được ủ và bảo quản kỹ, giữ hương thơm đều.")
    f2.markdown("#### 📄 Có giấy phép\nGiấy phép bán lẻ do cơ quan có thẩm quyền cấp.")
    f3.markdown("#### 🤝 Khách sỉ\nNhận đơn số lượng lớn, giá tốt cho khách quen.")
    f4.markdown("#### 🪪 Kiểm tra tuổi\nXuất trình CCCD khi nhận hàng nếu được yêu cầu.")

# ---------- Liên hệ ----------
with tab_lh:
    st.subheader("Liên hệ")
    c1, c2 = st.columns([2, 3])
    with c1:
        st.markdown(
            f"**Địa chỉ:** {SHOP['address']}  \n"
            f"**Điện thoại:** [{SHOP['phone']}](tel:{SHOP['phone'].replace(' ', '')})  \n"
            f"**Zalo:** [{SHOP['zalo']}](https://zalo.me/{SHOP['zalo']})  \n"
            f"**Giờ mở cửa:** {SHOP['hours']}  \n"
            f"**Giấy phép bán lẻ số:** {SHOP['license']}"
        )
    with c2:
        st.iframe(
            f"https://www.google.com/maps?q={quote(SHOP['map_query'])}&output=embed", height=300
        )

st.markdown(
    f"""<div class="footer"><b>Thuốc lá gây hại cho sức khỏe của bạn và những người xung quanh.
    Tổng đài tư vấn cai nghiện thuốc lá: 1800 6606 (miễn phí).</b><br>
    <span class="muted">© {SHOP['name']}. Không bán cho người dưới 18 tuổi.</span></div>""",
    unsafe_allow_html=True,
)
