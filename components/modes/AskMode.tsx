"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { AnswerCanvas } from "../answer/AnswerCanvas";
import { TypingIndicator } from "../answer/TypingIndicator";
import { SuggestedQuestions } from "../answer/SuggestedQuestions";
import mockAnswers from "@/data/mockAnswers.json";
import { Send, ChevronDown } from "lucide-react";
import { MistralIcon } from "../icons/MistralIcon";

export function AskMode() {
  const { scope, query, setQuery } = useStore();
  const [answer, setAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, loading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = (questionText?: string) => {
    const queryText = questionText || inputValue;
    if (!queryText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: queryText,
    };
    setConversationHistory(prev => [...prev, userMessage]);
    
    setQuery(queryText);
    setInputValue("");
    setLoading(true);

    setTimeout(() => {
      let answerData;
      if (scope === 'library') {
        answerData = mockAnswers.library;
      } else if (scope === 'upload') {
        answerData = mockAnswers.upload;
      } else {
        answerData = mockAnswers.combined_conflict;
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: answerData,
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      setAnswer(answerData);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSubmit(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0A0A0A]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 w-full">
          <AnimatePresence mode="wait">
            {conversationHistory.length === 0 && !loading && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center w-full"
              >
                {/* AI Core Logo */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="mb-16 flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 mb-8 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center shadow-2xl shadow-orange-500/40"
                  >
                    <MistralIcon className="w-20 h-20 text-white" animate={false} />
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-black text-white mb-3 tracking-tight"
                  >
                    AI CORE
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-base font-medium"
                  >
                    Engineering Intelligence Platform
                  </motion.p>
                </motion.div>

                {/* Suggested Questions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="w-full max-w-3xl px-4"
                >
                  <SuggestedQuestions onSelect={handleSuggestedQuestion} />
                </motion.div>
              </motion.div>
            )}

            {/* Conversation Messages */}
            {conversationHistory.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="mb-8 w-full"
              >
                {message.type === 'user' ? (
                  <div className="flex justify-end w-full">
                    <div className="max-w-3xl w-full md:w-auto">
                      <div className="bg-[#2D2D2D] text-white px-6 py-4 rounded-2xl rounded-tr-sm">
                        <p className="text-[15px] leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-3xl w-full">
                    <AnswerCanvas answer={message.content} isStreaming={false} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full"
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 py-6 w-full">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full"
          >
            {/* Input Container */}
            <div className="relative bg-[#2D2D2D] rounded-xl border border-gray-700 focus-within:border-orange-500 transition-all w-full">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask anything!"
                rows={1}
                className="w-full px-5 py-4 text-[15px] text-white placeholder-gray-500 focus:outline-none bg-transparent resize-none max-h-40 leading-relaxed pr-14"
              />
              <button
                onClick={() => handleSubmit()}
                disabled={!inputValue.trim() || loading}
                className={`absolute right-3 bottom-3 p-2.5 rounded-lg transition-all ${
                  inputValue.trim() && !loading
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Model Selector */}
            <div className="flex items-center justify-between mt-4 text-sm flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-400 flex-wrap">
                <span className="font-medium">Model:</span>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2D2D2D] rounded-lg hover:bg-[#3D3D3D] transition-colors border border-gray-700">
                  <span className="text-white font-medium">AI Core v2.0</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-orange-400 text-xs font-medium">RAG-powered intelligence</span>
                </div>
              </div>
              <div className="text-gray-500 text-xs">
                Evidence-backed engineering answers
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
