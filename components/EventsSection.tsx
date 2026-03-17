"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Tag, ExternalLink } from "lucide-react";

const events = [
  { title: "WHU AI Agent大赛决赛", date: "2026-03-20", time: "14:00 - 18:00", location: "武汉大学计算机学院", organizer: "WHU-OPC", type: "竞赛", participants: 200, status: "upcoming" as const, description: "WHU AI Agent Challenge决赛，50支队伍角逐总奖金50000元", tags: ["AI Agent", "竞赛", "武大"], color: "from-[#6C63FF] to-[#8B7FFF]" },
  { title: "LangChain实战工作坊", date: "2026-03-15", time: "10:00 - 17:00", location: "武汉大学创业学院", organizer: "自强Studio", type: "工作坊", participants: 50, status: "upcoming" as const, description: "从零开始学习LangChain，构建你的第一个RAG应用", tags: ["LangChain", "RAG", "实战"], color: "from-[#00D1FF] to-[#4DE1FF]" },
  { title: "武汉高校AI交流会", date: "2026-03-25", time: "19:00 - 21:00", location: "武汉大学信息学部", organizer: "武汉AI联盟", type: "交流会", participants: 150, status: "upcoming" as const, description: "武汉各高校AI爱好者交流分享，探讨AI最新进展", tags: ["交流", "武汉", "高校"], color: "from-[#00FFA3] to-[#4DFFBD]" },
  { title: "Prompt Engineering大师课", date: "2026-04-01", time: "14:00 - 16:00", location: "线上", organizer: "WHU AI Playground", type: "讲座", participants: 500, status: "upcoming" as const, description: "邀请行业专家分享Prompt Engineering实战经验", tags: ["Prompt", "讲座", "线上"], color: "from-[#FFD166] to-[#FFDD8C]" },
  { title: "AI创业项目路演", date: "2026-04-10", time: "13:30 - 17:30", location: "武汉光谷创业街", organizer: "武汉政府", type: "路演", participants: 100, status: "upcoming" as const, description: "武汉AI创业项目展示，投资人现场对接", tags: ["创业", "投资", "路演"], color: "from-[#FF6B9D] to-[#FF8BAD]" },
  { title: "GPT-4应用开发分享会", date: "2026-02-28", time: "19:00 - 21:00", location: "武汉大学", organizer: "自强Studio", type: "分享会", participants: 80, status: "past" as const, description: "学长分享GPT-4应用开发经验，包含实际案例演示", tags: ["GPT-4", "开发", "分享"], color: "from-[#9D7FFF] to-[#BD9FFF]" },
];

const upcomingEvents = events.filter((e) => e.status === "upcoming");
const pastEvents = events.filter((e) => e.status === "past");

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const eventDates = upcomingEvents.map((e) => new Date(e.date).getDate());

export function EventsSection() {
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD166]/10 border border-[#FFD166]/30 mb-4">
            <Calendar className="w-4 h-4 text-[#FFD166]" />
            <span className="text-sm text-gray-300">AI任务大厅</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">AI活动</h1>
          <p className="text-lg sm:text-xl text-gray-400">武汉AI活动入口</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveView("list")}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeView === "list"
                ? "bg-gradient-to-r from-[#FFD166] to-[#FF9A00] text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            活动列表
          </button>
          <button
            type="button"
            onClick={() => setActiveView("calendar")}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeView === "calendar"
                ? "bg-gradient-to-r from-[#FFD166] to-[#FF9A00] text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            日历视图
          </button>
        </div>

        {activeView === "list" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <span>即将举行</span>
                <span className="text-sm text-gray-500">({upcomingEvents.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${event.color} bg-opacity-20 text-sm`}>
                        {event.type}
                      </div>
                      <div className="text-xs text-gray-500">{event.organizer}</div>
                    </div>
                    <h3 className="text-xl mb-3 group-hover:text-[#FFD166] transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{event.participants} 人参与</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => window.alert("报名即将开启，请先加入社群")}
                      className="w-full py-3 bg-gradient-to-r from-[#FFD166] to-[#FF9A00] text-black rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      立即报名
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <span>往期活动</span>
                <span className="text-sm text-gray-500">({pastEvents.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <div key={index} className="group opacity-60 hover:opacity-100 transition-opacity">
                    <div className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${event.color} bg-opacity-20 text-sm`}>
                          {event.type}
                        </div>
                        <div className="text-xs text-gray-500">已结束</div>
                      </div>
                      <h3 className="text-xl mb-3">{event.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-4 w-full py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <span>查看回顾</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "calendar" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1A1C24] border border-white/10 rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl">2026年3月</h2>
                <div className="flex gap-2">
                  <button type="button" className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all">
                    上月
                  </button>
                  <button type="button" className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all">
                    下月
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
                {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-4">
                {calendarDays.map((day) => {
                  const hasEvent = eventDates.includes(day);
                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        hasEvent
                          ? "bg-gradient-to-br from-[#FFD166]/20 to-[#FF9A00]/20 border border-[#FFD166]/30 hover:border-[#FFD166]/50"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className={`text-base sm:text-lg ${hasEvent ? "text-[#FFD166]" : "text-gray-400"}`}>
                        {day}
                      </div>
                      {hasEvent && <div className="w-1 h-1 rounded-full bg-[#FFD166] mt-1" />}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-sm text-gray-400 mb-4">本月活动</h3>
                <div className="space-y-2">
                  {upcomingEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                      <span className="text-gray-400">{event.date}</span>
                      <span className="text-white">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
