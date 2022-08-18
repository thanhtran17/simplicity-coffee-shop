const formatNewDate = (str) => {
  const dateOnlyStr = str.split('T');
  let formattedStringsArray = dateOnlyStr[0].split('-');
  let formatted =
    formattedStringsArray[0] +
    '/' +
    formattedStringsArray[1] +
    '/' +
    formattedStringsArray[2];

  return formatted;
};

module.exports = {
  formatNewDate,
};
