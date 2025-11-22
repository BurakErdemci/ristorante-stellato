"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Star } from 'lucide-react';

const MENU_CATEGORIES = ["Antipasti", "Pasta", "Pizza", "Secondi", "Dolci"];

const DISHES = {
  Antipasti: [
    { 
      id: 1, 
      name: 'Carpaccio di Manzo', 
      
      desc: 'İnce dilimlenmiş Wagyu bonfile, roka, 24 aylık parmesan, trüf yağı.', 
      image: 'https://cookingitalians.com/wp-content/uploads/2024/11/Carpaccio-di-Manzo.jpg',
      isChefChoice: true 
    },
    { 
      id: 2, 
      name: 'Burrata Campana', 
      
      desc: 'Puglia bölgesinden taze burrata, organik domates konfit, fesleğen pesto.', 
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/33/fa/5f/passata-di-pomodorini.jpg' 
    },
    { 
      id: 3, 
      name: 'Polpo Grigliato', 
     
      desc: 'Izgara ahtapot kolu, patates kreması, sote ıspanak, limonlu zeytinyağı.', 
      image: 'https://www.kikkoman.it/fileadmin/_processed_/0/3/csm_1235_recipe_page_grilled_octopus_with_ponzu_sauce_and_capers_Mobile_b3aefb518c.webp' 
    },
     { 
      id: 6, 
      name: 'Risotto Zafferano e Oro', 
      
      desc: 'Acquerello pirinci, İran safranı, yenilebilir 24K altın yaprak, kemik suyu.', 
      image: 'https://reportergourmet.com/upload/ricette/41/Riso-oro-e-zafferano-Coimbra.jpg' 
    },
    
  ],
  Pasta: [
    { 
      id: 4, 
      name: 'Tagliolini al Tartufo Nero', 
    
      desc: 'Şefin el yapımı taze makarnası, Umbria siyah trüf mantarı rendesi, tereyağı emülsiyonu.', 
      image: 'https://www.essenza.co.uk/wp-content/uploads/2020/01/Fettuccine-al-tartufo-bianco-768x576.jpg' 
    },
    { 
      id: 5, 
      name: 'Ravioli di Aragosta', 
       
      desc: 'Mavi ıstakoz dolgulu ravioli, karides bisque sos, frenk soğanı ve havyar dokunuşu.', 
      image: 'https://i0.wp.com/fornobistro.com/wp-content/uploads/sites/3/2024/04/Ravioli-di-Aragosta.jpg?ssl=1',
      isChefChoice: true
    },
   
    { 
      id: 7, 
      name: 'Pappardelle al Cinghiale', 
      
      desc: 'Geniş şerit makarna, 12 saat pişmiş yaban domuzu ragu, ardıç meyvesi aroması.', 
      image: 'https://www.casapappagallo.it/storage/11740/pappardelle-al-sugo-di-cinghiale.jpg' 
    }
  ],
  Pizza: [
    { 
      id: 8, 
      name: 'Tartufo e Burrata', 
    
      desc: 'Siyah trüf kreması tabanı, fior di latte, pişim sonrası taze burrata ve trüf dilimleri.', 
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/1d/02/bc/9a/pizza-fiordilatte-burrata.jpg',
      isChefChoice: true
    },
    { 
      id: 9, 
      name: 'Bresaola e Fichi', 
    
      desc: 'Mozzarella, ince dilim Bresaola, karamelize incir, gorgonzola, ceviz.', 
      image: 'https://tb-static.uber.com/prod/image-proc/processed_images/a26f154aa8ab03a83a40015c5faca15c/7f4ae9ca0446cbc23e71d8d395a98428.jpeg' 
    },
    { 
      id: 10, 
      name: 'Margherita Sbagliata', 
     
      desc: 'Deconstructed klasik: Sarı ve kırmızı kiraz domates konfit, manda mozzarellası.', 
      image: 'https://i.redd.it/first-attempt-of-margherita-sbagliata-from-n1-pizzeria-in-v0-4br9dr3ygan91.jpg?width=4032&format=pjpg&auto=webp&s=21d7d5ac52d454ec9c37fb446d6f73106a8ccb6b' 
    },
    { 
      id: 11, 
      name: 'Frutti di Mare Deluxe', 
       
      desc: 'San Marzano domates sos, karides, kalamar, midye, sarımsaklı maydanoz yağı.', 
      image: 'https://www.tasteatlas.com/images/dishes/2475b8aa94c1463dbe9dc17e0f38a063.jpg' 
    }
  ],
  Secondi: [
    { 
      id: 12, 
      name: 'Filetto alla Rossini', 
       
      desc: 'Dana bonfile, tavada kaz ciğeri (foie gras), siyah trüf, Madeira şarap sosu.', 
      image: 'https://www.unadonna.it/wp-content/uploads/2018/04/filetto-alla-rossini.jpg',
      isChefChoice: true
    },
    { 
      id: 13, 
      name: 'Branzino al Sale', 
      
      desc: 'Tuz kabuğunda pişmiş deniz levreği, mevsim sebzeleri, limon sos.', 
      image: 'https://media-assets.lacucinaitaliana.it/photos/61fd3076a9db3736d06bc2f8/1:1/w_2560%2Cc_limit/Branzino-al-sale.jpg' 
    },
    { 
      id: 14, 
      name: 'Costolette di Agnello', 
      
      desc: 'Kekik ve sarımsak marineli kuzu pirzola, patlıcan püresi.', 
      image: 'https://img.taste.com.au/q7vJvyXd/taste/2016/11/costolette-dyagnello-85950-1.jpeg' 
    }
  ],
  Dolci: [
    { 
      id: 15, 
      name: 'Tiramisu Stellato', 
      
      desc: 'Geleneksel tarif, mascarpone, espresso, savoiardi, Valrhona kakao.', 
      image: 'https://www.chefericette.com/wp-content/uploads/2022/01/Ricetta-stellata-Tirami-choux-chef-Fabrizio-Tesse.jpg',
      isChefChoice: true
    },
    { 
      id: 16, 
      name: 'Cannoli Siciliani', 
     
      desc: 'Kıtır hamur, tatlı ricotta dolgusu, antep fıstığı ve portakal şekeri.', 
      image: 'https://www.cucchiaio.it/content/dam/cucchiaio/it/ricette/2015/11/cannoli-siciliani/Cannoli%20siciliani-1.jpg' 
    }
  ]
};

