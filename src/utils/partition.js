export const partition = (array, callback) => {
  const matches = [];
  const nonMatches = [];
  array.forEach((element) =>
    (callback(element) ? matches : nonMatches).push(element)
  );

  return [matches, nonMatches];
};
