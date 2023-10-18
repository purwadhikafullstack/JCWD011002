function setToastParams(response) {
  return {
    title: response.data?.message || response.message,
    status: response.status,
  };
}

function getStatus(status) {
  switch (parseInt(String(status)[0])) {
    case 2:
      return "success";
    case 4:
      return "warning";
    case 5:
      return "error";
    default:
      return "info";
  }
}

function Notification(toast, { title, description, status, position = "bottom" }) {
  return toast({
    title,
    status: getStatus(status),
    duration: 3000,
    isCloseable: true,
    position,
  });
}

export default Notification;
export { setToastParams };
