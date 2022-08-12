window.addEventListener('DOMContentLoaded', function(){
  const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
  var glot = new Glottologist();
  glot.import("../../../data/l10n.json").then(() => {
    glot.render();
  });
});