import React, { useState } from 'react';
import { 
  Briefcase, Users, Share2, Code, Send, ChevronDown, 
  CheckCircle2, ArrowRight, MapPin, Building, Loader2 
} from 'lucide-react';

// --- CAREERS DATA ---
const jobOpenings = [
  {
    id: 1,
    category: "Vendor Management",
    role: "Vendor Relations Manager",
    icon: Building,
    color: "#0284c7",
    bg: "#e0f2fe",
    type: "Full-Time",
    location: "Remote / Hybrid",
    jd: "We are looking for a dynamic individual to build and maintain relationships with our network of hotels, lodges, transport providers, and local guides. You will be responsible for negotiating contracts, onboarding new partners, ensuring quality compliance, and expanding the Odessey partner ecosystem across India."
  },
  {
    id: 2,
    category: "Customer Management",
    role: "Travel Experience Specialist",
    icon: Users,
    color: "#15803d",
    bg: "#dcfce7",
    type: "Full-Time",
    location: "Remote",
    jd: "Be the voice of Odessey! You will assist travelers in planning their custom itineraries, resolving queries, and providing real-time support during their trips. We need someone with deep empathy, excellent communication skills, and a passion for ensuring a 5-star travel experience."
  },
  {
    id: 3,
    category: "Social Media Management",
    role: "Social Media Strategist",
    icon: Share2,
    color: "#be185d",
    bg: "#fce7f3",
    type: "Full-Time",
    location: "Remote / Hybrid",
    jd: "Drive Odessey's digital presence. You will create engaging, wanderlust-inducing travel content, manage our Instagram and YouTube channels, run ad campaigns, and build a vibrant community of explorers. Must have an eye for design and a pulse on current social media trends."
  },
  {
    id: 4,
    category: "Website and App Backend Support",
    role: "Backend Developer (Node.js/Python)",
    icon: Code,
    color: "#6d28d9",
    bg: "#f3e8ff",
    type: "Full-Time",
    location: "Remote",
    jd: "Maintain and optimize the core infrastructure of the Odessey platform. You will manage map APIs (Ola Maps, OSM), handle database operations, optimize route-planning algorithms, and ensure high availability for our travel engine. Experience with RESTful APIs and cloud deployment is required."
  }
];

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState('careers'); // 'careers' or 'partner'
  const [expandedJob, setExpandedJob] = useState(null);
  
  // Form State for Partners
  const [formData, setFormData] = useState({
    businessName: '', contactPerson: '', email: '', phone: '',
    category: 'Hotel / Lodge / Resort', location: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleJob = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ businessName: '', contactPerson: '', email: '', phone: '', category: 'Hotel / Lodge / Resort', location: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Shared input style for perfect alignment
  const inputStyle = {
    width: '100%', 
    height: '50px', // Fixed height guarantees alignment
    padding: '0 15px', 
    borderRadius: '10px', 
    border: '1px solid #d1d5db', 
    outline: 'none', 
    fontSize: '15px',
    boxSizing: 'border-box', // Prevents padding from breaking width
    backgroundColor: 'white'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px' }}>
      
      {/* HERO SECTION */}
      <div style={{ backgroundColor: '#111827', padding: '120px 20px 60px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '15px' }}>Grow With Odessey</h1>
        <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
          Whether you want to build the future of travel with our internal team, or showcase your property to our travelers, you belong here.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '-30px auto 0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* TAB TOGGLE */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '50px', padding: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <button 
            onClick={() => setActiveTab('careers')}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '40px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: activeTab === 'careers' ? '#0284c7' : 'transparent', color: activeTab === 'careers' ? 'white' : '#6b7280' }}
          >
            <Briefcase size={20} /> Join Our Team
          </button>
          <button 
            onClick={() => setActiveTab('partner')}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '40px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: activeTab === 'partner' ? '#16a34a' : 'transparent', color: activeTab === 'partner' ? 'white' : '#6b7280' }}
          >
            <Building size={20} /> Partner With Us
          </button>
        </div>

        {/* CONTENT AREA */}
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          
          {/* --- TAB 1: CAREERS --- */}
          {activeTab === 'careers' && (
            <div>
              <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>Open Positions</h2>
                <p style={{ color: '#6b7280' }}>Help us redefine road trips and travel experiences across India.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {jobOpenings.map((job) => (
                  <div key={job.id} style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'all 0.3s' }}>
                    <div onClick={() => toggleJob(job.id)} style={{ padding: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '15px', backgroundColor: job.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <job.icon size={24} color={job.color} />
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 'bold', color: job.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{job.category}</p>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{job.role}</h3>
                          <div style={{ display: 'flex', gap: '15px', marginTop: '8px', fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {job.type}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={24} color="#9ca3af" style={{ transform: expandedJob === job.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                    </div>

                    <div style={{ maxHeight: expandedJob === job.id ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                      <div style={{ padding: '0 25px 25px 95px', color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6', marginBottom: '20px' }} />
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Role Overview</h4>
                        <p style={{ marginBottom: '20px' }}>{job.jd}</p>
                        <a href={`mailto:careers@odessey.in?subject=Application for ${job.role}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#111827', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s' }}>
                          Apply via Email <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB 2: PARTNER ONBOARDING --- */}
          {activeTab === 'partner' && (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Become an Odessey Partner</h2>
                <p style={{ color: '#6b7280' }}>Are you a hotel, transport agency, or local guide? Register your services with us to reach thousands of travelers.</p>
              </div>

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 size={60} color="#16a34a" style={{ margin: '0 auto 15px auto' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#15803d', marginBottom: '10px' }}>Enquiry Sent Successfully!</h3>
                  <p style={{ color: '#166534', margin: 0 }}>Our Vendor Management team will contact you within 24-48 hours to discuss partnership opportunities.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Business Name *</label>
                      <input required type="text" placeholder="e.g. Royal Palace Hotel" value={formData.businessName} onChange={e=>setFormData({...formData, businessName: e.target.value})} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Contact Person *</label>
                      <input required type="text" placeholder="Your Name" value={formData.contactPerson} onChange={e=>setFormData({...formData, contactPerson: e.target.value})} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Email Address *</label>
                      <input required type="email" placeholder="contact@business.com" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Phone Number *</label>
                      <input required type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Service Category *</label>
                      <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option>Hotel / Lodge / Resort</option>
                        <option>Transport / Cab Agency</option>
                        <option>Local Tour Guide</option>
                        <option>Adventure / Activity Organizer</option>
                        <option>Restaurant / Cafe</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Primary Location *</label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={18} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input required type="text" placeholder="e.g. Udaipur, Rajasthan" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} style={{ ...inputStyle, paddingLeft: '40px' }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Briefly describe your services</label>
                    <textarea rows="4" placeholder="Tell us about what you offer..." value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px', resize: 'vertical', boxSizing: 'border-box' }}></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s', marginTop: '10px' }}>
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Send size={20} /> Submit Partnership Enquiry</>}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default CareersPage;