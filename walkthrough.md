# Walkthrough - Grand Café Data & Media Updates

We have completed all data, text, image, and media updates for **Grand Café (جراند كافيه)** as requested!

---

## 🌟 Summary of Accomplishments

### 1. 🇪🇬 Egyptian Conversational Arabic Tone
- Converted all Arabic text across the landing page from stiff formal MSA to warm, friendly Egyptian conversational tone (e.g., *"قهوتك.. قعدتك.. مكانك."*, *"جراند كافيه مش مجرد مكان تشرب فيه قهوة..."*, *"اختار قعدتك اللي على مزاجك"*).

### 2. 🪑 Seating Ambiance (`SpotToggle.tsx`)
- Integrated exact user photos:
  - **Indoor**: `Indoor.jpg` (`/assets/indoor_seating.jpg`)
  - **Outdoor**: `Outdoor.jpg` (`/assets/outdoor_seating.jpg`)

### 3. ☕ Signature Drinks Section ("المشاريب الأكثر طلباً")
Displayed 9 drinks in logical order (Hot Coffees -> Iced Coffees -> Sodas & Smoothies):
1. **اسبريسو (Espresso)** - 35 EGP *(Placeholder card for future image)*
2. **لاتيه (Caffè Latte)** - 55 EGP 📸 *(Photo: `Caffè Latte.jpg`)*
3. **كابتشينو (Cappuccino)** - 55 EGP *(Placeholder card)*
4. **آيس لاتيه (Iced Latte)** - 55 EGP 📸 *(Photo: `Ice latte.jpg`)*
5. **آيس موكا (Iced Mocha)** - 70 EGP 📸 *(Photo: `Ice moka.jpg`)*
6. **آيس سبانيش لاتيه (Iced Spanish Latte)** - 75 EGP *(Placeholder card)*
7. **صن شاين (Sunshine)** - 55 EGP *(Placeholder card)*
8. **موهيتو بلو باشن (Blue Passion Mojito)** - 55 EGP 📸 *(Photo: `Blue Passion Mojito.jpg`)*
9. **سموذي مانجو (Mango Smoothie)** - 50 EGP *(Placeholder card)*

### 4. 🍰 Signature Desserts Section ("الحلويات المميزة")
Displayed 5 desserts in logical order:
1. **مولتن كيك (Molten Cake)** - 90 EGP *(Placeholder card)*
2. **شوكليت كيك (Chocolate Cake)** - 60 EGP 📸 *(Photo: `Chocolate Cake.jpeg`)*
3. **ريد فليفت (Red Velvet Cake)** - 60 EGP 📸 *(Photo: `Red Velvet Cake.jpeg`)*
4. **تشيز كيك (Cheesecake)** - 60 EGP *(Placeholder card)*
5. **وافل بلجيكي (Belgian Waffle)** - 60 EGP 📸 *(Photo: `Waffle.jpeg`)*

### 5. 📜 Menu English Names Review
- Verified and standardized all 88 English menu item names (e.g. *Special Turkish Coffee*, *Matcha Latte*, *San Sebastian Cheesecake*, *Lotus Biscoff Shake*, *Passion Fruit Mojito*).

### 6. 🖼️ Coffee & Passion Section Image
- Updated main photo to `COFFEE & PASSION.jpeg` (`/assets/coffee_passion.jpeg`).

### 7. 🎈 Event Reservation Types
- Updated event selection choices strictly to:
  1. **عيد ميلاد** (Birthday Party)
  2. **تجمع خاص** (Private Gathering)
  3. **حفلة** (Special Party)

### 8. ⭐ Real Google Visitor Reviews
- Featured authentic customer feedback from visitors highlighting the garden terrace, AC quiet study room, Iced Spanish Latte, and friendly service.

### 9. 📸 Instagram Feed & Links
- Linked 4 real posts with authentic images directly to Instagram profile `@grand.cafe0`.

### 10. 📞 WhatsApp & Facebook Integration
- Updated WhatsApp & phone contact number across the website to: **`01070313242`**.
- Integrated Facebook page link: `https://www.facebook.com/share/1EoeRNkkmz/`.

---

## 🛠️ Where to Add Future Images (Instructions)
To add images for items that currently use placeholders:
1. Copy your image to `d:\Grand Cafe\public\assets\your_image_name.jpg`
2. Open `d:\Grand Cafe\src\data\menuData.ts`
3. Find the item (e.g. `Espresso`, `Cappuccino`, `Molten Cake`) and add `image: "/assets/your_image_name.jpg"`!
