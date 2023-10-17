function setPagination(page = 1, limit = 10) {
  page = parseInt(page);
  limit = parseInt(limit);
  return {
    offset: (page - 1) * limit,
    limit: parseInt(limit),
  };
}

module.exports = {
  setPagination,
}