// Sürükleme hassasiyeti ayarı
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Antipasti');
  const [selectedDish, setSelectedDish] = useState(DISHES['Antipasti'][0]);

  useEffect(() => {
    if (DISHES[activeCategory]) {
      setSelectedDish(DISHES[activeCategory][0]);
    }
  }, [activeCategory]);

  // Yemeği Değiştirme Fonksiyonu
  const handleSlide = (direction) => {
    const currentCategoryDishes = DISHES[activeCategory];
    const currentIndex = currentCategoryDishes.findIndex(d => d.id === selectedDish.id);
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % currentCategoryDishes.length;
    } else {
      newIndex = (currentIndex - 1 + currentCategoryDishes.length) % currentCategoryDishes.length;
    }
    
    setSelectedDish(currentCategoryDishes[newIndex]);
  };

  return (
    <section id="menu" className="py-32 bg-[#080808] relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#111] to-transparent opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Başlık */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-stellato-gold text-xs tracking-[0.3em] uppercase font-bold block mb-4"
          >
            Gastronomik Yolculuk
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl text-white font-medium"
          >
            Menü Seçkisi
          </motion.h2>
          <div className="h-px w-24 bg-stellato-gold mx-auto mt-8 opacity-60"></div>
        </div>

        {/* Kategoriler */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 border-b border-white/5 pb-1">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative pb-6 text-sm md:text-base tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeCategory === cat ? 'text-stellato-gold' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-stellato-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* SOL: YEMEK LİSTESİ */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {DISHES[activeCategory]?.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => setSelectedDish(dish)}
                    className={`group cursor-pointer relative p-4 -mx-4 rounded-lg transition-all duration-300 border border-transparent
                      ${selectedDish.id === dish.id 
                        ? 'bg-white/5 border-white/10' 
                        : 'hover:bg-white/5 hover:border-white/5'
                      }
                    `}
                  >
                    <div className="flex justify-between items-baseline relative z-10">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${
                          selectedDish.id === dish.id ? 'text-stellato-gold' : 'text-stone-200 group-hover:text-white'
                        }`}>
                          {dish.name}
                        </h3>
                        
                        {dish.isChefChoice && (
                          <Star size={12} fill="#D4AF37" className="text-stellato-gold opacity-80" />
                        )}
                      </div>
                      
                      <div className={`grow border-b border-dotted mx-4 relative bottom-2 transition-colors duration-300 ${
                         selectedDish.id === dish.id ? 'border-stellato-gold/50' : 'border-stone-800 group-hover:border-stone-600'
                      }`}></div>
                      
                      <span className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                         selectedDish.id === dish.id ? 'text-stellato-gold' : 'text-stone-400'
                      }`}>
                        {dish.price}
                      </span>
                    </div>

                    <p className={`mt-2 font-sans text-sm font-light transition-colors duration-300 ${
                       selectedDish.id === dish.id ? 'text-stone-300' : 'text-stone-500 group-hover:text-stone-400'
                    }`}>
                      {dish.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SAĞ: GÖRSEL ÖNİZLEME (SWIPE ENABLED) */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="sticky top-32">
               <div className="absolute -inset-4 border border-stellato-gold/20 z-0"></div>
               <div className="absolute -inset-4 border border-stellato-gold/10 blur-[2px] z-0"></div>
               
              <div className="relative w-full aspect-4/5 overflow-hidden bg-stellato-black shadow-2xl z-10 group cursor-grab active:cursor-grabbing">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedDish?.id}
                    src={selectedDish?.image}
                    alt={selectedDish?.name}
                    
                    // --- SWIPE MANTIĞI BAŞLANGICI ---
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2} 
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        handleSlide('next');
                      } else if (swipe > swipeConfidenceThreshold) {
                        handleSlide('prev');
                      }
                    }}
                    // --- SWIPE MANTIĞI BİTİŞİ ---

                    initial={{ opacity: 0, x: 20, scale: 1.1 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ 
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="w-full h-full object-cover touch-pan-y" 
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none" />
                
                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                   {selectedDish?.isChefChoice && (
                     <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-2 text-stellato-gold text-xs uppercase tracking-widest"
                     >
                        <Utensils size={12} />
                        <span>Şefin İmza Tabağı</span>
                     </motion.div>
                   )}

                  <motion.p 
                    key={selectedDish?.id + "text"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-3xl text-white italic leading-tight"
                  >
                    {selectedDish?.name}
                  </motion.p>
                </div>
                
          
                <div className="absolute top-4 right-4 text-white/30 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   &larr; Kaydır &rarr;
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}