import React, { useState, useEffect, useRef } from 'react';
import { Trophy, MapPin, Sparkles, ArrowRight, CheckCircle2, Lightbulb, PlayCircle, X, Coins, Loader2, Gamepad2, Smile, HelpCircle, ChevronLeft, Compass, Target, Dices, ShieldAlert, Users, RotateCcw, Save } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ==========================================
// 1. GAME DATABASES 
// ==========================================

// --- GAME 1: CROSSWORD ---
const crosswordPuzzles = [
  { id: 1, city: "Varanasi", title: "The Ancient City", hintText: "This city is known as the spiritual capital of India. It sits on the banks of the Ganges and is famous for its narrow galis and ancient rituals.", rows: 9, cols: 6, wordCount: 5, cells: [ { r: 0, c: 0, a: 'G', n: 1 }, { r: 0, c: 1, a: 'A' }, { r: 0, c: 2, a: 'N' }, { r: 0, c: 3, a: 'G' }, { r: 0, c: 4, a: 'E' }, { r: 0, c: 5, a: 'S' }, { r: 1, c: 0, a: 'H' }, { r: 2, c: 0, a: 'A', n: 2 }, { r: 2, c: 1, a: 'A' }, { r: 2, c: 2, a: 'R' }, { r: 2, c: 3, a: 'T' }, { r: 2, c: 4, a: 'I' }, { r: 3, c: 0, a: 'T' }, { r: 4, c: 0, a: 'S', n: 3 }, { r: 4, c: 1, a: 'I' }, { r: 4, c: 2, a: 'L' }, { r: 4, c: 3, a: 'K', n: 4 }, { r: 5, c: 3, a: 'A' }, { r: 6, c: 3, a: 'S' }, { r: 7, c: 3, a: 'H' }, { r: 8, c: 3, a: 'I' } ], clues: { across: [{ n: 1, text: "The sacred river running through this city (6)" }, { n: 2, text: "The mesmerizing evening fire ritual (5)" }, { n: 3, text: "The fine, luxurious fabric this city is famous for weaving (4)" }], down: [{ n: 1, text: "The stone steps leading down to the riverbanks (5)" }, { n: 4, text: "The ancient, spiritual name of this city (5)" }] }, answersExplained: [ { word: "GANGES", meaning: "The sacred river running through this city." }, { word: "AARTI", meaning: "The mesmerizing evening fire ritual performed by priests." }, { word: "SILK", meaning: "The fine, luxurious fabric Banaras is famous for weaving." }, { word: "GHAT", meaning: "The stone steps leading down to the riverbanks." }, { word: "KASHI", meaning: "The ancient, spiritual name of Varanasi." } ], desc: "Congratulations! You unlocked Varanasi. Often referred to as Banaras or Kashi, it is one of the oldest continuously inhabited cities in the world.", img: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80" },
  { id: 2, city: "Goa", title: "The Coastal Haven", hintText: "India's pocket-sized paradise on the west coast, famous for its Portuguese heritage, golden shores, and laid-back vibe.", rows: 7, cols: 6, wordCount: 4, cells: [ { r: 1, c: 1, a: 'S', n: 1 }, { r: 1, c: 2, a: 'H' }, { r: 1, c: 3, a: 'A' }, { r: 1, c: 4, a: 'C', n: 2 }, { r: 1, c: 5, a: 'K' }, { r: 2, c: 1, a: 'E' }, { r: 2, c: 4, a: 'H' }, { r: 3, c: 1, a: 'A' }, { r: 3, c: 4, a: 'U' }, { r: 4, c: 4, a: 'R' }, { r: 5, c: 4, a: 'C' }, { r: 6, c: 4, a: 'H' }, { r: 2, c: 0, a: 'F', n: 3 }, { r: 2, c: 2, a: 'N' }, { r: 2, c: 3, a: 'I' } ], clues: { across: [{ n: 1, text: "Beachside wooden hut serving food (5)" }, { n: 3, text: "Local strong liquor made from cashew apples (4)" }], down: [{ n: 1, text: "The vast body of saltwater you swim in (3)" }, { n: 2, text: "Old Portuguese place of worship (6)" }] }, answersExplained: [ { word: "SHACK", meaning: "Beachside wooden huts serving iconic local seafood." }, { word: "FENI", meaning: "A local strong liquor exclusively made from cashew apples." }, { word: "SEA", meaning: "The warm Arabian Sea bordering the entire state." }, { word: "CHURCH", meaning: "Remnants of the rich Portuguese colonial architecture." } ], desc: "Congratulations! You unlocked Goa. Famous for its pristine beaches, vibrant nightlife, and rich Portuguese architecture.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" },
  { id: 3, city: "Agra", title: "The City of Love", hintText: "Home to one of the Seven Wonders of the World, built by a Mughal Emperor along the Yamuna river.", rows: 6, cols: 7, wordCount: 4, cells: [ { r: 1, c: 1, a: 'M', n: 1 }, { r: 1, c: 2, a: 'A', n: 2 }, { r: 1, c: 3, a: 'R' }, { r: 1, c: 4, a: 'B', n: 3 }, { r: 1, c: 5, a: 'L' }, { r: 1, c: 6, a: 'E' }, { r: 0, c: 2, a: 'Y', n: 4 }, { r: 2, c: 2, a: 'M' }, { r: 2, c: 4, a: 'A' }, { r: 3, c: 2, a: 'U' }, { r: 3, c: 4, a: 'G' }, { r: 4, c: 2, a: 'N' }, { r: 4, c: 4, a: 'H' }, { r: 5, c: 1, a: 'T', n: 5 }, { r: 5, c: 2, a: 'A' }, { r: 5, c: 3, a: 'J' } ], clues: { across: [{ n: 1, text: "The pristine white stone used for the monument (6)" }, { n: 5, text: "The iconic monument of love (3)" }], down: [{ n: 4, text: "The river flowing behind the monument (6)" }, { n: 3, text: "Persian word for garden (4)" }] }, answersExplained: [ { word: "MARBLE", meaning: "The pristine white Makrana stone used for the monument." }, { word: "TAJ", meaning: "The iconic Taj Mahal, a worldwide symbol of love." }, { word: "YAMUNA", text: "The sacred river flowing directly behind the monument." }, { word: "BAGH", meaning: "Persian word for garden, specifically the Charbagh layout." } ], desc: "Congratulations! You unlocked Agra. Famous for the Taj Mahal, this historical city is a testament to the grandeur of the Mughal Empire.", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" },
  { id: 4, city: "Jaipur", title: "The Royal Capital", hintText: "The capital of Rajasthan, famous for its royal heritage, massive forts, and distinctively colored architecture.", rows: 6, cols: 6, wordCount: 3, cells: [ { r: 0, c: 1, a: 'P', n: 1 }, { r: 0, c: 2, a: 'I' }, { r: 0, c: 3, a: 'N' }, { r: 0, c: 4, a: 'K' }, { r: 1, c: 1, a: 'A' }, { r: 2, c: 1, a: 'L' }, { r: 3, c: 1, a: 'A', n: 2 }, { r: 3, c: 2, a: 'M' }, { r: 3, c: 3, a: 'B' }, { r: 3, c: 4, a: 'E' }, { r: 3, c: 5, a: 'R' }, { r: 4, c: 1, a: 'C' }, { r: 5, c: 1, a: 'E' } ], clues: { across: [{ n: 1, text: "The color this city is famously known as (4)" }, { n: 2, text: "Famous hilltop fort located just outside the city (5)" }], down: [{ n: 1, text: "Grand royal residence, often with many courtyards (6)" }] }, answersExplained: [ { word: "PINK", meaning: "Jaipur is famously known as the Pink City due to its terracotta architecture." }, { word: "AMBER", meaning: "The massive, majestic fort located on the hills just outside the city." }, { word: "PALACE", meaning: "Grand royal residences like the City Palace and Hawa Mahal." } ], desc: "Congratulations! You unlocked Jaipur. Affectionately called the Pink City, it is a bustling hub of palaces and incredible Rajasthani culture.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
  { id: 5, city: "Kerala", title: "God's Own Country", hintText: "A lush, tropical state in South India known for its tranquil backwaters, Ayurveda, and sprawling plantations.", rows: 7, cols: 5, wordCount: 3, cells: [ { r: 0, c: 2, a: 'C', n: 1 }, { r: 1, c: 1, a: 'B', n: 2 }, { r: 1, c: 2, a: 'O' }, { r: 1, c: 3, a: 'A' }, { r: 1, c: 4, a: 'T' }, { r: 2, c: 2, a: 'C' }, { r: 3, c: 2, a: 'O' }, { r: 4, c: 2, a: 'N' }, { r: 5, c: 2, a: 'U' }, { r: 6, c: 2, a: 'T', n: 3 }, { r: 6, c: 3, a: 'E' }, { r: 6, c: 4, a: 'A' } ], clues: { across: [{ n: 2, text: "Traditional wooden vessel used to navigate backwaters (4)" }, { n: 3, text: "Popular hot beverage grown extensively in Munnar (3)" }], down: [{ n: 1, text: "Tropical palm fruit found everywhere in this state (7)" }] }, answersExplained: [ { word: "BOAT", meaning: "Traditional wooden houseboats used to navigate the serene backwaters." }, { word: "TEA", meaning: "The popular beverage grown extensively on the lush hills of Munnar." }, { word: "COCONUT", meaning: "The tropical palm fruit deeply integrated into Kerala's landscape and food." } ], desc: "Congratulations! You unlocked Kerala. Famous for its serene backwaters, beautiful houseboats, and rich culinary traditions.", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" },
  { id: 6, city: "Ladakh", title: "The High Desert", hintText: "A high-altitude region in the far north of India, known for extreme landscapes, clear lakes, and Buddhist monasteries.", rows: 4, cols: 5, wordCount: 3, cells: [ { r: 0, c: 3, a: 'M', n: 1 }, { r: 1, c: 1, a: 'S', n: 2 }, { r: 1, c: 2, a: 'N' }, { r: 1, c: 3, a: 'O' }, { r: 1, c: 4, a: 'W' }, { r: 2, c: 3, a: 'N' }, { r: 3, c: 1, a: 'L', n: 3 }, { r: 3, c: 2, a: 'A' }, { r: 3, c: 3, a: 'K' }, { r: 3, c: 4, a: 'E' } ], clues: { across: [{ n: 2, text: "White blanket covering the high mountains in winter (4)" }, { n: 3, text: "Pangong is a famous high-altitude one (4)" }], down: [{ n: 1, text: "Spiritual dweller commonly found in a Gompa (4)" }] }, answersExplained: [ { word: "SNOW", meaning: "The white blanket covering the high mountain passes like Khardung La." }, { word: "LAKE", meaning: "Pangong and Tso Moriri are famous high-altitude salt lakes here." }, { word: "MONK", meaning: "Spiritual dwellers commonly found chanting in the ancient Gompas." } ], desc: "Congratulations! You unlocked Ladakh. Known for its breathtaking mountain passes, freezing winters, and tranquil monasteries.", img: "https://images.unsplash.com/photo-1581793758837-920fbc8110b6?auto=format&fit=crop&w=800&q=80" },
  { id: 7, city: "Darjeeling", title: "The Queen of Hills", hintText: "A famous hill station in West Bengal known for the Kanchenjunga view and a UNESCO heritage railway.", rows: 5, cols: 4, wordCount: 3, cells: [ { r: 0, c: 1, a: 'T', n: 1 }, { r: 0, c: 2, a: 'E' }, { r: 0, c: 3, a: 'A' }, { r: 1, c: 1, a: 'R' }, { r: 2, c: 1, a: 'A' }, { r: 3, c: 0, a: 'H', n: 2 }, { r: 3, c: 1, a: 'I' }, { r: 3, c: 2, a: 'L' }, { r: 3, c: 3, a: 'L' }, { r: 4, c: 1, a: 'N' } ], clues: { across: [{ n: 1, text: "The world-famous beverage grown on these slopes (3)" }, { n: 2, text: "Elevated landform, smaller than a mountain (4)" }], down: [{ n: 1, text: "The 'Toy' transportation that chugs through the town (5)" }] }, answersExplained: [ { word: "TEA", meaning: "The world-famous aromatic beverage grown on these steep slopes." }, { word: "HILL", meaning: "Darjeeling is often affectionately called the Queen of the Hills." }, { word: "TRAIN", meaning: "The iconic Himalayan 'Toy' Train that chugs through the town." } ], desc: "Congratulations! You unlocked Darjeeling. Step back in time with its colonial charm, sprawling tea estates, and the majestic toy train.", img: "https://images.unsplash.com/photo-1588666015694-8ceb1e22067d?auto=format&fit=crop&w=800&q=80" },
  { id: 8, city: "Mumbai", title: "The City of Dreams", hintText: "India's financial capital, famous for Marine Drive, local trains, and the Bollywood film industry.", rows: 4, cols: 4, wordCount: 3, cells: [ { r: 0, c: 0, a: 'S', n: 1 }, { r: 0, c: 1, a: 'E' }, { r: 0, c: 2, a: 'A' }, { r: 1, c: 0, a: 'T' }, { r: 2, c: 0, a: 'A' }, { r: 3, c: 0, a: 'R', n: 2 }, { r: 3, c: 1, a: 'A' }, { r: 3, c: 2, a: 'I' }, { r: 3, c: 3, a: 'N' } ], clues: { across: [{ n: 1, text: "Vast body of water bordering Marine Drive (3)" }, { n: 2, text: "Heavy monsoon weather typical to this city (4)" }], down: [{ n: 1, text: "A famous Bollywood celebrity (4)" }] }, answersExplained: [ { word: "SEA", meaning: "The Arabian Sea that borders the iconic Marine Drive promenade." }, { word: "RAIN", meaning: "The heavy, romantic monsoon downpours typical to this coastal city." }, { word: "STAR", meaning: "A reference to the massive Bollywood film industry housed here." } ], desc: "Congratulations! You unlocked Mumbai. Fast-paced and full of life, it's a melting pot of cultures, street food, and grand colonial architecture.", img: "https://hblimg.mmtcdn.com/content/hubble/img/dest_img/mmt/activities/m_Kolkata_dest_landscape_l_956_1435.jpg" },
  { id: 9, city: "Hampi", title: "The Forgotten Empire", hintText: "An ancient village in Karnataka dotted with numerous ruined temple complexes from the Vijayanagara Empire.", rows: 5, cols: 5, wordCount: 3, cells: [ { r: 0, c: 0, a: 'R', n: 1 }, { r: 0, c: 1, a: 'U' }, { r: 0, c: 2, a: 'I' }, { r: 0, c: 3, a: 'N' }, { r: 0, c: 4, a: 'S', n: 2 }, { r: 1, c: 0, a: 'O' }, { r: 2, c: 0, a: 'C' }, { r: 3, c: 0, a: 'K' }, { r: 1, c: 4, a: 'T' }, { r: 2, c: 4, a: 'O' }, { r: 3, c: 4, a: 'N' }, { r: 4, c: 4, a: 'E' } ], clues: { across: [{ n: 1, text: "What remains of the ancient palaces and temples (5)" }], down: [{ n: 1, text: "Massive boulders you can climb for sunset views (4)" }, { n: 2, text: "The primary material used to carve the Chariot (5)" }] }, answersExplained: [ { word: "RUINS", meaning: "The breathtaking remnants of the ancient Vijayanagara Empire." }, { word: "ROCK", meaning: "The massive, surreal boulders you can climb for epic sunset views." }, { word: "STONE", meaning: "The primary material used to carve the famous Hampi Stone Chariot." } ], desc: "Congratulations! You unlocked Hampi. A UNESCO World Heritage site, its surreal boulder-strewn landscape and ancient ruins feel like stepping onto another planet.", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80" },
  { id: 10, city: "Amritsar", title: "The Golden Heart", hintText: "A prominent city in Punjab, home to the holiest Gurdwara of the Sikh religion.", rows: 4, cols: 4, wordCount: 3, cells: [ { r: 0, c: 0, a: 'G', n: 1 }, { r: 0, c: 1, a: 'O' }, { r: 0, c: 2, a: 'L' }, { r: 0, c: 3, a: 'D', n: 2 }, { r: 1, c: 0, a: 'U' }, { r: 2, c: 0, a: 'R' }, { r: 3, c: 0, a: 'U' }, { r: 1, c: 3, a: 'E' }, { r: 2, c: 3, a: 'S' }, { r: 3, c: 3, a: 'I' } ], clues: { across: [{ n: 1, text: "The precious metal covering the famous temple (4)" }], down: [{ n: 1, text: "A spiritual teacher or guide (4)" }, { n: 2, text: "Local term for traditional, authentic food (4)" }] }, answersExplained: [ { word: "GOLD", meaning: "The precious metal covering the breathtaking Harmandir Sahib (Golden Temple)." }, { word: "GURU", meaning: "A spiritual teacher, central to the Sikh religion founded here." }, { word: "DESI", meaning: "The local term for the rich, traditional, and incredibly authentic Punjabi food." } ], desc: "Congratulations! You unlocked Amritsar. Famous for the breathtaking Golden Temple, community langars, and incredibly rich Punjabi food.", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80" }
];

const emojiPuzzles = [
  { id: 1, emojis: "🏖️ 🥥 ⛪ 🛵", answer: "GOA", city: "Goa", hint: "A state on the western coast of India.", desc: "Goa is the ultimate beach destination.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" },
  { id: 2, emojis: "🏔️ 🍎 ⛷️ 🌲", answer: "MANALI", city: "Manali", hint: "A popular hill station in Himachal Pradesh.", desc: "Manali is a high-altitude Himalayan resort town known for its apple orchards and snowy peaks.", img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=800&q=80" },
  { id: 3, emojis: "🐫 🏜️ 🏰 ⛺", answer: "JAISALMER", city: "Jaisalmer", hint: "A city in Rajasthan also known as the Golden City.", desc: "Jaisalmer lies in the heart of the Thar Desert.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
  { id: 4, emojis: "🌴 🛶 🥥 🐘", answer: "KERALA", city: "Kerala", hint: "A southern state known as God's Own Country.", desc: "Kerala is globally renowned for its serene backwaters, beautiful wooden houseboats, coconut-rich cuisine, and gentle elephants.", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" },
  { id: 5, emojis: "🕌 💖 👑 🕊️", answer: "AGRA", city: "Agra", hint: "Home to a world-famous monument of love.", desc: "Agra is synonymous with the Taj Mahal, the breathtaking white marble mausoleum built by Emperor Shah Jahan.", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" },
  { id: 6, emojis: "🕉️ 🛶 🕯️ 🛕", answer: "VARANASI", city: "Varanasi", hint: "The spiritual capital of India on the banks of the Ganges.", desc: "Varanasi is an intense sensory experience, famous for its ancient ghats, evening Ganga Aarti, and deep spiritual significance.", img: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80" },
  { id: 7, emojis: "🚂 ☕ 🏔️ 🌿", answer: "DARJEELING", city: "Darjeeling", hint: "A hill station in West Bengal.", desc: "Darjeeling is world-famous for its sprawling tea estates, colonial charm, and the iconic Himalayan Toy Train.", img: "https://images.unsplash.com/photo-1588666015694-8ceb1e22067d?auto=format&fit=crop&w=800&q=80" },
  { id: 8, emojis: "🤿 🐠 🏝️ 🐢", answer: "ANDAMAN", city: "Andaman", hint: "An archipelago of islands in the Bay of Bengal.", desc: "The Andaman Islands offer some of the best scuba diving in India, boasting crystal-clear waters, vibrant coral reefs, and sea turtles.", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" },
  { id: 9, emojis: "🎬 🌧️ 🚆 🍔", answer: "MUMBAI", city: "Mumbai", hint: "The financial capital of India.", desc: "Mumbai is the fast-paced city of dreams, famous for Bollywood, the romantic monsoon rains, local trains, and iconic street food like Vada Pav.", img: "https://hblimg.mmtcdn.com/content/hubble/img/dest_img/mmt/activities/m_Kolkata_dest_landscape_l_956_1435.jpg" },
  { id: 10, emojis: "🏍️ 🏔️ 🥶 ⛺", answer: "LADAKH", city: "Ladakh", hint: "A high-altitude desert in the Himalayas.", desc: "Ladakh is the ultimate adventure destination, famous for treacherous motorcycle trips, freezing high-altitude deserts, and starry camping nights.", img: "https://images.unsplash.com/photo-1581793758837-920fbc8110b6?auto=format&fit=crop&w=800&q=80" }
];

const triviaPuzzles = [
  { id: 1, question: "Which Indian state is home to the majestic 'Living Root Bridges'?", options: ["Assam", "Meghalaya", "Nagaland", "Sikkim"], answer: "Meghalaya", city: "Cherrapunji", desc: "The Khasi and Jaintia tribes of Meghalaya have guided roots of rubber trees across rivers for centuries.", img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80" },
  { id: 2, question: "Which city is known as the 'Yoga Capital of the World'?", options: ["Varanasi", "Haridwar", "Rishikesh", "Dharamshala"], answer: "Rishikesh", city: "Rishikesh", desc: "Rishikesh is a spiritual haven surrounded by the Himalayas.", img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80" },
  { id: 3, question: "The spectacular 'Dudhsagar Waterfalls' is located in which state?", options: ["Maharashtra", "Karnataka", "Goa", "Kerala"], answer: "Goa", city: "Goa", desc: "This majestic four-tiered waterfall is one of India's tallest.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" },
  { id: 4, question: "Where can you find the world's only floating national park, Keibul Lamjao?", options: ["Manipur", "Kerala", "West Bengal", "Odisha"], answer: "Manipur", city: "Loktak Lake", desc: "Located on Loktak Lake in Manipur, it is famous for its floating decomposed plant materials called 'phumdis'.", img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Auli_Himalayas.jpg" },
  { id: 5, question: "Which city houses the spectacular architectural marvel, the 'Hawa Mahal' (Palace of Winds)?", options: ["Udaipur", "Jodhpur", "Bikaner", "Jaipur"], answer: "Jaipur", city: "Jaipur", desc: "Built from red and pink sandstone, the Hawa Mahal has 953 small windows (jharokhas).", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
  { id: 6, question: "Which state is famous for hosting the Rann Utsav on a massive white salt desert?", options: ["Rajasthan", "Gujarat", "Madhya Pradesh", "Punjab"], answer: "Gujarat", city: "Rann of Kutch", desc: "The Rann of Kutch is one of the largest salt deserts in the world.", img: "https://images.unsplash.com/photo-1623868583489-328b0309995c?auto=format&fit=crop&w=800&q=80" },
  { id: 7, question: "The iconic, rich dish 'Dal Bati Churma' is a traditional staple from which Indian state?", options: ["Gujarat", "Haryana", "Rajasthan", "Bihar"], answer: "Rajasthan", city: "Rajasthan", desc: "This legendary Rajasthani dish consists of baked wheat balls (Bati), spicy lentils (Dal), and a sweet crumbled mixture (Churma).", img: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=800&q=80" },
  { id: 8, question: "Which romantic Indian city is famously known as the 'City of Lakes'?", options: ["Nainital", "Bhopal", "Srinagar", "Udaipur"], answer: "Udaipur", city: "Udaipur", desc: "Set around a series of artificial lakes and known for its lavish royal residences, Udaipur is incredibly romantic.", img: "https://images.unsplash.com/photo-1514222325250-13f34e5ced2e?auto=format&fit=crop&w=800&q=80" },
  { id: 9, question: "In which state would you find the ancient, boulder-strewn ruins of the Vijayanagara Empire at Hampi?", options: ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana"], answer: "Karnataka", city: "Hampi", desc: "Hampi is a surreal UNESCO World Heritage site dotted with magnificent temple ruins.", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80" },
  { id: 10, question: "The majestic Victoria Memorial, a large marble building built in memory of Queen Victoria, is a prominent landmark in which city?", options: ["Mumbai", "Chennai", "Delhi", "Kolkata"], answer: "Kolkata", city: "Kolkata", desc: "A remnant of the British Raj, the Victoria Memorial in Kolkata is a stunning architectural marvel set amidst sprawling gardens.", img: "https://hblimg.mmtcdn.com/content/hubble/img/dest_img/mmt/activities/m_Kolkata_dest_landscape_l_956_1435.jpg" }
];

const rouletteCategories = [
  { name: "Food", color: "#ef4444" }, 
  { name: "Culture", color: "#3b82f6" }, 
  { name: "Geography", color: "#10b981" }, 
  { name: "Monument", color: "#f59e0b" }, 
  { name: "Wildlife", color: "#14b8a6" }, 
  { name: "History", color: "#d946ef" }, 
  { name: "Festivals", color: "#f97316" },
  { name: "Wildcard", color: "#8b5cf6" }
];

const rouletteChallenges = [
  { type: "Food", q: "Name the fiery red mutton curry famously cooked in Rajasthan.", a: "LAAL MAAS" },
  { type: "Food", q: "Which famous street food from Mumbai consists of a deep-fried potato dumpling inside a bread bun?", a: "VADA PAV" },
  { type: "Food", q: "What is the popular fermented crepe made from rice and lentils, a staple in South India?", a: "DOSA" },
  { type: "Food", q: "Which sweet syrupy dessert, often spiral-shaped, is wildly popular across India?", a: "JALEBI" },
  { type: "Food", q: "Makki di Roti and Sarson da Saag is a traditional dish from which state?", a: "PUNJAB" },
  { type: "Food", q: "Which rich Mughlai dish is made of fragrant rice and meat, widely famous in Hyderabad?", a: "BIRYANI" },
  { type: "Culture", q: "The classical dance form 'Kathakali' originated in which state?", a: "KERALA" },
  { type: "Culture", q: "Which famous festival is known globally as the 'Festival of Colors'?", a: "HOLI" },
  { type: "Culture", q: "The Hornbill Festival, a celebration of indigenous warrior tribes, is held in which state?", a: "NAGALAND" },
  { type: "Culture", q: "Which traditional Indian garment is a long piece of unstitched cloth draped over the body?", a: "SAREE" },
  { type: "Culture", q: "Bihu is the most important festival of which northeastern Indian state?", a: "ASSAM" },
  { type: "Geography", q: "What is the capital city of Rajasthan?", a: "JAIPUR" },
  { type: "Geography", q: "Which Indian state shares the longest international border with a neighboring country?", a: "WEST BENGAL" },
  { type: "Geography", q: "The Thar Desert is primarily located in which Indian state?", a: "RAJASTHAN" },
  { type: "Geography", q: "Which river is considered the holiest in India and flows through Varanasi?", a: "GANGES" },
  { type: "Geography", q: "What is the southernmost point of the Indian mainland called?", a: "KANYAKUMARI" },
  { type: "Monument", q: "In which city is the famous Charminar located?", a: "HYDERABAD" },
  { type: "Monument", q: "The iconic Gateway of India overlooks the Arabian Sea in which city?", a: "MUMBAI" },
  { type: "Monument", q: "Which majestic white marble mausoleum is located in Agra?", a: "TAJ MAHAL" },
  { type: "Monument", q: "The Victoria Memorial, a large marble building, is a prominent landmark in which city?", a: "KOLKATA" },
  { type: "Monument", q: "Which famous red sandstone fort in Delhi served as the main residence of Mughal Emperors?", a: "RED FORT" },
  { type: "Wildcard", q: "Which state is globally known as 'God's Own Country'?", a: "KERALA" },
  { type: "Wildcard", q: "What is the official currency of India?", a: "RUPEE" },
  { type: "Wildcard", q: "Which city is famously known as the 'Silicon Valley of India'?", a: "BENGALURU" },
  { type: "Wildcard", q: "The massive Indian film industry based in Mumbai is commonly known as what?", a: "BOLLYWOOD" },
  { type: "Wildcard", q: "Which animal is the national heritage animal and widely found in Kerala and Assam?", a: "ELEPHANT" },
  { type: "Wildlife", q: "Which national park in Gujarat is the only natural home to the Asiatic Lion?", a: "GIR", city: "Gujarat" },
  { type: "Wildlife", q: "Which national park in Assam is famous for the one-horned rhinoceros?", a: "KAZIRANGA", city: "Assam" },
  { type: "Wildlife", q: "Ranthambore National Park is famous for spotting which big cat?", a: "TIGER", city: "Sawai Madhopur" },
  { type: "Wildlife", q: "Which state is home to the dense mangrove forests of the Sundarbans?", a: "WEST BENGAL", city: "Kolkata" },
  { type: "History", q: "The Vijayanagara Empire's capital was located in which modern-day ruined city?", a: "HAMPI", city: "Hampi" },
  { type: "History", q: "Which great Mauryan emperor built the Sanchi Stupa?", a: "ASHOKA", city: "Sanchi" },
  { type: "History", q: "In 1911, the capital of British India was shifted from Kolkata to which city?", a: "DELHI", city: "Delhi" },
  { type: "History", q: "Which ruler built the majestic Agra Fort?", a: "AKBAR", city: "Agra" },
  { type: "Festivals", q: "Which famous festival is known globally as the 'Festival of Colors'?", a: "HOLI", city: "Mathura" },
  { type: "Festivals", q: "The Hornbill Festival, a celebration of indigenous warrior tribes, is held in which state?", a: "NAGALAND", city: "Kohima" },
  { type: "Festivals", q: "Bihu is the most important festival of which northeastern Indian state?", a: "ASSAM", city: "Guwahati" },
  { type: "Festivals", q: "Onam is the major harvest festival of which southern state?", a: "KERALA", city: "Kochi" },
];

// --- GAME 5: SNAKES & LADDERS (100 Unique Tiles via Wikipedia) ---
const snlBoardSize = 100; 

// Exactly 100 Real Indian Destinations
const destinationNames = [
  "Agra", "Jaipur", "Varanasi", "Goa", "Munnar", "Ladakh", "Amritsar", "Hampi", "Jaisalmer", "Cherrapunji",
  "Udaipur", "Jodhpur", "Kolkata", "Mumbai", "Delhi", "Chennai", "Bangalore", "Hyderabad", "Pune", "Kochi",
  "Mysore", "Darjeeling", "Shimla", "Manali, Himachal Pradesh", "Rishikesh", "Haridwar", "Nainital", "Mussoorie", "Dalhousie, India", "Gangtok",
  "Shillong", "Tawang", "Kaziranga National Park", "Kohima", "Imphal", "Aizawl", "Agartala", "Dimapur", "Itanagar", "Guwahati",
  "Bodh Gaya", "Patna", "Ranchi", "Bhubaneswar", "Puri", "Konark", "Visakhapatnam", "Tirupati", "Vijayawada", "Amaravati",
  "Mahabalipuram", "Kanyakumari", "Madurai", "Coimbatore", "Ooty", "Kodaikanal", "Rameswaram", "Thiruvananthapuram", "Alappuzha", "Kumarakom",
  "Wayanad district", "Kozhikode", "Thrissur", "Mangalore", "Udupi", "Gokarna, Karnataka", "Murdeshwar", "Chikmagalur", "Madikeri", "Belur, Karnataka",
  "Halebidu", "Badami", "Bijapur", "Pattadakal", "Aihole", "Gulbarga", "Bidar", "Aurangabad, Maharashtra", "Nashik", "Mahabaleshwar",
  "Lonavala", "Panchgani", "Alibag", "Khandala", "Matheran", "Shirdi", "Ellora Caves", "Ajanta Caves", "Khajuraho Group of Monuments", "Sanchi",
  "Bhopal", "Indore", "Gwalior", "Ujjain", "Jabalpur", "Orchha", "Mandu, Madhya Pradesh", "Pachmarhi", "Bandhavgarh National Park", "Ranthambore National Park"
];

const getSnlBoardLayout = () => {
  let layout = [];
  for (let row = 9; row >= 0; row--) {
    let rowCells = [];
    for (let col = 1; col <= 10; col++) rowCells.push(row * 10 + col);
    if (row % 2 !== 0) rowCells.reverse(); 
    layout.push(...rowCells);
  }
  return layout;
};
const snlBoardLayout = getSnlBoardLayout();

const snakesAndLadders = {
  4: { to: 14, type: 'ladder', msg: "Hidden shortcut! 🪜 Climb to 14." },
  9: { to: 31, type: 'ladder', msg: "Friendly locals gave a lift! 🪜 Jump to 31." },
  17: { to: 7, type: 'snake', msg: "Lost your map! 🐍 Fall to 7." },
  28: { to: 84, type: 'ladder', msg: "Caught the Express Train! 🪜 Fly to 84." },
  40: { to: 59, type: 'ladder', msg: "Found a secret cave! 🪜 Climb to 59." },
  54: { to: 34, type: 'snake', msg: "Monsoon washed out road! 🐍 Fall to 34." },
  62: { to: 19, type: 'snake', msg: "Missed connecting flight! 🐍 Drop to 19." },
  71: { to: 91, type: 'ladder', msg: "Hired a speedboat! 🪜 Cruise to 91." },
  87: { to: 24, type: 'snake', msg: "Forgot your passport! 🐍 Huge drop to 24." },
  99: { to: 78, type: 'snake', msg: "Wrong train! 🐍 Fall to 78." }
};

const snakeLifelineTrivia = [
  { q: "Which monument was built as a symbol of love?", a: "Taj Mahal", opts: ["Red Fort", "Taj Mahal", "Qutub Minar"] },
  { q: "Capital of God's Own Country (Kerala)?", a: "Trivandrum", opts: ["Kochi", "Munnar", "Trivandrum"] },
  { q: "State famous for the Backwaters?", a: "Kerala", opts: ["Goa", "Kerala", "Odisha"] },
  { q: "The 'Pink City' refers to which destination?", a: "Jaipur", opts: ["Jodhpur", "Jaipur", "Udaipur"] },
  { q: "Which river flows through Varanasi?", a: "Ganges", opts: ["Yamuna", "Brahmaputra", "Ganges"] },
  { q: "Where is the Gateway of India located?", a: "Mumbai", opts: ["Delhi", "Mumbai", "Chennai"] }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const GamePage = () => {
  const navigate = useNavigate();
  
  // --- NATIVE ROUTING: BROWSER BACK BUTTON SUPPORT ---
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGame = searchParams.get('play') || 'lobby';
  
  const handleGameSelect = (gameId) => {
    setSearchParams({ play: gameId });
    if (gameId === 'snakes') setSnlState('setup');
  };

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Intercept the browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      if (activeGame !== 'lobby') {
        window.history.pushState(null, "", window.location.href);
        setShowLeaveModal(true); 
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeGame]);

  const confirmLeave = (saveProgress) => {
    if (!saveProgress) {
      if (activeGame === 'crossword') { setCwLevel(0); setCwGrid({}); setCwSolved(false); localStorage.removeItem('odessey_cwLevel'); }
      if (activeGame === 'emoji') { setEmLevel(0); setEmGuess(""); setEmSolved(false); localStorage.removeItem('odessey_emLevel'); }
      if (activeGame === 'trivia') { setTrLevel(0); setSelectedOption(null); setTrSolved(false); localStorage.removeItem('odessey_trLevel'); }
      if (activeGame === 'snakes') { 
        resetSnakes(); 
        localStorage.removeItem('odessey_snl_state'); 
        localStorage.removeItem('odessey_snl_players');
        localStorage.removeItem('odessey_snl_currIdx');
        localStorage.removeItem('odessey_activeTilePos');
      }
    }
    setShowLeaveModal(false);
    setSearchParams({}); // Go back to lobby natively
  };

  // SHUFFLED ARRAYS
  const [shuffledCw, setShuffledCw] = useState([]);
  const [shuffledEm, setShuffledEm] = useState([]);
  const [shuffledTr, setShuffledTr] = useState([]);

  // PERMANENT LOCAL STORAGE WALLET
  const [totalWallet, setTotalWallet] = useState(() => parseInt(localStorage.getItem('odessey_wallet')) || 0);
  const [levelsCompleted, setLevelsCompleted] = useState(() => parseInt(localStorage.getItem('odessey_levels_cleared')) || 0);

  const triggerWin = (amount) => {
    setTotalWallet(prev => { const newT = prev + amount; localStorage.setItem('odessey_wallet', newT); return newT; });
    setLevelsCompleted(prev => { const newL = prev + 1; localStorage.setItem('odessey_levels_cleared', newL); return newL; });
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to completely reset your Arcade progress and wallet balance to zero?")) {
      localStorage.clear(); setTotalWallet(0); setLevelsCompleted(0); window.location.reload(); 
    }
  };

  const RWD_CW = 1, RWD_EM = 5, RWD_TR = 3, RWD_RO = 3, RWD_SN = 15; 

  // --- CROSSWORD STATE ---
  const [cwLevel, setCwLevel] = useState(() => parseInt(localStorage.getItem('odessey_cwLevel')) || 0);
  const [cwGrid, setCwGrid] = useState({});
  const [cwSolved, setCwSolved] = useState(false);
  const [cwError, setCwError] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const cwRefs = useRef([]);

  // --- EMOJI & TRIVIA STATE ---
  const [emLevel, setEmLevel] = useState(() => parseInt(localStorage.getItem('odessey_emLevel')) || 0);
  const [emGuess, setEmGuess] = useState("");
  const [emSolved, setEmSolved] = useState(false);
  const [emError, setEmError] = useState(false);

  const [trLevel, setTrLevel] = useState(() => parseInt(localStorage.getItem('odessey_trLevel')) || 0);
  const [trSolved, setTrSolved] = useState(false);
  const [trError, setTrError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // --- ROULETTE STATE ---
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [roGuess, setRoGuess] = useState("");
  const [roSolved, setRoSolved] = useState(false);
  const [roError, setRoError] = useState(false);

  // --- SNAKES & LADDERS STATE ---
  const playerColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const [snlState, setSnlState] = useState(() => localStorage.getItem('odessey_snl_state') || 'setup'); 
  const [numPlayersInput, setNumPlayersInput] = useState(1);
  const [snlPlayers, setSnlPlayers] = useState(() => JSON.parse(localStorage.getItem('odessey_snl_players')) || []); 
  const [currPlayerIdx, setCurrPlayerIdx] = useState(() => parseInt(localStorage.getItem('odessey_snl_currIdx')) || 0);
  const [gameLog, setGameLog] = useState("Roll the dice to start your journey!");
  const [snakeTrap, setSnakeTrap] = useState(null); 
  
  const [activeTilePos, setActiveTilePos] = useState(() => parseInt(localStorage.getItem('odessey_activeTilePos')) || 1);
  const [activeTileData, setActiveTileData] = useState({ city: "Loading...", fact: "Loading data...", img: "" });
  
  // WIKIPEDIA DATA CACHE
  const [wikiDataMap, setWikiDataMap] = useState({});

  // Save basic states to LocalStorage
  useEffect(() => { localStorage.setItem('odessey_cwLevel', cwLevel); }, [cwLevel]);
  useEffect(() => { localStorage.setItem('odessey_emLevel', emLevel); }, [emLevel]);
  useEffect(() => { localStorage.setItem('odessey_trLevel', trLevel); }, [trLevel]);
  useEffect(() => {
    localStorage.setItem('odessey_snl_state', snlState);
    localStorage.setItem('odessey_snl_players', JSON.stringify(snlPlayers));
    localStorage.setItem('odessey_snl_currIdx', currPlayerIdx);
    localStorage.setItem('odessey_activeTilePos', activeTilePos);
  }, [snlState, snlPlayers, currPlayerIdx, activeTilePos]);

  // Shuffle Data on Mount
  useEffect(() => {
    setShuffledCw([...crosswordPuzzles].sort(() => Math.random() - 0.5));
    setShuffledEm([...emojiPuzzles].sort(() => Math.random() - 0.5));
    setShuffledTr([...triviaPuzzles].sort(() => Math.random() - 0.5));
  }, []);

  // WIKIPEDIA API FETCH (Loads images and facts for the 100 destinations)
  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const chunks = [destinationNames.slice(0, 50), destinationNames.slice(50, 100)];
        let newMap = {};

        for (const chunk of chunks) {
          const titles = chunk.join('|');
          // Fetch thumbnail + extract (intro text)
          const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&titles=${encodeURIComponent(titles)}&pithumbsize=400&exintro=1&explaintext=1&exsentences=2&redirects=1&origin=*`;
          const res = await fetch(url);
          const data = await res.json();
          
          // Map exact input titles to returned titles (handling redirects)
          const titleMapping = {};
          chunk.forEach(t => titleMapping[t.toLowerCase()] = t);
          if (data.query?.normalized) data.query.normalized.forEach(n => titleMapping[n.to.toLowerCase()] = titleMapping[n.from.toLowerCase()]);
          if (data.query?.redirects) data.query.redirects.forEach(r => titleMapping[r.to.toLowerCase()] = titleMapping[r.from.toLowerCase()]);

          if (data.query?.pages) {
            Object.values(data.query.pages).forEach(page => {
              const originalTitle = titleMapping[page.title.toLowerCase()] || page.title;
              let intro = page.extract || "";
              
              // CUSTOM WIKIPEDIA CLEANER: Removes ugly IPA pronunciations and alternate spellings in brackets!
              intro = intro.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, ''); 
              
              // Split cleaned paragraph into distinct sentences to randomize facts
              let sentences = intro.match(/[^.!?]+[.!?]+/g) || [];
              sentences = sentences.map(s => s.trim()).filter(s => s.length > 25);
              
              newMap[originalTitle] = {
                img: page.thumbnail?.source || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
                facts: sentences.length > 0 ? sentences : [`Discover the incredible sights and rich culture of ${originalTitle.split(',')[0]}.`]
              };
            });
          }
        }
        
        // Safety Fallback for any missing items that Wikipedia didn't return
        destinationNames.forEach(dest => {
          if (!newMap[dest]) {
            newMap[dest] = {
              img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
              facts: [`Explore the amazing destination of ${dest.split(',')[0]}.`]
            };
          }
        });

        setWikiDataMap(newMap);
      } catch (err) {
        console.error("Wiki Fetch Error:", err);
      }
    };

    if (activeGame === 'snakes' && Object.keys(wikiDataMap).length === 0) {
      fetchWiki();
    }
  }, [activeGame, wikiDataMap]);

  // Update Side Panel Fact randomly
  const updateSidePanel = (tileNum) => {
    setActiveTilePos(tileNum);
    const destName = destinationNames[tileNum - 1];
    const tileData = wikiDataMap[destName];
    if (tileData) {
      const randomFact = tileData.facts[Math.floor(Math.random() * tileData.facts.length)];
      setActiveTileData({ city: destName.split(',')[0], fact: randomFact, img: tileData.img });
    }
  };

  // Sync side panel once Wiki data finishes loading
  useEffect(() => {
    if (Object.keys(wikiDataMap).length === 100) {
      updateSidePanel(activeTilePos);
    }
  }, [wikiDataMap]);

  // Bot Auto-Roll Logic
  useEffect(() => {
    if (snlState === 'playing' && !snakeTrap && !showLeaveModal && snlPlayers.length > 0) {
      const activePlayer = snlPlayers[currPlayerIdx];
      if (activePlayer && activePlayer.isBot) {
        const timer = setTimeout(() => {
          const roll = Math.floor(Math.random() * 6) + 1;
          let updatedPlayers = [...snlPlayers]; let curr = updatedPlayers[currPlayerIdx]; let newPos = curr.pos + roll;

          if (newPos >= snlBoardSize) {
            newPos = snlBoardSize; curr.pos = newPos; setSnlPlayers(updatedPlayers); setActiveTilePos(newPos);
            setGameLog(`🎲 ${curr.name} rolled a ${roll} and reached the destination first! You lose!`);
            setSnlState('finished'); return;
          }
          const event = snakesAndLadders[newPos];
          if (event) { setGameLog(`🎲 ${curr.name} rolled ${roll}. Landed on ${newPos}... ${event.msg}`); curr.pos = event.to; } 
          else { setGameLog(`🎲 ${curr.name} rolled a ${roll} and moved to tile ${newPos}.`); curr.pos = newPos; }

          setActiveTilePos(curr.pos); setSnlPlayers(updatedPlayers); setCurrPlayerIdx((prev) => (prev + 1) % updatedPlayers.length);
        }, 1500); 
        return () => clearTimeout(timer);
      }
    }
  }, [snlState, currPlayerIdx, snakeTrap, snlPlayers, showLeaveModal]);

  if (shuffledCw.length === 0 || shuffledEm.length === 0 || shuffledTr.length === 0) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={40} color="#16a34a" /></div>;
  }

  // --- CROSSWORD FUNCTIONS ---
  const currentCw = shuffledCw[cwLevel] || crosswordPuzzles[0]; 
  const focusCell = (r, c) => { const i = currentCw.cells.findIndex(cl => cl.r === r && cl.c === c); if (i !== -1 && cwRefs.current[i]) cwRefs.current[i].focus(); };
  const handleCwChange = (r, c, v, idx) => {
    const l = v.toUpperCase().slice(-1); setCwGrid(prev => ({ ...prev, [`${r}-${c}`]: l })); setCwError(false);
    if (l) {
      const rIdx = currentCw.cells.findIndex(cl => cl.r === r && cl.c === c + 1); const dIdx = currentCw.cells.findIndex(cl => cl.r === r + 1 && cl.c === c);
      if (rIdx !== -1) cwRefs.current[rIdx]?.focus(); else if (dIdx !== -1) cwRefs.current[dIdx]?.focus(); else if (idx < currentCw.cells.length - 1) cwRefs.current[idx + 1]?.focus(); 
    }
  };
  const handleCwKeyDown = (e, r, c, idx) => {
    if (e.key === 'Backspace' && !cwGrid[`${r}-${c}`]) {
      const lIdx = currentCw.cells.findIndex(cl => cl.r === r && cl.c === c - 1); const uIdx = currentCw.cells.findIndex(cl => cl.r === r - 1 && cl.c === c);
      if (lIdx !== -1) cwRefs.current[lIdx]?.focus(); else if (uIdx !== -1) cwRefs.current[uIdx]?.focus(); else if (idx > 0) cwRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight') focusCell(r, c + 1); else if (e.key === 'ArrowLeft') focusCell(r, c - 1);
    else if (e.key === 'ArrowDown') focusCell(r + 1, c); else if (e.key === 'ArrowUp') focusCell(r - 1, c);
  };
  const checkCw = () => {
    if (currentCw.cells.every(cl => cwGrid[`${cl.r}-${cl.c}`] === cl.a)) { if (!cwSolved) triggerWin(currentCw.wordCount * RWD_CW); setCwSolved(true); setCwError(false); } else setCwError(true);
  };
  const nextCw = () => { if (cwLevel < shuffledCw.length - 1) { setCwLevel(prev => prev + 1); setCwGrid({}); setCwSolved(false); setCwError(false); setShowHintModal(false); } };

  // --- EMOJI FUNCTIONS ---
  const currentEm = shuffledEm[emLevel] || emojiPuzzles[0];
  const checkEm = () => {
    if (emGuess.trim().toUpperCase() === currentEm.answer) { if (!emSolved) triggerWin(RWD_EM); setEmSolved(true); setEmError(false); } else setEmError(true);
  };
  const nextEm = () => { if (emLevel < shuffledEm.length - 1) { setEmLevel(prev => prev + 1); setEmGuess(""); setEmSolved(false); setEmError(false); setShowHintModal(false); } };

  // --- TRIVIA FUNCTIONS ---
  const currentTr = shuffledTr[trLevel] || triviaPuzzles[0];
  const checkTr = (option) => {
    setSelectedOption(option);
    if (option === currentTr.answer) { if (!trSolved) triggerWin(RWD_TR); setTrSolved(true); setTrError(false); } else setTrError(true);
  };
  const nextTr = () => { if (trLevel < shuffledTr.length - 1) { setTrLevel(prev => prev + 1); setSelectedOption(null); setTrSolved(false); setTrError(false); } };

  // --- ROULETTE FUNCTIONS ---
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true); setRoSolved(false); setRoError(false); setRoGuess(""); setCurrentChallenge(null);
    const targetIndex = Math.floor(Math.random() * rouletteCategories.length);
    const sliceAngle = 360 / rouletteCategories.length;
    const landAngle = 1800 + (360 - (targetIndex * sliceAngle) - (sliceAngle / 2));
    setWheelRotation(prev => prev + landAngle);
    setTimeout(() => {
      setIsSpinning(false);
      const list = rouletteChallenges.filter(c => c.type === rouletteCategories[targetIndex].name);
      setCurrentChallenge((list.length > 0 ? list : rouletteChallenges)[Math.floor(Math.random() * list.length)]);
    }, 3000); 
  };
  const checkRo = () => { if (roGuess.trim().toUpperCase() === currentChallenge?.a) { if (!roSolved) triggerWin(RWD_RO); setRoSolved(true); setRoError(false); } else setRoError(true); };

  // --- SNAKES FUNCTIONS ---
  const startSnakesGame = () => {
    let playersArr = [];
    if (numPlayersInput === 1) playersArr = [ { id: 0, name: "You", pos: 1, saves: 3, color: playerColors[0], isBot: false }, { id: 1, name: "Red Bot", pos: 1, saves: 0, color: playerColors[1], isBot: true } ];
    else for (let i = 0; i < numPlayersInput; i++) playersArr.push({ id: i, name: `Player ${i+1}`, pos: 1, saves: 3, color: playerColors[i % playerColors.length], isBot: false });
    
    setSnlPlayers(playersArr); setCurrPlayerIdx(0); setGameLog(`Game started! ${playersArr[0].name}'s turn to roll.`); setActiveTilePos(1); setSnlState('playing');
  };

  const rollDiceUser = () => {
    if (snlPlayers[currPlayerIdx]?.isBot || snlState !== 'playing') return;
    const roll = Math.floor(Math.random() * 6) + 1;
    let updatedPlayers = [...snlPlayers]; let curr = updatedPlayers[currPlayerIdx]; let newPos = curr.pos + roll;

    if (newPos >= snlBoardSize) {
      newPos = snlBoardSize; curr.pos = newPos; setSnlPlayers(updatedPlayers); setActiveTilePos(newPos);
      setGameLog(`🎲 ${curr.name} rolled a ${roll} and reached the destination! 🎉`);
      setSnlState('finished'); triggerWin(RWD_SN); return;
    }
    const event = snakesAndLadders[newPos];
    if (event) {
      if (event.type === 'snake' && curr.saves > 0) {
        setActiveTilePos(newPos);
        setSnakeTrap({ playerIdx: currPlayerIdx, from: newPos, to: event.to, qData: snakeLifelineTrivia[Math.floor(Math.random() * snakeLifelineTrivia.length)] });
        return; 
      } else { setGameLog(`🎲 ${curr.name} rolled ${roll}. Landed on ${newPos}... ${event.msg}`); curr.pos = event.to; }
    } else { setGameLog(`🎲 ${curr.name} rolled a ${roll} and moved to tile ${newPos}.`); curr.pos = newPos; }
    
    setActiveTilePos(curr.pos); setSnlPlayers(updatedPlayers); setCurrPlayerIdx((prev) => (prev + 1) % updatedPlayers.length);
  };

  const handleSnakeTrapAnswer = (isCorrect) => {
    let updatedPlayers = [...snlPlayers]; let curr = updatedPlayers[snakeTrap.playerIdx]; curr.saves -= 1; 
    if (isCorrect) { curr.pos = snakeTrap.from; setGameLog(`Great job! ${curr.name} used a save and dodged the snake!`); } 
    else { curr.pos = snakeTrap.to; setGameLog(`Incorrect! ${curr.name} fell down the snake to tile ${snakeTrap.to}.`); }
    setActiveTilePos(curr.pos); setSnlPlayers(updatedPlayers); setSnakeTrap(null); setCurrPlayerIdx((prev) => (prev + 1) % updatedPlayers.length);
  };

  const resetSnakes = () => { setSnlState('setup'); setSnlPlayers([]); setCurrPlayerIdx(0); setActiveTilePos(1); setGameLog("Roll the dice to start your journey!"); };


  // --- REUSABLE REWARD CARD ---
  const renderRewardCard = (data, totalEarned, handleNext, isLastLevel) => (
    <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '2px solid #16a34a', animation: 'fadeIn 0.6s ease-out', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ position: 'relative', height: '200px' }}>
        <img src={data?.img || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"} alt="Destination" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,0.9), transparent)' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#4ade80', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}><CheckCircle2 size={16} /> Unlocked! (+₹{totalEarned} earned)</div>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: 0 }}>{data?.city || "Awesome!"}</h2>
        </div>
      </div>
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>{data?.desc}</p>
        {data?.answersExplained && (
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '15px', marginBottom: '25px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Trivia Discovered</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.answersExplained.map((ans, idx) => (
                <div key={idx} style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.4' }}><strong style={{ color: '#0284c7' }}>{ans?.word}:</strong> {ans?.meaning}</div>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '15px', flexDirection: 'column' }}>
          {!isLastLevel ? (
            <button type="button" onClick={handleNext} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <PlayCircle size={18} /> Claim & Play Next Round
            </button>
          ) : (
            <div style={{ padding: '15px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #bbf7d0' }}>🎉 You've conquered this game!</div>
          )}
          {data?.city && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => navigate(`/place/${data.city}`)} style={{ flex: 1, padding: '14px', borderRadius: '12px', backgroundColor: 'white', color: '#16a34a', fontWeight: 'bold', fontSize: '14px', border: '2px solid #16a34a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Compass size={16} /> Explore</button>
              <button type="button" onClick={() => navigate('/plan', { state: { prefillPackage: { title: `Trip to ${data.city}`, location: data.city } } })} style={{ flex: 1.5, padding: '14px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#111827', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>Plan Trip <ArrowRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px' }}>
      
      {/* FLOATING WALLET WIDGET */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100, backgroundColor: '#16a34a', color: 'white', padding: '14px 24px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', boxShadow: '0 10px 25px rgba(22, 163, 74, 0.4)', border: '2px solid #bbf7d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}><Trophy size={18} color="#facc15" /> {levelsCompleted} Cleared</div>
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}><Coins size={18} color="#facc15" /> Wallet: ₹{totalWallet}</div>
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
        <button type="button" onClick={resetAllProgress} title="Reset Arcade Progress" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0' }}><RotateCcw size={16} /></button>
      </div>

      {/* --- LOBBY VIEW --- */}
      {activeGame === 'lobby' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '100px 20px 80px 20px', textAlign: 'center', color: 'white' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}><Gamepad2 size={18} color="#4ade80" /> The Odessey Arcade</div>
            <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>Play, Learn, and <span style={{ color: '#4ade80' }}>Earn</span></h1>
            <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>Select a game below. Every challenge you solve adds real rupees to your travel wallet for your next booking!</p>
          </div>
          <div style={{ maxWidth: '1200px', margin: '-40px auto 0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              <div onClick={() => handleGameSelect('crossword')} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #e5e7eb', textAlign: 'center' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><Sparkles size={28} color="#0284c7" /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Travel Crossword</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>Solve clues to reveal a hidden destination.</p>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>Earn ₹{RWD_CW} per word</div>
              </div>
              <div onClick={() => handleGameSelect('emoji')} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #e5e7eb', textAlign: 'center' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><Smile size={28} color="#d97706" /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Emoji Explorer</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>Can you guess the city from 4 emojis?</p>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>Earn ₹{RWD_EM} per level</div>
              </div>
              <div onClick={() => handleGameSelect('trivia')} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #e5e7eb', textAlign: 'center' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><HelpCircle size={28} color="#7e22ce" /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Wanderlust Trivia</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>Test your knowledge of incredible India.</p>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>Earn ₹{RWD_TR} per question</div>
              </div>
              <div onClick={() => handleGameSelect('roulette')} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #e5e7eb', textAlign: 'center' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><Target size={28} color="#b91c1c" /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Travel Roulette</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>Spin the wheel to get a random challenge!</p>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>Earn ₹{RWD_RO} per spin</div>
              </div>
              <div onClick={() => handleGameSelect('snakes')} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', border: '1px solid #e5e7eb', textAlign: 'center' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><Dices size={28} color="#15803d" /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Snakes & Ladders</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>Race across 100 tiles of Indian destinations.</p>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>Earn ₹{RWD_SN} per win</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- CROSSWORD VIEW --- */}
      {activeGame === 'crossword' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '60px 20px 40px 20px', color: 'white' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <button type="button" onClick={() => setShowLeaveModal(true)} style={{ background: 'none', border: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}><ChevronLeft size={16} /> Back to Arcade</button>
              <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Level {cwLevel + 1}: {currentCw?.title}</h1>
            </div>
          </div>
          <div style={{ maxWidth: '1000px', margin: '30px auto 0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${currentCw?.cols || 6}, 45px)`, gridTemplateRows: `repeat(${currentCw?.rows || 6}, 45px)`, gap: '2px', backgroundColor: '#111827', padding: '4px', borderRadius: '8px' }}>
                  {currentCw?.cells.map((cell, i) => (
                    <div key={i} style={{ gridRow: cell.r + 1, gridColumn: cell.c + 1, position: 'relative', backgroundColor: cwSolved ? '#dcfce7' : 'white' }}>
                      {cell.n && <span style={{ position: 'absolute', top: '2px', left: '4px', fontSize: '10px', fontWeight: 'bold', color: '#374151', zIndex: 5 }}>{cell.n}</span>}
                      <input ref={el => cwRefs.current[i] = el} type="text" maxLength={1} value={cwGrid[`${cell.r}-${cell.c}`] || ''} onChange={(e) => handleCwChange(cell.r, cell.c, e.target.value, i)} onKeyDown={(e) => handleCwKeyDown(e, cell.r, cell.c, i)} disabled={cwSolved} style={{ width: '100%', height: '100%', border: 'none', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', outline: 'none', backgroundColor: 'transparent', color: cwSolved ? '#166534' : '#111827', padding: 0 }}/>
                    </div>
                  ))}
                </div>
                {!cwSolved && (
                  <div style={{ marginTop: '40px', display: 'flex', gap: '15px', width: '100%', maxWidth: '350px' }}>
                    <button type="button" onClick={checkCw} style={{ flex: 1, padding: '14px', borderRadius: '12px', backgroundColor: '#0284c7', color: 'white', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer' }}>Check Answers</button>
                    <button type="button" onClick={() => setShowHintModal(true)} style={{ padding: '14px 20px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#a16207', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}><Lightbulb size={20} /></button>
                  </div>
                )}
                {cwError && !cwSolved && <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: 'bold', marginTop: '15px' }}>Keep trying!</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {!cwSolved ? (
                  <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e5e7eb', flex: 1 }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '25px', borderBottom: '2px solid #f3f4f6', paddingBottom: '10px' }}>Puzzle Clues</h3>
                    <div style={{ marginBottom: '30px' }}><h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7', marginBottom: '15px' }}>ACROSS</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '15px', lineHeight: '1.8' }}>{currentCw?.clues.across.map((clue, idx) => <li key={idx}><strong>{clue.n}.</strong> {clue.text}</li>)}</ul></div>
                    <div><h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7', marginBottom: '15px' }}>DOWN</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '15px', lineHeight: '1.8' }}>{currentCw?.clues.down.map((clue, idx) => <li key={idx}><strong>{clue.n}.</strong> {clue.text}</li>)}</ul></div>
                  </div>
                ) : renderRewardCard(currentCw, (currentCw?.wordCount || 0) * RWD_CW, nextCw, cwLevel >= shuffledCw.length - 1)}
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- EMOJI VIEW --- */}
      {activeGame === 'emoji' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '60px 20px 40px 20px', color: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <button type="button" onClick={() => setShowLeaveModal(true)} style={{ background: 'none', border: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}><ChevronLeft size={16} /> Back to Arcade</button>
              <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Level {emLevel + 1}: Emoji Explorer</h1>
            </div>
          </div>
          <div style={{ maxWidth: '800px', margin: '40px auto 0 auto', padding: '0 20px' }}>
            {!emSolved ? (
              <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '64px', letterSpacing: '20px', marginBottom: '40px' }}>{currentEm?.emojis}</div>
                <input type="text" placeholder="Type city or state..." value={emGuess} onChange={(e) => {setEmGuess(e.target.value); setEmError(false);}} style={{ width: '100%', maxWidth: '400px', padding: '18px 24px', borderRadius: '50px', border: emError ? '2px solid #ef4444' : '2px solid #e5e7eb', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', outline: 'none', marginBottom: '20px' }} />
                <br/>
                <button type="button" onClick={checkEm} style={{ padding: '16px 40px', borderRadius: '50px', backgroundColor: '#d97706', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer' }}>Submit Guess</button>
                <div style={{ marginTop: '20px' }}><button type="button" onClick={() => setShowHintModal(true)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}>Need a hint?</button></div>
              </div>
            ) : renderRewardCard(currentEm, RWD_EM, nextEm, emLevel >= shuffledEm.length - 1)}
          </div>
        </>
      )}

      {/* --- TRIVIA VIEW --- */}
      {activeGame === 'trivia' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '60px 20px 40px 20px', color: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <button type="button" onClick={() => setShowLeaveModal(true)} style={{ background: 'none', border: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}><ChevronLeft size={16} /> Back to Arcade</button>
              <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Question {trLevel + 1}</h1>
            </div>
          </div>
          <div style={{ maxWidth: '800px', margin: '40px auto 0 auto', padding: '0 20px' }}>
            {!trSolved ? (
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px', lineHeight: '1.5', textAlign: 'center' }}>"{currentTr?.question}"</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  {currentTr?.options.map(opt => (
                    <button type="button" key={opt} onClick={() => checkTr(opt)} style={{ padding: '20px', borderRadius: '16px', border: selectedOption === opt && trError ? '2px solid #ef4444' : '2px solid #e5e7eb', backgroundColor: selectedOption === opt && trError ? '#fef2f2' : 'white', fontSize: '16px', fontWeight: '600', color: '#374151', cursor: 'pointer', textAlign: 'left' }}>{opt}</button>
                  ))}
                </div>
                {trError && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>Incorrect, try again!</p>}
              </div>
            ) : renderRewardCard(currentTr, RWD_TR, nextTr, trLevel >= shuffledTr.length - 1)}
          </div>
        </>
      )}

      {/* --- ROULETTE VIEW --- */}
      {activeGame === 'roulette' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '60px 20px 40px 20px', color: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <button type="button" onClick={() => setShowLeaveModal(true)} style={{ background: 'none', border: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}><ChevronLeft size={16} /> Back to Arcade</button>
              <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Travel Roulette</h1>
            </div>
          </div>
          <div style={{ maxWidth: '800px', margin: '40px auto 0 auto', padding: '0 20px' }}>
            {!currentChallenge ? (
              <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 40px auto' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '6px solid #111827', background: `conic-gradient(${rouletteCategories.map((c, i) => `${c.color} ${i * (360/rouletteCategories.length)}deg ${(i+1) * (360/rouletteCategories.length)}deg`).join(', ')})`, transform: `rotate(${wheelRotation}deg)`, transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', position: 'relative' }}>
                    {rouletteCategories.map((c, i) => {
                      const sliceAngle = 360 / rouletteCategories.length;
                      const rotation = -90 + (i * sliceAngle) + (sliceAngle / 2);
                      return (
                        <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: '45%', transform: `translate(0, -50%) rotate(${rotation}deg)`, transformOrigin: '0% 50%', textAlign: 'right', color: 'white', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0px 1px 3px rgba(0,0,0,0.8)', zIndex: 5, paddingRight: '15px' }}>{c.name}</div>
                      );
                    })}
                  </div>
                  <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '30px solid #111827', zIndex: 10 }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', backgroundColor: '#111827', borderRadius: '50%', border: '4px solid white', zIndex: 10 }}></div>
                </div>
                <button type="button" onClick={spinWheel} disabled={isSpinning} style={{ padding: '16px 50px', borderRadius: '50px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', fontSize: '20px', border: 'none', cursor: isSpinning ? 'not-allowed' : 'pointer' }}>{isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}</button>
              </div>
            ) : !roSolved ? (
              <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{currentChallenge.type} Challenge</span>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0 30px 0', lineHeight: '1.5' }}>"{currentChallenge.q}"</h2>
                <input type="text" placeholder="Your answer..." value={roGuess} onChange={(e) => {setRoGuess(e.target.value); setRoError(false);}} style={{ width: '100%', maxWidth: '400px', padding: '18px 24px', borderRadius: '50px', border: roError ? '2px solid #ef4444' : '2px solid #e5e7eb', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', outline: 'none', marginBottom: '20px' }} />
                <br/>
                <button type="button" onClick={checkRo} style={{ padding: '16px 40px', borderRadius: '50px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer' }}>Submit Answer</button>
              </div>
            ) : renderRewardCard({ desc: "You nailed the Roulette challenge!", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80", city: currentChallenge.city }, RWD_RO, () => setCurrentChallenge(null), false)}
          </div>
        </>
      )}

      {/* --- SNAKES & LADDERS VIEW (100 TILES) --- */}
      {activeGame === 'snakes' && (
        <>
          <div style={{ backgroundColor: '#111827', padding: '40px 20px 20px 20px', color: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <button type="button" onClick={() => setShowLeaveModal(true)} style={{ background: 'none', border: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}><ChevronLeft size={16} /> Back to Arcade</button>
              <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '5px' }}>Snakes & Ladders: Grand India Tour</h1>
            </div>
          </div>
          
          <div style={{ maxWidth: '1200px', margin: '20px auto 0 auto', padding: '0 20px' }}>
            
            {snlState === 'setup' && (
              <div style={{ backgroundColor: 'white', padding: '60px 40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e5e7eb', maxWidth: '600px', margin: '0 auto' }}>
                <Users size={60} color="#16a34a" style={{ margin: '0 auto 20px auto' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>How many players?</h2>
                <p style={{ color: '#6b7280', marginBottom: '30px' }}>Select 1 to play against the AI Bot, or up to 6 for local multiplayer with friends.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
                  {[1,2,3,4,5,6].map(num => (
                    <button type="button" key={num} onClick={() => setNumPlayersInput(num)} style={{ width: '50px', height: '50px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', border: numPlayersInput === num ? '2px solid #16a34a' : '2px solid #e5e7eb', backgroundColor: numPlayersInput === num ? '#f0fdf4' : 'white', color: numPlayersInput === num ? '#16a34a' : '#4b5563', cursor: 'pointer', transition: 'all 0.2s' }}>{num}</button>
                  ))}
                </div>
                <button type="button" onClick={startSnakesGame} style={{ padding: '16px 50px', borderRadius: '50px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(22, 163, 74, 0.2)' }}>Start Journey</button>
              </div>
            )}

            {snlState === 'playing' && (
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 900 ? '1fr' : '2.5fr 1fr', gap: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '24px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(45px, 1fr))', gap: '5px', minWidth: '500px' }}>
                    {snlBoardLayout.map(sq => {
                      const hasSnake = snakesAndLadders[sq]?.type === 'snake';
                      const hasLadder = snakesAndLadders[sq]?.type === 'ladder';
                      
                      const destName = destinationNames[sq - 1];
                      const tileData = wikiDataMap[destName] || { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80" };

                      return (
                        <div key={sq} style={{ height: '55px', borderRadius: '8px', backgroundImage: `url(${tileData.img})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #cbd5e1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
                          <span style={{ position: 'absolute', top: '2px', left: '4px', fontSize: '11px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', zIndex: 2 }}>{sq}</span>
                          {hasSnake && <span style={{ fontSize: '20px', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>🐍</span>}
                          {hasLadder && <span style={{ fontSize: '20px', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>🪜</span>}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center', position: 'absolute', bottom: '3px', width: '100%', padding: '0 4px', zIndex: 3 }}>
                            {snlPlayers.map(p => p.pos === sq && <div key={p.id} style={{ width: '14px', height: '14px', backgroundColor: p.color, borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.8)' }} title={p.name} />)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: snlPlayers[currPlayerIdx]?.color, borderRadius: '50%' }} />
                      {snlPlayers[currPlayerIdx]?.name}'s Turn
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', minHeight: '40px' }}>{gameLog}</p>
                    <button type="button" onClick={rollDiceUser} disabled={snlPlayers[currPlayerIdx]?.isBot || snakeTrap !== null} style={{ padding: '14px 40px', borderRadius: '50px', backgroundColor: (snlPlayers[currPlayerIdx]?.isBot || snakeTrap) ? '#e5e7eb' : '#16a34a', color: (snlPlayers[currPlayerIdx]?.isBot || snakeTrap) ? '#9ca3af' : 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: (snlPlayers[currPlayerIdx]?.isBot || snakeTrap) ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Dices size={20}/> {snlPlayers[currPlayerIdx]?.isBot ? 'Bot is rolling...' : 'Roll Dice'}</button>
                  </div>
                  
                  {/* WIKIPEDIA FACT PANEL */}
                  <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '24px', border: '1px solid #bbf7d0', flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}><MapPin size={14} /> Tile {snlPlayers[currPlayerIdx]?.pos || 1} Discovered</div>
                    
                    <img src={wikiDataMap[destinationNames[(snlPlayers[currPlayerIdx]?.pos || 1) - 1]]?.img || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80"} alt="Location" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>{destinationNames[(snlPlayers[currPlayerIdx]?.pos || 1) - 1]}</h3>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6' }}>{wikiDataMap[destinationNames[(snlPlayers[currPlayerIdx]?.pos || 1) - 1]]?.fact || "Loading amazing Wikipedia facts..."}</p>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>Standings</h4>
                    {snlPlayers.map(p => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}><div style={{ width: '12px', height: '12px', backgroundColor: p.color, borderRadius: '50%' }} /> {p.name}</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>Tile {p.pos} {p.saves > 0 && `• ${p.saves} Saves`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {snlState === 'finished' && (
              renderRewardCard({ desc: "The journey is over! Someone reached the destination.", img: "https://images.unsplash.com/photo-1544551763-46a8723ba3f9?auto=format&fit=crop&w=800&q=80" }, RWD_SN, resetSnakes, false)
            )}
          </div>
        </>
      )}

      {/* --- SNAKE TRAP MODAL --- */}
      {snakeTrap && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ width: '70px', height: '70px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}><ShieldAlert size={36} color="#ef4444" /></div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '10px' }}>Snake Attack!</h3>
            <p style={{ color: '#4b5563', fontSize: '15px', marginBottom: '25px', lineHeight: '1.6' }}>
              {snlPlayers[snakeTrap.playerIdx]?.name} landed on a snake. You can spend 1 Lifeline to answer this question. If you get it right, you won't fall down!
            </p>
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '16px', marginBottom: '25px', border: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>"{snakeTrap.qData.q}"</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {snakeTrap.qData.opts.map(opt => (
                  <button type="button" key={opt} onClick={() => handleSnakeTrapAnswer(opt === snakeTrap.qData.a)} style={{ padding: '12px', borderRadius: '10px', border: '2px solid #cbd5e1', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'border 0.2s' }} onMouseEnter={e=>e.currentTarget.style.borderColor='#16a34a'} onMouseLeave={e=>e.currentTarget.style.borderColor='#cbd5e1'}>{opt}</button>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => handleSnakeTrapAnswer(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>Skip and accept fate (Fall to {snakeTrap.to})</button>
          </div>
        </div>
      )}

      {/* --- LEAVE GAME CONFIRMATION MODAL --- */}
      {showLeaveModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}><Save size={30} color="#0284c7" /></div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>Leaving Game</h3>
            <p style={{ color: '#4b5563', fontSize: '15px', marginBottom: '25px', lineHeight: '1.6' }}>Would you like to securely save your progress, or discard it to start this game fresh next time?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button type="button" onClick={() => confirmLeave(true)} style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer' }}>Save & Return to Lobby</button>
              <button type="button" onClick={() => confirmLeave(false)} style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#ef4444', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer' }}>Discard Progress & Return</button>
              <button type="button" onClick={() => { setShowLeaveModal(false); window.history.pushState(null, "", window.location.href); }} style={{ padding: '10px', background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- HINT MODAL (Shared) --- */}
      {showHintModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease-out' }}>
            <button type="button" onClick={() => setShowHintModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={24} /></button>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}><Lightbulb size={30} color="#d97706" /></div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>Need a Hint?</h3>
            <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
              {activeGame === 'crossword' ? currentCw?.hintText : activeGame === 'emoji' ? currentEm?.hint : ''}
            </p>
            <button type="button" onClick={() => setShowHintModal(false)} style={{ padding: '12px 30px', borderRadius: '50px', backgroundColor: '#0284c7', color: 'white', fontWeight: 'bold', fontSize: '15px', border: 'none', cursor: 'pointer' }}>Got it!</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GamePage;