import React, { useState } from 'react';
import { BookOpen, MapPin, Calendar, X, Heart, Share2, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoriesPage = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // --- MOCK DATA: EXPANDED TRAVEL DIARIES (15 STORIES) ---
  const allStories = [
    // --- NATURE ---
    {
      id: 1,
      title: "Chasing the Monsoon in the Abode of Clouds",
      author: "Priya Sharma",
      state: "Meghalaya",
      category: "Nature",
      date: "August 2023",
      likes: 342,
      img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
      excerpt: "Walking across the living root bridges while the rain poured down was a spiritual experience. Meghalaya completely transformed my definition of green.",
      fullText: "My journey to Meghalaya started with a long, winding drive through the misty hills of the northeast. As we approached Cherrapunji, the clouds descended so low it felt like we were driving through the sky itself.\n\nThe highlight of my trip was the trek to the Double Decker Living Root Bridge. It’s not just a bridge; it’s a living, breathing testament to the ingenuity of the Khasi tribe. The rain was relentless, but it only added to the magic. Every waterfall we passed was roaring with life. We stayed in a small eco-lodge where the hosts served us traditional bamboo shoot pork and red rice.\n\nIf you ever feel disconnected from nature, Meghalaya is the place to find your roots again. Quite literally."
    },
    {
      id: 6,
      title: "A Canvas of Blooms in the Himalayas",
      author: "Aisha Khan",
      state: "Uttarakhand",
      category: "Nature",
      date: "July 2023",
      likes: 415,
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      excerpt: "The Valley of Flowers is not a myth. Trekking through miles of alpine roses and blue poppies felt like walking into a painting.",
      fullText: "I had heard stories about the Valley of Flowers, but nothing prepared me for the actual sight. After a grueling trek from Ghangaria, the landscape suddenly opened up into a massive gorge carpeted in millions of wild alpine flowers.\n\nEvery shade of pink, blue, yellow, and white was represented here. The air smelled incredibly sweet, and the only sound was the buzzing of bees and the distant rush of the Pushpawati river. Sitting on a rock in the middle of that valley, surrounded by towering, mist-covered peaks, I felt an overwhelming sense of peace. Nature has a way of making you feel incredibly small, yet entirely whole."
    },
    {
      id: 11,
      title: "Waking up to the Kanchenjunga",
      author: "Rohan Das",
      state: "Sikkim",
      category: "Nature",
      date: "April 2023",
      likes: 389,
      img: "https://images.unsplash.com/photo-1588666015694-8ceb1e22067d?auto=format&fit=crop&w=800&q=80",
      excerpt: "The Yumthang Valley in spring is a revelation. Rhododendrons blooming against a backdrop of snow is a sight I'll never forget.",
      fullText: "North Sikkim is raw, untamed, and breathtakingly beautiful. I traveled to Yumthang Valley right at the peak of spring. The entire valley floor was painted in vibrant purples and reds thanks to the blooming Rhododendrons.\n\nWaking up at 4 AM in Lachung, shivering in the cold, was entirely worth it when the first rays of the sun hit the snow-capped peak of Mount Kanchenjunga. The mountain turned a brilliant shade of gold. We spent the day walking along the icy Teesta river, collecting smooth pebbles and soaking in the absolute purity of the Himalayan air."
    },

    // --- CULTURE ---
    {
      id: 2,
      title: "Lost in the Colors of the Pink City",
      author: "David Chen",
      state: "Rajasthan",
      category: "Culture",
      date: "November 2023",
      likes: 512,
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      excerpt: "From the majestic Amer Fort to the bustling bazaars of Johari Bazaar, Jaipur is an absolute sensory overload in the best way possible.",
      fullText: "Jaipur doesn't just welcome you; it engulfs you. As a photographer, I was immediately drawn to the warm, terracotta pink hues that paint the entire old city.\n\nI spent an entire morning simply watching the light change on the intricate facade of the Hawa Mahal. Later, exploring the Amer Fort felt like stepping onto the set of an epic historical movie. What I loved most, though, wasn't the monuments, but the people. I spent hours sitting with a local block-printer, learning the rhythmic art of stamping patterns onto fabric.\n\nThe city is a vibrant paradox—deeply rooted in royal history, yet buzzing with chaotic modern life. Do not leave without trying the Pyaz Kachori!"
    },
    {
      id: 7,
      title: "The Evening Aarti at the Ghats",
      author: "Sneha Patil",
      state: "Uttar Pradesh",
      category: "Culture",
      date: "October 2023",
      likes: 620,
      img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80",
      excerpt: "Varanasi is older than history. Sitting on a boat watching the Ganga Aarti filled me with an indescribable, ancient energy.",
      fullText: "There is nowhere on earth quite like Kashi. The moment I stepped onto the ancient stone ghats, the chaos of the city faded into a rhythmic, spiritual hum.\n\nThe defining moment of my trip was renting a small wooden boat at dusk. As the sun set, the Dashashwamedh Ghat lit up with hundreds of brass lamps. The sound of conch shells, chanting, and bells echoed across the river. Watching the priests perform the Ganga Aarti with such synchronized devotion brought tears to my eyes. Varanasi doesn't just show you its culture; it makes you feel it in your very soul."
    },
    {
      id: 12,
      title: "Temples Touching the Sky",
      author: "Arun Iyer",
      state: "Tamil Nadu",
      category: "Culture",
      date: "February 2024",
      likes: 475,
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
      excerpt: "The sheer scale of the Meenakshi Amman Temple is staggering. Every pillar and painted ceiling tells a thousand-year-old story.",
      fullText: "Madurai revolves around its temple, both geographically and culturally. Approaching the Meenakshi Amman Temple, the towering, brightly painted Gopurams (towers) dominated the skyline.\n\nInside, the air was thick with the scent of jasmine and incense. I walked through the Hall of a Thousand Pillars, marveling at the fact that every single pillar was carved from a single block of granite, each depicting a different mythological figure. The devotion of the locals, the classical Carnatic music playing softly, and the stunning Dravidian architecture made this an unforgettable cultural immersion."
    },

    // --- ADVENTURE ---
    {
      id: 4,
      title: "A Solo Trekker's Guide to the Himalayas",
      author: "Vikram Singh",
      state: "Himachal Pradesh",
      category: "Adventure",
      date: "May 2023",
      likes: 675,
      img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=800&q=80",
      excerpt: "The trek to Kheerganga was exhausting, but soaking in the natural hot springs surrounded by snow-capped peaks made every step worth it.",
      fullText: "Parvati Valley is legendary among backpackers, and for good reason. I set off on the Kheerganga trek early in the morning. The trail weaves through dense pine forests, over roaring rivers, and past tiny villages clinging to the mountainside.\n\nAbout halfway up, my legs were burning, but the camaraderie on the trail kept me going. Fellow trekkers share water, stories, and encouragement. When I finally reached the top, the reward was unparalleled: a natural, steaming hot spring right at the edge of the mountain.\n\nSitting in that hot water while snowflakes gently drifted down around me is a core memory I will cherish forever. Himachal changes you."
    },
    {
      id: 8,
      title: "Riding the Roof of the World",
      author: "Kabir & Aman",
      state: "Ladakh",
      category: "Adventure",
      date: "August 2023",
      likes: 890,
      img: "https://images.unsplash.com/photo-1581793758837-920fbc8110b6?auto=format&fit=crop&w=800&q=80",
      excerpt: "Navigating the treacherous, icy roads of Khardung La on a Royal Enfield tested my limits, but the view at the top was absolute freedom.",
      fullText: "A bike trip to Ladakh is a rite of passage. The air gets thinner, the roads get tougher, and the landscapes get more surreal with every passing kilometer.\n\nThe ride from Leh to Nubra Valley via Khardung La was the most challenging riding I've ever done. Navigating melting ice streams and rocky patches required intense focus. But standing at what is often called the highest motorable road in the world, with prayer flags fluttering fiercely in the freezing wind, I felt an unmatched sense of accomplishment. We ended the trip camping under a blanket of stars at Pangong Lake."
    },
    {
      id: 13,
      title: "Diving into the Deep Blue",
      author: "Natasha Ray",
      state: "Andaman and Nicobar Islands",
      category: "Adventure",
      date: "December 2023",
      likes: 540,
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      excerpt: "Scuba diving in Havelock was like entering an alien world. Swimming alongside sea turtles and neon corals was a thrilling rush.",
      fullText: "I had always been terrified of the deep ocean, but Havelock Island changed that. I signed up for my first open-water scuba dive at Elephant Beach.\n\nDropping backward off the boat into the crystal-clear water was terrifying, but the moment I went under, the silence was calming. The coral reefs were alive in colors I didn't know existed in nature. A massive, graceful sea turtle glided right past me, and schools of neon fish darted around my mask. It was an adrenaline-pumping yet deeply meditative adventure. The Andamans offer world-class diving that everyone must experience once."
    },

    // --- RELAXATION ---
    {
      id: 3,
      title: "Finding Silence in the Backwaters",
      author: "Ananya Desai",
      state: "Kerala",
      category: "Relaxation",
      date: "January 2024",
      likes: 428,
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      excerpt: "Two days on a houseboat in Alleppey taught me the true meaning of slow living. Just water, palm trees, and absolute peace.",
      fullText: "I booked a houseboat in Alleppey expecting a standard tourist experience, but what I got was profound stillness. \n\nDrifting through the narrow, emerald-green canals, the only sounds were the gentle lapping of water against the wooden hull and the occasional call of a kingfisher. Our boat crew prepared the most incredible fresh Karimeen (pearl spot fish) wrapped in banana leaves, cooked right there on the boat.\n\nWe passed small villages where life revolves entirely around the water—children taking small boats to school, women washing clothes on the steps. It was a humbling, beautiful glimpse into a life moving at a completely different, much healthier pace."
    },
    {
      id: 9,
      title: "Sun, Sand, and South Goa",
      author: "Maria & Tom",
      state: "Goa",
      category: "Relaxation",
      date: "February 2024",
      likes: 360,
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      excerpt: "Escaping the party crowds, we found a sleepy, pristine beach in South Goa. Just us, a hammock, and the sunset.",
      fullText: "While North Goa buzzes with energy and nightlife, we craved quiet. We rented a small, airy cottage near Agonda beach in South Goa.\n\nOur days consisted of waking up late, walking barefoot to the beach, and reading books in hammocks strung between coconut trees. There were no loud clubs, just the rhythmic sound of the Arabian Sea. We rented a scooter and aimlessly explored quiet, palm-lined village roads, stopping only to drink fresh coconut water or eat Goan fish curry at small local shacks. It was the ultimate mental reset."
    },
    {
      id: 14,
      title: "A Slice of France in India",
      author: "Kavya Menon",
      state: "Puducherry",
      category: "Relaxation",
      date: "November 2023",
      likes: 495,
      img: "https://images.unsplash.com/photo-1583307519305-64d50c76ce83?auto=format&fit=crop&w=800&q=80",
      excerpt: "Cycling through the mustard-yellow streets of the French Quarter, stopping for croissants and coffee. Pure bliss.",
      fullText: "Pondicherry is where time slows down. I spent a long weekend doing absolutely nothing but wandering the cobbled streets of White Town.\n\nThe mustard-yellow colonial villas, draped in bright pink bougainvillea, made every corner look like a postcard. I spent my mornings sipping authentic French press coffee and eating buttery croissants at local cafes, and my evenings walking along the rocky promenade as the ocean breeze cooled the town. A visit to Auroville provided a beautiful afternoon of meditation. If you need a place to unwind and reflect, Pondy is it."
    },

    // --- OFFBEAT ---
    {
      id: 5,
      title: "Midnight in the White Desert",
      author: "Sarah Jenkins",
      state: "Gujarat",
      category: "Offbeat",
      date: "December 2023",
      likes: 289,
      img: "https://images.unsplash.com/photo-1623868583489-328b0309995c?auto=format&fit=crop&w=800&q=80",
      excerpt: "Watching the full moon rise over the Rann of Kutch. It looked like an endless ocean of salt glowing in the dark.",
      fullText: "Nothing can prepare you for the sheer scale of the Rann of Kutch. During the day, the white salt flats reflect the sun so brightly it blinds you. But at night, under a full moon, it becomes magical.\n\nWe attended the Rann Utsav, which was a beautiful explosion of Gujarati culture—folk dances, camel safaris, and incredible Kutchi embroidery stalls. But as midnight approached, we walked far out onto the salt desert, away from the festival lights.\n\nThe silence out there is absolute. The salt crunches under your boots, and the horizon blurs so perfectly with the sky that you feel like you are walking in outer space. Truly offbeat, truly incredible."
    },
    {
      id: 10,
      title: "The Monastery in the Clouds",
      author: "Tenzin Dorjee",
      state: "Himachal Pradesh",
      category: "Offbeat",
      date: "September 2023",
      likes: 530,
      img: "https://images.unsplash.com/photo-1623227866981-d131ec6d7c71?auto=format&fit=crop&w=800&q=80",
      excerpt: "Reaching the Key Monastery in Spiti Valley felt like stepping off the edge of the earth. The barren, cold desert is hauntingly beautiful.",
      fullText: "Spiti Valley is not for the faint of heart. The roads are non-existent, the altitude is dizzying, and the landscape is entirely barren. But that isolation is exactly what makes it so special.\n\nStanding before the Key Monastery, which sits perched atop a hill at 13,668 feet, I felt completely detached from the modern world. The monks welcomed us with hot butter tea, and we sat listening to their chants echoing through the cold, thin mountain air. There is no cell network here, no distractions. Just you, the wind, and the towering brown mountains of the cold desert."
    },
    {
      id: 15,
      title: "Trekking the Dzukou Valley",
      author: "Nikhil Verma",
      state: "Nagaland",
      category: "Offbeat",
      date: "June 2023",
      likes: 310,
      img: "https://images.unsplash.com/photo-1596168532056-b097e8870138?auto=format&fit=crop&w=800&q=80",
      excerpt: "Hidden away in the northeast, Dzukou Valley is a rolling carpet of emerald green. One of India's best-kept secrets.",
      fullText: "Nagaland is heavily underrated, and Dzukou Valley is its crown jewel. The trek up from Viswema village was steep and muddy, but the forest was incredibly lush and ancient.\n\nAs we crossed the final ridge, the valley revealed itself. Unlike the jagged peaks of the Himalayas, Dzukou consists of smooth, rolling hillocks covered entirely in dwarf bamboo, giving it the appearance of an endless, velvety green carpet. We camped in a cave overhang near an ice-cold stream. Waking up to the morning mist rolling across that untouched green expanse is an experience reserved only for those willing to go off the map."
    }
  ];

  const categories = ['All', 'Nature', 'Culture', 'Adventure', 'Relaxation', 'Offbeat'];

  const displayedStories = activeCategory === 'All' 
    ? allStories 
    : allStories.filter(story => story.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{ 
        position: 'relative', height: '45vh', minHeight: '400px',
        backgroundImage: 'url(https://www.himalayanecotourism.com/wp-content/uploads/2023/06/ladakh-matho-gompa-01.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.9))' }} />
        
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Sparkles size={16} /> Real Experiences, Real Explorers
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '800', color: 'white', marginBottom: '15px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '-1px' }}>
            Travel Diaries
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto', fontWeight: '400', lineHeight: '1.6' }}>
            Discover India through the eyes of our travellers. Get inspired, find hidden gems, and start planning your next chapter.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 2. CATEGORY FILTERS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '-30px', position: 'relative', zIndex: 10, marginBottom: '50px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '12px 24px', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease',
                backgroundColor: activeCategory === cat ? '#16a34a' : 'white',
                color: activeCategory === cat ? 'white' : '#4b5563',
                border: activeCategory === cat ? '1px solid #16a34a' : '1px solid #e5e7eb',
                boxShadow: activeCategory === cat ? '0 10px 20px rgba(22, 163, 74, 0.25)' : '0 4px 6px rgba(0,0,0,0.05)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. STORIES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '35px', marginBottom: '80px' }}>
          {displayedStories.map((story) => (
            <div 
              key={story.id} 
              onClick={() => setSelectedStory(story)}
              style={{ 
                backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                cursor: 'pointer', display: 'flex', flexDirection: 'column' 
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src={story.img} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
                
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '8px' }}>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#1f2937', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#16a34a" /> {story.state}
                  </span>
                  <span style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(4px)', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                    {story.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6b7280', marginBottom: '15px' }}>
                  <span style={{ fontWeight: '600', color: '#16a34a' }}>By {story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>
                
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '12px', lineHeight: '1.4' }}>
                  {story.title}
                </h3>
                
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '20px' }}>
                  {story.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '20px', marginTop: 'auto' }}>
                  <button style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0, cursor: 'pointer' }}>
                    Read Diary <ArrowRight size={16} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '13px', fontWeight: '600' }}>
                    <Heart size={16} /> {story.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CALL TO ACTION: PLAN YOUR STORY */}
        <div style={{ backgroundColor: '#111827', borderRadius: '30px', padding: '60px 40px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(17, 24, 39, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-30px', left: '-30px', opacity: 0.1 }}><Compass size={250} /></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '15px' }}>Ready to write your own story?</h2>
            <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 35px', lineHeight: '1.6' }}>
              Stop dreaming and start packing. Let our travel experts craft the perfect customized itinerary for your next adventure.
            </p>
            <button 
              onClick={() => navigate('/plan')}
              style={{ padding: '18px 40px', borderRadius: '50px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 20px rgba(22, 163, 74, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#15803d'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Plan My Trip <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* --- 5. THE STORY MODAL OVERLAY --- */}
      {selectedStory && (
        <div 
          onClick={() => setSelectedStory(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              backgroundColor: 'white', width: '100%', maxWidth: '850px', maxHeight: '90vh', 
              borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', 
              position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease-out forwards'
            }}
          >
            <button 
              onClick={() => setSelectedStory(null)} 
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10, transition: 'background 0.2s' }}
              onMouseEnter={(e)=>e.currentTarget.style.background='rgba(0,0,0,0.8)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(0,0,0,0.5)'}
            >
              <X size={24} />
            </button>

            <div style={{ height: '350px', flexShrink: 0, position: 'relative' }}>
              <img src={selectedStory.img} alt={selectedStory.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17, 24, 39, 0.9), transparent)' }} />
              
              <div style={{ position: 'absolute', bottom: '30px', left: '40px', right: '40px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={14} /> Travel Diary
                  </span>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {selectedStory.state}
                  </span>
                </div>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', lineHeight: '1.2' }}>{selectedStory.title}</h2>
              </div>
            </div>

            <div style={{ padding: '40px', overflowY: 'auto', backgroundColor: '#f9fafb' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px', borderBottom: '1px solid #e5e7eb', paddingBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '22px' }}>
                    {selectedStory.author.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '18px' }}>{selectedStory.author}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {selectedStory.date}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='#ef4444'} onMouseLeave={(e)=>e.currentTarget.style.color='#6b7280'}>
                    <Heart size={18} />
                  </button>
                  <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='#0284c7'} onMouseLeave={(e)=>e.currentTarget.style.color='#6b7280'}>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '18px', lineHeight: '1.9', color: '#374151', whiteSpace: 'pre-line' }}>
                <p style={{ fontSize: '22px', fontStyle: 'italic', color: '#111827', marginBottom: '30px', borderLeft: '4px solid #16a34a', paddingLeft: '20px' }}>
                  "{selectedStory.excerpt}"
                </p>
                {selectedStory.fullText}
              </div>
              
              <div style={{ marginTop: '50px', backgroundColor: '#f0fdf4', padding: '30px', borderRadius: '16px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#15803d', marginBottom: '10px' }}>Inspired by this story?</h4>
                <p style={{ color: '#166534', marginBottom: '20px' }}>Explore top cities, spots, and hidden gems in {selectedStory.state}.</p>
                <button 
                  onClick={() => navigate(`/state/${encodeURIComponent(selectedStory.state)}`)}
                  style={{ padding: '14px 30px', borderRadius: '50px', backgroundColor: '#16a34a', color: 'white', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
                >
                  Explore {selectedStory.state}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default StoriesPage;