export function GenerateTimestampToDate(timestamp) {
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

  const a = new Date(timestamp * 1000);

  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();

  return date + ' ' + month + ' ' + year;
}
