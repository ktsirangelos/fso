const Notification = ({ message, type }) => {
  // Styles
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={type === "error" ? { ...style, color: "red" } : style}>
      {message}
    </div>
  );
};

export default Notification;
