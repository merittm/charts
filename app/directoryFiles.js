const fs = require('fs');


async function directoryFiles(dir) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, files) => {
			if (!err) {
				resolve(files);
			} else {
				reject(err);
			}
		});
	});
};

module.exports = directoryFiles;