chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "factCheck",
      title: "Fact Check this",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "factCheck") {
      const selectedText = info.selectionText;
  
      fetch("http://localhost:8000/factcheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: selectedText })
      })
        .then(response => response.json())
        .then(data => {
          const verdict = data.verdict || data.result || "Unclear";
          const explanation = data.explanation || "No explanation available";
  
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showFactCheckPopup,
            args: [verdict, explanation]
          });
        })
        .catch(error => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showFactCheckPopup,
            args: ["Error", error.message]
          });
        });
    }
  });
  
  function showFactCheckPopup(verdict, explanation) {
    const existing = document.getElementById("fact-check-popup");
    if (existing) existing.remove();
  
    const popup = document.createElement("div");
    popup.id = "fact-check-popup";
    popup.innerHTML = `
      <div style="
        font-family: sans-serif;
        padding: 15px;
        background: white;
        color: #111;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        max-width: 350px;
        border-left: 5px solid ${verdict === "True" ? "#22c55e" : verdict === "False" ? "#ef4444" : "#facc15"};
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        transition: all 0.3s ease-in-out;
      ">
        <div style="font-size: 16px; font-weight: bold;">🔍 Fact Check Result: ${verdict}</div>
        <div style="margin-top: 8px; font-size: 14px;">${explanation}</div>
      </div>
    `;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 10000); // auto-dismiss after 10 seconds
  }
  