import React, { useState } from "react";
import { CheckCircle, Users, Heart, Target, Zap, Star, TrendingUp, Brain } from "lucide-react";

type Section = {
  title: string;
  icon: React.ReactNode;
  items: string[];
};

type Topic = {
  name: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  sections: Section[];
};

type TopicKey = "ENGAGE" | "VOLUNTEER" | "GROW";

const CommunityReturningGuide: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicKey>("ENGAGE");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const topics: Record<TopicKey, Topic> = {
    ENGAGE: {
      name: "Community Engagement",
      subtitle: "Connect • Participate • Belong",
      description:
        "Steps to reconnect and actively participate in your community.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      sections: [
        {
          title: "Reconnect with Members",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Attend community meetings or events",
            "Reach out to familiar members",
            "Listen and understand current community needs",
          ],
        },
        {
          title: "Participate Actively",
          icon: <Zap className="w-5 h-5" />,
          items: [
            "Join committees or working groups",
            "Contribute ideas and feedback",
            "Engage respectfully in discussions",
          ],
        },
      ],
    },
    VOLUNTEER: {
      name: "Volunteering Opportunities",
      subtitle: "Serve • Support • Impact",
      description: "Find ways to give back and contribute meaningfully.",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-lime-500",
      sections: [
        {
          title: "Identify Opportunities",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Look for volunteer programs in your area",
            "Choose causes you are passionate about",
            "Assess your skills and availability",
          ],
        },
        {
          title: "Take Action",
          icon: <Star className="w-5 h-5" />,
          items: [
            "Sign up for community initiatives",
            "Commit to a regular schedule",
            "Collaborate with other volunteers",
          ],
        },
      ],
    },
    GROW: {
      name: "Personal & Community Growth",
      subtitle: "Learn • Mentor • Lead",
      description: "Develop yourself while helping others grow.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      sections: [
        {
          title: "Learn from Community",
          icon: <Brain className="w-5 h-5" />,
          items: [
            "Attend workshops and seminars",
            "Listen to diverse perspectives",
            "Reflect on experiences to improve",
          ],
        },
        {
          title: "Mentor & Support Others",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Share your skills with newcomers",
            "Offer guidance to community projects",
            "Encourage and recognize contributions",
          ],
        },
      ],
    },
  };

  const toggleCheck = (
    topicKey: TopicKey,
    sectionIndex: number,
    itemIndex: number
  ) => {
    const key = `${topicKey}-${sectionIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChecked = (
    topicKey: TopicKey,
    sectionIndex: number,
    itemIndex: number
  ): boolean => {
    const key = `${topicKey}-${sectionIndex}-${itemIndex}`;
    return checkedItems[key] || false;
  };

  const currentTopic = topics[activeTopic];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Returning to the Community
        </h1>
        <p className="text-lg text-gray-600">
          Steps to reconnect, contribute, and grow within your community
        </p>
      </div>

      {/* Topic Selector */}
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {Object.entries(topics).map(([key, topic]) => (
          <button
            key={key}
            onClick={() => setActiveTopic(key as TopicKey)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTopic === key
                ? "bg-white shadow-lg border-2 border-blue-200 text-gray-800"
                : "bg-white/80 hover:bg-white hover:shadow-md text-gray-600"
            }`}
          >
            {topic.icon}
            {topic.name}
          </button>
        ))}
      </div>

      {/* Active Topic */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className={`${currentTopic.color} text-white p-6`}>
          <div className="flex items-center gap-3 mb-2">
            {currentTopic.icon}
            <h2 className="text-2xl font-bold">{currentTopic.name}</h2>
          </div>
          <p className="text-xl opacity-90 mb-2">{currentTopic.subtitle}</p>
          <p className="opacity-80">{currentTopic.description}</p>
        </div>

        <div className="p-6">
          {currentTopic.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600">{section.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h3>
              </div>

              <div className="grid gap-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() =>
                      toggleCheck(activeTopic, sectionIndex, itemIndex)
                    }
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        isChecked(activeTopic, sectionIndex, itemIndex)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {isChecked(activeTopic, sectionIndex, itemIndex) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={`flex-1 ${
                        isChecked(activeTopic, sectionIndex, itemIndex)
                          ? "text-gray-500 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Community Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">
          💡 Quick Community Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            • <strong>Listen actively</strong> - Understand community needs
            before acting
          </div>
          <div>
            • <strong>Be consistent</strong> - Regular participation builds
            trust
          </div>
          <div>
            • <strong>Share skills</strong> - Help others grow while
            contributing
          </div>
          <div>
            • <strong>Celebrate wins</strong> - Recognize achievements of
            yourself and others
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityReturningGuide;
