export default function AboutSection() {
  return (
    <section className="bg-gradient-to-r from-sky-50 via-white to-cyan-50 px-4 py-16">
      <div className="space-y-6 mx-auto max-w-5xl text-center">
        <h2 className="font-bold text-sky-800 text-4xl md:text-5xl">
          About <span className="text-cyan-500">TasteMeal</span>
        </h2>
        <p className="mx-auto max-w-3xl text-gray-700 text-lg leading-relaxed">
          TasteMeal is your gateway to exploring the finest dishes from around the world.
          Whether you're in the mood for Thai Pad Thai, American Cheeseburgers, or Italian Pizzas,
          we've got you covered with easy recipes and helpful cooking videos.
        </p>
        <p className="text-gray-600 text-base">
          Curated weekly, our meals are handpicked to bring joy to your kitchen. Browse, cook, and enjoy!
        </p>
      </div>
    </section>
  )
}
