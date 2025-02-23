"use client";

import {
  Search,
  Settings,
  LogOut,
  Zap,
  BarChart3,
  Send,
  Mic,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FeatureCard from "./components/feature-card";
import Logo from "./assets/logo.svg";
import Avatar from "./assets/avatar.svg";
import Loader from "./components/loader";
import { VoiceInteractionScreen } from "./components/call-ai";

interface Message {
  timestamp: number | Date;
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderExpanded, _] = useState(false);
  const [showVoiceScreen, setShowVoiceScreen] = useState(false);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestionMessages = [
    "ما هي ميزانية الوزارة لعام 2025 ؟",
    "ما هي الميزانية العامة لوزارة البيئة ؟",
    "ما هي ميزانية الوزارة لعام 2025 ؟",
    "ما هي الميزانية العامة لوزارة البيئة ؟",
  ];

  const sendMessage = (text: string = message) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: text,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      setIsLoading(true);
      setShowFeatures(false);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now(),
          text: "هذا رد تجريبي من المساعد الرقمي.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleVoiceScreen = () => {
    setShowVoiceScreen(!showVoiceScreen);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]); //Fixed unnecessary dependency

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => setLoading(false), 2500);
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div
        className={`min-h-screen bg-gradient-custom text-white flex relative`}
      >
        {/* Mobile Menu Icon */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-transparent border border-[#1B1B1B] p-2 rounded-full"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Sidebar */}
        <aside
          className={`
        w-64 border border-[#1B1B1B] p-4 flex flex-col
        fixed inset-y-0 right-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        md:relative md:translate-x-0
      `}
        >
          <div className="mx-auto text-center border-b-1 border-solid border-[#1B1B1B] p-4 ">
            <img
              src={Logo}
              alt="Diamond Logo"
              className="w-[160px] mb-6 mx-auto curosr-pointer"
              onClick={() => {
                setShowFeatures(!showFeatures);
                setMessages([]);
              }}
            />
            <button className="bg-[#F16827] text-white text-xl px-4 py-2 rounded-lg mb-4 w-full cursor-pointer">
              + طلب خدمة جديدة
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="البحث"
                className="w-full search-input text-white px-4 py-2 rounded-lg pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <hr className="border-[#1B1B1B]" />

          {/* History Section */}
          <div className="mt-6 p-4 text-">
            <h3 className="text-gray-400 mb-2 text-xl">سجل البحث</h3>
            <ul className="space-y-2">
              {["بحث سابق 1", "بحث سابق 2", "بحث سابق 3"].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-lg cursor-pointer"
                >
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 ml-2 text-gray-400" />
                    {item}
                  </span>
                  {/* <ChevronLeft className="w-4 h-4 text-gray-400" /> */}
                </li>
              ))}
            </ul>
          </div>

          {/* Settings and Logout */}
          <div className="mt-auto space-y-1 border-top-300">
            <hr className="border-[#1B1B1B]" />
            <button className="text-gray-400 hover:text-white flex items-center gap-2 w-full px-4 py-2">
              <Settings className="w-4 h-4" />
              الإعدادات
            </button>
            <button className="text-red-400 hover:text-white flex items-center gap-2 w-full px-4 py-2">
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen bg-transparent w-screen transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div
            className={`p-4 md:p-8 transition-all duration-300 ${
              isHeaderExpanded ? " max-h-16" : "max-h-96"
            } overflow-hidden`}
          >
            <h1 className="text-[48px] font-bold mb-2 text-center mt-20">
              مرحباً بك في مساعدك الرقمي الذكي
            </h1>
            <p className="text-3xl mb-5 md:mb-12  text-center">
              لوزارة البيئة والمياه والزراعة
            </p>
            {showFeatures && (
              <p className="text-2xl text-center w-[50%] mx-auto">
                مرحباً بك في مساعدك الرقمي الذكي للمالية والميزانية ! أنا هنا
                لأساعدك في كل ما يتعلق باستفساراتك حول مؤشرات الأداء المالية
                والميزانية. سواء كنت ترغب في الاطلاع على أحدث أرقام الميزانية,
                يمكنك ببساطة كتابة سؤالك، وسأحرص على تزويدك بالمعلومات بطريقة
                سهلة وسريعة.
              </p>
            )}
          </div>

          {/* Chat Section */}
          <div
            className={`flex-1 p-8 overflow-hidden flex flex-col w-[70%] mx-auto w-full md:w-[60%] ${
              messages.length === 0 ? "justify-center" : ""
            }`}
          >
            <div
              className={`rounded-lg ${
                showFeatures ? "border border-[#1B1B1B]" : ""
              } ${messages.length > 0 ? "h-full" : "h-auto"} flex flex-col`}
            >
              {messages.length > 0 && (
                <div ref={chatBoxRef} className="flex-1 p-6 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      } mb-4 animate-message-in`}
                    >
                      <div
                        className={`rounded-2xl p-4 max-w-[70%] ${
                          msg.sender === "user"
                            ? "bg-orange-500 text-white ml-auto"
                            : "bg-gray-700/70 text-gray-100 mr-auto"
                        }`}
                      >
                        <p className="text-lg">{msg.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {new Date(msg.timestamp).toLocaleTimeString("ar-SA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-center mb-4">
                      <div className="bg-orange-500 rounded-2xl p-4 max-w-[200px]">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input Section */}
              <div className={`p-4 border border-black/10 rounded-lg`}>
                <div className="relative mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-[90%] border border-gray-700/30 backdrop-blur-sm rounded-lg py-3 pl-12 pr-4 text-right"
                  />
                  <button
                    onClick={() => {}}
                    className="absolute left-39 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => sendMessage()}
                    className="absolute left-29 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleVoiceScreen()}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <img src={Avatar} alt="Avatar" />
                  </button>
                </div>

                {/* Suggestion Messages */}
                {messages.length === 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {suggestionMessages.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(suggestion)}
                        className="hover:bg-gray-600/50 border border-[#1D1D1D] text-white px-4 py-2 rounded-full text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Grid - Hidden after first message */}
          {messages.length === 0 && (
            <div className="p-8 animate-fade-in w-[70%] mx-auto hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-1">
                <FeatureCard
                  icon={<BarChart3 className="w-8 h-8" />}
                  title="زيادة الكفاءة"
                  description="تحسين وتسريع العمليات اليومية"
                />
                <FeatureCard
                  icon={<Settings className="w-8 h-8" />}
                  title="إدارة متخصصة"
                  description="تحكم بجميع الخدمات بسهولة"
                />
                <FeatureCard
                  icon={<Zap className="w-8 h-8" />}
                  title="وصول وثائقي"
                  description="سهولة الوصول إلى المستندات"
                />
              </div>
            </div>
          )}
        </main>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        {showVoiceScreen && (
          <VoiceInteractionScreen onClose={toggleVoiceScreen} />
        )}
      </div>
    </>
  );
}
