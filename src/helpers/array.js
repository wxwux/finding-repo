export const cloneArrayAndRemoveItem = (array, item) => {
  const arrayClone = [...array];
  const ndx = arrayClone.indexOf(item);
  const itemExists = ndx > -1;

  if (itemExists) {
    arrayClone.splice(ndx, 1);
    return arrayClone;
  } else {
    console.warn("item was not found in array");
    return array;
  }
};
