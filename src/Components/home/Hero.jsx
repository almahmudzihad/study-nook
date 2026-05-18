import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
              📚 Smart Library Room Booking
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Find Your Perfect
              <span className="text-blue-700 block">
                Study Room
              </span>
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-8 max-w-xl">
              Browse and book quiet, private study
              rooms in your library. Discover the
              perfect environment for focused
              learning and productive study sessions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/rooms"
                className="px-7 py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition"
              >
                Explore Rooms
              </Link>

              <button className="px-7 py-4 rounded-2xl border border-slate-300 hover:border-blue-700 hover:text-blue-700 font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 mt-14 max-w-lg">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  250+
                </h3>
                <p className="text-slate-500 text-sm">
                  Study Rooms
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  10K+
                </h3>
                <p className="text-slate-500 text-sm">
                  Happy Students
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  99%
                </h3>
                <p className="text-slate-500 text-sm">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="rounded-[32px] overflow-hidden shadow-2xl h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
                    alt="Study room"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-white rounded-[32px] p-6 shadow-xl">
                  <h4 className="font-bold text-slate-900 text-lg">
                    Quiet Zone
                  </h4>
                  <p className="text-slate-500 mt-2">
                    Perfect for focused study and
                    deep concentration.
                  </p>
                </div>
              </div>

              <div className="space-y-5 pt-14">
                <div className="bg-blue-700 text-white rounded-[32px] p-8 shadow-xl">
                  <h4 className="font-bold text-3xl">
                    Book
                  </h4>
                  <p className="mt-3 text-blue-100">
                    Reserve your study space in
                    seconds.
                  </p>
                </div>

                <div className="rounded-[32px] overflow-hidden shadow-2xl h-[320px]">
                  <Image
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                    alt="Library"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Blur effect */}
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-blue-300 blur-[100px] opacity-30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;