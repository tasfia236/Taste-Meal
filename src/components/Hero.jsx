export default function Hero () {
  return (

    <section className="relative flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe')] bg-cover bg-center min-h-[60vh] text-center">
      <div className="top-0 left-0 z-0 absolute bg-black/50 w-full h-full" />
      <div className="z-10 relative px-4">
        <h1 className="drop-shadow mb-4 font-bold text-white text-4xl md:text-5xl">Discover & Savor</h1>
        <p className="mx-auto mb-6 max-w-xl text-yellow-200 text-lg md:text-xl">Find delicious meals, explore random recipes, and bookmark your favorites — all in one place.</p>
        <a href="#explore" className="bg-yellow-400 hover:bg-yellow-500 shadow-lg px-6 py-3 rounded-full font-semibold text-black transition">Explore Meals</a>
      </div>
    </section>
  )
}
