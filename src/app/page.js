import React from 'react'

const page = () => {
  return (
    
<div className="min-h-screen bg-[#f4f3ef] flex flex-col font-sans">

  {/* Navbar */}
  <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-4">
    <div className="max-w-4xl mx-auto flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#1a1035" />
          <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2" />
          <circle cx="18" cy="18" r="3" fill="white" />
        </svg>
        <span className="text-gray-900 font-bold text-lg tracking-tight">Orion</span>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-2">
        <a
          href="/login"
          className="text-sm font-semibold text-violet-700 border border-violet-200 bg-violet-50 hover:bg-violet-100 rounded-lg px-4 py-2 transition-colors"
        >
          Log in
        </a>
        <a
          href="/register"
          className="text-sm font-semibold text-white bg-violet-700 hover:bg-violet-800 rounded-lg px-4 py-2 transition-colors"
        >
          Sign up
        </a>
      </div>

    </div>
  </nav>

  {/* Hero */}
  <main className="flex-1 flex items-center justify-center px-6 py-16">
    <div className="max-w-4xl w-full space-y-4">

      {/* Dark hero card */}
      <div className="bg-[#1a1035] rounded-2xl px-8 py-14 text-center relative overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-purple-600/30 blur-3xl -top-16 -right-16 pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full bg-sky-400/20 blur-3xl -bottom-10 -left-10 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <h1 className="text-3xl font-bold text-white tracking-tight leading-snug">
            Build something great<br />with Orion
          </h1>
          <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
            A simple, fast platform for modern teams. Get started in minutes — no credit card required.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="/register"
              className="text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg px-5 py-2.5 transition-colors"
            >
              Get started free
            </a>
            <a
              href="/login"
              className="text-sm font-semibold text-white/70 hover:text-white rounded-lg px-5 py-2.5 transition-colors"
            >
              Sign in →
            </a>
          </div>
        </div>
      </div>

      {/* Three feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "⚡", title: "Fast setup", desc: "Up and running in under five minutes." },
          { icon: "🔒", title: "Secure by default", desc: "Your data is encrypted and safe." },
          { icon: "📦", title: "All in one place", desc: "Manage everything from one dashboard." },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 space-y-2"
          >
            <span className="text-xl">{f.icon}</span>
            <p className="text-sm font-semibold text-gray-900">{f.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </main>

  {/* Footer */}
  <footer className="border-t border-gray-200 px-6 py-4">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <p className="text-xs text-gray-400">© 2024 Orion. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
      </div>
    </div>
  </footer>

</div>

  )
}

export default page
