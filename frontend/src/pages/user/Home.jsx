import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaBolt, FaCalendarAlt, FaGamepad, FaLaptop, FaCamera, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const heroImages = [
  { 
    title: "PlayStation 5", 
    price: "₹500/day", 
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c43c?q=80&w=1000&auto=format&fit=crop" 
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
            <Link to="/products">
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
            display: "none", // Hide on mobile, handled by media query
          }}
          className="hero-image" 
        >
             <img 
               src={heroImages[currentImageIndex].img} 
               alt={heroImages[currentImageIndex].title}
               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "30px" }}
             />
             
             {/* Overlay for glass effect */}
             <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", padding: "20px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h4>{heroImages[currentImageIndex].title}</h4>
                <p style={{ fontSize: "0.9rem", color: "#ddd" }}>Renting now at {heroImages[currentImageIndex].price}</p>
             </div>
        </motion.div>
        
        {/* Mobile-friendly style tweak via style tag for simplicity in this file */}
        <style>{`
          @media (max-width: 900px) {
            .hero-image { display: none !important; }
            section { flex-direction: column; text-align: center; padding: 100px 20px !important; }
          }
        `}</style>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "80px 10%", background: "#050505" }}>
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}
        >
          {[
            { icon: <FaBolt size={40} color="#facc15" />, title: "Instant Delivery", desc: "Get your gadgets delivered in less than 4 hours anywhere in Mumbai." },
            { icon: <FaCalendarAlt size={40} color="#60a5fa" />, title: "Flexible Tenure", desc: "Rent for a day, a week, or a month. Pay only for what you use." }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                padding: "30px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
                transition: "all 0.3s"
              }}
              className="feature-card"
            >
              <div style={{ background: "rgba(255,255,255,0.05)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{feature.title}</h3>
              <p style={{ color: "var(--text-muted)" }}>{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <section style={{ padding: "80px 10%", background: "#0f172a" }}>
         <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "60px" }}>Trending Categories</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
            {[
                { name: "Gaming", img: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=800", icon: <FaGamepad /> },
                { name: "Laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800", icon: <FaLaptop /> },
                { name: "Photography", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800", icon: <FaCamera /> },
            ].map((cat, index) => (
                <motion.div
                   key={index}
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
            ))}
         </div>
      </section>

      {/* STEPS SECTION */}
      <section style={{ padding: "100px 10%", background: "#050505", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "60px" }}>How It Works</h2>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", position: "relative" }}>
              {/* Line connector simulation */}
              <div style={{ position: "absolute", top: "40px", left: "10%", right: "10%", height: "2px", background: "#334155", zIndex: 0, display: "none" }} className="desktop-line"></div>
              
              {[
                  { step: "01", title: "Select Product", desc: "Choose your gadget & tenure." },
                  { step: "02", title: "Fast Delivery", desc: "Get it delivered within 4 hours." },
              ].map((item, index) => (
                  <div key={index} style={{ position: "relative", zIndex: 1, flex: 1, minWidth: "250px" }}>
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
    </div>
  );
}

export default Home;
