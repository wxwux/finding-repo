import moment from "moment";

const getLang = () => {
  if (typeof navigator.languages !== "undefined") {
    return navigator.languages[0];
  } else {
    return "en";
  }
};

const localeStr = getLang();

if (localeStr !== "en") {
  try {
    require(`moment/locale/${localeStr}`);
  } catch (e) {
    console.log("loaded moment locale by default");
  }
}

moment.locale(localeStr);

export const getRelativeDate = (date) => {
  const momentLocale = moment(date);
  return momentLocale.fromNow();
};

export const convertMsToHumanFormat = (timeMs) => {
  const seconds = Math.floor(timeMs / 1000);
  const ms = Math.round(timeMs % 1000);

  if (isNaN(seconds) || isNaN(ms)) {
    console.warn("can't convert the value");
    return "0ms";
  }

  if (seconds > 0) {
    return `${seconds}s ${ms}ms`;
  } else {
    return `${ms}ms`;
  }
};
