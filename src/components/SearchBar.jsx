export function SearchBar({ searchInput, setSearchInput, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Weather App
      </h1>
      
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          className="w-full px-5 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition-all"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors"
        >
          🔍
        </button>
      </div>
    </div>
  );
}