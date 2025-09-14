import React from "react";
import useDashboardStore from "../store/useDashboardStore";
import Category from "./Category";
import Widget from "./Widget";

function Dashboard() {
  const categories = useDashboardStore((state) => state.categories);
  const searchTerm = useDashboardStore((state) => state.searchTerm);
  const setSearchTerm = useDashboardStore((state) => state.setSearchTerm);

  const filteredWidgets = categories
    .flatMap((cat) =>
      cat.widgets.map((widget) => ({
        ...widget,
        category: cat.name,
      }))
    )
    .filter(
      (widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-gray-900">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">
          DynamicBoard
        </h1>
        <p className="text-gray-600 mt-2">
          Build, organize, and customize your widgets easily
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search widgets..."
          className="w-full max-w-xl px-4 py-2 border border-gray-300 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWidgets.length > 0 ? (
              filteredWidgets.map((widget) => (
                <Widget
                  key={widget.id}
                  widget={widget}
                  categoryName={widget.category}
                  showCategory
                />
              ))
            ) : (
              <p className="text-gray-500">No widgets found.</p>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.map((category) => (
        <Category key={category.name} category={category} />
      ))}
    </div>
  );
}

export default Dashboard;