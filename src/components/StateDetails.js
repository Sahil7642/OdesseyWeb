/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hooks to read URL and navigate
import { State } from 'country-state-city';
import { ArrowLeft, MapPin } from 'lucide-react';

const StateDetails = () => {
  const { stateCode } = useParams(); // Get "GA" from the URL
  const navigate = useNavigate();
  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    // Find the specific state using the library
    const state = State.getStateByCodeAndCountry(stateCode, 'IN');
    setStateData(state);
  }, [stateCode]);

  if (!stateData) return <div className="p-10 text-center">Loading state details...</div>;

  // Mock data for "Places to Explore" (Since we don't have a real database yet)
  const places = [
    { name: "City Center Heritage", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80" },
    { name: "National Park Safari", img: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?auto=format&fit=crop&w=500&q=80" },
    { name: "Ancient Temple", img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=500&q=80" },
    { name: "Sunset Viewpoint", img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=500&q=80" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Header Image Banner *}
      <div className="relative h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80" 
          alt={stateData.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">{stateData.name}</h1>
          <p className="text-xl opacity-90">Explore the beauty of India</p>
        </div>
        
        {/* Back Button *}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-24 left-10 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 2. Description Section *}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About {stateData.name}</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          Welcome to {stateData.name}, a region known for its rich cultural heritage and stunning landscapes. 
          Whether you are looking for spiritual peace, adventure in the wild, or a quiet retreat in nature, 
          {stateData.name} offers a sustainable travel experience like no other.
        </p>

        {/* 3. Places to Visit Grid *}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <MapPin className="mr-2 text-green-600" /> 
          Top Places to Visit in {stateData.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img 
                  src={place.img} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800">{place.name}</h4>
                <p className="text-sm text-green-600 font-medium mt-1">View Details →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StateDetails;
*/

/*
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from 'country-state-city';
import { ArrowLeft, MapPin } from 'lucide-react';

// --- 1. THE DATA DATABASE ---
// We map the State Name (from the library) to your custom text.
const stateDescriptions = {
  "Andhra Pradesh": {
    desc: "Andhra Pradesh on India’s southeastern coast is often called the “Koh-i-Noor of India” for its wealth of natural and cultural attractions. The state’s landscape ranges from Bay of Bengal beaches to the misty hills of the Eastern Ghats, with tribal villages and coffee plantations nestled in the highlands. It has a rich heritage – remnants of 3rd‑century BCE Buddhist monuments at Amaravati speak to an ancient past.",
    places: [
      { name: "Tirumala Venkateswara Temple", detail: "Hilltop Vaishnavite shrine, one of the world’s richest and most-visited Hindu temples." },
      { name: "Araku Valley", detail: "Scenic Eastern Ghats hill station known for lush coffee estates, waterfalls and tribal culture." },
      { name: "Ancient Stupa of Amaravati", detail: "Ruins of a grand 3rd‑century BCE Buddhist stupa and university, emblematic of Andhra’s ancient Buddhist heritage." }
    ]
  },
  "Arunachal Pradesh": {
    desc: "Arunachal Pradesh (“Land of the Dawn-Lit Mountains”) is India’s far-northeast Himalayan state. Remote and mountainous, it is India’s least densely populated state, home to over 20 tribal peoples with distinct traditions. The state’s culture blends Buddhist, Hindu and animist influences.",
    places: [
      { name: "Tawang Monastery", detail: "Vast 17th‑century Tibetan Buddhist monastery (one of India’s largest) with spectacular mountain views." },
      { name: "Ziro Valley", detail: "Picturesque terraced valley famous for the Apatani tribal villages and an annual outdoor music festival." },
      { name: "Namdapha National Park", detail: "Biodiverse park in the eastern Himalaya, with rainforests, clouded leopards and the only tropical lowland evergreen forest in India." }
    ]
  },
  "Assam": {
    desc: "Assam spans the Brahmaputra valley in India’s northeast, famous for tea gardens and rich wildlife. The broad Brahmaputra River defines its fertile plains. Assam produces world-renowned black tea and silk, and it shelters two-thirds of the world’s one-horned rhinos.",
    places: [
      { name: "Kaziranga National Park", detail: "UNESCO World Heritage park famed for two-thirds of the world’s one-horned Indian rhinoceroses." },
      { name: "Majuli Island", detail: "World’s largest river island on the Brahmaputra, renowned for Assamese Vaishnavite Satras (monasteries) and tribal arts." },
      { name: "Kamakhya Temple", detail: "Ancient hilltop shrine to Goddess Kamakhya, a preeminent Shakti (Tantric) pilgrimage site." }
    ]
  },
  "Bihar": {
    desc: "Bihar in eastern India is a cradle of ancient history and religion. Its plains were the core of the Magadha Empire and the Mauryan-Gupta golden age. Bodh Gaya is the holiest Buddhist pilgrimage site, where Siddhartha Gautama attained enlightenment under the Bodhi Tree.",
    places: [
      { name: "Mahabodhi Temple", detail: "5th-century UNESCO-listed Buddhist shrine marking the Buddha’s enlightenment under the Bodhi tree." },
      { name: "Nalanda Ruins", detail: "Archaeological remains of a great 5th-century Buddhist university and monastery complex." },
      { name: "Rajgir", detail: "Ancient Magadha capital; features hot springs, Son Bhandar rock caves and historic Bihar Jain and Buddhist sites." }
    ]
  },
  "Chhattisgarh": {
    desc: "Chhattisgarh, in central India, is often called the “Sea of Green” for its extensive forests. It has a strong tribal identity and many waterfalls and caves. Bastar’s Chitrakote Falls (“Niagara of India”) is a dramatic horseshoe waterfall on the Indravati River.",
    places: [
      { name: "Chitrakote Falls", detail: "Horseshoe-shaped cascade (the widest waterfall in India) on the Indravati River." },
      { name: "Danteshwari Temple", detail: "Ancient Shakti shrine to Goddess Danteshwari, one of India’s 52 sacred Shakti Peethas." },
      { name: "Bhoramdeo Temple", detail: "11th-century Hindu temple noted for intricate erotic stone carvings, often compared to Khajuraho." },
      { name: "Kanger Valley National Park", detail: "Lush tropical park with Tirathgarh Falls and limestone caves." }
    ]
  },
  "Goa": {
    desc: "Goa, on India’s southwest coast, blends tropical beaches with a unique Indo-Portuguese heritage. It was a Portuguese colony for about 450 years, and today pastel-colored churches and fish curries reflect that legacy. Goa’s sandy shores and coconut groves make it a top beach destination.",
    places: [
      { name: "Basilica of Bom Jesus", detail: "16th-century Baroque church holding the tomb of St. Francis Xavier (UNESCO World Heritage site)." },
      { name: "Anjuna Beach", detail: "Lively beach known for its flea market, beach parties and water sports." },
      { name: "Dudhsagar Falls", detail: "Spectacular four-tiered waterfall in Bhagwan Mahavir Wildlife Sanctuary, surrounded by jungles." }
    ]
  },
  "Gujarat": {
    desc: "Gujarat, on India’s west coast, has India’s longest coastline and a storied trade history. It was home to ancient Indus Valley cities and celebrates vibrant folk traditions. The Kutch Salt Desert has ethereal white sands, and Gir Wildlife Sanctuary protects the world’s only wild Asiatic lions.",
    places: [
      { name: "Gir National Park", detail: "UNESCO-protected forest sanctuary, the sole habitat of India’s rare Asiatic lions." },
      { name: "Dholavira", detail: "Archaeological site of a major Harappan (Indus Valley) city (open-air ruins of granaries, reservoirs)." },
      { name: "Somnath Temple", detail: "Historic 12th-c. Shiva temple, one of India’s twelve Jyotirlinga shrines." },
      { name: "Rann of Kutch", detail: "Vast white salt desert, famous for the annual Rann Utsav festival under the full moon." }
    ]
  },
  "Haryana": {
    desc: "Haryana, in north India around Delhi, combines fertile plains with deep historical roots. It lies over the Sarasvati River basin and is mentioned in the Mahabharata. Today, Haryana’s villages celebrate lively Punjabi-Haryanvi folk culture.",
    places: [
      { name: "Kurukshetra", detail: "Legendary Mahabharata war site; features sacred lakes (Brahma Sarovar) and historic temples." },
      { name: "Pinjore Gardens", detail: "17th-century terraced Mughal garden near Chandigarh." },
      { name: "Rakhigarhi", detail: "Site of one of the largest Indus Valley (Harappan) cities, with an archaeology museum." }
    ]
  },
  "Himachal Pradesh": {
    desc: "Himachal Pradesh (“Snow-laden province”) is a Himalayan state of pine-clad mountains and hill resorts. Over two-thirds of the land is forested, studded with apple orchards and rhododendron blooms. The state is famed for trekking and wildlife.",
    places: [
      { name: "Shimla", detail: "Colonial-era mountain city (The Ridge, Viceregal Lodge) known for its mall road and panoramic views." },
      { name: "Manali", detail: "High-altitude resort town in Kullu Valley, gateway to Rohtang Pass and Lahaul-Spiti." },
      { name: "Dharamshala", detail: "Hill station complex that is the Tibetan diaspora center (home of the Dalai Lama)." },
      { name: "Great Himalayan National Park", detail: "UNESCO World Heritage park protecting pristine alpine ecosystems and wildlife." }
    ]
  },
  "Jharkhand": {
    desc: "Jharkhand is a plateau of forests, rivers and waterfalls. It is rich in mineral resources and tribal culture. The capital Ranchi has scenic surrounds and the Hundru and Dassam waterfalls. A major pilgrimage is at Deoghar’s Baba Baidyanath Temple.",
    places: [
      { name: "Baba Baidyanath Temple", detail: "One of India’s 12 Jyotirlinga temples (ancient Shiva shrine)." },
      { name: "Dassam Falls", detail: "Broad, multi-tiered waterfall on the Kanchi River, set in forested hills." },
      { name: "Palamu Tiger Reserve", detail: "Woodland park in the Chotanagpur plateau home to Bengal tigers and leopards." }
    ]
  },
  "Karnataka": {
    desc: "Karnataka in southern India offers a blend of tech cities and heritage sites. Its history ranges from ancient empires to modern innovation. The ruins of Vijayanagara at Hampi are famed for huge carved temples and palaces. The lush Western Ghats run along its west.",
    places: [
      { name: "Hampi", detail: "UNESCO World Heritage ruins of the 14th‑century Vijayanagara Empire (stone temples, royal pavilions)." },
      { name: "Mysore Palace", detail: "Lavishly decorated summer palace of the Wodeyar dynasty, illuminated at night." },
      { name: "Coorg", detail: "Misty hill region famous for coffee plantations, waterfalls (Iruppu) and Kodava culture." },
      { name: "Jog Falls", detail: "One of India’s highest plunge waterfalls, dropping dramatically from the Western Ghats." }
    ]
  },
  "Kerala": {
    desc: "Kerala, on India’s tropical Malabar coast, is renowned for its serene backwaters, palm beaches and Ayurvedic culture. Coconut groves, spice farms and tea hills paint its landscape. Its network of lakes, canals and the Vembanad Lake can be explored by traditional houseboat.",
    places: [
      { name: "Alleppey", detail: "Hub of the Kerala backwaters; famous for houseboat cruises on the Vembanad lagoon." },
      { name: "Munnar", detail: "Hill station set among vast tea gardens and shola forests." },
      { name: "Kochi", detail: "Historic coastal city (Fort Kochi) with a blend of Indian, Portuguese and Dutch architecture." },
      { name: "Periyar Wildlife Sanctuary", detail: "Protected area for elephants and tigers in the Western Ghats." }
    ]
  },
  "Madhya Pradesh": {
    desc: "Madhya Pradesh, in India’s heartland, has more UNESCO sites than any other state. Its terrain includes the Vindhya hills and Narmada valley. Medieval capitals have stunning forts and cenotaphs. It is also home to famous tiger reserves.",
    places: [
      { name: "Khajuraho Group of Monuments", detail: "10th-century Chandela-era temples known for their intricate erotic sculptures (UNESCO site)." },
      { name: "Sanchi Stupa", detail: "3rd-century BCE Buddhist stupa built by Emperor Ashoka (UNESCO World Heritage site)." },
      { name: "Bandhavgarh National Park", detail: "Tiger reserve with dense Sal forests and a hilltop fort." },
      { name: "Gwalior Fort", detail: "Massive hilltop fortress with palaces and temples, overlooking the city." }
    ]
  },
  "Maharashtra": {
    desc: "Maharashtra, on India’s western coast, stretches from the Arabian Sea to central India. It is famed for its UNESCO cave temples: Ajanta and Ellora, with ancient Buddhist, Hindu and Jain carvings. Hill stations dot the Sahyadri range, and forts of Shivaji’s Maratha Empire overlook lush valleys.",
    places: [
      { name: "Ajanta Caves", detail: "30 rock-cut Buddhist cave monuments (2nd century BCE – 5th century CE), adorned with murals (UNESCO site)." },
      { name: "Ellora Caves", detail: "34 multi-religious rock-cut temples (6th–10th c.) including the colossal Kailasa temple (UNESCO site)." },
      { name: "Gateway of India", detail: "Iconic 20th-century arch overlooking the Arabian Sea." },
      { name: "Shirdi Sai Baba Temple", detail: "Pilgrimage shrine of the 19th-c. saint Sai Baba, attracting devotees nationwide." }
    ]
  },
  "Manipur": {
    desc: "Manipur, nestled in the eastern Himalayas, is renowned for its classical Manipuri dance and polo heritage. Imphal (capital) sits near Loktak Lake – Northeast India’s largest freshwater lake, famous for its floating vegetation.",
    places: [
      { name: "Loktak Lake", detail: "Largest freshwater lake in NE India, known for floating phumdis and Sangai deer habitat." },
      { name: "Kangla Fort", detail: "Historic palace complex of Manipur’s kings, considered the cradle of Meitei civilization." },
      { name: "Imphal", detail: "Capital city with attractions like the Shri Govindaji Temple and Keibul Lamjao National Park on its doorstep." }
    ]
  },
  "Meghalaya": {
    desc: "Meghalaya, literally the “Abode of Clouds,” is famous for its lush subtropical forests and heavy monsoon rains. Its Khasi, Jaintia and Garo tribal cultures add to its uniqueness. Cherrapunji and Mawsynram receive some of the world’s highest rainfall.",
    places: [
      { name: "Cherrapunji", detail: "Perennially rainy town; see Nohkalikai Falls (India’s tallest plunge waterfall) and the living root bridges." },
      { name: "Dawki", detail: "Village on the India–Bangladesh border with the crystal-clear Umngot River." },
      { name: "Mawsmai Caves", detail: "Limestone cave network with impressive stalactite formations." }
    ]
  },
  "Mizoram": {
    desc: "Mizoram, in India’s far northeast, is a green, hilly state blanketed by bamboo and pine. The predominantly Christian Mizo people are known for dances like Cheraw (bamboo dance). Aizawl, the capital, is perched on a ridge with mountain views.",
    places: [
      { name: "Aizawl", detail: "Hilltop capital city known for its bazaars (Bara Bazar) and viewpoints (Hmuifang)." },
      { name: "Palak Lake", detail: "Picturesque lake set amid reedlands, ideal for boating and birdwatching." },
      { name: "Dampa Tiger Reserve", detail: "Thick evergreen forest sanctuary near Mizoram–Myanmar border, habitat for elephants and big cats." }
    ]
  },
  "Nagaland": {
    desc: "Nagaland is known for its vibrant tribal heritage and misty mountains. The 16 Naga tribes celebrate colorful festivals (Hornbill Festival) with dance and headgear. Kohima, the capital, holds a somber WWII Battle of Kohima Cemetery on a hill.",
    places: [
      { name: "Kohima War Cemetery", detail: "Memorial to soldiers of the 1944 Battle of Kohima, located on a scenic hilltop." },
      { name: "Khonoma Village", detail: "Historic Angami Naga village known for community conservation and scenic vistas." },
      { name: "Dzukou Valley", detail: "Serene high-altitude valley, famous for its flowers and as a trekking destination." }
    ]
  },
  "Odisha": {
    desc: "Odisha (formerly Orissa), on India’s eastern coast, is famed for its classical arts and temples. Bhubaneswar, the “City of Temples,” has hundreds of ancient shrines. The 13th-century Konark Sun Temple is sculpted like a giant stone chariot of the Sun God.",
    places: [
      { name: "Sun Temple", detail: "13th-century UNESCO-listed stone temple fashioned as a colossal chariot (Sun God’s temple)." },
      { name: "Jagannath Temple", detail: "12th-century temple of Lord Jagannath; site of the annual Rath Yatra (chariot festival)." },
      { name: "Chilika Lake", detail: "Vast coastal lagoon (over 1,100 km²) with flamingos and Irrawaddy dolphins; ideal for birdwatching." }
    ]
  },
  "Punjab": {
    desc: "Punjab, in northwestern India, is India’s “Land of Five Rivers” – a fertile agricultural state. It is the cradle of Sikhism. The Golden Temple in Amritsar is Sikhism’s holiest shrine. Punjab’s culture is exuberant, with harvest festivals and warrior-themed celebrations.",
    places: [
      { name: "Golden Temple", detail: "Sikhism’s holiest gurudwara; a gilded 16th-century shrine and pilgrims’ spiritual center." },
      { name: "Wagah Border", detail: "India–Pakistan border crossing famous for its daily flag-lowering ceremony with military pageantry." },
      { name: "Anandpur Sahib", detail: "Historic Sikh city; site of the Hola Mohalla festival and important gurdwaras." }
    ]
  },
  "Rajasthan": {
    desc: "Rajasthan, India’s largest state, is the desert land of royal forts, palaces and folk culture. The pink lanes of Jaipur, the blue houses of Jodhpur and the golden sandstone city of Jaisalmer capture its romance. Rural Rajasthan still celebrates folk music and dance.",
    places: [
      { name: "Amber Fort", detail: "Majestic hilltop fort and palace complex (UNESCO World Heritage, part of Rajasthan’s hill forts)." },
      { name: "Jaisalmer Fort", detail: "Living sandstone fort in the Thar Desert, housing shops, temples and guests." },
      { name: "Lake Palace", detail: "Opulent island palace on Lake Pichola, now a luxury hotel." },
      { name: "Pushkar", detail: "Ancient town with one of the few Brahma temples; famous for its annual camel and livestock fair." }
    ]
  },
  "Sikkim": {
    desc: "Sikkim, high in the eastern Himalayas, is India’s least populous state. It is a sanctuary of snow-capped peaks, Buddhist monasteries and alpine lakes. Mount Kanchenjunga (8586 m), the world’s third-highest peak, dominates its northern sky.",
    places: [
      { name: "Rumtek Monastery", detail: "Prominent 20th-century monastery of the Karma Kagyu lineage of Tibetan Buddhism." },
      { name: "Khangchendzonga National Park", detail: "High-altitude UNESCO biosphere park surrounding Mt. Kanchenjunga." },
      { name: "Tsomgo Lake", detail: "High-altitude glacial lake (Sikkim’s sacred lake), frozen in winter and emerald-blue in summer." }
    ]
  },
  "Tamil Nadu": {
    desc: "Tamil Nadu in southern India is famed for its Dravidian temple architecture and classical arts. The Great Living Chola Temples are 11th-century UNESCO World Heritage marvels. Cultural richness includes Bharatanatyam dance and Carnatic music.",
    places: [
      { name: "Brihadeeswara Temple", detail: "Immense 11th-century Chola Shiva temple (UNESCO Great Living Chola Temple)." },
      { name: "Meenakshi Amman Temple", detail: "Vast temple complex with towering gateway towers (gopurams) richly covered in sculpture." },
      { name: "Mahabalipuram Group", detail: "UNESCO site of 7th–8th-century Pallava rock-cut temples and monoliths on the Coromandel Coast." },
      { name: "Ooty", detail: "Popular hill station known for tea gardens, botanical gardens and scenic train rides." }
    ]
  },
  "Telangana": {
    desc: "Telangana is India’s newest state, centered on Hyderabad. Hyderabad blends royal history with modern IT. Its landmark is the Charminar. Nearby, Golconda Fort was a diamond-trade citadel of the Qutb Shahi sultans. Telangana’s culture features Telugu traditions and festivals.",
    places: [
      { name: "Charminar", detail: "Iconic 16th-century mosque/monument with four arches, symbol of old Hyderabad." },
      { name: "Golconda Fort", detail: "Grand 16th-century fortress and former capital of the Qutb Shahi dynasty." },
      { name: "Nagarjuna Sagar Dam", detail: "One of India’s largest masonry dams (also a bird sanctuary on the reservoir)." },
      { name: "Kaleshwaram Temple", detail: "New Shiva temple at the confluence of the Godavari and Pranhita rivers, major pilgrimage site." }
    ]
  },
  // --- UNION TERRITORIES ---
  "Andaman and Nicobar Islands": {
    desc: "The Andaman & Nicobar Islands are a tropical archipelago in the Bay of Bengal, famed for pristine beaches, turquoise waters and coral reefs. The islands’ forests are home to unique wildlife and indigenous tribes.",
    places: [
      { name: "Cellular Jail", detail: "Colonial-era prison (British penal colony), now a national memorial museum." },
      { name: "Radhanagar Beach", detail: "Powdery white-sand beach beside clear blue waters, consistently rated among Asia’s best." },
      { name: "Ross Island", detail: "Ruins of the old British administrative base, now a quiet island with gardens and fauna." }
    ]
  },
  "Chandigarh": {
    desc: "Chandigarh is India’s first modern planned city, designed by Le Corbusier. It serves as the capital of both Punjab and Haryana. Renowned for its architecture and greenery, it is spotlessly clean and pedestrian-friendly.",
    places: [
      { name: "Rock Garden", detail: "Vast open-air garden of sculptures and structures made from recycled materials." },
      { name: "Sukhna Lake", detail: "Scenic man-made lake at the foothills of the Himalayas, popular for boating." },
      { name: "Capitol Complex", detail: "UNESCO site comprising Le Corbusier-designed buildings and the Open Hand sculpture." }
    ]
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    desc: "This union territory combines the former Portuguese enclaves of Dadra & Nagar Haveli and Daman & Diu. It offers peaceful beaches, colonial forts and churches. The region’s distinct heritage and uncrowded beaches are gradually drawing tourists.",
    places: [
      { name: "Diu Fort", detail: "16th-century sea fort with a church inside, built by the Portuguese overlooking the Arabian Sea." },
      { name: "St. Jerome Church", detail: "Baroque-style church (16th century) in Daman with a mermaid motif fountain." },
      { name: "Silvassa", detail: "Administrative capital, known for tribal museums, gardens and Sri Satya Sai Baba ashram." }
    ]
  },
  "Delhi": {
    desc: "Delhi, India’s National Capital Territory, blends over a millennium of history with the dynamism of a modern metropolis. Old Delhi preserves Mughal heritage, while New Delhi features wide boulevards and landmarks.",
    places: [
      { name: "Red Fort", detail: "17th-century Mughal fortress-palace (UNESCO World Heritage)." },
      { name: "Qutub Minar", detail: "73-m tall 12th-century minaret, part of a medieval mosque complex (UNESCO site)." },
      { name: "Lotus Temple", detail: "Baháʼí house of worship, notable for its lotus-like flower architecture." },
      { name: "India Gate", detail: "Iconic war memorial arch (20th century) honoring Indian soldiers of WWI." }
    ]
  },
  "Jammu and Kashmir": {
    desc: "Jammu & Kashmir spans the snowy Himalayas and lush valleys. The Kashmiri portion is famed for alpine scenery: Dal Lake’s houseboats and Mughal gardens define Srinagar’s charm. Jammu city is known for the holy Vaishno Devi Shrine.",
    places: [
      { name: "Dal Lake", detail: "Famous lake with floating gardens and Houseboat accommodations, set against snow-capped mountains." },
      { name: "Vaishno Devi Temple", detail: "Sacred Hindu cave shrine on Trikuta Hills, one of the most-visited pilgrimage sites in India." },
      { name: "Shalimar Bagh", detail: "Persian-style Mughal terraced garden overlooking Dal Lake." }
    ]
  },
  "Ladakh": {
    desc: "Ladakh is a high-altitude frontier region of great deserts and Buddhist culture. Leh, its main town, is ringed by stark mountains and monasteries. The barren valleys of Nubra and Zanskar are famous for double-humped camels.",
    places: [
      { name: "Pangong Lake", detail: "High-altitude brackish lake (on the India-China border) known for its changing blue colors." },
      { name: "Hemis Monastery", detail: "Largest and wealthiest Ladakhi Buddhist monastery, hosting an annual masked festival." },
      { name: "Khardung La Pass", detail: "One of the world’s highest motorable roads (~5,359 m), gateway to Nubra Valley." },
      { name: "Leh Palace", detail: "17th-century royal palace with views over Leh city and Indus Valley." }
    ]
  },
  "Lakshadweep": {
    desc: "Lakshadweep is a union territory of 36 small coral islands off India’s southwest coast, known for their unspoiled beauty. The islands’ turquoise lagoons and white-sand beaches are ideal for snorkeling, diving and water sports.",
    places: [
      { name: "Agatti Island", detail: "Main transportation hub (small airport) with coral reefs ideal for scuba diving." },
      { name: "Bangaram Island", detail: "Serene closed atoll with clear shallow waters and abundant marine life." },
      { name: "Minicoy Island", detail: "Southernmost atoll with distinct Dhivehi culture and a picturesque lighthouse." }
    ]
  },
  "Puducherry": {
    desc: "Puducherry (formerly Pondicherry) is a union territory with French colonial roots. Its capital area has wide boulevards, mustard-yellow colonial villas and the famed Promenade Beach. South Indian Tamil culture blends with French flavors.",
    places: [
      { name: "French Quarter", detail: "District of pastel-coloured colonial villas, artisanal shops and café culture." },
      { name: "Promenade Beach", detail: "Scenic seaside esplanade with landmarks (Statue of Dupleix, old lighthouse)." },
      { name: "Auroville", detail: "International township focused on human unity; famous for its golden “Matrimandir” meditation dome." }
    ]
  }
};

// --- 2. THE COMPONENT ---
const StateDetails = () => {
  const { stateCode } = useParams();
  const navigate = useNavigate();
  const [stateName, setStateName] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Get State Name from Code using the library
    const state = State.getStateByCodeAndCountry(stateCode, 'IN');
    
    if (state) {
      let name = state.name;
      
      // Fix for "Dadra and Nagar Haveli..." naming mismatch
      if (name.includes("Dadra")) name = "Dadra and Nagar Haveli and Daman and Diu";
      // Fix for "Jammu and Kashmir" if it comes as "Jammu & Kashmir"
      if (name.includes("Jammu")) name = "Jammu and Kashmir";

      setStateName(name);
      
      // 2. Look up the custom data
      // We look for a partial match if exact match fails
      const key = Object.keys(stateDescriptions).find(k => k === name || name.includes(k));
      setData(stateDescriptions[key] || null);
    }
  }, [stateCode]);

  if (!stateName) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Header Image Banner *}
      <div className="relative h-[400px]">
        <img 
          src={`https://source.unsplash.com/random/1200x500?${stateName},india,tourism`} 
          alt={stateName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{stateName}</h1>
          <p className="text-xl opacity-90 font-light">Incredible India</p>
        </div>
        
        {/* Back Button *}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 md:left-10 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition border border-white/30"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 2. Content Container *}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        
        {/* Intro Card *}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-green-500 pl-4">
            About {stateName}
          </h2>
          {data ? (
            <p className="text-gray-600 text-lg leading-relaxed">
              {data.desc}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              Detailed description for {stateName} is coming soon.
            </p>
          )}
        </div>

        {/* 3. Places to Visit Grid *}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <MapPin className="mr-2 text-green-600" /> 
          Top Destinations in {stateName}
        </h3>

        {data && data.places && data.places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.places.map((place, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group h-full flex flex-col">
                
                {/* Image Area *}
                <div className="h-56 overflow-hidden relative bg-gray-200">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?${place.name.split('(')[0]},india`} 
                    alt={place.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <h4 className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-md pr-4">
                    {place.name}
                  </h4>
                </div>

                {/* Text Area *}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {place.detail}
                  </p>
                  <button className="text-green-600 font-semibold text-sm hover:text-green-800 transition flex items-center mt-auto">
                    Explore Stays &rarr;
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">Destination details are being curated for this state.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StateDetails;
*/

/*
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from 'country-state-city';
import { ArrowLeft, MapPin, Info } from 'lucide-react';

// --- 1. HARDCODED PLACES (Keep this for the "Top Destinations" grid) ---
// We only keep the 'places' array here. The 'desc' will now come from Wikipedia.
const placeDatabase = {
  "Andhra Pradesh": [
    { name: "Tirumala Venkateswara Temple", detail: "Hilltop Vaishnavite shrine, one of the world’s richest temples." },
    { name: "Araku Valley", detail: "Scenic Eastern Ghats hill station known for coffee estates." },
    { name: "Amaravati Stupa", detail: "Ruins of a grand 3rd‑century BCE Buddhist stupa." }
  ],
  "Arunachal Pradesh": [
    { name: "Tawang Monastery", detail: "Vast 17th‑century Tibetan Buddhist monastery." },
    { name: "Ziro Valley", detail: "Picturesque terraced valley famous for Apatani tribes." },
    { name: "Namdapha National Park", detail: "Biodiverse park with clouded leopards." }
  ],
  "Assam": [
    { name: "Kaziranga National Park", detail: "Home to two-thirds of the world's one-horned rhinos." },
    { name: "Majuli Island", detail: "World's largest river island and cultural hub." },
    { name: "Kamakhya Temple", detail: "Ancient hilltop Shakti shrine." }
  ],
  "Bihar": [
    { name: "Mahabodhi Temple", detail: "UNESCO site marking the Buddha’s enlightenment." },
    { name: "Nalanda Ruins", detail: "Ancient Buddhist university archaeological site." },
    { name: "Rajgir", detail: "Ancient capital with hot springs and caves." }
  ],
  "Goa": [
    { name: "Basilica of Bom Jesus", detail: "UNESCO site holding St. Francis Xavier's remains." },
    { name: "Palolem Beach", detail: "Scenic beach known for its crescent shape." },
    { name: "Dudhsagar Falls", detail: "Four-tiered waterfall on the Mandovi River." }
  ],
  "Gujarat": [
    { name: "Statue of Unity", detail: "The world's tallest statue." },
    { name: "Gir National Park", detail: "The only home of the Asiatic Lion." },
    { name: "Rann of Kutch", detail: "Famous white salt desert." }
  ],
  "Himachal Pradesh": [
    { name: "Manali", detail: "High-altitude resort town gateway to skiing." },
    { name: "Shimla", detail: " Colonial summer capital with the Ridge." },
    { name: "Dharamshala", detail: "Home of the Dalai Lama." }
  ],
  "Karnataka": [
    { name: "Hampi", detail: "Ancient village dotted with ruins of Vijayanagara." },
    { name: "Coorg", detail: "Coffee plantations and misty hills." },
    { name: "Mysore Palace", detail: "Historical palace of the Wodeyar dynasty." }
  ],
  "Kerala": [
    { name: "Alleppey", detail: "Famous for houseboat cruises on backwaters." },
    { name: "Munnar", detail: "Hill station with vast tea gardens." },
    { name: "Kochi", detail: "Colonial history and Chinese fishing nets." }
  ],
  "Maharashtra": [
    { name: "Ajanta & Ellora Caves", detail: "Ancient rock-cut caves." },
    { name: "Gateway of India", detail: "Iconic arch monument in Mumbai." },
    { name: "Mahabaleshwar", detail: "Hill station known for strawberries." }
  ],
  "Rajasthan": [
    { name: "Jaipur (Pink City)", detail: "Famous for Hawa Mahal and Amber Fort." },
    { name: "Udaipur", detail: "City of Lakes and lavish palaces." },
    { name: "Jaisalmer", detail: "The Golden City in the Thar Desert." }
  ],
  "Tamil Nadu": [
    { name: "Meenakshi Temple", detail: "Historic Hindu temple in Madurai." },
    { name: "Ooty", detail: "Popular hill station in the Nilgiri hills." },
    { name: "Mahabalipuram", detail: "UNESCO site of 7th-century rock monuments." }
  ],
  "Uttar Pradesh": [
    { name: "Taj Mahal", detail: "Ivory-white marble mausoleum in Agra." },
    { name: "Varanasi Ghats", detail: "Spiritual river banks of the Ganges." },
    { name: "Fatehpur Sikri", detail: "Short-lived capital of the Mughal empire." }
  ],
  "West Bengal": [
    { name: "Darjeeling", detail: "Famous for tea and the Himalayan Railway." },
    { name: "Sundarbans", detail: "Largest mangrove forest and tiger reserve." },
    { name: "Victoria Memorial", detail: "Large marble building in Kolkata." }
  ]
};

const StateDetails = () => {
  const { stateCode } = useParams();
  const navigate = useNavigate();
  
  const [stateName, setStateName] = useState("");
  const [wikiData, setWikiData] = useState(null); // Stores Wikipedia text
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 1. Identify the State Name
      const stateObj = State.getStateByCodeAndCountry(stateCode, 'IN');
      let name = stateObj ? stateObj.name : stateCode; // Fallback if code lookup fails

      // Normalizing names for better matches
      if (name.includes("Jammu")) name = "Jammu and Kashmir";
      if (name.includes("Andaman")) name = "Andaman and Nicobar Islands";
      
      setStateName(name);

      // 2. Fetch Places from our Hardcoded Database
      // We check if the state name exists in our keys
      const dbKey = Object.keys(placeDatabase).find(k => name.includes(k) || k.includes(name));
      setPlaces(placeDatabase[dbKey] || []);

      // 3. FETCH FROM WIKIPEDIA API
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
        if (response.ok) {
          const json = await response.json();
          setWikiData({
            extract: json.extract,
            thumbnail: json.thumbnail ? json.thumbnail.source : null,
            description: json.description
          });
        } else {
          setWikiData(null);
        }
      } catch (error) {
        console.error("Wiki API Error:", error);
        setWikiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stateCode]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading information from Wikipedia...</p>
    </div>
  );

  // Fallback image if Wikipedia doesn't have one
  const heroImage = wikiData?.thumbnail || `https://source.unsplash.com/random/1200x500?${stateName},india,landscape`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px' }}>
      
      {/* 1. Header Image Banner *}
      <div style={{ position: 'relative', height: '400px' }}>
        <img 
          src={heroImage}
          alt={stateName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{stateName}</h1>
          <p style={{ fontSize: '20px', fontWeight: '300', opacity: 0.9 }}>Incredible India</p>
        </div>
        
        {/* Back Button *}
        <button 
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '100px', left: '30px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer' }}
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 2. Content Container *}
      <div style={{ maxWidth: '1100px', margin: '-80px auto 0', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        
        {/* Intro Card (Data from Wikipedia) *}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Info color="#16a34a" size={24} />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>About {stateName}</h2>
          </div>
          
          {wikiData ? (
            <div>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#4b5563', marginBottom: '20px' }}>
                {wikiData.extract}
              </p>
              <p style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' }}>
                Source: Wikipedia
              </p>
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>Description unavailable at the moment.</p>
          )}
        </div>

        {/* 3. Places to Visit Grid (From our DB) *}
        {places.length > 0 && (
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin color="#16a34a" /> 
              Top Destinations in {stateName}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {places.map((place, index) => (
                <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Image Area *}
                  <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                    <img 
                      src={`https://source.unsplash.com/random/600x400?${place.name},india`} 
                      alt={place.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Text Area *}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                      {place.name}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                      {place.detail}
                    </p>
                    <button style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                      Check Availability &rarr;
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {places.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            <p>Curated destination list coming soon for {stateName}.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StateDetails;
*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from 'country-state-city';
import { ArrowLeft, MapPin, Info, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- 1. INTERNAL DATABASE (For Top Destinations Grid ONLY) ---
const placeDatabase = {
  "Andhra Pradesh": [
    { name: "Tirumala Temple", detail: "Hilltop Vaishnavite shrine, one of the world’s richest temples." },
    { name: "Araku Valley", detail: "Scenic hill station known for coffee estates and waterfalls." },
    { name: "Amaravati", detail: "Ancient Buddhist site featuring a grand stupa." }
  ],
  "Arunachal Pradesh": [
    { name: "Tawang Monastery", detail: "India's largest monastery with stunning mountain views." },
    { name: "Ziro Valley", detail: "Apatani tribal landscape with rice fields and pine hills." },
    { name: "Sela Pass", detail: "High-altitude mountain pass covered in snow year-round." }
  ],
  "Assam": [
    { name: "Kaziranga Park", detail: "UNESCO site famous for the Great Indian One-Horned Rhinoceros." },
    { name: "Majuli Island", detail: "World's largest river island and hub of Vaishnavite culture." },
    { name: "Kamakhya Temple", detail: "Powerful hilltop Shakti shrine in Guwahati." }
  ],
  "Bihar": [
    { name: "Bodh Gaya", detail: "The holiest Buddhist site where Buddha attained enlightenment." },
    { name: "Nalanda Ruins", detail: "Remains of the ancient monastic university." },
    { name: "Rajgir", detail: "Ancient capital featuring the Vishwa Shanti Stupa." }
  ],
  "Goa": [
    { name: "Calangute Beach", detail: "The 'Queen of Beaches', famous for water sports and nightlife." },
    { name: "Basilica of Bom Jesus", detail: "UNESCO church holding the remains of St. Francis Xavier." },
    { name: "Dudhsagar Falls", detail: "Spectacular four-tiered waterfall on the Mandovi River." }
  ],
  "Gujarat": [
    { name: "Rann of Kutch", detail: "Vast white salt desert famous for the Rann Utsav." },
    { name: "Statue of Unity", detail: "The world's tallest statue dedicated to Sardar Patel." },
    { name: "Gir National Park", detail: "The only natural habitat of the Asiatic Lion." }
  ],
  "Himachal Pradesh": [
    { name: "Manali", detail: "Adventure hub for skiing, paragliding, and trekking." },
    { name: "Shimla", detail: "The Queen of Hills with its historic Ridge and Mall Road." },
    { name: "Kasol", detail: "Scenic village on the Parvati River, popular with backpackers." }
  ],
  "Jammu and Kashmir": [
    { name: "Gulmarg", detail: "Popular skiing destination and hill station." },
    { name: "Dal Lake", detail: "Famous for houseboats and Shikara rides." },
    { name: "Vaishno Devi", detail: "Sacred Hindu pilgrimage site." }
  ],
  "Karnataka": [
    { name: "Hampi", detail: "Surreal boulder landscape dotted with Vijayanagara ruins." },
    { name: "Coorg", detail: "Scotland of India, famous for coffee and misty hills." },
    { name: "Mysore Palace", detail: "Grand royal palace illuminated with thousands of lights." }
  ],
  "Kerala": [
    { name: "Alleppey", detail: "Venice of the East, known for houseboat cruises." },
    { name: "Munnar", detail: "Rolling tea gardens and misty mountains." },
    { name: "Varkala", detail: "Beautiful coastal town with dramatic red cliffs." }
  ],
  "Ladakh": [
    { name: "Pangong Lake", detail: "High-altitude brackish lake famous for changing colors." },
    { name: "Hemis Monastery", detail: "Largest and wealthiest Ladakhi Buddhist monastery." },
    { name: "Khardung La", detail: "One of the world's highest motorable roads." }
  ],
  "Madhya Pradesh": [
    { name: "Khajuraho", detail: "UNESCO temples famous for intricate stone carvings." },
    { name: "Bandhavgarh", detail: "National park with the highest density of tigers." },
    { name: "Sanchi Stupa", detail: "Ancient Buddhist complex built by Emperor Ashoka." }
  ],
  "Maharashtra": [
    { name: "Ajanta & Ellora", detail: "Ancient rock-cut caves featuring Buddhist and Hindu art." },
    { name: "Mahabaleshwar", detail: "Hill station famous for strawberries and viewpoints." },
    { name: "Gateway of India", detail: "Iconic colonial arch overlooking the Arabian Sea." }
  ],
  "Rajasthan": [
    { name: "Jaipur", detail: "The Pink City, home to Hawa Mahal and Amber Fort." },
    { name: "Udaipur", detail: "City of Lakes, known for its romantic Lake Palace." },
    { name: "Jaisalmer", detail: "The Golden City with its living fort and sand dunes." }
  ],
  "Tamil Nadu": [
    { name: "Meenakshi Temple", detail: "Architectural marvel with colorful gopurams in Madurai." },
    { name: "Ooty", detail: "Queen of Hill Stations in the Nilgiri Blue Mountains." },
    { name: "Mahabalipuram", detail: "UNESCO site famous for rock-cut shore temples." }
  ],
  "Uttar Pradesh": [
    { name: "Taj Mahal", detail: "Symbol of eternal love and one of the Seven Wonders." },
    { name: "Varanasi", detail: "Oldest living city, famous for Ganga Aarti and ghats." },
    { name: "Ayodhya", detail: "The birthplace of Lord Rama, a major pilgrimage site." }
  ],
  "Uttarakhand": [
    { name: "Rishikesh", detail: "Yoga Capital of the World on the banks of the Ganges." },
    { name: "Nainital", detail: "Lake district famous for boating and scenic views." },
    { name: "Kedarnath", detail: "Sacred Shiva temple set amidst snowy peaks." }
  ],
  "West Bengal": [
    { name: "Darjeeling", detail: "Queen of the Hills, famous for tea and the Toy Train." },
    { name: "Sundarbans", detail: "Largest mangrove forest, home to the Royal Bengal Tiger." },
    { name: "Kolkata", detail: "City of Joy, known for Victoria Memorial and food." }
  ]
};

const StateDetails = () => {
  const { placeName } = useParams();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState("");
  const [wikiData, setWikiData] = useState(null);
  const [subDestinations, setSubDestinations] = useState([]);
  const [relatedDestinations, setRelatedDestinations] = useState([]);
  const [relatedDestinationImages, setRelatedDestinationImages] = useState({});
  const [selectedRelatedDestination, setSelectedRelatedDestination] = useState(null);
  const [selectedRelatedData, setSelectedRelatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);

  // --- HELPER: CALCULATE IOU DISTANCE BETWEEN TWO STRINGS ---
  const calculateIOUDistance = (str1, str2) => {
    const set1 = new Set(str1.toLowerCase());
    const set2 = new Set(str2.toLowerCase());
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return union.size === 0 ? 0 : intersection.size / union.size;
  };

  // --- HELPER: FIND 3 MATCHING DESTINATIONS ---
  const findRelatedDestinations = (currentDestination) => {
    const allDestinations = [];
    Object.entries(placeDatabase).forEach(([state, places]) => {
      places.forEach(place => {
        allDestinations.push({
          name: place.name,
          detail: place.detail,
          state: state
        });
      });
    });
    
    // Filter out the current destination and get 3 closest matches by IOU distance
    const filtered = allDestinations.filter(d => 
      d.name.toLowerCase() !== currentDestination.toLowerCase()
    );
    
    // Sort by IOU distance (highest similarity first) and take top 3
    return filtered
      .sort((a, b) => calculateIOUDistance(currentDestination, b.name) - calculateIOUDistance(currentDestination, a.name))
      .slice(0, 3);
  };

  // --- HELPER: SUMMARIZE TEXT USING OLLAMA WITH TIMEOUT ---
  const summarizeWithOllama = async (text) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 10 second timeout
      
      const response = await fetch('http://localhost:5051/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma3:4b', // or your preferred model (llama2, neural-chat, etc.)
          prompt: `You are a travel guide expert. Summarize and beautifully format the following Wikipedia text using markdown tags about an Indian destination into 2-3 engaging paragraphs. Focus on culture, attractions, and travel appeal. Exclude text such as 'here is your summary...'. Keep it concise but informative:\n\n${text}`,
          stream: false,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn('Ollama API error:', response.status);
        return null;
      }

      const data = await response.json();
      return data.response || null;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Ollama request timed out');
      } else {
        console.error('Ollama Summarization Error:', error);
      }
      return null;
    }
  };

  // --- HELPER: FETCH WIKIPEDIA DATA WITH ALL IMAGES ---
  const fetchWikiData = async (query) => {
    try {
      // 1. Try Direct Search
      let endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts|pageimages&pithumbsize=1200&exintro&explaintext&redirects=1&titles=${encodeURIComponent(query)}`;
      let response = await fetch(endpoint);
      let data = await response.json();
      let pages = data.query?.pages;
      
      if (!pages) {
        console.warn("No pages found for query:", query);
        return null;
      }
      
      let pageId = Object.keys(pages)[0];

      // 2. If Direct Search Fails (or returns empty), Try Appending "India"
      if (!pageId || pageId === "-1") {
        console.log("First search failed, trying with ' India' appended");
        endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts|pageimages&pithumbsize=1200&exintro&explaintext&redirects=1&titles=${encodeURIComponent(query + " India")}`;
        response = await fetch(endpoint);
        data = await response.json();
        pages = data.query?.pages;
        
        if (!pages) {
          console.warn("Still no pages found for query:", query + " India");
          return null;
        }
        
        pageId = Object.keys(pages)[0];
      }

      // 3. If still no valid page, try a search query to find similar articles
      if (!pageId || pageId === "-1") {
        console.log("Trying search instead of direct match");
        const searchEndpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=0&srlimit=1`;
        const searchResponse = await fetch(searchEndpoint);
        const searchData = await searchResponse.json();
        const searchResults = searchData.query?.search;
        
        if (searchResults && searchResults.length > 0) {
          const firstResult = searchResults[0].title;
          console.log("Found search result:", firstResult);
          endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts|pageimages&pithumbsize=1200&exintro&explaintext&redirects=1&titles=${encodeURIComponent(firstResult)}`;
          response = await fetch(endpoint);
          data = await response.json();
          pages = data.query?.pages;
          
          if (!pages) {
            console.warn("No pages found even after search");
            return null;
          }
          
          pageId = Object.keys(pages)[0];
        } else {
          console.warn("No search results found");
          return null;
        }
      }

      if (pageId && pageId !== "-1") {
        const page = pages[pageId];
        
        // Check if the extract has sufficient content (minimum 200 characters)
        const extractLength = page.extract ? page.extract.trim().length : 0;
        if (extractLength < 200) {
          return {
            title: page.title,
            extract: null,
            image: page.thumbnail ? page.thumbnail.source : null,
            images: page.thumbnail ? [page.thumbnail.source] : [],
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
            insufficientContent: true
          };
        }
        
        // 3. Fetch all images from the article
        let allImages = [];
        if (page.thumbnail) {
          allImages.push(page.thumbnail.source);
        }
        
        try {
          const imagesEndpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=images&titles=${encodeURIComponent(page.title)}`;
          const imagesResponse = await fetch(imagesEndpoint);
          const imagesData = await imagesResponse.json();
          const imagePage = imagesData.query?.pages?.[pageId];
          
          if (imagePage?.images && imagePage.images.length > 0) {
            // Get info about each image
            const imageNames = imagePage.images.map(img => img.title).join('|');
            if (imageNames) {
              const imageInfoEndpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(imageNames)}`;
              const imageInfoResponse = await fetch(imageInfoEndpoint);
              const imageInfoData = await imageInfoResponse.json();
              const imagePages = imageInfoData.query?.pages || {};
              
              // Extract image URLs and add to allImages if not already present
              Object.values(imagePages).forEach((img) => {
                if (img.imageinfo?.[0]?.url) {
                  const url = img.imageinfo[0].url;
                  // Filter out non-image files and svg files
                  if (!allImages.includes(url) && (url.includes('.jpg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp'))) {
                    allImages.push(url);
                  }
                }
              });
            }
          }
        } catch (imgError) {
          console.warn("Error fetching article images:", imgError);
        }
        
        // 4. Summarize Wikipedia extract using Ollama
        let summarizedText = page.extract; // Fallback to original if summarization fails
        console.log("Original extract length:", page.extract ? page.extract.length : 0);
        if (page.extract) {
          const summary = await summarizeWithOllama(page.extract);
          if (summary) {
            summarizedText = summary;
          }
        }
        
        return {
          title: page.title,
          extract: summarizedText,
          image: page.thumbnail ? page.thumbnail.source : null,
          images: allImages.length > 0 ? allImages : [page.thumbnail?.source].filter(Boolean),
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
          insufficientContent: false
        };
      }
    } catch (error) {
      console.error("Wiki Fetch Error:", error);
    }
    return null;
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setSummarizing(false);
      
      // 1. Resolve State/Place Name
      let searchName = placeName;
      // Handle 2-letter codes (e.g., "RJ" -> "Rajasthan")
      if (placeName.length === 2 && placeName === placeName.toUpperCase()) {
        const stateObj = State.getStateByCodeAndCountry(placeName, 'IN');
        if (stateObj) searchName = stateObj.name;
      }
      
      // Fix Naming Quirks
      if (searchName === "Jammu & Kashmir") searchName = "Jammu and Kashmir";
      if (searchName.includes("Andaman")) searchName = "Andaman and Nicobar Islands";
      
      setDisplayName(searchName);

      // 2. Fetch Wiki Data (includes Ollama summarization)
      setSummarizing(true);
      const wikiResult = await fetchWikiData(searchName);
      setSummarizing(false);
      setWikiData(wikiResult);

      // 3. Fetch Internal Sub-Destinations (The Grid)
      const dbKey = Object.keys(placeDatabase).find(k => 
        k.toLowerCase() === searchName.toLowerCase() || 
        searchName.toLowerCase().includes(k.toLowerCase())
      );
      setSubDestinations(dbKey ? placeDatabase[dbKey] : []);

      // 4. If Wikipedia data is null or insufficient, find related destinations
      if (!wikiResult || wikiResult.insufficientContent) {
        const related = findRelatedDestinations(searchName);
        setRelatedDestinations(related);
        
        // 5. Fetch Wikipedia images for each related destination
        const imageMap = {};
        for (const dest of related) {
          try {
            const destWikiData = await fetchWikiData(dest.name);
            if (destWikiData?.images && destWikiData.images.length > 0) {
              // Pick a random image from the fetched images
              const randomImage = destWikiData.images[Math.floor(Math.random() * destWikiData.images.length)];
              imageMap[dest.name] = randomImage;
            }
          } catch (error) {
            console.warn(`Error fetching images for ${dest.name}:`, error);
          }
        }
        setRelatedDestinationImages(imageMap);
      }
      
      setLoading(false);
    };

    loadContent();
  }, [placeName]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <p style={{ fontSize: '18px', color: '#6b7280' }}>Fetching travel details...</p>
      {summarizing && <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>✨ Summarizing with Ollama AI...</p>}
    </div>
  );

  // Fallback Values
  const heroImage = wikiData?.image || `https://source.unsplash.com/random/1200x500?${displayName},india,tourism`;
  const description = wikiData?.insufficientContent 
    ? `The destination you searched for does not have global footprint.`
    : wikiData?.extract || `The destination you searched for does not have global footprint.`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px' }}>
      
      {/* HEADER IMAGE */}
      <div style={{ position: 'relative', height: '400px', backgroundColor: '#e5e7eb' }}>
        <img 
          src={heroImage}
          alt={displayName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://source.unsplash.com/random/1200x500?nature,travel'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {wikiData?.title || displayName}
          </h1>
          <p style={{ fontSize: '20px', fontWeight: '300', opacity: 0.9 }}>Incredible India</p>
        </div>
        
        <button 
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '100px', left: '30px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer' }}
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '-80px auto 0', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        
        {/* INFO CARD */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info color="#16a34a" size={24} />
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Overview</h2>
            </div>
            {wikiData?.url && (
              <a 
                href={wikiData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
              >
                Read on Wikipedia <ExternalLink size={14} />
              </a>
            )}
          </div>
          
          <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#4b5563', marginBottom: '20px' }}>
            {wikiData?.insufficientContent ? (
              <div style={{ padding: '20px', backgroundColor: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b', color: '#92400e' }}>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                  ⓘ {description}
                </p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px', marginBottom: '12px', color: '#1f2937' }}>{children}</h3>,
                  h2: ({ children }) => <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '14px', marginBottom: '10px', color: '#1f2937' }}>{children}</h3>,
                  h3: ({ children }) => <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '12px', marginBottom: '8px', color: '#1f2937' }}>{children}</h4>,
                  p: ({ children }) => <p style={{ marginBottom: '12px', margin: '12px 0' }}>{children}</p>,
                  strong: ({ children }) => <strong style={{ fontWeight: 'bold', color: '#16a34a' }}>{children}</strong>,
                  em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#6b7280' }}>{children}</em>,
                  ul: ({ children }) => <ul style={{ marginLeft: '20px', marginBottom: '12px', listStyle: 'disc' }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ marginLeft: '20px', marginBottom: '12px', listStyle: 'decimal' }}>{children}</ol>,
                  li: ({ children }) => <li style={{ marginBottom: '6px' }}>{children}</li>,
                  blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #16a34a', paddingLeft: '16px', marginLeft: '0', marginBottom: '12px', fontStyle: 'italic', color: '#6b7280' }}>{children}</blockquote>,
                  code: ({ children }) => <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>{children}</code>,
                }}
              >
                {description}
              </ReactMarkdown>
            )}
          </div>
          
          {!wikiData?.insufficientContent && (
            <div style={{ paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#9ca3af' }}>
            </div>
          )}
        </div>

        {/* SUB-DESTINATIONS GRID (Only if available in our DB) */}
        {subDestinations.length > 0 && (
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin color="#16a34a" /> 
              Top Destinations in {displayName}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {subDestinations.map((place, index) => (
                <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                    <img 
                      src={`https://picsum.photos/600/400?random=${index}`}
                      alt={place.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(place.name)}`; }}
                    />
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                      {place.name}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                      {place.detail}
                    </p>
                    <button style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                      Check Availability &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED DESTINATIONS (When Wikipedia fails) */}
        {(wikiData === null || wikiData?.insufficientContent) && relatedDestinations.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🗺️ Similar Destinations You Might Like
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {relatedDestinations.map((place, index) => {
                const wikiImage = relatedDestinationImages[place.name];
                return (
                  <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}>
                    <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb', position: 'relative' }}>
                      <img 
                        src={wikiImage || `https://picsum.photos/600/400?random=${index}`}
                        alt={place.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { 
                          e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(place.state)}`; 
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                        {place.state}
                      </p>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                        {place.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                        {place.detail}
                      </p>
                      <button 
                        onClick={async () => {
                          try {
                            setSummarizing(true);
                            const data = await fetchWikiData(place.name);
                            setSelectedRelatedDestination(place);
                            setSelectedRelatedData(data);
                          } catch (error) {
                            console.error("Error fetching destination:", error);
                            setSelectedRelatedData(null);
                          } finally {
                            setSummarizing(false);
                          }
                        }}
                        style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                      >
                        Explore &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SELECTED RELATED DESTINATION DETAILS */}
            {selectedRelatedDestination && (
              <div style={{ marginTop: '50px', backgroundColor: '#f0fdf4', borderRadius: '16px', padding: '40px', border: '2px solid #16a34a' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #16a34a' }}>
                  <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d', margin: 0 }}>
                    ✨ {selectedRelatedDestination.name}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedRelatedDestination(null);
                      setSelectedRelatedData(null);
                    }}
                    style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#64748b' }}
                  >
                    ✕
                  </button>
                </div>

                {selectedRelatedData ? (
                  <>
                    {/* Image Gallery */}
                    {selectedRelatedData.images && selectedRelatedData.images.length > 0 && (
                      <div style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d', marginBottom: '16px' }}>Gallery</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          {selectedRelatedData.images.map((imgUrl, idx) => (
                            <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e5e7eb', height: '200px' }}>
                              <img 
                                src={imgUrl}
                                alt={`${selectedRelatedDestination.name} - Image ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginBottom: '20px', alignItems: 'start' }}>
                      <div>
                        {selectedRelatedData.insufficientContent ? (
                          <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b', color: '#92400e' }}>
                            <p style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>
                              ⓘ Limited information available for this destination on Wikipedia. Please refer to the main destination page for more details.
                            </p>
                          </div>
                        ) : (
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px', marginBottom: '12px', color: '#1f2937' }}>{children}</h3>,
                              h2: ({ children }) => <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '14px', marginBottom: '10px', color: '#1f2937' }}>{children}</h3>,
                              h3: ({ children }) => <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '12px', marginBottom: '8px', color: '#1f2937' }}>{children}</h4>,
                              p: ({ children }) => <p style={{ marginBottom: '12px', margin: '12px 0', fontSize: '15px', color: '#334155', lineHeight: '1.8' }}>{children}</p>,
                              strong: ({ children }) => <strong style={{ fontWeight: 'bold', color: '#16a34a' }}>{children}</strong>,
                              em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#6b7280' }}>{children}</em>,
                              ul: ({ children }) => <ul style={{ marginLeft: '20px', marginBottom: '12px', listStyle: 'disc' }}>{children}</ul>,
                              ol: ({ children }) => <ol style={{ marginLeft: '20px', marginBottom: '12px', listStyle: 'decimal' }}>{children}</ol>,
                              li: ({ children }) => <li style={{ marginBottom: '6px', color: '#334155' }}>{children}</li>,
                              blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #16a34a', paddingLeft: '16px', marginLeft: '0', marginBottom: '12px', fontStyle: 'italic', color: '#6b7280' }}>{children}</blockquote>,
                              code: ({ children }) => <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>{children}</code>,
                            }}
                          >
                            {selectedRelatedData.extract}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>

                    {selectedRelatedData.url && (
                      <a 
                        href={selectedRelatedData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#16a34a', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', marginTop: '16px' }}
                      >
                        Read Full Article on Wikipedia
                      </a>
                    )}
                  </>
                ) : summarizing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', animation: 'pulse 1.5s infinite' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', animation: 'pulse 1.5s infinite 0.3s' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', animation: 'pulse 1.5s infinite 0.6s' }} />
                    </div>
                    <p style={{ margin: 0, fontSize: '15px', color: '#15803d', fontWeight: '600' }}>
                      Fetching details with Ollama AI...
                    </p>
                    <style>{`
                      @keyframes pulse {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                      }
                    `}</style>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '16px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: '#7f1d1d' }}>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>
                        ⚠️ Unable to fetch information for this destination. Please try again or visit Wikipedia directly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default StateDetails;