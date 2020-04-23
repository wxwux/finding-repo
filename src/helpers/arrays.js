export const cloneArray = (array) => {
  const arrayClone = [...array];

  return {
    get() {
      return arrayClone;
    },

    removeItem(item) {
      const ndx = arrayClone.indexOf(item);
      const itemExists = ndx > -1;

      if (itemExists) {
        arrayClone.splice(ndx, 1);
      } else {
        console.warn("item was not found in array");
      }

      return this;
    },
  };
};
