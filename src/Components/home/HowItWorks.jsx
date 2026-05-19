// components/home/HowItWorks.jsx

import {
  FaSearch,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Explore Rooms",
    description:
      "Browse study rooms based on amenities, pricing, and availability.",
  },
  {
    icon: <FaClock />,
    title: "Pick Your Time",
    description:
      "Choose a suitable date and time slot that works for your study plan.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Book Instantly",
    description:
      "Reserve your room quickly without double-booking issues.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Booking a study room takes only a few
            simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] shadow-lg p-8 text-center hover:shadow-2xl transition"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>

              <div className="mb-4">
                <span className="text-sm text-blue-700 font-semibold">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>

              <p className="text-slate-500">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;