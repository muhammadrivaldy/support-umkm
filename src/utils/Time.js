const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Dec',
];

export function GenerateTimestampToDate(timestamp) {
  const a = new Date(timestamp * 1000);

  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();

  return date + ' ' + month + ' ' + year;
}

export function GenerateTimestampToDateTime(timestamp) {
  const a = new Date(timestamp * 1000);

  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const minute = a.getMinutes();

  return date + ' ' + month + ' ' + year + ' - ' + hour + ':' + minute;
}
