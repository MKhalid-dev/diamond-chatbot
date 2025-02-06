"use client"

import { Search, Settings, LogOut, Zap, BarChart3, Send, Clock, ChevronLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import FeatureCard from "./components/feature-card"
import Logo from './assets/logo.svg'
import Loader from "./components/loader"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
}

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { id: Date.now(), text: message, sender: "user" }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")
      setIsExpanded(true)

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = { id: Date.now(), text: "هذا رد تجريبي من المساعد الرقمي.", sender: "ai" }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatBoxRef]) //Fixed unnecessary dependency

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => setLoading(false), 2500);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className={`min-h-screen bg-gradient-custom text-white flex relative overflow-hidden `}>
        {/* Sidebar */}
        <aside className="w-64 bg-[#1B1B1B] p-4 flex flex-col z-10">
          <div className="mb-6 mx-auto text-center ">
            <img
              src={Logo}
              alt="Diamond Logo"
              className="w-[160px] mb-6 mx-auto"
            />
            <button className="bg-[#F16827] text-white px-4 py-2 rounded-md mb-4 w-full cursor-pointer">+ طلب خدمة جديدة</button>
            <div className="relative">
              <input
                type="text"
                placeholder="البحث"
                className="w-full bg-[#2D2D2D] text-white px-4 py-2 rounded-md pr-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* History Section */}
          <div className="mb-6">
            <h3 className="text-gray-400 mb-2 text-sm">سجل البحث</h3>
            <ul className="space-y-2">
              {["بحث سابق 1", "بحث سابق 2", "بحث سابق 3"].map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm cursor-pointer">
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
          <div className="mt-auto space-y-2 border-top-300">
            <button className="text-gray-400 hover:text-white flex items-center gap-2 w-full">
              <Settings className="w-4 h-4" />
              الإعدادات
            </button>
            <button className="text-red-400 hover:text-white flex items-center gap-2 w-full">
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 relative z-0">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-right">مرحباً بك في مساعدك الرقمي الذكي</h1>
            <p className="text-xl mb-12 text-gray-300 text-right">لوزارة البيئة والمياه والزراعة</p>

            {/* Chat Layout */}
            <div
              className={`bg-[#2D2D2D] rounded-lg p-6 mb-12 transition-all duration-300 ease-in-out ${isExpanded ? "h-[60vh]" : "h-auto"}`}
            >
              <div ref={chatBoxRef} className={`mb-4 overflow-y-auto ${isExpanded ? "h-[calc(100%-60px)]" : "h-64"}`}>
                {!isExpanded && (
                  <div className="mb-4">
                    {/* Chat messages would go here */}
                    <div className="bg-[#3D3D3D] rounded p-2 mb-2 text-right">مرحبًا! كيف يمكنني مساعدتك اليوم؟</div>
                  </div>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"} mb-4`}>
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${msg.sender === "user"
                        ? "bg-[#F16827] text-white chat-bubble-user"
                        : "bg-[#4D4D4D] text-gray-200 chat-bubble-ai"
                        }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 bg-[#3D3D3D] rounded-l-lg py-3 px-4 text-right"
                />
                <button onClick={sendMessage} className="bg-[#F16827] text-white px-5 py-3 rounded-lg mr-2">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </main>
      </div>
    </>
  )
}
