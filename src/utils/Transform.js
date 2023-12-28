export function GenerateRemainingTime(remainingTimeDetails) {
  var result = '';

  if (remainingTimeDetails.day > 0) {
    result += `${remainingTimeDetails.day} Hari`;
  }

  if (remainingTimeDetails.hour > 0) {
    result = result !== '' ? result + ' ' : result;
    result += `${remainingTimeDetails.hour} Jam`;
  }

  if (remainingTimeDetails.minute > 0) {
    result = result !== '' ? result + ' ' : result;
    result += `${remainingTimeDetails.minute} Menit`;
  }

  return result === '' ? 'Habis' : result;
}
