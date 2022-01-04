const path = require('path');
const db = require('./localstorage/localStorageDb');
const fs = require('fs');


describe('UNIT TEST localStorageDb',() => {
    it('should create a file in respective folder and then clear file', () => {
        const respectiveFolder = path.join('src','database','localstorage','test');
        console.log(respectiveFolder);

        db.setItem('week.json',1);

        expect(fs.existsSync(path.join(respectiveFolder))).toBeTruthy();
        expect(fs.existsSync(path.join(respectiveFolder, 'week.json'))).toBeTruthy();

        db.removeItem('week.json');
    })
})