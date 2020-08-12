const fs = require("fs");
const inputFile = process.argv.slice(2)[0];
let isJU06A = inputFile.match(/JU06A/g) ? true : false;
const outputDest = process.argv.slice(2)[1];
if (! outputDest) {
  return console.log("You must specify a destination folder as the 2nd argument");
}
let number = inputFile.match(/(\d+).PRM/)[1];
let outputFile = "";

let removeFromJU06 = ["LFO WAVE", "LFO TRIG", "SUB SW", "DELAY SW", "TEMPO SYNC"];


let addToJU06A = {
  2: {
    name: "LFO WAVE",
    value: 0,
  },
  3: {
    name: "LFO TRIG",
    value: 0,
  },
  12: {
    name: "SUB SW",
    value: 0,
  },
  30: {
    name: "DELAY SW",
    value: 0,
  },
  35: {
    name: "TEMPO SYNC",
    value: 0,
  },
};

if (isJU06A) {
  outputFile = inputFile
    .replace("JU06A", "JU06")
    .replace(/(\d+).PRM/g, parseInt(number) - 64 + ".PRM")
    .match(/(\/JU.*.PRM)/g);
} else {
  outputFile = inputFile
    .replace("JU06", "JU06A")
    .replace(/(\d+).PRM/g, parseInt(number) + 64 + ".PRM")
    .match(/(\/JU.*.PRM)/g);
}

outputFile = outputDest + outputFile;

fs.readFile(inputFile, "utf8", (err, data) => {
  // throws an error, you could also catch it here
  if (err) throw err;
  let outputString = "";
  let lines = data.split("\n");
  function amountOfSpaces(el) {
    let amount = 17 - el.length;
    let spaces = [];
    while (amount !== 0) {
      spaces.push("");
      amount -= 1;
    }
    return spaces.join(" ");
  }

  if ( isJU06A) {
    for (var i = 0; i < lines.length; i++ ) {

      if (lines[i].match(/PATCH/g)) {
        outputString += lines[i];
      } else {
        let regex = lines[i].match(/(.+)\((\d+)\)/);
          let key = regex[1].trim();
          let value = regex[2];
          if (!removeFromJU06.includes(key)) {
            outputString += `${key}${amountOfSpaces(key)}${value};\n`;
          }
      }
    }
  } else {
    let whiteListCounter = 0;

    for (var i = 0; i < ( lines.length + 5 ); i++ ) {
      if ( Object.keys(addToJU06A).includes(i.toString()) ) {
        let key = addToJU06A[i].name.trim();
        let value = addToJU06A[i].value;
        outputString += `${key}${amountOfSpaces(key)}${value};\n`;
        whiteListCounter++;
      } else if (lines[i - whiteListCounter].match(/PATCH/g)) {
        outputString += lines[i - whiteListCounter];
      } else {
        let regex = lines[i - whiteListCounter].match(/(.+)\((\d+)\)/);
        let key = regex[1].trim();
        let value = regex[2];

        outputString += `${key}${amountOfSpaces(key)}${value};\n`;

      }
    }
  }

  fs.writeFile(outputFile, outputString, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved as: ",outputFile);
  });
});
