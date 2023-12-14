export default function orderStars(order, condition, stars, setStars) {
  const hashMapOfFunctions = {
    ASC: (a, b) => +a[condition] - +b[condition],
    DESC: (a, b) => +b[condition] - +a[condition],
  };
  const sortedArrayWithoutUnknown = stars.filter((star) => star[condition] !== 'unknown')
    .sort(hashMapOfFunctions[order]);
  const unknownArray = stars.filter((star) => star[condition] === 'unknown');
  setStars([...sortedArrayWithoutUnknown, ...unknownArray]);
}
