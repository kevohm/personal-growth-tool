import React, { useState } from "react";
import { CheckCircle, Star, Award, Zap, Users, Target } from "lucide-react";

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

type TopicKey = "LEADERSHIP" | "INNOVATION";

const LearningPage: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicKey>("LEADERSHIP");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const topics: Record<TopicKey, Topic> = {
    LEADERSHIP: {
      name: "Leadership Skills",
      subtitle: "Lead • Inspire • Motivate",
      description: "Develop leadership capabilities to guide teams effectively.",
      icon: <Award className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-lime-500",
      sections: [
        {
          title: "Self-Management",
          icon: <Star className="w-5 h-5" />,
          items: [
            "Practice daily reflection",
            "Set personal growth goals",
            "Track progress consistently",
          ],
        },
        {
          title: "Team Engagement",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Provide regular feedback",
            "Encourage collaboration",
            "Recognize achievements",
          ],
        },
        {
          title: "Strategic Thinking",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Analyze business challenges",
            "Develop actionable strategies",
            "Align team objectives with company goals",
          ],
        },
      ],
    },
    INNOVATION: {
      name: "Innovation Mindset",
      subtitle: "Ideate • Experiment • Implement",
      description: "Foster creativity and develop innovative solutions quickly.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      sections: [
        {
          title: "Ideation",
          icon: <Star className="w-5 h-5" />,
          items: [
            "Brainstorm new ideas daily",
            "Evaluate feasibility of ideas",
            "Collaborate on creative sessions",
          ],
        },
        {
          title: "Experimentation",
          icon: <Zap className="w-5 h-5" />,
          items: [
            "Prototype rapidly",
            "Test small-scale experiments",
            "Learn from failures quickly",
          ],
        },
        {
          title: "Implementation",
          icon: <CheckCircle className="w-5 h-5" />,
          items: [
            "Deploy solutions iteratively",
            "Measure impact",
            "Document lessons learned",
          ],
        },
      ],
    },
  };

  const toggleCheck = (topicKey: TopicKey, sectionIndex: number, itemIndex: number) => {
    const key = `${topicKey}-${sectionIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChecked = (topicKey: TopicKey, sectionIndex: number, itemIndex: number): boolean => {
    const key = `${topicKey}-${sectionIndex}-${itemIndex}`;
    return checkedItems[key] || false;
  };

  const currentTopic = topics[activeTopic];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Modules</h1>
        <p className="text-lg text-gray-600">Interactive modules for skill growth</p>
      </div>

      {/* Topic Selector */}
      <div className="flex gap-4 mb-8 justify-center">
        {Object.entries(topics).map(([key, topic]) => (
          <button
            key={key}
            onClick={() => setActiveTopic(key as TopicKey)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTopic === key
                ? "bg-white shadow-lg border-2 border-green-200 text-gray-800"
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
                <div className="text-green-600">{section.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              </div>

              <div className="grid gap-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() => toggleCheck(activeTopic, sectionIndex, itemIndex)}
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
    </div>
  );
};

export default LearningPage;
