const express = require("express");
const urgencyModel = require("./models/urgencyModel");
const scamMessageModel = require("./models/scamMessageModel");
const popularScamModel = require("./models/popularMessages");
const app = express();
const spellchecker = require("./src/controllers/spellchecker");

app.get("/api/newscammsgs", async (req, res) => {
  try {
    const scams = await scamMessageModel
      .find({})
      .limit(10)
      .sort({ lastUpdated: -1 });
    res.send(scams);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/api/popularscams", async (req, res) => {
  try {
    const scams = await popularScamModel.find({}).limit(5);
    res.send(scams);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/api/spotscam", async (request, response) => {
  try {
    const possibleScamChecklist = {
      incorrectSpellings: false,
      urgency: false,
      amountDetails: false,
      lotteryKeywords: false,
      httpUrl: false,
    };

    const report = {
      urgencyKeywords: {},
      lotteryKeywords: {},
      spellCheck: {},
      url: {},
      bankKeywords: {},
    };

    const message = request.body.message;
    const words = message.split(" ");
    checkSpelling(message, report, possibleScamChecklist);
    checkUrgency(words, message, report, possibleScamChecklist);
    checkIfContainsBankKeywords(message, report, possibleScamChecklist);
    checkIfLotteryKeywords(message, report, possibleScamChecklist);
    checkUrl(message, report, possibleScamChecklist);

    // console.log("possible ... ", possibleScamChecklist, report);
    if (
      possibleScamChecklist.incorrectSpellings &&
      possibleScamChecklist.lotteryKeywords &&
      //possibleScamChecklist.amountDetails &&
      possibleScamChecklist.httpUrl &&
      possibleScamChecklist.urgency
    ) {
      const params = {
        message,
        count: 1,
        lastUpdated: new Date(),
      };
      const scam = new scamMessageModel(params);
      try {
        await scam.save();
        console.log("Scam Message saved to Database");
      } catch (error) {
        //  response.status(500).send(error);
      }
    }

    const scannerReponse = {
      possibleScamChecklist,
      report,
    };
    response.send(scannerReponse);
  } catch (error) {
    response.status(500).send(error);
  }
});

async function checkSpelling(message, report, possibleScamChecklist) {
  let incorrectSpellingCount; //= await spellchecker.spellCheck(message);
  incorrectSpellingCount = {
    totalCount: 2,
    errorInfo: [
      { word: "thiss", position: 0, suggestions: [Array] },
      { word: "intresting", position: 9, suggestions: [Array] },
    ],
  };
  possibleScamChecklist.incorrectSpellings = true;
  report.spellCheck = incorrectSpellingCount;
}

async function checkUrgency(words, message, report, possibleScamChecklist) {
  const mongoQuery = { words: { $in: words } };
  const urgency = [
    "now",
    "immediate",
    "accept",
    "within",
    "hours",
    "pending",
    "reply",
    "refund",
    "locked",
    "secure",
    "waiting",
    "expire",
    "log",
    "prevent",
    "confirm",
    "urgent",
    "bank",
    "account",
    "link",
    "click",
  ];
  let urgentKeywordsFound = [];
  urgency.some((element) => {
    if (message.toLocaleLowerCase().includes(element.toLocaleLowerCase())) {
      urgentKeywordsFound.push(element);
    }
    return false;
  });
  if (urgentKeywordsFound.length > 0) {
    possibleScamChecklist.urgency = true;
  }
  report.urgencyKeywords = {
    words: urgentKeywordsFound,
  };
}

function checkIfContainsBankKeywords(message, report, possibleScamChecklist) {
  const currencies = ["Rupees", "Rs", "$", "USD"];
  let bankKeywordsFound = [];
  const contains = currencies.some((element) => {
    if (message.toLocaleLowerCase().includes(element.toLocaleLowerCase())) {
      bankKeywordsFound.push(element);
    }
    return false;
  });

  if (bankKeywordsFound.length > 0) {
    possibleScamChecklist.amountDetails = true;
  }

  report.bankKeywords = {
    words: bankKeywordsFound,
  };
}

function checkIfLotteryKeywords(message, report, possibleScamChecklist) {
  const lotteryKeywords = ["won", "congratulations", "win", "gift"];
  const lotteryKeywordsFound = [];
  const contains = lotteryKeywords.some((element) => {
    if (message.toLocaleLowerCase().includes(element.toLocaleLowerCase())) {
      lotteryKeywordsFound.push(element);
    }
    return false;
  });

  if (lotteryKeywordsFound.length > 0) {
    possibleScamChecklist.lotteryKeywords = true;
  }
  report.lotteryKeywords = {
    words: lotteryKeywordsFound,
  };
}

function checkUrl(message, report, possibleScamChecklist) {
  const isIncludes = ["http"].some((format) => message.includes("http"));

  if (isIncludes) possibleScamChecklist.httpUrl = true;

  report.url = {
    url: "http",
  };
}

async function saveScamMessage(possibleScamChecklist) {
  if (
    possibleScamChecklist.incorrectSpellings &&
    possibleScamChecklist.lotteryKeywords &&
    //possibleScamChecklist.amountDetails &&
    possibleScamChecklist.httpUrl &&
    possibleScamChecklist.urgency
  ) {
    const params = {
      message,
      count: 1,
      lastUpdated: new Date(),
    };
    const scam = new scamMessageModel(params);
    try {
      await scam.save();
    } catch (error) {
      //  response.status(500).send(error);
    }
  }
}

module.exports = app;
