export function isEmptyOrNull(data) {
  if (
    data === undefined ||
    data === null ||
    data === '' ||
    JSON.stringify(data) === '{}' ||
    JSON.stringify(data) === '[]'
  ) {
    return true
  } else {
    return false
  }
}
