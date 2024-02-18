export function modifyString(string) {
  string = string.replace(/[^a-zA-Z ]/g, " ");
  let modifiedString = null;
  if (string.split(" ").length > 1) {
    modifiedString = string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    modifiedString = string.charAt(0).toUpperCase() + string.slice(1);
  }

  return modifiedString;
}

export function formatDateTime(date, options) {
  const formatOptions = new Intl.DateTimeFormat("en-GB", options);
  return formatOptions.format(date);
}
