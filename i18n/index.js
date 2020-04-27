import en from "./en";
import ru from "./ru";

const getCurLang = () => {
  const localeString = navigator.language;
  const generalString = localeString.split("-")[0];

  switch (generalString) {
    case "ru":
      return ru;
    case "en":
      return en;
    default:
      return en;
  }
};

const i18n = {
  ui(propName, fallback) {
    const lang = getCurLang().ui;
    const translation = lang[propName];
    return translation && translation.length ? translation : fallback;
  },
  error(status) {
    const lang = getCurLang().errors;
    return lang[status] && lang[status].length ? lang[status] : "Error occured";
  },
};

export default i18n;
