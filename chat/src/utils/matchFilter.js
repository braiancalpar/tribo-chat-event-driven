export default function matchFilter({ filter, list }, callback) {
  const regexp = new RegExp(filter, 'i');
  const listMatchingWithFilter = list?.filter((item) => item?.name?.match(regexp));
  callback?.(listMatchingWithFilter);
}