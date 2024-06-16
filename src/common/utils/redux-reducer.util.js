const mappingValueReducer = ({ state, payload, initialState }) => {
  for (const field of Object.keys(initialState)) {
    state[field] = payload[field];
  }
  return state;
};

export { mappingValueReducer };
