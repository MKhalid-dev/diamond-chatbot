import { Mic, User2, X } from "lucide-react";

interface VoiceInteractionScreenProps {
  onClose: () => void;
}

export function VoiceInteractionScreen({ onClose }: VoiceInteractionScreenProps) {
  return (
    <div className="fixed inset-0 ai z-50 flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="text-center">
        <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-8">
          <User2 className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">تحدث مع المساعد الرقمي</h2>
        <p className="text-xl mb-8">انقر على الميكروفون وابدأ في التحدث</p>
        <button className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-colors">
          <Mic className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
