const fs = require("fs");
const FILE1 = "./book/page1.txt";
const FILE2 = "./book/page2.txt";
const EX_WORDS = "./book/excluded-words.txt";

const OUTPUTFILE = "./book/index.txt";

async function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function write(file, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, text, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function processPages(sortedWords, page1, page2) {
  const outputObj = sortedWords.map(word => {
    let str = "";
    if (hasWord(word, page1)) {
      str = "1";
    }
    if (hasWord(word, page2)) {
      str += str ? ",2" : "2";
    }
    str = str ? str : "0";
    return `\n ${word}: ${str}`;
  });
  return outputObj;
}

function hasWord(word, page) {
  return page.includes(word);
}

async function main() {
  const excludedWords = await read(EX_WORDS);
  const pageOne = await read(FILE1);
  const pageTwo = await read(FILE2);

  console.log(excludedWords);
  const axedWordsArr = excludedWords.split(",");
  const sortedWords = axedWordsArr.sort((a, b) => (a > b ? 1 : -1));
  console.log(sortedWords);

  const outputStr = processPages(sortedWords, pageOne, pageTwo);

  console.log(`This is the output -> ${outputStr}`);

  await write(OUTPUTFILE, outputStr);

  const updatedContent = await read(OUTPUTFILE);
  console.log(`Woohhhooooo - ${updatedContent}`);
  // console.log(pageOne);
  // console.log(pageTwo);
}

main();
