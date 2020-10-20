export function getStatusTextColor(isValid = false) {
  return {'text-success': isValid, 'text-danger': !isValid};
}

export function isCheckInDateValid(value: Date) {
  return value.getTime() >= (new Date()).getTime();
}
