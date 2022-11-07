const axios = require("axios");

const options = {
  method: "POST",
  url: "https://jspell-checker.p.rapidapi.com/check",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "bbbbbef01fmshf5d372f67c4c8bfp108265jsn98a0bdb9db66",
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
