export default function PopularCategories() {
  const categories = [
    { title: 'Milk Shakes', price: 55, img: 'https://source.unsplash.com/400x400/?milkshake' },
    { title: 'Sandwiches', price: 95, img: 'https://source.unsplash.com/400x400/?sandwich' },
    { title: 'Muffins', price: 75, img: 'https://source.unsplash.com/400x400/?muffin' },
    { title: 'CheeseBurger', price: 85, img: 'https://source.unsplash.com/400x400/?burger' },
    { title: 'Taco', price: 65, img: 'https://source.unsplash.com/400x400/?taco' }
  ]

  return (
    <section className="bg-[#f7f9ff] px-4 md:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Left Title */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm uppercase tracking-wide">Categories</p>
          <h2 className="font-bold text-gray-800 text-4xl">Popular Categories</h2>
        </div>

        {/* Category Cards */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition duration-300 cursor-pointer"
            >
              <img src={cat.img} alt={cat.title} className="w-full h-56 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-lg">{cat.title}</h3>
                <p className="mt-1 text-gray-500 text-sm">Avg. ${cat.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
