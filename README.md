## <b>mapPatch</b> - Map/copy patches between the Roland JU-06 and JU-06A

Before you start, make sure you download and install node.js:

https://nodejs.org/en/download/

### Usage:

Place the mapPatch.js file in a folder in close relation to the patches, eg.
```
boutique
│   mapPatch.js

└───JU-06A
│      JU06A_PATCH76.PRM
│
└───JU-06
│
|
└───dest
```

Open terminal app on Mac or CMD or Powershell on Windows.
Navigate to the folder and write cd and a space:
```
cd
```
and drag the folder to the terminal to get the path. Then press enter.

To run the script, enter the following command:

````
node mapPatch.js <file> <destination>
````

Where file is the relative path to the patch, and destination is a folder.
Make sure to create to folder before usage, or the script will fail.
Example using the folder structure from above:
```
node mapPatch.js JU-06A/JU06A_PATCH76.PRM dest
```

Or output the patch directly to the JU-06 folder:
```
node mapPatch.js JU-06A/JU06A_PATCH76.PRM JU-06
```

### Gotchas:

There is 5 parameters on the JU-06A that the JU-06 doesn't have:
 - LFO WAVE
 - LFO TRIG
 - SUB SW
 - DELAY SW
 - TEMPO SYNC

So if you have a JU-06A patch where these are an important part, the copy may sound different.

If you like the work, and would like to give a small help,
any donations are appreciated.
https://www.paypal.com/paypalme/williamlarsson
And feel free to write me with any questions, I'll be happy to assist.
williamlarsson@live.dk
