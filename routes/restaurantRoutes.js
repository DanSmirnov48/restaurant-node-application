const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers');
const path = require('path')
const {verify, checkJWT, login} = require('../auth/auth')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
         cb(null, 'images') 
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

router.get('/', checkJWT, controller.landing_page);
router.get('/about', checkJWT, controller.about_page);
router.get('/new', verify, controller.new_entries);
router.post('/new', verify, upload.single('image'), controller.post_new_entry);

router.get('/update/:name', verify, controller.update_dish);
router.post('/update/:name', verify, upload.single('image'), controller.post_update_dish);

router.get('/delete/:name', controller.delete_dish);
router.get('/availbility/:name/:availible', controller.change_dish_availability);

router.get('/dishes/all', checkJWT, controller.entries_list);
router.get('/dishes/dinner', checkJWT, controller.show_dinner_dishes);
router.get('/dishes/lunch', checkJWT, controller.show_lunch_dishes);
router.get('/dishes/:name', checkJWT, controller.show_dish_by_name);

router.get('/chefs-special', checkJWT, controller.chefs_special);
router.get('/chefs-special-admin', verify, controller.chefs_special_admin);

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;