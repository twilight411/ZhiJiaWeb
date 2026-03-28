"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Users, Clock, Tag, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import type { ActivityItem } from "@/lib/types";

export function EventsSection() {
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /** 获取活动列表数据 */
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const data = await api.getActivities({ size: 100 });
        setActivities(data.list);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const now = new Date();
  const upcomingEvents = useMemo(() => 
    activities.filter(a => new Date(a.endTime || a.startTime) >= now), 
  [activities, now]);
  
  const pastEvents = useMemo(() => 
    activities.filter(a => new Date(a.endTime || a.startTime) < now), 
  [activities, now]);

  const getColorByType = (type: string) => {
    switch (type) {
      case "whu": return "from-[#6C63FF] to-[#8B7FFF]";
      case "wuhan": return "from-[#00D1FF] to-[#4DE1FF]";
      case "contest": return "from-[#FFD166] to-[#FF9A00]";
      default: return "from-gray-500 to-gray-700";
    }
  };

  const getLabelByType = (type: string) => {
    switch (type) {
      case "whu": return "武大活动";
      case "wuhan": return "武汉活动";
      case "contest": return "竞赛大奖";
      default: return "AI活动";
    }
  };

  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const dateStr = startDate.toLocaleDateString();
    const startTimeStr = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (end) {
      const endDate = new Date(end);
      const endTimeStr = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return { date: dateStr, time: `${startTimeStr} - ${endTimeStr}` };
    }
    
    return { date: dateStr, time: startTimeStr };
  };

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDates = upcomingEvents.map((e) => new Date(e.startTime).getDate());

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

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
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => {
                    const { date, time } = formatDateTime(event.startTime, event.endTime);
                    return (
                      <div
                        key={event.id}
                        className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getColorByType(event.type)} bg-opacity-20 text-sm`}>
                            {getLabelByType(event.type)}
                          </div>
                          <div className="text-xs text-gray-500">{event.subtitle || "WHU AI"}</div>
                        </div>
                        <h3 className="text-xl mb-3 hover:text-[#FFD166] transition-colors">{event.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => event.registerUrl ? window.open(event.registerUrl, "_blank") : window.alert("报名即将开启，请先加入社群")}
                          className="w-full py-3 bg-gradient-to-r from-[#FFD166] to-[#FF9A00] text-black rounded-lg hover:shadow-lg transition-all font-medium"
                        >
                          {event.registerUrl ? "立即报名" : "查看详情"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500 bg-white/5 rounded-xl border border-white/10">暂无即将举行的活动</div>
              )}
            </div>

            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <span>往期活动</span>
                  <span className="text-sm text-gray-500">({pastEvents.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="group opacity-60 hover:opacity-100 transition-opacity">
                      <div className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getColorByType(event.type)} bg-opacity-20 text-sm`}>
                            {getLabelByType(event.type)}
                          </div>
                          <div className="text-xs text-gray-500">已结束</div>
                        </div>
                        <h3 className="text-xl mb-3">{event.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.startTime).toLocaleDateString()}</span>
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
            )}
          </div>
        )}

        {activeView === "calendar" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1A1C24] border border-white/10 rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl">{now.getFullYear()}年{now.getMonth() + 1}月</h2>
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
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                      <span className="text-gray-400">{new Date(event.startTime).toLocaleDateString()}</span>
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
