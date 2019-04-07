const express = require('express');
const router = express.Router();

/**
 * MiddleWares
 */
const upload = require('./upload');

/*
####################
@Method: POST
=> Create Service Resource
####################
*/

/**
 * @method POST
 * @description Create Service with Image
 * @param {String} name
 * @param {FormData} image
 * @return {JSON}
 */
// Note: in upload.single('image') ==> you change 'image' based on the key that frontend sents
// or by the convention the frontend and backend will deal with.
router.post('/createService', upload.single('image'), (req, res, next) => {
    const bodyService = {
        name: req.body.name,
        image: req.file.path
    }
    // Service is A Mongodb Models
    const service = new Service(bodyService);
    service
        .save()
        .then(respond => {
            if (respond) {
                res.status(200).json({
                    success: true,
                    message: 'Service Added Successfully!'
                })
            } else {
                res.status(500).json(helpers.errorJSON('Something Went Wrong!'))
            }
        })
        .catch(err => res.status(500).json(helpers.errorJSON(err)))
})


module.exports = router;