// components/home/WhyChoose.jsx

import {
  FaBookOpen,
  FaBolt,
  FaWifi,
  FaMoneyBillWave,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen />,
    title: "Quiet Study Zones",
    description:
      "Find peaceful study rooms designed for deep concentration and focused learning.",
  },
  {
    icon: <FaBolt />,
    title: "Instant Booking",
    description:
      "Book rooms in seconds with real-time availability and conflict-free scheduling.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Affordable Pricing",
    description:
      "Student-friendly hourly pricing with flexible study options.",
  },
  {
    icon: <FaWifi />,
    title: "Modern Amenities",
    description:
      "Enjoy Wi-Fi, whiteboards, power outlets, air conditioning, and more.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose StudyNook
          </h2>

          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            A smarter way to discover, book, and manage
            private study rooms for focused learning.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 hover:bg-blue-50 rounded-[28px] p-8 transition duration-300 border border-slate-100 hover:border-blue-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white text-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;