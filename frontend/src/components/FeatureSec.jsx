import {Clock,Users,Shield, Award} from "lucide-react";

const FeatureSection = () => {
    const features = [
        {
        icon: Shield,
        title: "Advanced AI Detection",
        description: "Utilizes cutting-edge AI algorithms to accurately detect deepfake content, ensuring high reliability and performance.",
    },
    {
        icon: Clock,
        title: "Real-time Verification",
        description: "Get instant results on any news article or claim. Our system processes information in seconds, not hours or days"
       },
       {
      icon: Users,
      title: "Community Driven",
      description:
        "Powered by a global network of fact-checkers, journalists, and AI technology working together to combat false information.",
    },
    {
      icon: Award,
      title: "Trusted by Millions",
      description:
        "Used by over 1 million people worldwide including journalists, educators, and concerned citizens who value truth.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#1F2937",
        padding: "5rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Why Choose <span style={{ color: "#DC2626" }}>FactCheck</span>?
          </h2>
          <p
            style={{
              color: "#D1D5DB",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "48rem",
              margin: "0 auto",
            }}
          >
            In an era of information overload, having a reliable fact-checking
            tool is essential. Here's what makes our platform the most trusted
            choice for millions worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                  padding: "1.5rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#DC2626";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#374151";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                    borderRadius: "0.5rem",
                    width: "3rem",
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Icon size={24} style={{ color: "#DC2626" }} />
                </div>
                <h3
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div
          style={{
            backgroundColor: "#111827",
            borderRadius: "1rem",
            padding: "2rem",
            border: "1px solid #374151",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#16A34A",
                  marginBottom: "0.5rem",
                }}
              >
                1.2M+
              </div>
              <div style={{ color: "#9CA3AF" }}>Articles Verified</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#16A34A",
                  marginBottom: "0.5rem",
                }}
              >
                99.8%
              </div>
              <div style={{ color: "#9CA3AF" }}>Accuracy Rate</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#16A34A",
                  marginBottom: "0.5rem",
                }}
              >
                50+
              </div>
              <div style={{ color: "#9CA3AF" }}>Countries Served</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#16A34A",
                  marginBottom: "0.5rem",
                }}
              >
                24/7
              </div>
              <div style={{ color: "#9CA3AF" }}>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
    
};
export default FeatureSection;