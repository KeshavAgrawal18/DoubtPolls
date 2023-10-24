const rNG = function () {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const linkLength = 12;
  let link = "";
  for (let i = 0; i < linkLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    link += chars.substring(randomNumber, randomNumber + 1);
  }
  return link;
};

const time = function () {
  const choices = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedTime = new Date().toLocaleString(undefined, choices);
  return formattedTime;
};

module.exports = { rng: rNG(), time: time() };
