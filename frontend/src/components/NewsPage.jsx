import React, { useState } from "react";

const categorySources = {
  "Local News": [
    { name: "The Times of India - City", url: "https://timesofindia.indiatimes.com/city" },
    { name: "Hindustan Times - Cities", url: "https://www.hindustantimes.com/cities" },
  ],
  "Politics": [
    { name: "The Hindu - Politics", url: "https://www.thehindu.com/news/national/" },
    { name: "NDTV Politics", url: "https://www.ndtv.com/india" },
  ],
  "Movies": [
    { name: "IMDb News", url: "https://www.imdb.com/news/movie" },
    { name: "Bollywood Hungama", url: "https://www.bollywoodhungama.com/news/" },
  ],
  "National News": [
    { name: "Indian Express - India", url: "https://indianexpress.com/section/india/" },
    { name: "The Hindu - National", url: "https://www.thehindu.com/news/national/" },
  ],
  "Science": [
    { name: "Indian Express - Science", url: "https://indianexpress.com/section/technology/science/" },
    { name: "Science News", url: "https://www.sciencenews.org/" },
  ],
  "Classifieds": [
    { name: "Quikr", url: "https://www.quikr.com/" },
    { name: "OLX", url: "https://www.olx.in/" },
  ],
  "International News": [
    { name: "BBC World", url: "https://www.bbc.com/news/world" },
    { name: "CNN World", url: "https://edition.cnn.com/world" },
  ],
  "Sports": [
    { name: "ESPN India", url: "https://www.espn.in/" },
    { name: "Cricbuzz", url: "https://www.cricbuzz.com/" },
  ],
  "Art & Culture": [
    { name: "The Hindu - Art & Culture", url: "https://www.thehindu.com/entertainment/art/" },
    { name: "Culture Trip", url: "https://theculturetrip.com/asia/india/" },
  ],
};

const Newspage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const newsCategories = [
    { name: "Local News", color: "#F3F4F6", textColor: "#1F2937"},
    { name: "Politics", color: "#D1D5DB", textColor: "#1F2937" },
    { name: "Movies", color: "#F3F4F6", textColor: "#1F2937" },
    { name: "National News", color: "#9CA3AF", textColor: "#1F2937" },
    { name: "Science", color: "#F8C4C4", textColor: "#1F2937",},
    { name: "Classifieds", color: "#D1D5DB", textColor: "#1F2937" },
    { name: "International News", color: "#F3F4F6", textColor: "#1F2937" },
    { name: "Sports", color: "#D1D5DB", textColor: "#1F2937" },
    { name: "Art & Culture", color: "#F3F4F6", textColor: "#1F2937" },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "400",
            color: "#1F2937",
            marginBottom: "3rem",
            fontFamily: "serif",
          }}
        >
          Latest News
        </h1>

        {/* News Categories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: "900px",
          }}
        >
          {newsCategories.map((category, index) => (
            <button
              key={index}
              style={{
                backgroundColor: category.color,
                color: category.textColor,
                border: "none",
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                fontSize: "1.25rem",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "serif",
                textAlign: "center",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
              onClick={() => {
                setSelectedCategory(category.name);
                setModalOpen(true);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Modal for news sources */}
        {modalOpen && selectedCategory && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              animation: "fadeIn 0.3s"
            }}
            onClick={() => setModalOpen(false)}
          >
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              .modal-box::-webkit-scrollbar { width: 8px; background: #f3f4f6; }
              .modal-box::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
              @media (max-width: 600px) {
                .modal-box { min-width: 90vw !important; padding: 1rem !important; }
              }
            `}</style>
            <div
              className="modal-box"
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2.5rem 2rem 2rem 2rem",
                minWidth: "350px",
                maxWidth: "95vw",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                position: "relative",
                border: "1.5px solid #e5e7eb",
                overflowY: "auto",
                maxHeight: "80vh",
                transition: "box-shadow 0.2s",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close X icon */}
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "1.1rem",
                  right: "1.2rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.35rem",
                  color: "#9ca3af",
                  cursor: "pointer",
                  zIndex: 10,
                  transition: "color 0.2s"
                }}
                aria-label="Close"
                onMouseOver={e => (e.target.style.color = '#ef4444')}
                onMouseOut={e => (e.target.style.color = '#9ca3af')}
              >
                ×
              </button>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#1F2937", textAlign: "center", letterSpacing: "0.01em" }}>
                {selectedCategory} Sources
              </h3>
              <div style={{ borderBottom: "1.5px solid #e5e7eb", margin: "0.5rem 0 1.5rem 0" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {(categorySources[selectedCategory] || []).map((site, idx) => (
                  <li key={idx} style={{ marginBottom: "1rem" }}>
                    <button
                      style={{
                        background: "#f3f4f6",
                        color: "#1f2937",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.75rem",
                        padding: "0.85rem 1.25rem 0.85rem 1.1rem",
                        fontSize: "1.08rem",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        transition: "background 0.18s, box-shadow 0.18s, border 0.18s",
                      }}
                      onClick={() => window.open(site.url, "_blank")}
                      onMouseOver={e => {
                        e.target.style.background = '#e0e7ef';
                        e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                        e.target.style.border = '1.5px solid #a5b4fc';
                      }}
                      onMouseOut={e => {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                        e.target.style.border = '1px solid #e5e7eb';
                      }}
                    >
                      <span style={{ fontSize: "1.2em", color: "#2563eb" }}>🌐</span>
                      {site.name}
                      <span style={{ marginLeft: "auto", color: "#6b7280", fontSize: "1.1em" }}>↗</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                style={{
                  marginTop: "1.5rem",
                  background: "#e0e7ef",
                  color: "#374151",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1.2rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: 500,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "background 0.18s"
                }}
                onClick={() => setModalOpen(false)}
                onMouseOver={e => (e.target.style.background = '#fca5a5')}
                onMouseOut={e => (e.target.style.background = '#e0e7ef')}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Additional Content Section */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem",
            backgroundColor: "#F9FAFB",
            borderRadius: "0.5rem",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: "1rem",
            }}
          >
            Stay Informed with Verified News
          </h2>
          <p
            style={{
              color: "#6B7280",
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            Browse through our categorized news sections to find the latest
            updates across different topics. All news sources are verified and
            fact-checked to ensure accuracy and reliability. Click on any
            category above to explore the latest articles and reports.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Newspage;