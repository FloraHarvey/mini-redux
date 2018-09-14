export const logger = ({ getState, dispatch }) => (next) => {
  return (action) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', getState())
    return result
  }
}