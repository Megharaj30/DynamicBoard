import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import initialData from '../data/initialWidgets.json';

const useDashboardStore = create((set) => ({
  categories: initialData.categories,

  addWidget: (categoryName, widgetName, widgetText) => {
    const newWidget = {
      id: uuidv4(),
      name: widgetName,
      text: widgetText,
    };

    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? { ...cat, widgets: [...cat.widgets, newWidget] }
          : cat
      ),
    }));
  },

  removeWidget: (categoryName, widgetId) => {
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.id !== widgetId),
            }
          : cat
      ),
    }));
  },

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useDashboardStore; // ✅ DEFAULT EXPORT
