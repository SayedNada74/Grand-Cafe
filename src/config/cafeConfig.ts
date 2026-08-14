export const cafeConfig = {
  name: {
    ar: "جراند كافيه",
    en: "Grand Cafe"
  },
  established: 2014,
  instagram: {
    handle: "@grand.cafe0",
    url: "https://www.instagram.com/grand.cafe0?igsh=ZHRyc2wxamVzOXRx"
  },
  facebook: {
    url: "https://www.facebook.com/share/1EoeRNkkmz/"
  },
  googleMapsUrl: "https://www.google.com/maps/place/%D8%AC%D8%B1%D8%A7%D9%86%D8%AF+%D9%83%D8%A7%D9%81%D9%8A%D9%87%7C+Grand+cafe%D8%8C+%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D8%AD%D9%87+%D8%A7%D9%85%D8%A7%D9%85+%D8%A7%D9%84%D8%B3%D9%8BDD8%B1%D8%A7%D9%84,+Tell+El+Kebir,+Ismailia+Governorate%E2%80%AD/@30.5585222,31.7853341,16z/data=!4m6!3m5!1s0x14f8198d0bc526b9:0xaccd1e8f73bd1d80!8m2!3d30.5585222!4d31.7853341!16s%2Fg%2F1q62kbdvz?hl=en-EG&gl=eg",
  location: {
    address: {
      ar: "الحماده أمام السنترال، التل الكبير، محافظة الإسماعيلية",
      en: "El Hamada in front of Central, Tell El Kebir, Ismailia Governorate"
    },
    city: {
      ar: "التل الكبير، الإسماعيلية",
      en: "Tell El Kebir, Ismailia"
    }
  },
  whatsappNumber: "201070313242",
  phoneNumber: "01070313242",
  openingHours: {
    ar: "يومياً: 12:00 مساءً - 2:00 صباحاً",
    en: "Daily: 12:00 PM - 2:00 AM"
  },
  features: {
    airConditioned: true,
    wiFiAvailable: true,
    indoorSeating: true,
    outdoorSeating: true,
    eventsFriendly: true,
    workFriendly: true
  },
  assets: {
    logo: "/assets/Logo.jpeg",
    originalMenu: "/assets/Menu.jpeg",
    bioImage: "/assets/Bio Instgram.jpeg",
    heroAmbiance: "/assets/hero_ambiance.png",
    indoorSeating: "/assets/indoor_seating.jpg",
    outdoorSeating: "/assets/outdoor_seating.jpg",
    coffeePassion: "/assets/coffee_passion.jpeg",
  }
};

export type CafeConfig = typeof cafeConfig;
