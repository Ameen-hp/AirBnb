export const CategoryPill = ({ category }) => (
  <button className="
    flex flex-col items-center p-3 sm:p-4 rounded-xl space-y-1 sm:space-y-2 
    bg-white shadow-md border-2 border-transparent
    hover:border-yellow-400 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105
  ">
    <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${category.color}`} />
    <span className="text-xs sm:text-sm font-semibold text-gray-700">{category.name}</span>
  </button>
);
