const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/auto-mpg.data'), 'utf-8');

const newData = data.replace(/( {2,})/g, ',').replace(/\t/g, ',');
console.log(newData);
fs.writeFile(path.join(__dirname, '/auto-mpg.txt'), newData, err => {
    if(err) {
        console.error(err);
        return;
    }
    console.log('Success!');
});