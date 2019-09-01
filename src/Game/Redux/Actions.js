export function setCurrent(currentID) {
  return { type: 'SET', current: currentID };
}

export function addScore() {
  return { type: 'ADD' };
}

export function decreaseScore(){
  return { type: 'DECREASE' };
}

export function setAnswers(data) {
  return { type: 'SETDATA', data: data };
}
