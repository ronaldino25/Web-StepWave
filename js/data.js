/* ==========================================
   StepWave - Data Manager & LocalStorage System
   Central Data Store for Main Site & Admin Panel
   ========================================== */

const DEFAULT_STEPWAVE_DATA = {
  siteConfig: {
    companyName: 'StepWave Innovations Indonesia',
    slogan: 'Melangkah Lebih Far, Bergaya Lebih Modern.',
    tagline: 'Inovasi Ergonomis untuk Setiap Langkah Aktivitasmu',
    heroSubtitle: 'StepWave menggabungkan teknologi bantalan Aeroflux Foam, desain futuristik, dan eco-material ramah lingkungan untuk kenyamanan kaki tanpa batas sepanjang hari.',
    promoBarText: '🎉 PROMO FLASH SALE: Diskon 25% + Gratis Ongkir Seluruh Indonesia!',
    promoBarCode: 'STEPNEW',
    whatsappNumber: '6281234567890',
    whatsappDisplay: '+62 812-3456-7890',
    email: 'support@stepwave.co.id',
    address: 'StepWave Tower, Lt. 8, Jl. Jend. Sudirman Kav. 52-53, SCBD, Jakarta Selatan 12190',
    operatingHours: 'Senin - Sabtu: 08:00 - 18:00 WIB (Minggu & Libur Nasional Tutup)',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273618367905!2d106.80486831476906!3d-6.227606995491959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15053f3e829%3A0x265538e1a68132e4!2sSCBD%20Jakarta!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid',
    socials: {
      instagram: 'https://instagram.com/stepwave.id',
      tiktok: 'https://tiktok.com/@stepwave.id',
      youtube: 'https://youtube.com/c/stepwave',
      linkedin: 'https://linkedin.com/company/stepwave'
    }
  },
  products: [
    {
      id: '1',
      name: 'StepWave Apex Runner',
      category: 'Running',
      price: 'Rp 1.299.000',
      rawPrice: 1299000,
      img: 'images/product-1.jpg',
      tag: 'Bestseller',
      desc: 'Sepatu lari maraton ultra ringan dengan bantalan Aeroflux Foam ultra-responsif, bobot ringan 210g, dan upper mesh breathability tinggi. Dirancang khusus untuk maraton dan daily runner.',
      specs: [
        'Bantalan Aeroflux Dual-Density',
        'Outsole Anti-Slip Vibram Rubber',
        'Reflective Night Safety Accent',
        'Berat: 210 gram (Size 42)'
      ]
    },
    {
      id: '2',
      name: 'StepWave Street Flex',
      category: 'Casual',
      price: 'Rp 999.000',
      rawPrice: 999000,
      img: 'images/product-2.jpg',
      tag: 'New Trend',
      desc: 'Sneakers casual urban dengan estetika modern minimalis. Dilengkapi insole Ergolevel Memory Foam yang menyesuaikan bentuk telapak kaki untuk kenyamanan sepanjang hari.',
      specs: [
        'Material Premium Microfiber Leather',
        'Insole Ergolevel Memory Foam',
        'Outsole Vulcanized Durable Rubber',
        'Desain Versatile Casual'
      ]
    },
    {
      id: '3',
      name: 'StepWave Urban Shield',
      category: 'Outdoor',
      price: 'Rp 1.499.000',
      rawPrice: 1499000,
      img: 'images/product-3.jpg',
      tag: 'Waterproof',
      desc: 'Sepatu outdoor waterproof tangguh untuk jelajah alam & perkotaan. Lapisan HydroGuard waterproof membrane menjaga kaki tetap kering dalam kondisi hujan tajam.',
      specs: [
        'Lapisan HydroGuard 100% Waterproof',
        'High-Traction Lugged Outsole',
        'Ankle Support Reinforced Guard',
        'Material Eco Tektite Fabric'
      ]
    },
    {
      id: '4',
      name: 'StepWave Cloud Comfort',
      category: 'Ergonomic',
      price: 'Rp 899.000',
      rawPrice: 899000,
      img: 'images/product-4.jpg',
      tag: 'Comfort 360',
      desc: 'Daily slip-on knitted sneaker ultra ringan dengan fleksibilitas 360 derajat. Sangat ideal untuk pekerja aktif, dosen, mahasiswa, dan travel lover.',
      specs: [
        'Breathable PrimeKnit Upper',
        'Easy Slip-on Stretch Collar',
        'Shock-Absorbing Heel Counter',
        'Machine Washable Friendly'
      ]
    }
  ],
  blogPosts: [
    {
      id: '1',
      title: '5 Cara Memilih Sepatu Lari Ergonomis Agar Bebas Cedera',
      date: '04 Oktober 2026',
      author: 'Tim R&D StepWave',
      category: 'Edukasi Footwear',
      readTime: '4 Menit Baca',
      img: 'images/product-1.jpg',
      excerpt: 'Pahami pentingnya bentuk arch support dan teknologi foam untuk mencegah nyeri otot tumit saat maraton...',
      content: `
        <p>Memilih sepatu lari yang tepat bukan hanya soal tampilan visual atau tren fashion terkini. Bagi pelari maupun pejalan kaki aktif, bentuk insersi plantar fascia dan dukungan arch support memegang peranan vital dalam mencegah cidera seperti <em>plantar fasciitis</em> dan <em>shin splints</em>.</p>
        <br>
        <h4>1. Pahami Pronasi Kaki Anda</h4>
        <p>Setiap orang memiliki jenis gaya berjalan yang berbeda: neutral, overpronation, atau underpronation. Sepatu StepWave Apex Runner dilengkapi teknologi Aeroflux yang secara otomatis meredam guncangan beban hingga 3x berat badan saat melangkah.</p>
        <br>
        <h4>2. Beri Ruang 0.5 - 1 cm pada Toe Box</h4>
        <p>Saat berlari, jari kaki akan merenggang dan membengkak secara alami. Pastikan ada sisa ruang selebar ibu jari tangan di bagian depan sepatu agar kuku tidak menghitam.</p>
        <br>
        <h4>3. Perhatikan Material Upper Mesh</h4>
        <p>Pilihlah upper berbahan engineered mesh yang berventilasi baik agar kelembapan udara cepat menguap dan mencegah timbulnya jamur atau bau tidak sedap.</p>
      `
    },
    {
      id: '2',
      title: 'Tren Sneakers Modern 2026: Perpaduan Eco-Material & High-Tech',
      date: '28 September 2026',
      author: 'Tim Marketing StepWave',
      category: 'Trend & Style',
      readTime: '3 Menit Baca',
      img: 'images/product-2.jpg',
      excerpt: 'Pergeseran perilaku konsumen milenial dalam memilih sneakers ramah lingkungan dengan estetika futuristik...',
      content: `
        <p>Industri sneakers global di tahun 2026 mengalami pergeseran paradigma signifikan. Konsumen era digital tidak lagi hanya mencari penampilan yang atraktif, melainkan juga menuntut komitmen keberlanjutan lingkungan (sustainability) dari brand produsen.</p>
        <br>
        <p>StepWave merespons perubahan perilaku konsumen ini dengan menghadirkan lini produk ramah lingkungan berbasis serat bambu organik dan karet daur ulang berkualitas ekspor. Ditambah sentuhan estetik minimalis futuristik, StepWave Street Flex berhasil menjadi icon sneakers harian para profesional muda Indonesia.</p>
      `
    },
    {
      id: '3',
      title: 'Pentingnya Ergonomic Insole untuk Pekerja Beraktivitas Tinggi',
      date: '15 September 2026',
      author: 'Dr. Handoko, Sp.OT',
      category: 'Kesehatan Kaki',
      readTime: '5 Menit Baca',
      img: 'images/product-4.jpg',
      excerpt: 'Ulasan dokter spesialis ortopedi tentang efek penggunaan sepatu yang tepat pada postur tubuh...',
      content: `
        <p>Berdiri atau berjalan lebih dari 6 jam sehari tanpa dukungan sepatu yang tepat dapat menyebabkan rasa lelah kronis pada tulang belakang dan sendi lutut. Penggunaan insole ergonomis terbukti meratakan distribusi tekanan berat badan secara merata.</p>
        <br>
        <p>Teknologi Cloud Comfort dari StepWave dirancang khusus bersama pakar ortopedi untuk menyangga bagian tumit dan arkus kaki secara optimal, mengurangi keletihan otot kaki hingga 40%.</p>
      `
    }
  ],
  messages: [
    {
      id: 'msg-101',
      name: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      phone: '081299887766',
      subject: 'Pertanyaan Produk & Ukuran',
      message: 'Apakah ukuran 42 untuk Apex Runner ready stock? Dan apakah bisa COD di area Jakarta Selatan?',
      date: '05 Okt 2026, 14:20'
    },
    {
      id: 'msg-102',
      name: 'Citra Dewi',
      email: 'citra.dewi@yahoo.com',
      phone: '085711223344',
      subject: 'Kerjasama B2B / Reseller',
      message: 'Halo admin StepWave, kami dari toko outdoor di Bandung berminat mengajukan diri menjadi reseller resmi produk Urban Shield. Mohon kirimkan pricelist grosir. Terima kasih.',
      date: '04 Okt 2026, 09:15'
    }
  ]
};

// Initialize / Load Data from LocalStorage
function getStepWaveData() {
  const stored = localStorage.getItem('STEPWAVE_CMS_DATA');
  if (!stored) {
    saveStepWaveData(DEFAULT_STEPWAVE_DATA);
    return DEFAULT_STEPWAVE_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing stored StepWave data:', e);
    return DEFAULT_STEPWAVE_DATA;
  }
}

function saveStepWaveData(data) {
  localStorage.setItem('STEPWAVE_CMS_DATA', JSON.stringify(data));
}

function resetStepWaveDataToDefault() {
  localStorage.setItem('STEPWAVE_CMS_DATA', JSON.stringify(DEFAULT_STEPWAVE_DATA));
  return DEFAULT_STEPWAVE_DATA;
}
