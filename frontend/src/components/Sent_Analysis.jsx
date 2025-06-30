import { useState } from "react";
import axios from "axios";

const SentimentAnalysisPage = () => {
  const [newsText, setNewsText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
  };

  const handleAnalyze = async () => {
    if (!newsText.trim() && !audioFile) return;
    setIsAnalyzing(true);

    try {
      let finalText = newsText;

      // Step 1: Transcribe audio if uploaded
      if (audioFile) {
        const formData = new FormData();
        formData.append("file", audioFile);

        const transcriptionRes = await axios.post("http://127.0.0.1:8030/transcribe-audio", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        finalText = transcriptionRes.data.transcription;
        setNewsText(finalText); // auto-fill textarea
      }

      // Step 2: Analyze sentiment
      const predictRes = await axios.post("http://127.0.0.1:8030/predict", {
        text: finalText,
      });

      const result = predictRes.data;

      const updatedSentiments = Object.entries(result.emotion_scores).map(
        ([label, value]) => ({
          name: label,
          value: Math.round(value * 100),
          color: label === "joy" || label === "love" ? "#16A34A" : "#DC2626",
        })
      );

      setSentimentData(updatedSentiments);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      alert("Error analyzing sentiment.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAnalyze();
    }
  };

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
        {/* Upload and Input */}
        <div style={{ backgroundColor: "#1F2937", padding: "2rem", borderRadius: "1rem" }}>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontFamily: "serif" }}>Know the sentiment of this News</h2>

          {/* Audio Upload */}
          <div style={{ border: "2px dashed #16A34A", padding: "1rem", textAlign: "center", margin: "1rem 0" }}>
            <label style={{ color: "#16A34A", cursor: "pointer" }}>
              Click to upload audio
              <input type="file" accept="audio/*" onChange={handleAudioChange} style={{ display: "none" }} />
            </label>
            {audioFile && (
              <div style={{ marginTop: "0.5rem", color: "#ccc" }}>
                {audioFile.name}
                <button onClick={handleRemoveAudio} style={{ marginLeft: "1rem", background: "red", color: "white" }}>×</button>
              </div>
            )}
          </div>

          {/* Text Input */}
          <textarea
            placeholder="Or type/paste news content"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              width: "100%",
              height: "150px",
              backgroundColor: "#111827",
              border: "2px solid #16A34A",
              borderRadius: "0.375rem",
              padding: "1rem",
              color: "white",
              marginBottom: "1rem",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            style={{
              backgroundColor: "#16A34A",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isAnalyzing ? "Analyzing..." : "Search"}
          </button>
        </div>

        {/* Sentiment Results */}
        <div style={{ backgroundColor: "#1F2937", padding: "2rem", borderRadius: "1rem" }}>
          <h3 style={{ color: "white", fontSize: "1.5rem", textAlign: "center" }}>Sentiment</h3>

          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {showResults && sentimentData.map((sentiment, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "white", width: "100px" }}>{sentiment.name}</span>
                <div style={{ flex: 1, background: "#374151", height: "16px", borderRadius: "8px" }}>
                  <div style={{ width: `${sentiment.value}%`, height: "100%", background: sentiment.color, borderRadius: "8px" }}></div>
                </div>
                <span style={{ color: sentiment.color, fontWeight: "bold" }}>{sentiment.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisPage;
