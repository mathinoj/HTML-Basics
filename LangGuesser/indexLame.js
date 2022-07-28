const franc = require("franc");
const langs = require("langs");
// console.log(franc("Alle menslike wesens word vry"));
const langCode = franc("Alle menslike wesens word vry");

const language = langs.where("3", langCode);
console.log(language);
