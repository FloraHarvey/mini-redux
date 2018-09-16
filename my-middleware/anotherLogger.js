export const anotherLogger = ({ getState, dispatch }) => (next) => {
  return (action) => {
    console.log('Test logger 2')
    let result = next(action)
    return result
  }
}