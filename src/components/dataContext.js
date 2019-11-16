import React from "react";

export default React.createContext({
  categories: [],
  items: [],
  updateCategories: () => {},
  updateItems: () => {}
});
