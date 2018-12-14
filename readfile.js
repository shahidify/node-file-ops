const fs = require("fs");

function getFileContents(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      console.log("Reading File");
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// function getAllPagesContent(dirname) {
//   console.log(dirname);

//   //if (!fileName || fileName.indexOf(allowed) === -1) return;

//     return fs.readdir(dirname, function(err, filenames){
//       console.log(filenames);
//       //const files = filenames.filter(filename => filename.indexOf('page') !== -1);
//       return new Promise(function(resolve, reject) {
//         if (err)
//             reject(err);
//         else
//             resolve(filenames);
//       });
//     });
// };

function getAllPagesContent(dirname) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) reject(err);
      else resolve(filenames);
    });
  });
}

async function showFileContents() {
  try {
    let data = await getFileContents("./book/excluded-words.txt");

    let pageOne = await getFileContents("./book/page1.txt");
    let pageTwo = await getFileContents("./book/page2.txt");

    const res = await Promise.all(pageOne, pageTwo);
    const dataPromises = res.map(r => {
      console.log(r);
      return r;
    });
    console.log(dataPromises);

    //let allFiles = getAllPagesContent('./book/');
    //let files = allFiles.filter(file => file );

    // const allRes = await Promise.all(files.map = (file) => file);
    // console.log(allRes);
    // const dataPromises = allRes.map(r => {console.log(r); return r;});
    // const final = await Promise.all(dataPromises);
    // console.log(final);

    //const res = Promise.all(data, files);

    // console.log(res);

    //let files = allFiles.filter(file => file );

    //const promises = files.find

    //console.log(files);
    // const promises = files.map((file) => {
    //   files.find()
    //   file = `./book/${file}`;
    //   return getFileContents(file);
    // })

    // console.log(files);
  } catch (err) {
    console.error("Error getting data from file:", err);
  }
}
//showFileContents();

async function getData(files) {
  try {
    const promises = files.map(file =>
      fs.readFile(file, "utf-8", (err, data) => data)
    );
    const [page1, page2] = await Promise.all(promises);
    console.log(page1, page2);
  } catch (err) {
    console.error("Error getting data from file:", err);
  }
}

getData(["./page1.txt", "./page2.txt"]);
