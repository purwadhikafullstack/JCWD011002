function success(message, data) {
  return {
    status: 200,
    message,
    data,
  };
}

function error(status, message) {
  return {
    status,
    message,
  };
}

function response({ message, data }) {
  if (!data) return { message };
  if (message === "") return { data };
  return { message, data };
}

module.exports = {
  success,
  error,
  response,
};
