export default function Hero() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 relative sm:mt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500 text-center drop-shadow-md">
        Build Your Personalized Workout Plan
      </h1>
      <p className="text-gray-300 text-lg md:text-xl text-center mt-4 max-w-2xl">
        Answer a few questions and instantly receive a customized, goal-oriented routine.
      </p>
      <div className="relative mt-12 w-full max-w-4xl">
        <img
          src="bg-orange.png"
          className="w-full opacity-90 rounded-2xl shadow-[0_0_40px_rgba(180,74,26,0.4)]"
          alt=""
        />

      
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="group">
  <button className="min-w-60 min-h-18 bg-gray-900 hover:bg-gray-800 transition-all text-gray-50 text-4xl font-bold px-10 py-4 rounded-full shadow-[0_0_25px_rgba(180,74,26,0.6)] border border-orange-400 relative overflow-hidden cursor-pointer">
    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
      Get Started
    </span>
    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      Workit
    </span>
  </button>
</div>
        </div>
      </div>
    </main>
  );
}
