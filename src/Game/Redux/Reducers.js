export function updateCurrent(state, action) {
  switch (action.type) {
    case 'SET':
      state = action.current;
      return state;
  }
}
