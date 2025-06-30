import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Header = ({ onNavigationChange, currentPage }) => {
  const [activeLink, setActiveLink] = useState(currentPage || "HOME");
  const [isFactCheckDropdownOpen, setIsFactCheckDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveLink(currentPage || "HOME");
  }, [currentPage]);

  const navItems = [
    { name: "HOME", href: "#" },
    { name: "FACT CHECK", href: "#", hasDropdown: true },
    { name: "NEWS PAPERS", href: "#" },
    { name: "TRENDING", href: "#" },
    { name: "SUPPORT", href: "#" },
  ];

  const handleNavClick = (itemName) => {
    setActiveLink(itemName);
    if (onNavigationChange) {
      onNavigationChange(itemName);
    }
  };

  const handleFactCheckClick = () => {
    handleNavClick("HOME");
    setTimeout(() => {
      const searchWidget =
        document.querySelector("[data-search-widget]") ||
        document.querySelector('input[placeholder*="News"]') ||
        document.querySelector('input[placeholder*="link"]');
      if (searchWidget) {
        searchWidget.scrollIntoView({ behavior: "smooth", block: "center" });
        searchWidget.focus();
      }
    }, 100);
    setIsFactCheckDropdownOpen(false);
  };

  const handleSentimentAnalysisClick = () => {
    handleNavClick("SENTIMENT_ANALYSIS");
    setIsFactCheckDropdownOpen(false);
  };

  const handlePropagandaAnalysisClick = () => {
    handleNavClick("PROPAGANDA_ANALYSIS");
    setIsFactCheckDropdownOpen(false);
  };

  const handleSocialMediaFactCheckClick = () => {
    setIsFactCheckDropdownOpen(false);
    // Navigate to the social media fact check page
    window.location.href = "/social-media-factcheck";
  };

  return (
    <header
      style={{
        backgroundColor: activeLink === "NEWS PAPERS" ? "#FFFFFF" : "#111827",
        borderBottom: `1px solid ${
          activeLink === "NEWS PAPERS" ? "#E5E7EB" : "#374151"
        }`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: activeLink === "NEWS PAPERS" ? "#1F2937" : "white",
              }}
            >
              <span style={{ color: "#DC2626" }}>Fact</span>Check
            </span>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {navItems.map((item) => (
              <div key={item.name} style={{ position: "relative" }}>
                {item.hasDropdown ? (
                  <div style={{ position: "relative" }}>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color:
                          item.name === activeLink ||
                          (item.name === "FACT CHECK" &&
                            activeLink === "SENTIMENT_ANALYSIS") ||
                          (item.name === "FACT CHECK" &&
                            activeLink === "PROPAGANDA_ANALYSIS")
                            ? "#DC2626"
                            : activeLink === "NEWS PAPERS"
                            ? "#1F2937"
                            : "white",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        padding: "0.5rem 0",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        borderBottom:
                          activeLink === item.name ||
                          (item.name === "FACT CHECK" &&
                            activeLink === "SENTIMENT_ANALYSIS") ||
                          (item.name === "FACT CHECK" &&
                            activeLink === "PROPAGANDA_ANALYSIS")
                            ? "2px solid #DC2626"
                            : "none",
                        transition: "color 0.2s ease",
                      }}
                      onClick={() =>
                        setIsFactCheckDropdownOpen(!isFactCheckDropdownOpen)
                      }
                    >
                      {activeLink === "SENTIMENT_ANALYSIS"
                        ? "Sentiment Analysis"
                        : activeLink === "PROPAGANDA_ANALYSIS"
                        ? "Propaganda Analysis"
                        : item.name}
                      <ChevronDown size={16} />
                    </button>

                    {isFactCheckDropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          backgroundColor:
                            activeLink === "NEWS PAPERS"
                              ? "#FFFFFF"
                              : "#1F2937",
                          border: `1px solid ${
                            activeLink === "NEWS PAPERS" ? "#E5E7EB" : "#374151"
                          }`,
                          borderRadius: "0.5rem",
                          padding: "0.5rem 0",
                          minWidth: "180px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                          zIndex: 100,
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color:
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            padding: "0.75rem 1rem",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            transition: "background-color 0.2s ease",
                          }}
                          onClick={handleFactCheckClick}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#DC2626";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color =
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white";
                          }}
                        >
                          Fact Check
                        </button>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color:
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            padding: "0.75rem 1rem",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            transition: "background-color 0.2s ease",
                          }}
                          onClick={handleSocialMediaFactCheckClick}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#DC2626";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color =
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white";
                          }}
                        >
                          Social Media Fact Check
                        </button>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color:
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            padding: "0.75rem 1rem",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            transition: "background-color 0.2s ease",
                          }}
                          onClick={handleSentimentAnalysisClick}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#DC2626";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color =
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white";
                          }}
                        >
                          Sentiment Analysis
                        </button>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color:
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            padding: "0.75rem 1rem",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            transition: "background-color 0.2s ease",
                          }}
                          onClick={handlePropagandaAnalysisClick}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#DC2626";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color =
                              activeLink === "NEWS PAPERS"
                                ? "#1F2937"
                                : "white";
                          }}
                        >
                          Propaganda Analysis
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color:
                        item.name === "TRENDING"
                          ? "#DC2626"
                          : item.name === activeLink
                          ? "#DC2626"
                          : activeLink === "NEWS PAPERS"
                          ? "#1F2937"
                          : "white",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "0.5rem 0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      borderBottom:
                        activeLink === item.name ||
                        (item.name === "FACT CHECK" &&
                          activeLink === "SENTIMENT_ANALYSIS") ||
                        (item.name === "FACT CHECK" &&
                          activeLink === "PROPAGANDA_ANALYSIS")
                          ? "2px solid #DC2626"
                          : "none",
                      transition: "color 0.2s ease",
                    }}
                    onClick={() => handleNavClick(item.name)}
                    onMouseEnter={(e) => {
                      if (
                        item.name !== "TRENDING" &&
                        item.name !== activeLink
                      ) {
                        e.target.style.color = "#DC2626";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (
                        item.name !== "TRENDING" &&
                        item.name !== activeLink
                      ) {
                        e.target.style.color =
                          activeLink === "NEWS PAPERS" ? "#1F2937" : "white";
                      }
                    }}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {isFactCheckDropdownOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
          }}
          onClick={() => setIsFactCheckDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
