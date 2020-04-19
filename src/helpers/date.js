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
  } catch (e) {}
}

moment.locale(localeStr);

export const getRelativeDate = (date) => {
  const momentLocale = moment(date);
  return momentLocale.fromNow();
};
