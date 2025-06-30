import { useState } from "react";
import { Plus } from "lucide-react";
import SearchWidget from "./Search_widget";
import FactCheckResultPage from "./Factcheck_res";
import ExtensionInstallModal from "./ExtensionInstallModal";

const HeroSection = () => {
  const [showResults, setShowResults] = useState(false);
  const [analyzedInput, setAnalyzedInput] = useState("");
  const [detectedMode, setDetectedMode] = useState("url");
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  const handleAddExtension = () => {
    setShowExtensionModal(true);
  };

  const handleAnalysisComplete = (input, mode) => {
    setAnalyzedInput(input);
    setDetectedMode(mode);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setAnalyzedInput("");
  };

  
  if (showResults) {
    return (
      <FactCheckResultPage 
        newsUrl={detectedMode === "url" ? analyzedInput : ""} 
        newsText={detectedMode === "text" ? analyzedInput : ""}
        detectedMode={detectedMode}
        onBack={handleBackToSearch} 
      />
    );
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#111827",
        overflow: "hidden",
      }}
    >
      {showExtensionModal && <ExtensionInstallModal onClose={() => setShowExtensionModal(false)} />}
   
      <div
        style={{
          position: "absolute",
          top: "12%", 
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            color: "#991B1B",
            opacity: 0.25,
            fontWeight: "900",
            fontSize: "clamp(8rem, 20vw, 25rem)",
            lineHeight: 1,
            userSelect: "none",
            transform: "rotate(-12deg)",
            animation: "floatAndGlow 6s ease-in-out infinite",
          }}
        >
          FAKE
        </div>
      </div>

      {/* Content overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center", 
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
            width: "100%",
            paddingTop: "2rem", 
            paddingBottom: "2rem", 
          }}
          className="lg:grid-cols-2"
        >
          {/* Left side - Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem", 
              justifyContent: "center",
            }}
          >
            <div style={{ animation: "slideInLeft 1s ease-out" }}>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: "700",
                  color: "white",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Your Shield Against
              </h1>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: "700",
                  lineHeight: 1.1,
                  color: "#DC2626",
                  animation: "textGlow 2s ease-in-out infinite alternate",
                  letterSpacing: "-0.02em",
                }}
              >
                Misinformation.
              </h1>
            </div>

            <p
              style={{
                color: "#D1D5DB",
                fontSize: "1.125rem",
                lineHeight: 1.6,
                maxWidth: "32rem",
                animation: "slideInLeft 1s ease-out 0.3s both",
                marginTop: "0.5rem", 
              }}
            >
              Verify news articles instantly with our advanced fact-checking
              technology. Protect yourself and others from false information
              spreading across the internet.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "1.5rem", 
                animation: "slideInLeft 1s ease-out 0.6s both",
              }}
              className="sm:flex-row"
            >
              <button
                onClick={handleAddExtension}
                style={{
                  backgroundColor: "#D97706",
                  color: "white",
                  padding: "1.5rem 2rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  animation: "buttonPulse 2s ease-in-out infinite",
                  maxWidth: "fit-content", // Prevent button from stretching
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#B45309";
                  e.target.style.transform = "scale(1.05) translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(217, 119, 6, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#D97706";
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <Plus size={20} />
                Add extension
              </button>

              <button
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #DC2626",
                  color: "#DC2626",
                  padding: "1.5rem 2rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  maxWidth: "fit-content", // Prevent button from stretching
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DC2626";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(220, 38, 38, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#DC2626";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Learn More
              </button>
            </div>

            {/* Trust indicators */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                paddingTop: "2rem",
                animation: "slideInLeft 1s ease-out 0.9s both",
                flexWrap: "wrap", // Allow wrapping on smaller screens
              }}
            >
              <div style={{ textAlign: "center", minWidth: "80px" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#16A34A",
                    animation: "countUp 2s ease-out 1.2s both",
                  }}
                >
                  1M+
                </div>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                  }}
                >
                  Articles Verified
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: "80px" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#16A34A",
                    animation: "countUp 2s ease-out 1.4s both",
                  }}
                >
                  99.8%
                </div>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                  }}
                >
                  Accuracy Rate
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: "80px" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#16A34A",
                    animation: "countUp 2s ease-out 1.6s both",
                  }}
                >
                  24/7
                </div>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                  }}
                >
                  Monitoring
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Search widget */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Center the widget vertically
              animation: "slideInRight 1s ease-out 0.5s both",
            }}
            className="lg:justify-end"
          >
            <SearchWidget onAnalysisComplete={handleAnalysisComplete} />
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), transparent, rgba(17, 24, 39, 0.5))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <style jsx>{`
        @keyframes floatAndGlow {
          0%,
          100% {
            transform: rotate(-12deg) translateY(0px);
            opacity: 0.25;
            filter: drop-shadow(0 0 20px rgba(153, 27, 27, 0.3));
          }
          25% {
            transform: rotate(-12deg) translateY(-10px);
            opacity: 0.3;
            filter: drop-shadow(0 0 30px rgba(153, 27, 27, 0.4));
          }
          50% {
            transform: rotate(-12deg) translateY(-15px);
            opacity: 0.35;
            filter: drop-shadow(0 0 40px rgba(153, 27, 27, 0.5));
          }
          75% {
            transform: rotate(-12deg) translateY(-10px);
            opacity: 0.3;
            filter: drop-shadow(0 0 30px rgba(153, 27, 27, 0.4));
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
          }
          100% {
            text-shadow:
              0 0 20px rgba(220, 38, 38, 0.6),
              0 0 30px rgba(220, 38, 38, 0.4);
          }
        }

        @keyframes buttonPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(217, 119, 6, 0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .lg\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          .lg\\:justify-end {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;