const restaurantDAO = require('../models/restaurantModel');
const userDao = require("../models/userModel.js");
const db = new restaurantDAO();

db.init();

exports.landing_page = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('home', {
                'title': 'Restaurant',
                'entries': list
            });
            console.log('promise resolved');
            })
            .catch((err) => {
                console.log('promise rejected', err);
            })
}

exports.about_page = function (req, res) {
    res.render('about', {
        'title': 'About'
    })
}

exports.entries_list = function (req, res, next) {
    db.getAllEntries()
        .then((list) => {
            res.render('entries', {
                'title': 'Menu',
                'entries': list,
            });
            // console.log('promise resolved', list);
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.new_entries = function (req, res) {
    res.render('newEntry', {
        'title': 'Add Dish'
    })
}

exports.post_new_entry = function (req, res) {
    // console.log(req.file);
    console.log('processing post-new_entry controller');

    if(req.body.dishType == "chefs_special"){
        db.addEntry(
            true,
            req.body.dishName,
            req.body.dishDesc,
            req.body.dishType,
            req.body.dishPrice,
            req.file.filename,
            true,
            req.body.dishIngredients,
            req.body.dishallergies
        );
        res.redirect("/loggedIn");
    }else{
        db.addEntry(
            null,
            req.body.dishName,
            req.body.dishDesc,
            req.body.dishType,
            req.body.dishPrice,
            req.file.filename,
            null,
            req.body.dishIngredients,
            req.body.dishallergies
        );
        res.redirect("/loggedIn");
    }
}

exports.show_dish_by_name = function (req, res) {
    let name = req.params.name;

    db.getDishByName(name).then(
        (entry) => {
            res.render('entry', {
                'title': name,
                'entry': entry
            });
        }).catch((err) => {
            console.log('error handling dish', err);
        });
}

exports.show_dinner_dishes = function (req, res) {
    db.getDishType('dinner').then(
        (entries) => {
            res.render('entries', {
                'title': 'Dinner Dishes',
                'entries': entries,
            });
        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}

exports.show_lunch_dishes = function (req, res) {
    db.getDishType('lunch').then(
        (entries) => {
            res.render('entries', {
                'title': 'Lunch Dishes',
                'entries': entries
            });
            console.log(entries);
        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}

exports.chefs_special = function (req, res) { 
    //db.getDishType(dish type, show all - false/availalbe only - true)
    db.getDishType('chefs_special', true).then(
        (entries) => {
            res.render('entries', {
                'title': 'Chefs special dishes',
                'entries': entries,
                //show 'Update' button on chef's special dishes
                'chefs_special': true,
            });
        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}

exports.chefs_special_admin = function (req, res) { 
    //db.getDishType(dish type, show all - false/availalbe only - true)
    db.getDishType('chefs_special', false).then(
        (entries) => {
            res.render('special', {
                'title': 'Chefs special dishes',
                'entries': entries,
                user: 'user'
            });
        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}

exports.update_dish = function (req, res) {
    const name = req.params.name;

    db.getDishByName(name).then(
        (entry) => {
            res.render('updateEntry', {
                'title': `Update ${name}`,
                'entry': entry,
                'dinner': entry.dishType == "dinner",
                'lunch': entry.dishType == "lunch",
            });
        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}

exports.post_update_dish = function (req, res) {
    console.log('processing patch entry controller');
    if (!req.body.dishName) {
        response.status(400).send("Dish must have an name.");
        return;
    }
    db.updateEntry(
            req.params.name,
            req.body.dishName, 
            req.body.dishDesc, 
            req.body.dishType, 
            req.body.dishPrice,
            req.file.filename,
            req.body.dishIngredients,
            req.body.dishallergies
    );
    res.redirect('/loggedIn');
}

exports.delete_dish = function (req, res) {
    const name = req.params.name;
    db.deleteEntry(name);
    res.redirect('/loggedIn')
}

exports.change_dish_availability = async function (req, res) {
    const name = req.params.name;
    const avb = req.params.availible;
    db.chnageDishAvailability(name, avb);
    res.redirect('/chefs-special-admin')
}
  

//-------------------USER------------------------------------------

exports.show_login = function (req, res) {
    res.render("user/login");
};

exports.handle_login = function (req, res) {
    db.getAllEntries()
    .then((list) => {
        res.render('entries', {
            'title': 'Menu',
            'entries': list,
            user: "user"
        });
        // console.log('promise resolved', list);
    })
    .catch((err) => {
        console.log('promise rejected', err);
    })
};

exports.show_register_page = function (req, res) {
    res.render("user/register");
};

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (!user || !password) {
        res.send(401, "no user or no password");
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect("/login");
    });
};

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "Restaurant",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
};