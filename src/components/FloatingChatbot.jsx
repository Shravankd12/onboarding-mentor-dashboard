import React, { useEffect } from "react";
import "./FloatingChatbot.css";

const FloatingChatbot = () => {
  useEffect(() => {
    // Dynamically load Zapier script once
    const scriptId = "zapier-chatbot-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.type = "module";
      script.src =
        "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="chatbot-container">
      <zapier-interfaces-chatbot-embed
        class="zapier-chatbot"
        is-popup="true"
        chatbot-id="cmetnewe6001rrx5sy2hq07c0"
      ></zapier-interfaces-chatbot-embed>
    </div>
  );
};

export default FloatingChatbot;
