import React, { useState } from "react";
import {
  CheckCircle,
  CreditCard,
  DollarSign,
  BarChart2,
  Users,
  Target,
} from "lucide-react";

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

type TopicKey = "BUDGETING" | "INVESTING" | "ENTREPRENEURSHIP";

const FinancialLearningGuide: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicKey>("BUDGETING");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const topics: Record<TopicKey, Topic> = {
    BUDGETING: {
      name: "Budgeting Basics",
      subtitle: "Track • Save • Plan",
      description: "Learn how to manage your income and expenses effectively.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      sections: [
        {
          title: "Track Your Spending",
          icon: <BarChart2 className="w-5 h-5" />,
          items: [
            "Record all income and expenses daily",
            "Use apps or spreadsheets to categorize spending",
            "Review weekly to identify unnecessary costs",
          ],
        },
        {
          title: "Set a Budget",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Define monthly limits for each expense category",
            "Allocate a portion for savings",
            "Adjust based on past spending trends",
          ],
        },
        {
          title: "Monitor & Adjust",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Check progress weekly",
            "Identify overspending areas",
            "Make adjustments to stay on track",
          ],
        },
      ],
    },
    INVESTING: {
      name: "Investing Fundamentals",
      subtitle: "Grow • Diversify • Monitor",
      description:
        "Understand the basics of investing to build wealth over time.",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      sections: [
        {
          title: "Understand Investment Options",
          icon: <CreditCard className="w-5 h-5" />,
          items: [
            "Learn about stocks, bonds, and mutual funds",
            "Understand risk vs. return",
            "Research investment platforms in Kenya",
          ],
        },
        {
          title: "Diversify Your Portfolio",
          icon: <BarChart2 className="w-5 h-5" />,
          items: [
            "Invest in multiple asset classes",
            "Avoid putting all money in one stock",
            "Balance risk with safer investments",
          ],
        },
        {
          title: "Monitor Performance",
          icon: <CheckCircle className="w-5 h-5" />,
          items: [
            "Track returns regularly",
            "Adjust portfolio as needed",
            "Stay informed on market trends",
          ],
        },
      ],
    },
    ENTREPRENEURSHIP: {
      name: "Entrepreneurship Skills",
      subtitle: "Plan • Execute • Grow",
      description: "Develop skills to start and grow your own business.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-lime-500",
      sections: [
        {
          title: "Idea Validation",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Identify market needs",
            "Validate ideas with small tests",
            "Collect customer feedback early",
          ],
        },
        {
          title: "Business Planning",
          icon: <BarChart2 className="w-5 h-5" />,
          items: [
            "Write a clear business plan",
            "Set financial and growth goals",
            "Identify required resources",
          ],
        },
        {
          title: "Execution & Growth",
          icon: <CheckCircle className="w-5 h-5" />,
          items: [
            "Launch your MVP",
            "Track key metrics",
            "Iterate based on feedback",
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
          Explore Our Learning Guide
        </h1>
        <p className="text-lg text-gray-600">
          Boost your financial skills and take control of your future
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
                ? "bg-white shadow-lg border-2 border-yellow-200 text-gray-800"
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
                <div className="text-yellow-600">{section.icon}</div>
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

      {/* Quick Financial Tips */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">
          💡 Quick Financial Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            • <strong>Save before you spend</strong> - Prioritize saving a
            portion of your income
          </div>
          <div>
            • <strong>Invest early</strong> - Time compounds your wealth, start
            small if needed
          </div>
          <div>
            • <strong>Track your expenses</strong> - Know where your money goes
            to control finances
          </div>
          <div>
            • <strong>Build multiple income streams</strong> - Don’t rely on
            just one source of income
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialLearningGuide;
