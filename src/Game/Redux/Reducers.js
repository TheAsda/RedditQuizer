export function updateCurrent(state = '', action) {
  switch (action.type) {
    case 'SET':
      state = action.current;
      return state;
    default:
      return state;
  }
}

export function updateScore(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}

export function updateAnswers(state = {}, action) {
  switch (action.type) {
    case 'SETDATA':
      state = action.data;
      return state;
    default:
      return state;
  }
}
