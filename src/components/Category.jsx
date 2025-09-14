import React, { useState } from "react";
import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";

function Category({ category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-10">
      {/* Category Heading */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {category.name}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Widget
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.length > 0 ? (
          category.widgets.map((widget) => (
            <Widget
              key={widget.id}
              widget={widget}
              categoryName={category.name}
            />
          ))
        ) : (
          <p className="text-gray-500">No widgets in this category.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddWidgetModal
          categoryName={category.name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Category;
