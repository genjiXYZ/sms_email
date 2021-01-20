module.exports = (phoneNumber) => {
  const hiddenReg = /^\d{3}(?<hidden>\d{4})\d{4}$/;
  let hiddenStr = phoneNumber.match(hiddenReg).groups.hidden;
  hiddenPhoneNumber = phoneNumber.replace(hiddenStr, "****");
  return hiddenPhoneNumber;
};
