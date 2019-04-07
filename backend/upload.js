// Multer is a npm pakcage for file uploads
// to install it run in terminal(command line) -> $ npm i --save multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Folder that you will store photos in.
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        // To make every image name is unique
        // Example: 
        // ImageName: Avengers.png
        // NewImageName: 2019-04-06T23:45:24.771ZAvengers.png 
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // To make filters in files that backend recieves
    // here we make filter to allow only images with ['png', 'jpeg', 'jpg']
    //
    let { mimetype } = file; // we extract mimetype from file object 
    let types = ['image/png', 'image/jpg', 'image/jpeg'];
    if (types.includes(mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Max file size is: 5 MBs 
    },
    fileFilter: fileFilter
})


module.exports = upload;