import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useDashboardStore from "../store/useDashboardStore";

function Widget({ widget, categoryName, showCategory = false }) {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
    >
      <button
        onClick={() => removeWidget(categoryName, widget.id)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <h3 className="text-lg font-bold text-gray-800">{widget.name}</h3>
      <p className="text-gray-600 mt-1">{widget.text}</p>

      {showCategory && (
        <p className="text-sm text-blue-500 mt-2">
          <strong>Category:</strong> {categoryName}
        </p>
      )}
    </motion.div>
  );
}

export default Widget;
