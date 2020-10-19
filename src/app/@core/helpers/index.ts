export function getStatusTextColor(isValid = true) {
  return {'text-success': isValid, 'text-danger': !isValid};
}
