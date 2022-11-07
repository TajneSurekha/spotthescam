const axios = require("axios");

const options = {
  method: "POST",
  url: "https://jspell-checker.p.rapidapi.com/check",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "*****",
    "X-RapidAPI-Host": "jspell-checker.p.rapidapi.com",
  },
  data: '{"language":"enUS","fieldvalues":"thiss is intresting","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}',
};

module.exports.spellCheck = async function (data) {
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
