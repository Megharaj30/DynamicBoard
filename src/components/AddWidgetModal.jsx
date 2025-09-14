import React, { useState, useEffect } from "react";
import useDashboardStore from "../store/useDashboardStore";
import { motion } from "framer-motion";

function AddWidgetModal({ categoryName, onClose }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const addWidget = useDashboardStore((state) => state.addWidget);

  // Form validation status
  const isValid = name.trim() !== "" && text.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    addWidget(categoryName, name.trim(), text.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add Widget to <span className="text-blue-600">{categoryName}</span>
        </h2>

        {/* Live Preview */}
        {isValid && (
          <div className="border border-dashed border-blue-400 p-4 rounded mb-4 bg-blue-50 dark:bg-gray-800 dark:text-blue-300 text-sm">
            <strong className="block mb-1">🔍 Live Preview:</strong>
            <div className="font-bold">{name}</div>
            <div>{text}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Widget Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Widget Text
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddWidgetModal;
