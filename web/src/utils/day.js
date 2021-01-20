const dayjs = require("dayjs");

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const IOStoBeijing = (IOS) => {
  return JSON.parse(JSON.stringify(dayjs(IOS).utcOffset(480).format("YYYY/MM/DD"))
  );
};

module.exports = { IOStoBeijing };
