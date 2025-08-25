import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, TrendingUp, Brain, Users, Rocket, CheckCircle } from 'lucide-react';

const App = () => {
  const [activeFramework, setActiveFramework] = useState('SPARK');
  const [checkedItems, setCheckedItems] = useState({});

  const frameworks = {
    SPARK: {
      name: "SPARK Framework",
      subtitle: "Skills • Purpose • Action • Reflect • Keep Growing",
      description: "A comprehensive personal growth model for startup professionals",
      icon: <Rocket className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      sections: [
        {
          title: "Skills Development",
          icon: <Brain className="w-5 h-5" />,
          items: [
            "Identify 2-3 core skills critical to your role and startup's success",
            "Set up weekly learning blocks (minimum 3 hours)",
            "Find mentors or experts in your field for guidance",
            "Practice skills through real startup projects and challenges",
            "Track skill progression with measurable milestones"
          ]
        },
        {
          title: "Purpose Alignment",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Define your personal mission within the startup context",
            "Identify how your growth serves the company's vision",
            "Set quarterly purpose check-ins with your manager",
            "Document wins that align with your core values",
            "Regularly assess if your role energizes or drains you"
          ]
        },
        {
          title: "Action Planning",
          icon: <TrendingUp className="w-5 h-5" />,
          items: [
            "Set 30-60-90 day growth goals aligned with business needs",
            "Break down big goals into weekly actionable tasks",
            "Identify key metrics to track your personal ROI",
            "Schedule monthly reviews with stakeholders",
            "Build accountability partnerships with colleagues"
          ]
        },
        {
          title: "Reflection & Iteration",
          icon: <CheckCircle className="w-5 h-5" />,
          items: [
            "Conduct weekly 15-minute reflection sessions",
            "Keep a growth journal documenting lessons learned",
            "Seek feedback from peers, reports, and supervisors",
            "Analyze what's working vs. what needs adjustment",
            "Celebrate wins and learn from setbacks openly"
          ]
        },
        {
          title: "Keep Growing",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Join startup communities and professional networks",
            "Attend industry events and startup meetups",
            "Share knowledge through writing, speaking, or mentoring",
            "Stay curious about adjacent skills and industries",
            "Plan for next-level roles and responsibilities"
          ]
        }
      ]
    },
    RAPID: {
      name: "RAPID Growth Cycles",
      subtitle: "Review • Adjust • Plan • Implement • Deliver",
      description: "Agile personal development cycles matching startup speed",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      sections: [
        {
          title: "Review (Weekly)",
          icon: <CheckCircle className="w-5 h-5" />,
          items: [
            "Assess progress on current growth objectives",
            "Identify blockers and resource needs",
            "Review feedback from team and customers",
            "Analyze time allocation vs. impact created",
            "Document key learnings and insights"
          ]
        },
        {
          title: "Adjust (Bi-weekly)",
          icon: <Target className="w-5 h-5" />,
          items: [
            "Pivot goals based on startup priorities",
            "Reallocate time to high-impact activities",
            "Address skill gaps revealed by recent challenges",
            "Update personal OKRs to match company direction",
            "Modify learning plan based on new insights"
          ]
        },
        {
          title: "Plan (Monthly)",
          icon: <Brain className="w-5 h-5" />,
          items: [
            "Set growth objectives for next 30 days",
            "Identify stretch projects to accelerate development",
            "Plan skill-building activities and resources needed",
            "Schedule important conversations and feedback sessions",
            "Define success metrics and checkpoints"
          ]
        },
        {
          title: "Implement (Daily)",
          icon: <Rocket className="w-5 h-5" />,
          items: [
            "Take one growth-focused action every day",
            "Apply new skills to current work challenges",
            "Seek out difficult conversations and feedback",
            "Experiment with new approaches and tools",
            "Build habits that compound over time"
          ]
        },
        {
          title: "Deliver (Quarterly)",
          icon: <Users className="w-5 h-5" />,
          items: [
            "Demonstrate measurable impact from growth efforts",
            "Present learnings and wins to leadership team",
            "Take on increased responsibilities or new challenges",
            "Mentor others and contribute to team development",
            "Set ambitious goals for next quarter"
          ]
        }
      ]
    }
  };

  const toggleCheck = (frameworkKey, sectionIndex, itemIndex) => {
    const key = `${frameworkKey}-${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isChecked = (frameworkKey, sectionIndex, itemIndex) => {
    const key = `${frameworkKey}-${sectionIndex}-${itemIndex}`;
    return checkedItems[key] || false;
  };

  const getCurrentFramework = () => frameworks[activeFramework];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Personal Growth Frameworks</h1>
        <p className="text-lg text-gray-600">Designed for startup professionals who need to grow fast</p>
      </div>

      {/* Framework Selector */}
      <div className="flex gap-4 mb-8 justify-center">
        {Object.entries(frameworks).map(([key, framework]) => (
          <button
            key={key}
            onClick={() => setActiveFramework(key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeFramework === key
                ? 'bg-white shadow-lg border-2 border-purple-200 text-gray-800'
                : 'bg-white/80 hover:bg-white hover:shadow-md text-gray-600'
            }`}
          >
            {framework.icon}
            {framework.name}
          </button>
        ))}
      </div>

      {/* Active Framework */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className={`${getCurrentFramework().color} text-white p-6`}>
          <div className="flex items-center gap-3 mb-2">
            {getCurrentFramework().icon}
            <h2 className="text-2xl font-bold">{getCurrentFramework().name}</h2>
          </div>
          <p className="text-xl opacity-90 mb-2">{getCurrentFramework().subtitle}</p>
          <p className="opacity-80">{getCurrentFramework().description}</p>
        </div>

        <div className="p-6">
          {getCurrentFramework().sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-purple-600">{section.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              </div>
              
              <div className="grid gap-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() => toggleCheck(activeFramework, sectionIndex, itemIndex)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                      isChecked(activeFramework, sectionIndex, itemIndex)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {isChecked(activeFramework, sectionIndex, itemIndex) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={`flex-1 ${
                      isChecked(activeFramework, sectionIndex, itemIndex)
                        ? 'text-gray-500 line-through'
                        : 'text-gray-700'
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">🚀 Startup-Specific Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• <strong>Move fast, but be intentional</strong> - Growth without direction wastes precious startup time</div>
          <div>• <strong>Align with business needs</strong> - Your growth should directly impact company success</div>
          <div>• <strong>Embrace the chaos</strong> - Use uncertainty as fuel for rapid skill development</div>
          <div>• <strong>Build as you climb</strong> - Help others grow while you're growing yourself</div>
        </div>
      </div>
    </div>
  );
};

export default App;