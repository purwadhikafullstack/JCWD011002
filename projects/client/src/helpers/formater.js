const DATE_LOCALE = "en-UK";

function formaterPrice(price) {
  let formatted = "";
  price = String(price);
  while (price.length > 0) {
    formatted = price.slice(-3) + formatted;
    if (price.length > 3) formatted = "." + formatted;
    price = price.slice(0, -3);
  }

  return formatted;
}

function formaterDate(date) {
  date = new Date(date);
  return date.toLocaleDateString(DATE_LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export { formaterPrice, formaterDate };
