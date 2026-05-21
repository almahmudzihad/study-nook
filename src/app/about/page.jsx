import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900">
            About StudyNook
          </h1>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            A smart study room booking platform
            designed to help students find
            peaceful and productive spaces
            instantly.
          </p>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="text-slate-600 leading-relaxed">
              We aim to simplify study space
              booking by connecting students
              with available rooms in real time.
              Whether you are preparing for exams,
              group study, or personal focus —
              StudyNook helps you find the right
              environment instantly.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Our system ensures real-time
              availability, secure booking, and
              easy management for room owners.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10 border border-slate-200">
            <h3 className="text-xl font-semibold mb-4">
              Why StudyNook?
            </h3>

            <ul className="space-y-3 text-slate-600">
              <li>✔ Real-time room booking</li>
              <li>✔ Secure authentication</li>
              <li>✔ Owner dashboard</li>
              <li>✔ Smart availability system</li>
              <li>✔ Clean modern UI</li>
            </ul>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              100+
            </h3>
            <p className="text-slate-500 mt-2">
              Study Rooms
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              500+
            </h3>
            <p className="text-slate-500 mt-2">
              Bookings
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              200+
            </h3>
            <p className="text-slate-500 mt-2">
              Active Users
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              24/7
            </h3>
            <p className="text-slate-500 mt-2">
              Support
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center bg-blue-700 text-white p-12 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold">
            Ready to find your perfect study space?
          </h2>

          <p className="mt-3 text-blue-100">
            Start booking rooms in seconds
          </p>

          <div className="mt-6 flex justify-center gap-4">

            <Link
              href="/rooms"
              className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-medium hover:bg-slate-100 transition"
            >
              Browse Rooms
            </Link>

            <Link
              href="/register"
              className="border border-white px-6 py-3 rounded-2xl font-medium hover:bg-white hover:text-blue-700 transition"
            >
              Get Started
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}