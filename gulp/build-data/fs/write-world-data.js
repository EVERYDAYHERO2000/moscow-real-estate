const fs = require('fs-extra');

const writeWorldData = function (dataset, filename) {

    fs.mkdir(DEV_PATH + `/bin/data/`, { recursive: true }, (err) => {
        if (err) {
            throw err;

        } else {

            fs.writeFile(DEV_PATH + `/bin/data/${filename}.json`, JSON.stringify(dataset), function (err) {
                if (err) {
                    console.log('buildData -->', err);
                } else {
                    console.log(`World data: "/bin/data/${filename}.json" is saved`);
                }
            });

        }

    });
}

module.exports = writeWorldData;