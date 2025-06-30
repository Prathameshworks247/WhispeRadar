import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";

const SearchWidget = ({ onAnalysisComplete }) => {
  const [newsLink, setNewsLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");

    if (!newsLink.trim()) {
      setError("Please enter the news (URL or text)");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Fact-checking input:", newsLink);

      // Detect if input is a URL or text
      const isURL = newsLink.startsWith("http://") || newsLink.startsWith("https://");
      
      if (onAnalysisComplete) {
        // Pass both the input and the detected type
        onAnalysisComplete(newsLink, isURL ? "url" : "text");
      }
    } catch (error) {
      setError("Failed to analyze the article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      data-search-widget="true"
      style={{
        background: "rgba(31, 41, 55, 0.8)",
        backdropFilter: "blur(8px)",
        border: "1px solid #374151",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <h3
        style={{
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Is this News True?
      </h3>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Paste the news link or text"
          value={newsLink}
          onChange={(e) => {
            setNewsLink(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          style={{
            backgroundColor: "#111827",
            border: error ? "1px solid #EF4444" : "1px solid #374151",
            borderRadius: "0.375rem",
            color: "white",
            padding: "0.75rem",
            fontSize: "0.875rem",
            flex: 1,
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#16A34A";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#EF4444" : "#374151";
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !newsLink.trim()}
          style={{
            backgroundColor: "#16A34A",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: isLoading || !newsLink.trim() ? "not-allowed" : "pointer",
            opacity: isLoading || !newsLink.trim() ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!isLoading && newsLink.trim()) {
              e.target.style.backgroundColor = "#15803D";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && newsLink.trim()) {
              e.target.style.backgroundColor = "#16A34A";
            }
          }}
        >
          {isLoading ? (
            <>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Analyzing...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {error && (
        <p
          style={{
            color: "#F87171",
            fontSize: "0.875rem",
            marginTop: "0.5rem",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "0.75rem",
        }}
      >
        <ExternalLink size={16} style={{ color: "#9CA3AF" }} />
        <p
          style={{
            color: "#9CA3AF",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          Paste any news article link or text to verify its authenticity
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchWidget;