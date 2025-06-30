import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/hero_sec";
import FeaturesSection from "../components/FeatureSec";
import Footer from "../components/Footer";
import ChatWidget from "../components/chatwidget";
import NewsPage from "../components/NewsPage";
import SentimentAnalysisPage from "../components/Sent_Analysis";
import PropagandaAnalysis from "../components/PropagandaAnalysis";
import SocialMediaFactCheck from "../components/SocialMediaFactCheck";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("HOME");

  const handleNavigationChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "NEWS PAPERS":
        return <NewsPage />;
      case "SENTIMENT_ANALYSIS":
        return <SentimentAnalysisPage />;
      case "PROPAGANDA_ANALYSIS":
        return <PropagandaAnalysis />;
        case "SOCIAL_MEDIA_FACT_CHECK":
        return <SocialMediaFactCheck />;
      case "HOME":
      default:
        return (
          <>
            <HeroSection />
            <FeaturesSection />
          </>
        );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: currentPage === "NEWS PAPERS" ? "#FFFFFF" : "#111827",
      }}
    >
      {/* Header Navigation */}
      <Header
        onNavigationChange={handleNavigationChange}
        currentPage={currentPage}
      />

      <main>{renderPageContent()}</main>

      {currentPage === "HOME" && <Footer />}

      {/* Pass setCurrentPage to ChatWidget */}
      <ChatWidget setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Index;