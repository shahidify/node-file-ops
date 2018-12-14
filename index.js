(function() {
  console.log("Welcome");
  let output = [];
  async function readTextFile(files) {
    //fetch(file) .then(response => response.text()).then(text => console.log(text))
    const promises = files.map(file =>
      fetch(file).then(response => response.text())
    );

    const [excludedWords, page1, page2] = await Promise.all(promises);
    const axedWordsArr = excludedWords.split(",");
    const sortedWords = axedWordsArr.sort((a, b) => (a > b ? -1 : 1));
    let arr = [];
    const outputObj = sortedWords.map((word, i) => {
      if (hasWord(word, page1)) {
        arr.push(1);
      }
      if (hasWord(word, page2)) {
        arr.push(2);
      }

      return { [word]: arr.join(",") };
    });
    writeFile(outputObj);
  }

  function hasWord(word, page) {
    return page.includes(word);
  }

  function writeFile(output) {
    output.map(obj => obj);
    console.log(output.toString());
    //document.querySelector('#output').textContent(output.toString());
  }

  readTextFile([
    "/book/excluded-words.txt",
    "/book/page1.txt",
    "/book/page2.txt"
  ]);
  // const excludedWords = readTextFile(["/book/excluded-words.txt"] );
})();
