const bootstrapStylesheet = document.querySelector("#bootstrap-css");
const sourceLanguage = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
const rtlLanguages = ["ar", "fa", "he", "ku", "ps", "ur", "yi"];

// RTL is needed when translation changes the page language to an RTL language.
function updateTextDirection() {

  const pageLanguage = document.documentElement.lang.toLowerCase();
  const languageCode = pageLanguage.split("-")[0];
  const isTranslated = languageCode !== sourceLanguage;
  const isGoogleTranslatedRtl = document.body.classList.contains("translated-rtl");
  const shouldUseRtl = isGoogleTranslatedRtl || (isTranslated && rtlLanguages.includes(languageCode));

  document.documentElement.dir = shouldUseRtl ? "rtl" : "ltr";
  bootstrapStylesheet.href = shouldUseRtl
    ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
}

updateTextDirection();

// Translation tools commonly update the html lang attribute after page load.
const languageObserver = new MutationObserver(updateTextDirection);
languageObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});

languageObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});