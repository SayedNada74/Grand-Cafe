export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  featuredDrink?: boolean;
  featuredDessert?: boolean;
  image?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface MenuCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "coffee",
    nameAr: "القهوة",
    nameEn: "Coffee",
    iconName: "Coffee",
    items: [
      { id: "c1", nameAr: "قهوة تركي", nameEn: "Turkish Coffee", price: 30 },
      { id: "c2", nameAr: "قهوة تركي اسبشيل", nameEn: "Special Turkish Coffee", price: 40 },
      { id: "c3", nameAr: "قهوة بندق", nameEn: "Hazelnut Coffee", price: 45 },
      { id: "c4", nameAr: "قهوة فرنساوي", nameEn: "French Coffee", price: 45 },
      { id: "c5", nameAr: "نسكافيه", nameEn: "Nescafe", price: 45 },
      { id: "c6", nameAr: "كابتشينو", nameEn: "Cappuccino", price: 55, featuredDrink: true, descriptionAr: "رغوة كابتشينو غنية مع اسبريسو غني وطعم متوازن.", descriptionEn: "Rich espresso topped with smooth velvety milk foam." },
      { id: "c7", nameAr: "فلات وايت", nameEn: "Flat White", price: 55 },
      { id: "c8", nameAr: "لاتيه", nameEn: "Caffè Latte", price: 55, featuredDrink: true, image: "/assets/caffe_latte.jpg", descriptionAr: "قهوة لاتيه ساخنة ومضبوطة بالحليب المبخر.", descriptionEn: "Smooth espresso blended with steamed creamy milk." },
      { id: "c9", nameAr: "اسبريسو", nameEn: "Espresso", price: 35, featuredDrink: true, descriptionAr: "شوت اسبريسو مركز غني بالطعم والأروما الأصيلة.", descriptionEn: "Pure concentrated espresso shot with rich crema." },
      { id: "c10", nameAr: "أمريكان كوفي", nameEn: "American Coffee", price: 45 },
      { id: "c11", nameAr: "ماكياتو", nameEn: "Macchiato", price: 55 },
      { id: "c12", nameAr: "كورتادو", nameEn: "Cortado", price: 55 },
      { id: "c13", nameAr: "موكا", nameEn: "Mocha", price: 65 },
      { id: "c14", nameAr: "وايت موكا", nameEn: "White Mocha", price: 65 },
      { id: "c15", nameAr: "اسبانش لاتيه", nameEn: "Spanish Latte", price: 65 },
      { id: "c16", nameAr: "ماتشا", nameEn: "Matcha Latte", price: 80 },
      { id: "c17", nameAr: "هوت شوكليت", nameEn: "Hot Chocolate", price: 60 },
    ]
  },
  {
    id: "hot-drinks",
    nameAr: "مشروبات ساخنة",
    nameEn: "Hot Drinks",
    iconName: "Flame",
    items: [
      { id: "h1", nameAr: "شاي", nameEn: "Red Tea", price: 10 },
      { id: "h2", nameAr: "شاي فليفر", nameEn: "Flavored Tea", price: 25 },
      { id: "h3", nameAr: "أعشاب", nameEn: "Herbal Tea", price: 15 },
      { id: "h4", nameAr: "سحلب", nameEn: "Egyptian Sahlab", price: 45 },
      { id: "h5", nameAr: "هوت سيدر", nameEn: "Hot Apple Cider", price: 45 },
    ]
  },
  {
    id: "iced-coffee",
    nameAr: "آيس كوفي",
    nameEn: "Iced Coffee",
    iconName: "CupSoda",
    items: [
      { id: "ic1", nameAr: "آيس لاتيه", nameEn: "Iced Latte", price: 55, featuredDrink: true, image: "/assets/ice_latte.jpg", descriptionAr: "آيس لاتيه بارد وممتع بالحليب ومكعبات الثلج.", descriptionEn: "Chilled espresso poured over fresh milk & ice." },
      { id: "ic2", nameAr: "آيس موكا", nameEn: "Iced Mocha", price: 70, featuredDrink: true, image: "/assets/ice_moka.jpg", descriptionAr: "مزيج الشوكولاتة والقهوة المثلجة المنعشة.", descriptionEn: "Rich chocolate & chilled espresso with ice." },
      { id: "ic3", nameAr: "آيس وايت موكا", nameEn: "Iced White Mocha", price: 70 },
      { id: "ic4", nameAr: "آيس فرابيه", nameEn: "Iced Frappe", price: 75 },
      { id: "ic5", nameAr: "آيس سبانيش لاتيه", nameEn: "Iced Spanish Latte", price: 75, featuredDrink: true, descriptionAr: "طعم مميز وحلاوة مضبوطة مع الاسبريسو البارد.", descriptionEn: "Sweetened condensed milk blended with chilled espresso." },
      { id: "ic6", nameAr: "آيس كراميل ماكياتو", nameEn: "Iced Caramel Macchiato", price: 70 },
      { id: "ic7", nameAr: "آيس أمريكانو", nameEn: "Iced Americano", price: 45 },
      { id: "ic8", nameAr: "آيس افوجاتو", nameEn: "Affogato", price: 50 },
    ]
  },
  {
    id: "mix-soda",
    nameAr: "ميكس صودا",
    nameEn: "Mix Soda & Mojitos",
    iconName: "Sparkles",
    items: [
      { id: "ms1", nameAr: "صن شاين", nameEn: "Sunshine", price: 55, featuredDrink: true, descriptionAr: "مشروب الانتعاش الشهير بالنكهات الصيفية والنعناع.", descriptionEn: "Refreshing citrus & mint sunshine cooler." },
      { id: "ms2", nameAr: "صن رايز", nameEn: "Sunrise Mocktail", price: 55 },
      { id: "ms3", nameAr: "موهيتو بلو باشن", nameEn: "Blue Passion Mojito", price: 55, featuredDrink: true, image: "/assets/blue_passion_mojito.jpg", descriptionAr: "موهيتو باشن فروت أزرق بلمسة نعناع صيفي.", descriptionEn: "Vibrant blue passion fruit mojito with fresh mint." },
      { id: "ms4", nameAr: "موهيتو باشن فروت", nameEn: "Passion Fruit Mojito", price: 55 },
      { id: "ms5", nameAr: "موهيتو بطيخ", nameEn: "Watermelon Mojito", price: 55 },
      { id: "ms6", nameAr: "موهيتو بلوبيري", nameEn: "Blueberry Mojito", price: 55 },
      { id: "ms7", nameAr: "ريدبول ميكس", nameEn: "Red Bull Mix", price: 90 },
      { id: "ms8", nameAr: "موهيتو كلاسيك", nameEn: "Classic Mojito", price: 55 },
    ]
  },
  {
    id: "desserts",
    nameAr: "ديزرت",
    nameEn: "Desserts & Bakery",
    iconName: "Cake",
    items: [
      { id: "d1", nameAr: "مولتن كيك", nameEn: "Molten Cake", price: 90, featuredDessert: true, descriptionAr: "كيك شوكولاتة غني بقلب شوكولاتة ذائبة ساخنة مع آيس كريم.", descriptionEn: "Warm chocolate cake with oozing molten chocolate center." },
      { id: "d2", nameAr: "شوكليت كيك", nameEn: "Chocolate Cake", price: 60, featuredDessert: true, image: "/assets/chocolate_cake.jpeg", descriptionAr: "كيك الشوكولاتة الغني بطبقات الشوكولاتة البلجيكية.", descriptionEn: "Decadent multi-layer Belgian chocolate cake." },
      { id: "d3", nameAr: "ريد فليفت", nameEn: "Red Velvet Cake", price: 60, featuredDessert: true, image: "/assets/red_velvet_cake.jpeg", descriptionAr: "كيك ريد فليفت هشة وناعمة مع كريمة الجبن التوبينج.", descriptionEn: "Soft velvet cake topped with smooth cream cheese." },
      { id: "d4", nameAr: "تشيز كيك", nameEn: "Cheesecake", price: 60, featuredDessert: true, descriptionAr: "تشيز كيك نيويورك الكلاسيكية بطعم كريمي وغني.", descriptionEn: "Rich & creamy New York style baked cheesecake." },
      { id: "d5", nameAr: "سان سباستيان", nameEn: "San Sebastian Cheesecake", price: 60 },
      { id: "d6", nameAr: "براونيز", nameEn: "Chocolate Brownies", price: 60 },
      { id: "d7", nameAr: "وافل", nameEn: "Belgian Waffle", price: 60, featuredDessert: true, image: "/assets/waffle.jpeg", descriptionAr: "وافل بلجيكي مقرمش طازج يقدم مع النوتيلا وصوص الفواكه.", descriptionEn: "Crispy Golden Belgian waffle with chocolate drizzle." },
      { id: "d8", nameAr: "ميني بان كيك", nameEn: "Mini Pancakes", price: 60 },
    ]
  },
  {
    id: "milkshake",
    nameAr: "ميلك شيك",
    nameEn: "Milkshake",
    iconName: "Milk",
    items: [
      { id: "m1", nameAr: "اوريو", nameEn: "Oreo Shake", price: 65 },
      { id: "m2", nameAr: "فانيليا", nameEn: "Vanilla Shake", price: 60 },
      { id: "m3", nameAr: "شوكليت", nameEn: "Chocolate Shake", price: 60 },
      { id: "m4", nameAr: "نوتيلا", nameEn: "Nutella Shake", price: 70 },
      { id: "m5", nameAr: "كراميل", nameEn: "Caramel Shake", price: 60 },
      { id: "m6", nameAr: "كابتشينو", nameEn: "Cappuccino Shake", price: 65 },
      { id: "m7", nameAr: "لوتس", nameEn: "Lotus Biscoff Shake", price: 70 },
      { id: "m8", nameAr: "بستاشيو", nameEn: "Pistachio Shake", price: 90 },
      { id: "m9", nameAr: "بلوبيري", nameEn: "Blueberry Shake", price: 60 },
      { id: "m10", nameAr: "مانجا", nameEn: "Mango Shake", price: 60 },
      { id: "m11", nameAr: "فراوله", nameEn: "Strawberry Shake", price: 60 },
      { id: "m12", nameAr: "خوخ", nameEn: "Peach Shake", price: 60 },
      { id: "m13", nameAr: "راس بيري", nameEn: "Raspberry Shake", price: 60 },
      { id: "m14", nameAr: "تفاح أخضر", nameEn: "Green Apple Shake", price: 60 },
    ]
  },
  {
    id: "smoothies",
    nameAr: "سموذي",
    nameEn: "Smoothies",
    iconName: "GlassWater",
    items: [
      { id: "s1", nameAr: "بلوبيري", nameEn: "Blueberry Smoothie", price: 50 },
      { id: "s2", nameAr: "باشن فروت", nameEn: "Passion Fruit Smoothie", price: 50 },
      { id: "s3", nameAr: "مانجا", nameEn: "Mango Smoothie", price: 50, featuredDrink: true, descriptionAr: "سموذي المانجو الفريش المنعش مع قطع الثلج المجروش.", descriptionEn: "Fresh blended tropical mango smoothie with ice." },
      { id: "s4", nameAr: "فراوله", nameEn: "Strawberry Smoothie", price: 50 },
      { id: "s5", nameAr: "خوخ", nameEn: "Peach Smoothie", price: 50 },
      { id: "s6", nameAr: "بطيخ", nameEn: "Watermelon Smoothie", price: 50 },
      { id: "s7", nameAr: "بطيخ نعناع", nameEn: "Watermelon Mint Smoothie", price: 50 },
      { id: "s8", nameAr: "كيوي", nameEn: "Kiwi Smoothie", price: 50 },
      { id: "s9", nameAr: "تفاح أخضر", nameEn: "Green Apple Smoothie", price: 50 },
    ]
  },
  {
    id: "fresh-juices",
    nameAr: "عصائر فريش",
    nameEn: "Fresh Juices",
    iconName: "Citrus",
    items: [
      { id: "fj1", nameAr: "مانجا", nameEn: "Fresh Mango Juice", price: 50 },
      { id: "fj2", nameAr: "فراوله", nameEn: "Fresh Strawberry Juice", price: 40 },
      { id: "fj3", nameAr: "جوافه", nameEn: "Fresh Guava Juice", price: 40 },
      { id: "fj4", nameAr: "برتقال", nameEn: "Fresh Orange Juice", price: 40 },
      { id: "fj5", nameAr: "يوسفي", nameEn: "Fresh Tangerine Juice", price: 40 },
      { id: "fj6", nameAr: "كيوي", nameEn: "Fresh Kiwi Juice", price: 65 },
      { id: "fj7", nameAr: "ليمون", nameEn: "Fresh Lemonade", price: 25 },
      { id: "fj8", nameAr: "ليمون نعناع", nameEn: "Fresh Mint Lemonade", price: 30 },
      { id: "fj9", nameAr: "ليمون برتقال", nameEn: "Orange Lemonade Mix", price: 40 },
    ]
  },
  {
    id: "iced-tea",
    nameAr: "آيس تي",
    nameEn: "Iced Tea",
    iconName: "Wine",
    items: [
      { id: "it1", nameAr: "آيس تي باشن", nameEn: "Passion Iced Tea", price: 50 },
      { id: "it2", nameAr: "آيس تي خوخ", nameEn: "Peach Iced Tea", price: 50 },
      { id: "it3", nameAr: "آيس تي بلوبيري", nameEn: "Blueberry Iced Tea", price: 50 },
      { id: "it4", nameAr: "آيس تي فراوله", nameEn: "Strawberry Iced Tea", price: 50 },
    ]
  },
  {
    id: "ice-cream",
    nameAr: "آيس كريم",
    nameEn: "Ice Cream",
    iconName: "IceCream",
    items: [
      { id: "icr1", nameAr: "2 بوله آيس كريم", nameEn: "2 Scoops Ice Cream", price: 35 },
      { id: "icr2", nameAr: "3 بوله آيس كريم", nameEn: "3 Scoops Ice Cream", price: 45 },
    ]
  },
  {
    id: "soda",
    nameAr: "صودا",
    nameEn: "Soft Drinks",
    iconName: "Zap",
    items: [
      { id: "sd1", nameAr: "مياه معدنية", nameEn: "Mineral Water", price: 10 },
      { id: "sd2", nameAr: "بيبسي", nameEn: "Pepsi Can", price: 25 },
      { id: "sd3", nameAr: "بريل", nameEn: "Birell Malt Drink", price: 30 },
      { id: "sd4", nameAr: "ريدبول", nameEn: "Red Bull Energy Drink", price: 80 },
    ]
  }
];

// Helper to extract the 9 featured drinks in logical order
export const getFeaturedDrinks = (): MenuItem[] => {
  const drinksOrder = ["c9", "c8", "c6", "ic1", "ic2", "ic5", "ms1", "ms3", "s3"];
  const allItems: MenuItem[] = [];
  menuCategories.forEach(cat => allItems.push(...cat.items));
  
  return drinksOrder
    .map(id => allItems.find(item => item.id === id))
    .filter((item): item is MenuItem => item !== undefined);
};

// Helper to extract the 5 featured desserts in logical order
export const getFeaturedDesserts = (): MenuItem[] => {
  const dessertsOrder = ["d1", "d2", "d3", "d4", "d7"];
  const allItems: MenuItem[] = [];
  menuCategories.forEach(cat => allItems.push(...cat.items));
  
  return dessertsOrder
    .map(id => allItems.find(item => item.id === id))
    .filter((item): item is MenuItem => item !== undefined);
};
