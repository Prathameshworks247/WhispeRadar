import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2, Image as ImageIcon, X } from "lucide-react";
import axios from "axios";

const SocialMediaFactCheck = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError("Image size should be less than 50MB");
        return;
      }
      setSelectedImage(file);
      setError("");
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText("");
    setResult(null);
    setError("");
  };

  const handleFactCheck = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setExtractedText("");

    try {
      // Step 1: Extract text from image
      const formData = new FormData();
      formData.append('image', selectedImage);

      const textResponse = await axios.post("http://localhost:8060/extract-text/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const text = textResponse.data.extracted_text;
      setExtractedText(text);

      if (!text || text.trim() === "") {
        throw new Error("Text extraction failed.");
      }

      // Step 2: Send extracted text to fact-check
      const factCheckResponse = await axios.post("http://localhost:8000/factcheck", {
        text: text
      });

      const data = factCheckResponse.data;

      const structuredResult = {
        credibility_score: data.credibility_score || 0,
        explanation: data.explanation || "No explanation available.",
        source: data.source || "",
        verdict: data.verdict || "Unknown",
        error: null,
      };
      setResult(structuredResult);
    } catch (err) {
      console.error(err);
      setResult({
        credibility_score: 0,
        explanation: "Fact-check failed. Please try again.",
        source: "",
        verdict: "Unknown",
        error: "Fact-check failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resultData = result && !result.error
    ? {
        summary: result.explanation,
        status: result.verdict,
        confidence: `${result.credibility_score}%`,
        source: result.source,
        falsePercentage: result.verdict === "False" ? result.credibility_score : result.verdict === "True" ? 100 - result.credibility_score : 50,
        truePercentage: result.verdict === "True" ? result.credibility_score : result.verdict === "False" ? 100 - result.credibility_score : 50,
      }
    : {
        summary: loading ? "Checking..." : result?.error || "No data available",
        status: loading ? "Checking..." : "Unknown",
        confidence: "...",
        source: "",
        falsePercentage: 0,
        truePercentage: 0,
      };

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", padding: "2rem", color: "white" }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Social Media Fact Check</h2>
        <p style={{ color: "#9CA3AF", marginBottom: "2rem" }}>
          Upload an image to extract and fact-check the text.
        </p>

        <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
          ← Back to Home
        </button>

        {!imagePreview ? (
          <div style={{ border: "2px dashed #374151", padding: "2rem", borderRadius: "0.5rem", textAlign: "center", backgroundColor: "#1F2937" }}>
            <Upload size={48} />
            <h3>Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" style={{ backgroundColor: "#16A34A", padding: "0.75rem 1.5rem", borderRadius: "0.375rem", cursor: "pointer", color: "white" }}>
              Choose Image
            </label>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "0.5rem", border: "2px solid #374151" }} />
              <button onClick={removeImage} style={{ position: "absolute", top: "-10px", right: "-10px", backgroundColor: "#DC2626", color: "white", borderRadius: "50%", width: "30px", height: "30px" }}>
                <X size={16} />
              </button>
            </div>
            <button onClick={handleFactCheck} disabled={loading} style={{ marginTop: "1rem", padding: "0.75rem 2rem", backgroundColor: "#16A34A", color: "white", borderRadius: "0.375rem" }}>
              {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Analyzing...</> : <>Check Image</>}
            </button>
          </div>
        )}

        {error && <div style={{ backgroundColor: "#991B1B", padding: "1rem", borderRadius: "0.375rem", marginTop: "1rem" }}>{error}</div>}

        {!loading && extractedText && (
          <div style={{ marginTop: "2rem" }}>
            <h4 style={{ color: "#93C5FD" }}>Extracted Text:</h4>
            <p style={{ backgroundColor: "#1F2937", padding: "1rem", borderRadius: "0.375rem", color: "#E5E7EB" }}>{extractedText}</p>
          </div>
        )}

        {!loading && result && (
          <div style={{ marginTop: "2rem" }}>
            <h3>Verdict: <span style={{ color: resultData.status === "False" ? "#EF4444" : "#10B981" }}>{resultData.status}</span></h3>
            <p><strong>Confidence:</strong> {resultData.confidence}</p>
            <p><strong>Explanation:</strong> {resultData.summary}</p>
            {resultData.source && (
              <p><strong>Source:</strong> <a href={resultData.source} target="_blank" rel="noopener noreferrer" style={{ color: "#3B82F6" }}>{resultData.source}</a></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaFactCheck;
