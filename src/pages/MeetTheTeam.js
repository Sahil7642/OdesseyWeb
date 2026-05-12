import React from 'react';
import { Sparkles, BrainCircuit, Camera, Clapperboard, MapPin, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  {
    name: "Apoorv Jha",
    role: "CTO",
    icon: BrainCircuit,
    image: "https://i.pinimg.com/564x/13/42/d4/1342d45e30d1d60937c15d4cff2e0115.jpg", // Placeholder profile image
    bio: "Building intelligent systems while staying competitive at the snooker table and TT court.",
    tagline: "Traveler by weekend • Biker at heart",
    color: "#0284c7",
    bg: "#e0f2fe"
  },
  {
    name: "Aashish Patel",
    role: "Travel Consultant",
    icon: Camera,
    image: "https://scontent.famd5-1.fna.fbcdn.net/v/t1.6435-9/169063950_186820526589320_359509869610422054_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=bXQoK5K5TYsQ7kNvwH5tvv6&_nc_oc=Adr0HccBWsfbf_lNjUtwtasKww6hJSiD0wrGdh88iY3sAfBuCjx2b-3jDuUmrtHbZUjpZw-c1W-50f6_J_ERCWcL&_nc_zt=23&_nc_ht=scontent.famd5-1.fna&_nc_gid=bZVFBCl6bYnVvNEW94HFwA&_nc_ss=7b289&oh=00_Af4-n5LA7epQOF486pf-PPiITgw6G8muSPD-_Z01aTEiaw&oe=6A26BF8D", // Placeholder profile image
    bio: "A travel enthusiast, photographer, tourist, and trekker. Bringing profound industry expertise to curate perfect journeys.",
    tagline: "15+ years in Travel & Hospitality",
    color: "#16a34a",
    bg: "#dcfce7"
  },
  {
    name: "Rakhi Soni",
    role: "Official Content Creator",
    icon: Clapperboard,
    image: "https://www.partysuppliesindia.com/cdn/shop/products/a1_40_5ccf2e61-57f8-45c9-b8d7-2743eb669b81.jpg?v=1735573930", // Placeholder profile image
    bio: "A vivid traveler with a relentless drive for original content ideas and storytelling.",
    tagline: "Dev by profession • Creator by passion • Traveler by obsession",
    color: "#be185d",
    bg: "#fce7f3"
  },
/*{
    name: "Sahil Gupta",
    role: "Chaprasi aka Chief of Random Tasks",
    icon: Users,
    image: "https://scontent.famd5-3.fna.fbcdn.net/v/t39.30808-6/305765591_145662084822133_2493774937437895424_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=wYKR7EEdak0Q7kNvwF3kyO6&_nc_oc=AdrAgTJXJjLl5dR0baTCSWENxcmpTEmGHr_nauKzxKCTL94I4HRDMlf2hX-PxkLaW9ctYc1yd56-ZOD0fA13a44T&_nc_zt=23&_nc_ht=scontent.famd5-3.fna&_nc_gid=Nk3XSBm4OWKQq4Vfk6RIOA&_nc_ss=7b289&oh=00_Af6Pauk0PGyglDho3cvs7nRDhAnowVZlEcDhA9BFQixmOw&oe=6A053B77", // Placeholder profile image
    bio: "Your go to guy for anything that us not important.",
    tagline: "Madam Paglu • Traveler",
    color: "#be185d",
    bg: "#fce7f3"
  },*/
];

const MeetTheTeam = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px' }}>
      
      {/* HERO SECTION */}
      <div style={{ position: 'relative', height: '40vh', minHeight: '350px', backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.9))' }} />
        
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            <Sparkles size={16} /> The Minds Behind Odessey
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'white', marginBottom: '15px', letterSpacing: '-1px' }}>Meet Our Team</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            We are a collective of developers, creators, and travel veterans united by one obsession: exploring the unseen.
          </p>
        </div>
      </div>

      {/* TEAM GRID */}
      <div style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'; }}
            >
              {/* Image Header */}
              <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  <member.icon size={22} color={member.color} />
                </div>
              </div>

              {/* Content Box */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'inline-block', backgroundColor: member.bg, color: member.color, padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'flex-start', marginBottom: '15px', letterSpacing: '0.5px' }}>
                  {member.role}
                </div>
                
                <h3 style={{ fontSize: '26px', fontWeight: '900', color: '#111827', marginBottom: '10px' }}>
                  {member.name}
                </h3>
                
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7', marginBottom: '20px', flex: 1 }}>
                  {member.bio}
                </p>

                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '20px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', fontWeight: '600' }}>
                    <MapPin size={16} color={member.color} />
                    {member.tagline}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div style={{ marginTop: '80px', backgroundColor: '#111827', borderRadius: '24px', padding: '50px', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>Want to travel with us?</h2>
          <p style={{ color: '#9ca3af', fontSize: '16px', maxWidth: '500px', marginBottom: '30px' }}>
            Our team has built the ultimate engine to help you discover and plan your next adventure across India.
          </p>
          <button 
            onClick={() => navigate('/discover')}
            style={{ padding: '16px 32px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}
            onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
          >
            Discover Destinations <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;