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

export { formaterPrice };
