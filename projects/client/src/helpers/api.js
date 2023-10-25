function getQueries(queries) {
  if (!queries["page"]) queries["page"] = 1;
  if (!queries["limit"]) queries["limit"] = 10;
  let query = "";
  for (const key in queries) {
    if (queries[key] !== "" && queries[key] !== null)
      query += `${key}=${queries[key]}&`;
  }
  return query.replace(/&$/, "");
}

export { getQueries };
