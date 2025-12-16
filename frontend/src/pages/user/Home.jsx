import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaBolt, FaCalendarAlt, FaGamepad, FaLaptop, FaCamera, FaArrowRight, FaTruck, FaHeadset, FaClipboardCheck } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const heroImages = [
  { 
    title: "PlayStation 5", 
    price: "₹500/day", 
    img: "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    title: "High-End Gaming PC", 
    price: "₹800/day", 
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    title: "Pro DSLR Camera", 
    price: "₹600/day", 
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    title: "Vlogging Gear Kit", 
    price: "₹300/day", 
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" 
  }
];

function Home() {
  const { user } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10%",
          background: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #050505 100%)",
          position: "relative",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ maxWidth: "600px", zIndex: 10 }}
        >
          <motion.h1
            variants={fadeInUp}
            style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              marginBottom: "20px",
              background: "linear-gradient(to right, #818cf8, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Own the <br /> Experience, <br /> Not the Device.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            style={{
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              marginBottom: "40px",
              lineHeight: "1.7",
            }}
          >
            Rent PS5s, MacBooks, and Cameras starting at just <strong>₹199/day</strong>.
            Experience the latest tech without the commitment.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: "flex", gap: "20px" }}>
            <Link to={user ? "/products" : "/register"}>
              <button
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem",
                  background: "linear-gradient(to right, #4f46e5, #9333ea)",
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                Start Renting <FaArrowRight />
              </button>
            </Link>
            {!user ? (
                  <Link to="/register">
                    <button
                      style={{
                        padding: "1rem 2.5rem",
                        fontSize: "1.1rem",
                        background: "transparent",
                        border: "1px solid var(--text-muted)",
                        color: "var(--text-main)",
                      }}
                    >
                      Sign Up
                    </button>
                  </Link>
            ) : (
                  <Link to="/dashboard">
                    <button
                      style={{
                         padding: "1rem 2.5rem",
                         fontSize: "1.1rem",
                         background: "rgba(255,255,255,0.1)",
                         border: "1px solid var(--primary)",
                         color: "white"
                      }}
                    >
                      Dashboard
                    </button>
                  </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Floating 3D Element with Carousel */}
        <motion.div
          key={currentImageIndex} // Key change triggers animation
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            borderRadius: "30px",
            boxShadow: "0 20px 50px rgba(79, 70, 229, 0.3)",
          }}
          className="hero-image" 
        >
             <img 
               src={heroImages[currentImageIndex].img} 
               alt={heroImages[currentImageIndex].title}
               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "30px" }}
             />
        </motion.div>
        
        {/* Mobile-friendly style tweak via style tag for simplicity in this file */}
        <style>{`
          @media (max-width: 900px) {
            .hero-image { display: none !important; }
            section { flex-direction: column; text-align: center; padding: 100px 20px !important; }
            .stay-relaxed-grid { grid-template-columns: 1fr !important; }
          }
          .stay-relaxed-grid {
            display: grid;
            gap: 40px;
            text-align: left;
            grid-template-columns: repeat(2, 1fr);
          }
        `}</style>
      </section>



      {/* CATEGORIES SECTION */}
      <section style={{ padding: "80px 10%", background: "#0f172a" }}>
         <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "60px" }}>Trending Categories</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            {[
                { name: "Gaming", img: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=800", icon: <FaGamepad /> },
                { name: "Gaming PCs", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800", icon: <FaLaptop /> },
                { name: "Photography", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800", icon: <FaCamera /> },
            ].map((cat, index) => (
                <Link to={user ? "/products" : "/register"} key={index} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    <motion.div
                       whileHover={{ scale: 1.05 }}
                       style={{
                           position: "relative",
                           height: "300px",
                           borderRadius: "20px",
                           overflow: "hidden",
                           cursor: "pointer"
                       }}
                    >
                        <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "30px"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--primary)", marginBottom: "5px" }}>
                                {cat.icon}
                                <span style={{ fontWeight: "bold" }}>Rent Now</span>
                            </div>
                            <h3 style={{ fontSize: "1.8rem" }}>{cat.name}</h3>
                        </div>
                    </motion.div>
                </Link>
            ))}
         </div>
      </section>

      {/* STEPS SECTION */}
      <section style={{ padding: "80px 10% 40px", background: "#050505", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "60px" }}>How It Works</h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "100px", position: "relative" }}>
              {/* Line connector simulation */}
              <div 
                  style={{ 
                      position: "absolute", 
                      top: "40px", 
                      left: "50%", 
                      transform: "translateX(-50%)", 
                      width: "300px", 
                      height: "2px", 
                      background: "#334155", 
                      zIndex: 0, 
                      display: "none" 
                  }} 
                  className="desktop-line"
              ></div>
              
              {[
                  { step: "01", title: "Select Product", desc: "Choose your gadget & tenure." },
                  { step: "02", title: "Fast Delivery", desc: "Get it delivered within 4 hours." },
              ].map((item, index) => (
                  <div key={index} style={{ position: "relative", zIndex: 1, flex: "0 1 250px", minWidth: "250px" }}>
                      <div style={{ 
                          width: "80px", 
                          height: "80px", 
                          background: "var(--bg-card)", 
                          border: "2px solid var(--primary)", 
                          borderRadius: "50%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          fontSize: "1.5rem", 
                          fontWeight: "bold",
                          margin: "0 auto 20px",
                          color: "white"
                      }}>
                          {item.step}
                      </div>
                      <h3 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{item.title}</h3>
                      <p style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
              ))}
              <style>{`
                 @media (min-width: 900px) { .desktop-line { display: block !important; } }
              `}</style>
          </div>
      </section>

      {/* STAY RELAXED SECTION */}
      <section style={{ padding: "40px 10% 80px", background: "#050505" }}>
        <div 
          style={{ 
            background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)", 
            borderRadius: "30px", 
            padding: "60px 40px",
            border: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center"
          }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "2.8rem", marginBottom: "20px", background: "linear-gradient(to right, #2dd4bf, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Stay relaxed. While you rent.
          </motion.h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto 60px", fontSize: "1.1rem", lineHeight: "1.8" }}>
            For us, quality isn't just a service — it's a commitment. Every product we rent reflects our mission to make sharing exceptional, reliable, and truly worth experiencing.
          </p>

          <div className="stay-relaxed-grid">
             {/* Feature 1 */}
             <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ minWidth: "60px", height: "60px", background: "rgba(45, 212, 191, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <FaShieldAlt size={28} color="#2dd4bf" />
                </div>
                <div>
                   <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Zero Deposit</h3>
                   <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      Starting out is tough. That's why we offer premium gear with zero deposit—rent freely, no friction.
                   </p>
                </div>
             </div>

             {/* Feature 2 */}
             <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ minWidth: "60px", height: "60px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <FaTruck size={28} color="#3b82f6" />
                </div>
                <div>
                   <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Instant Deliveries</h3>
                   <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      No logistics hassle — We handle pickup and drop-off citywide. Get your gear delivered in 2-4 hours.
                   </p>
                </div>
             </div>

             {/* Feature 3 */}
             <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ minWidth: "60px", height: "60px", background: "rgba(168, 85, 247, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <FaHeadset size={28} color="#a855f7" />
                </div>
                <div>
                   <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Instant Prompt Help</h3>
                   <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      Last-minute question or "bro, help!" moment? Real people, fast replies, no bots.
                   </p>
                </div>
             </div>

             {/* Feature 4 */}
             <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ minWidth: "60px", height: "60px", background: "rgba(244, 204, 21, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <FaClipboardCheck size={28} color="#facc15" />
                </div>
                <div>
                   <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>7-Point Inspection</h3>
                   <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      Every product passes a 7-point check—cleaned, tested, packed, and double-checked.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
