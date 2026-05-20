import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-700">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 leading-relaxed">
          Oops! The page you are looking for
          does not exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-2xl font-medium transition"
          >
            Go Home
          </Link>

          <Link
            href="/rooms"
            className="border border-slate-300 hover:bg-slate-100 px-6 py-4 rounded-2xl font-medium transition"
          >
            Browse Rooms
          </Link>

        </div>

      </div>
    </section>
  )
}