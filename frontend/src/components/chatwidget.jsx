import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const ChatWidget = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Hello! I'm your FactCheck Assistant. I can help you verify information, analyze sentiment, and answer questions. How can I assist you today?",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [lastRedirectIntent, setLastRedirectIntent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    const userMsgObj = { 
      role: "user", 
      text: userMessage, 
      timestamp: new Date() 
    };
    
    setMessages((prev) => [...prev, userMsgObj]);
    setInput("");
    setIsLoading(true);

    // If user says yes and redirect intent exists, trigger the page change
    if (userMessage.toLowerCase().includes("yes") && lastRedirectIntent) {
      if (setCurrentPage) {
        setCurrentPage(lastRedirectIntent);
        setLastRedirectIntent(null);
      }
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      const botReply = data.reply;

      // Detect redirect intents in bot reply
      if (botReply.includes("redirect you to the Fact-check")) {
        setLastRedirectIntent("NEWS PAPERS");
      } else if (botReply.includes("redirect you to the Sentiment")) {
        setLastRedirectIntent("SENTIMENT_ANALYSIS");
      }

      const botMsgObj = { 
        role: "bot", 
        text: botReply, 
        timestamp: new Date() 
      };
      
      setMessages((prev) => [...prev, botMsgObj]);
    } catch (error) {
      const errorMsgObj = { 
        role: "bot", 
        text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment.", 
        timestamp: new Date(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsgObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === new Date(today.getTime() - 24*60*60*1000).toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 50 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: "#16A34A",
            borderRadius: "50%",
            height: "4rem",
            width: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(22, 163, 74, 0.4)",
            transition: "all 0.3s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 15px 40px rgba(22, 163, 74, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 10px 30px rgba(22, 163, 74, 0.4)";
          }}
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            width: "24rem",
            height: "32rem",
            borderRadius: "1rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #E5E7EB",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
              color: "white",
              padding: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>FactCheck Assistant</div>
                <div style={{ fontSize: "0.8rem", opacity: "0.9" }}>Online • Ready to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat body */}
          <div style={{ 
            flex: 1, 
            padding: "1rem", 
            overflowY: "auto",
            backgroundColor: "#F9FAFB",
            scrollbarWidth: "thin",
            scrollbarColor: "#D1D5DB #F9FAFB"
          }}>
            {messages.map((msg, i) => {
              const showDate = i === 0 || 
                formatDate(messages[i-1].timestamp) !== formatDate(msg.timestamp);
              
              return (
                <div key={i}>
                  {showDate && (
                    <div style={{
                      textAlign: "center",
                      margin: "1rem 0",
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      fontWeight: "500"
                    }}>
                      {formatDate(msg.timestamp)}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
                      marginBottom: "1rem",
                      gap: "0.5rem",
                    }}
                  >
                    {msg.role === "bot" && (
                      <div style={{
                        backgroundColor: "#16A34A",
                        borderRadius: "50%",
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.25rem"
                      }}>
                        <Bot size={14} color="white" />
                      </div>
                    )}
                    <div style={{ maxWidth: "70%" }}>
                      <div
                        style={{
                          backgroundColor: msg.role === "bot" ? "white" : "#16A34A",
                          color: msg.role === "bot" ? "#374151" : "white",
                          padding: "0.875rem 1rem",
                          borderRadius: msg.role === "bot" ? "1rem 1rem 1rem 0.25rem" : "1rem 1rem 0.25rem 1rem",
                          fontSize: "0.9rem",
                          lineHeight: "1.5",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          border: msg.isError ? "1px solid #EF4444" : "none",
                          backgroundColor: msg.isError ? "#FEF2F2" : (msg.role === "bot" ? "white" : "#16A34A"),
                          color: msg.isError ? "#DC2626" : (msg.role === "bot" ? "#374151" : "white"),
                        }}
                      >
                        {msg.text}
                      </div>
                      <div style={{
                        fontSize: "0.75rem",
                        color: "#9CA3AF",
                        marginTop: "0.25rem",
                        textAlign: msg.role === "bot" ? "left" : "right",
                        paddingLeft: msg.role === "bot" ? "0.5rem" : "0",
                        paddingRight: msg.role === "bot" ? "0" : "0.5rem"
                      }}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                    {msg.role === "user" && (
                      <div style={{
                        backgroundColor: "#6B7280",
                        borderRadius: "50%",
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.25rem"
                      }}>
                        <User size={14} color="white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "1rem",
                gap: "0.5rem",
              }}>
                <div style={{
                  backgroundColor: "#16A34A",
                  borderRadius: "50%",
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.25rem"
                }}>
                  <Bot size={14} color="white" />
                </div>
                <div style={{ maxWidth: "70%" }}>
                  <div style={{
                    backgroundColor: "white",
                    padding: "0.875rem 1rem",
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    fontSize: "0.9rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <div style={{
                      display: "flex",
                      gap: "0.25rem"
                    }}>
                      <div style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        backgroundColor: "#16A34A",
                        borderRadius: "50%",
                        animation: "bounce 1.4s infinite ease-in-out both"
                      }}></div>
                      <div style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        backgroundColor: "#16A34A",
                        borderRadius: "50%",
                        animation: "bounce 1.4s infinite ease-in-out both",
                        animationDelay: "0.16s"
                      }}></div>
                      <div style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        backgroundColor: "#16A34A",
                        borderRadius: "50%",
                        animation: "bounce 1.4s infinite ease-in-out both",
                        animationDelay: "0.32s"
                      }}></div>
                    </div>
                    <span style={{ color: "#6B7280" }}>Typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ 
            padding: "1rem", 
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "white"
          }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  style={{
                    width: "100%",
                    border: "1px solid #D1D5DB",
                    borderRadius: "1rem",
                    padding: "0.75rem 1rem",
                    fontSize: "0.9rem",
                    resize: "none",
                    minHeight: "2.5rem",
                    maxHeight: "6rem",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    fontFamily: "inherit",
                    lineHeight: "1.4"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#16A34A";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                  }}
                  rows={1}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                style={{
                  backgroundColor: input.trim() && !isLoading ? "#16A34A" : "#E5E7EB",
                  color: input.trim() && !isLoading ? "white" : "#9CA3AF",
                  border: "none",
                  borderRadius: "50%",
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.backgroundColor = "#15803D";
                  }
                }}
                onMouseLeave={(e) => {
                  if (input.trim() && !isLoading) {
                    e.target.style.transform = "scale(1)";
                    e.target.style.backgroundColor = "#16A34A";
                  }
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;
