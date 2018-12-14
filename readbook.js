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

async function main() {
  const excluded = await read(EX_WORDS);
  const firstContent = await read(FILE1);
  const secondContent = await read(FILE2);

  await write(OUTPUTFILE, "Is this an awesome app? Sure it is!");

  const updatedContent = await read(OUTPUTFILE);
  console.log(updatedContent);
  console.log(firstContent);
  console.log(secondContent);
}

main();
