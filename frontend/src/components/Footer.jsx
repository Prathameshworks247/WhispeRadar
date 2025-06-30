import { Facebook,Twitter,Linkedin,Mail,Phone,MapPin } from "lucide-react";

const Footer = () =>  {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#111827", borderTop: "1px solid #374151" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem" }}
      >
        {/* Main Footer Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Logo and Description */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                <span style={{ color: "#DC2626" }}>Fact</span>Check
              </span>
            </div>
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "0.875rem",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Your trusted companion in the fight against misinformation.
              Protecting truth, one fact at a time.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#9CA3AF",
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#DC2626";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#9CA3AF";
                  }}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                color: "white",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Home",
                "Fact Check",
                "News Papers",
                "Trending",
                "About Us",
              ].map((link) => (
                <li key={link} style={{ marginBottom: "0.5rem" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#9CA3AF",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#9CA3AF";
                    }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              style={{
                color: "white",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Methodology",
                "API Documentation",
                "Browser Extension",
                "Mobile App",
                "Support",
              ].map((link) => (
                <li key={link} style={{ marginBottom: "0.5rem" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#9CA3AF",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#9CA3AF";
                    }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              style={{
                color: "white",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Contact Us
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail size={16} style={{ color: "#9CA3AF" }} />
                <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                  support@factcheck.com
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Phone size={16} style={{ color: "#9CA3AF" }} />
                <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MapPin size={16} style={{ color: "#9CA3AF" }} />
                <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: "1px solid #374151",
            marginTop: "2rem",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ color: "#9CA3AF", fontSize: "0.875rem", margin: 0 }}>
            © {currentYear} FactCheck. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use", "About FactCheck", "Contact Us", "Accessibility Help", "Cookies"].map(
              (link) => (
                <button
                  key={link}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#DC2626";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#9CA3AF";
                  }}
                >
                  {link}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;