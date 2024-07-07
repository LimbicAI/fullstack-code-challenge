const fs = require('fs-extra');

const sourceFolder = '../build';
const destinationFolder = '../../backend/public';

// Empty the destination folder first
fs.emptyDir(__dirname + "/" + destinationFolder, error => {
    if (error) {
        console.error(`Error emptying ${destinationFolder} destination folder:`, error);
    } 
    else {
        console.log(`${destinationFolder} Destination folder emptied successfully.`);
        
        // Use fs-extra's copy function
        fs.copy(__dirname + "/" + sourceFolder, __dirname + "/" + destinationFolder, error => {
            if (error) {
                console.error(`Error copying ${sourceFolder} folder:`, error);
            }
            else {
                console.log(`Folder ${sourceFolder} successfully copied!`);
            }
        });
    }
});