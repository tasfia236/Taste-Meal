// src/pages/Favorites.jsx
import { useSelector } from 'react-redux';
import MealGrid from '../components/MealGrid';

export default function Favorites() {
  const favorites = useSelector((state) => state.meals.favorites);

  return (
    <div className="p-4 text-center">
      <h2 className="mb-4 font-semibold text-2xl">Your Favorite Meals</h2>
      {favorites.length > 0 ? (
        <MealGrid meals={favorites} />
      ) : (
        <p className="text-gray-500">No favorites yet. Search and add some!</p>
      )}
    </div>
  );
}
