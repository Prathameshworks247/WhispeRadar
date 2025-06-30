import { useState } from "react";
import axios from "axios";

const FactCheckResultPage = ({ newsUrl, newsText, detectedMode }) => {
  // Set initial mode based on detectedMode prop or fallback to URL if newsUrl exists
  const [mode, setMode] = useState(detectedMode || (newsUrl ? "url" : "text"));
  const [input, setInput] = useState(newsUrl || newsText || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFactCheckResult = async (activeMode, value) => {
    if (!value) return;
    setLoading(true);

    try {
      // Check if input looks like a real URL
      const isProbablyURL =
        value.startsWith("http://") || value.startsWith("https://");

      const payload =
        activeMode === "url" && isProbablyURL
          ? { url: value }
          : { text: value };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://localhost:8000/factcheck",
        payload
      );

      const structuredResult = {
        credibility_score: response.data.credibility_score || 0,
        explanation: response.data.explanation || "No explanation available.",
        source: response.data.source || "",
        verdict: response.data.verdict || "Unknown",
        error: null,
      };

      setResult(structuredResult);
    } catch (error) {
      console.error("Fact-check failed:", error);
      setResult({
        credibility_score: 0,
        explanation: "Fact-check failed. Please try again.",
        source: "",
        verdict: "Error",
        error: "Fact-check failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!input.trim()) return;
    setResult(null);
    fetchFactCheckResult(mode, input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const resultData =
    result && !result.error
      ? {
          summary: result.explanation,
          status: result.verdict,
          confidence: `${result.credibility_score}%`,
          source: result.source,
          falsePercentage:
            result.verdict === "False"
              ? result.credibility_score
              : result.verdict === "True"
              ? 100 - result.credibility_score
              : 50,
          truePercentage:
            result.verdict === "True"
              ? result.credibility_score
              : result.verdict === "False"
              ? 100 - result.credibility_score
              : 50,
        }
      : {
          summary: loading
            ? "Checking..."
            : result?.error || "No data available",
          status: loading ? "Checking..." : "Unknown",
          confidence: "...",
          source: "",
          falsePercentage: 0,
          truePercentage: 0,
        };

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const falseDash = (resultData.falsePercentage / 100) * circumference;
  const trueDash = (resultData.truePercentage / 100) * circumference;

  return (
    <div
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h2
          style={{
            color: "white",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontFamily: "serif",
          }}
        >
          Is this News True?
        </h2>

        {/* Toggle */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={() => setMode("url")}
            style={{
              backgroundColor: mode === "url" ? "#16A34A" : "#1F2937",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            URL
          </button>
          <button
            onClick={() => setMode("text")}
            style={{
              backgroundColor: mode === "text" ? "#16A34A" : "#1F2937",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Text
          </button>
        </div>

        {/* Input */}
        {mode === "url" ? (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter news URL..."
            style={{
              width: "100%",
              backgroundColor: "#1F2937",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Paste the news content..."
            rows={5}
            style={{
              width: "100%",
              backgroundColor: "#1F2937",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              resize: "vertical",
            }}
          />
        )}

        <button
          onClick={handleSearch}
          disabled={!input.trim()}
          style={{
            backgroundColor: input.trim() ? "#16A34A" : "#6B7280",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            padding: "0.75rem 2rem",
            cursor: input.trim() ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {/* Loading state */}
        {loading && (
          <div
            style={{ marginTop: "2rem", textAlign: "center", color: "white" }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #374151",
                borderTop: "4px solid #16A34A",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 1rem",
              }}
            />
            Fact-checking {mode === "url" ? "URL" : "text"}...
          </div>
        )}

        {/* Results */}
        {!loading && result && (
          <div style={{ marginTop: "2rem", color: "white" }}>
            <h3>
              Verdict:{" "}
              <span
                style={{
                  color: resultData.status === "False" ? "#EF4444" : "#10B981",
                }}
              >
                {resultData.status}
              </span>
            </h3>
            <p>
              <strong>Confidence:</strong> {resultData.confidence}
            </p>
            <p>
              <strong>Explanation:</strong> {resultData.summary}
            </p>
            {resultData.source && (
              <p>
                <strong>Source: </strong>
                <a
                  href={resultData.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3B82F6" }}
                >
                  {resultData.source}
                </a>
              </p>
            )}

            {/* Circle Chart */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <svg
                width="200"
                height="200"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#374151"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="12"
                  strokeDasharray={`${falseDash} ${circumference}`}
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="12"
                  strokeDasharray={`${trueDash} ${circumference}`}
                  strokeDashoffset={-falseDash}
                />
              </svg>

              {/* Center percentage display */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {resultData.falsePercentage}%
                </div>
                <div style={{ fontSize: "0.875rem", color: "#DC2626" }}>
                  False
                </div>
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#DC2626",
                    borderRadius: "50%",
                  }}
                />
                <span>False ({resultData.falsePercentage}%)</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#16A34A",
                    borderRadius: "50%",
                  }}
                />
                <span>True ({resultData.truePercentage}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FactCheckResultPage;
