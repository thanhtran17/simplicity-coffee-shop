export const formatReceivedSqlDate = (str) => {
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

export const formatNewDate = (str) => {
  let formattedStringsArray = str._d.toLocaleDateString('en-GB').split('/');
  let formatted =
    formattedStringsArray[2] +
    '/' +
    formattedStringsArray[1] +
    '/' +
    formattedStringsArray[0];

  return formatted;
};
