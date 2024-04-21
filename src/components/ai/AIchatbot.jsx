import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Replace if needed
import MDEditor from "@uiw/react-md-editor";
import InputBox from "./InputBox"; // Assuming InputBox is a separate component
import logo from "../../assets/HomePageText2.png";

const genAI = new GoogleGenerativeAI('AIzaSyCobw72pFKOeULAZWTBnV8srQxNgYopnkQ'); // Replace with your API key (if used)
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Placeholder model (replace if needed)

const Header = () => {
  return (
    <div className="bg-gray-200 p-4 text-center">
      <h1 className="flex items-center justify-center">
        <img src={logo} alt="gemini" width={120} className="mr-2" />
        <b className="text-lg">Fitness Chatbot</b>
      </h1>
      <small>Get fit with personalized guidance</small>
    </div>
  );
};

const AIChatbot = () => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  useEffect(() => {
    if (!initialMessageSent) {
      sendMessage("Hi! What are your fitness goals?");
      setInitialMessageSent(true);
    }
  }, []);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (inputText) => {
    if (!inputText) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      // Placeholder logic - potentially replace with Gemini-Pro API integration
      const responseText = await handleFitnessQuery(inputText);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseText, sender: "user", timestamp: new Date() }, // Update for AI response
      ]);
    } catch (error) {
      console.error("Error processing message: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I encountered an issue. Try rephrasing your question.", sender: "ai", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder function for fitness query handling (replace with actual implementation)
  const handleFitnessQuery = async (inputText) => {
    // Potentially leverage Gemini-Pro API or other fitness data sources here
    // Based on the user's input, provide relevant fitness information or recommendations
    // For example:
    // - If the user asks about exercises for a specific muscle group, return exercise suggestions.
    // - If the user asks about healthy meal plans, return sample meal plans.
    // - If the user asks for workout routines, recommend suitable routines based on their goals and fitness level.

    const exampleResponse =
      "Here are some tips for getting started with your fitness journey. It's important to set realistic goals and find activities you enjoy. Let me know if you'd like exercise suggestions or healthy meal plan ideas.";
    return exampleResponse;
  };

  return (
    <div className="max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <Header />
      <div className="chat-container bg-gray-100 p-4 h-64 overflow-y-auto" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "bg-gray-200" : "bg-blue-200"} rounded-lg p-2 my-1`}
          >
            {message.isCode ? (
              <MDEditor.Markdown source={message.text} style={{ whiteSpace: "pre-wrap" }} />
            ) : (
              <>
                <div className={`message-container ${message.sender === "user" ? "text-left" : "text-right"}`}>
                  <p className="message-text">{message.text}</p>
                  <span className="time block text-xs text-gray-500">
                    {message.timestamp ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss") : ""}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <InputBox sendMessage={sendMessage} loading={loading} />
    </div>
  );
};

export default AIChatbot;