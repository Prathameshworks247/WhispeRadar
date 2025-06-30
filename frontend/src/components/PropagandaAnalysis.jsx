import { useState } from "react";
import axios from "axios";

const PropagandaAnalysis = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [propagandaResult, setPropagandaResult] = useState(null);
  const [toxicityPercentage, setToxicityPercentage] = useState(0);
  const [toxicityExplanation, setToxicityExplanation] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const [propagandaRes,toxicityRes] = await Promise.all([
        axios.post("http://localhost:8040/detect_propaganda",  { data: text }),
        axios.post("http://localhost:8050/analyze-toxicity", { text: text}),
      ]);

      const propaganda = propagandaRes.data;
      const toxicity = toxicityRes.data;
      console.log("Raw propaganda response:", propagandaRes);

      const processedResult = {
        isPropaganda: propaganda === "propagandistic",
        confidence: Math.round(parseFloat(propaganda.score) * 100),
        reasoning:
          propaganda === "propagandistic"
            ? "The text shows indicators of propaganda."
            : "The text does not exhibit strong markers of propaganda.",
      };

      setPropagandaResult(processedResult);
      console.log("Propaganda Result:", processedResult);
      setToxicityPercentage(toxicity.toxicity_score);
      setToxicityExplanation(toxicity.label);
      setShowResults(true);
    } catch (error) {
      console.error("API call failed:", error);
      alert("Failed to analyze text. Make sure the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAnalyze();
    }
  };

  const getToxicityColor = (percentage) => {
    if (percentage < 30) return "#16A34A";
    if (percentage < 70) return "#F59E0B";
    return "#DC2626";
  };

  const getToxicityLevel = (percentage) => {
    if (percentage < 30) return "Low";
    if (percentage < 70) return "Medium";
    return "High";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111827", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Input Section */}
        <div style={{ backgroundColor: "#1F2937", borderRadius: "0.5rem", padding: "2rem", border: "1px solid #374151", marginBottom: "2rem" }}>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: "400", marginBottom: "2rem", fontFamily: "serif" }}>
            Propaganda & Hate Speech Detection
          </h2>
          <textarea
            placeholder="Enter text to analyze for propaganda and hate speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#111827",
              border: "2px solid #DC2626",
              borderRadius: "0.375rem",
              padding: "1rem",
              color: "white",
              fontSize: "0.875rem",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            style={{
              backgroundColor: "#DC2626",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.75rem 2rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: !text.trim() || isAnalyzing ? "not-allowed" : "pointer",
              opacity: !text.trim() || isAnalyzing ? 0.6 : 1,
              marginTop: "1rem"
            }}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* Result Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          {/* Propaganda Result */}
          <div style={{ backgroundColor: "#1F2937", borderRadius: "0.5rem", padding: "2rem", border: "1px solid #374151", opacity: showResults ? 1 : 0.5 }}>
            <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: "400", marginBottom: "2rem", textAlign: "center" }}>
              Propaganda Detection
            </h3>
            {showResults && propagandaResult && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: propagandaResult.isPropaganda ? "#DC2626" : "#16A34A", marginBottom: "1rem" }}>
                  {propagandaResult.isPropaganda ? "⚠" : "✅"}
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "600", color: propagandaResult.isPropaganda ? "#DC2626" : "#16A34A", marginBottom: "1rem" }}>
                  {propagandaResult.isPropaganda ? "Propaganda Detected" : "No Propaganda"}
                </div>

                <div style={{ backgroundColor: "#111827", padding: "1rem", borderRadius: "0.375rem", border: "1px solid #374151" }}>
                  <p style={{ color: "#D1D5DB", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                    {propagandaResult.reasoning}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Toxicity Result */}
          <div style={{ backgroundColor: "#1F2937", borderRadius: "0.5rem", padding: "2rem", border: "1px solid #374151", opacity: showResults ? 1 : 0.5 }}>
            <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: "400", marginBottom: "2rem", textAlign: "center" }}>
              Toxicity Level
            </h3>
            {showResults && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: getToxicityColor(toxicityPercentage), marginBottom: "1rem" }}>
                  {toxicityPercentage}%
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "600", color: getToxicityColor(toxicityPercentage), marginBottom: "2rem" }}>
                  {getToxicityLevel(toxicityPercentage)} Toxicity ({toxicityExplanation})
                </div>
                <div style={{ width: "100%", height: "20px", backgroundColor: "#374151", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem" }}>
                  <div style={{
                    width: `${toxicityPercentage}%`,
                    height: "100%",
                    backgroundColor: getToxicityColor(toxicityPercentage),
                    borderRadius: "10px",
                    transition: "width 1s ease-out"
                  }} />
                </div>
                <div style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {toxicityPercentage < 30 && "This text shows minimal signs of hate speech or harmful content."}
                  {toxicityPercentage >= 30 && toxicityPercentage < 70 && "This text contains moderate levels of potentially harmful content."}
                  {toxicityPercentage >= 70 && "This text contains high levels of hate speech or harmful content."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropagandaAnalysis;
