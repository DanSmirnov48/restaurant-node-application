const { redirect } = require('express/lib/response');
const nedb = require('nedb');
class Restaurant {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            dishName: "BBQ rainbow beef salad",
            dishDesc: 'The steak in this light salad is cooked on the barbecue, giving it a true taste of summer. It works brilliantly with our Asian-inspired dressing',
            dishType: 'lunch',
            dishPrice: '9.99',
            dishImage: 'beef salad.JPG',
            dishIngredients:
                [
                    "2 x 250g sirloin sirloin steaks",
                    "thumb-sized piece ginger ",
                    "2 limes",
                    "1 garlic clove",
                    "3 spring onions",
                    "12 radishes"
                ],
            dishallergies:
                [
                    "Eggs"
                ]
        });
        this.db.insert({
            dishName: "Fresh salmon with Thai noodle salad",
            dishDesc: 'Ideal for a quick midweek meal, whip up this nutritious salmon and noodle salad in just 20 minutes. The balance of protein and carbs make it super satisfying',
            dishType: 'lunch',
            dishPrice: '9.99',
            dishImage: 'salmon noodle salad.JPG',
            dishIngredients:
                [
                    "2 skinless salmon fillets",
                    "1 large orange",
                    "125g French beans",
                    "50g mange tout ",
                    "75g frozen peas",
                    "75g vermicelli rice noodles",
                    "2 tsp red curry paste"
                ],
            dishallergies:
                [
                    "Fish",
                    "Peas",
                    "Soy"
                ]
        });
        this.db.insert({
            dishName: "Smoky tomato, corn soup",
            dishDesc: 'Dig out the chipotle paste and make this punchy smoky tomato, chipotle and charred sweetcorn soup. An easy midweek meal, you can freeze any leftovers',
            dishType: 'lunch',
            dishPrice: '9.99',
            dishImage: 'Smoky tomato soup.JPG',
            dishIngredients:
                [
                    "1 onion",
                    "2 garlic cloves",
                    "coriander ",
                    "400g can chopped tomatoes",
                    "600ml vegetable stock",
                    "1-1½ tbsp chipotle chilli paste",
                    "50g feta"
                ],
            dishallergies:
                [
                    "none"
                ]
        });
        this.db.insert({
            dishName: "Beetroot, hummus & crispy chickpea sub sandwich",
            dishDesc: 'Load up a sub with homemade hummus, beetroot, chickpeas and salad to make this filling vegan sandwich. An ideal lunch for when hunger strikes',
            dishType: 'dinner',
            dishPrice: '9.99',
            dishImage: 'sandwich.JPG',
            dishIngredients:
                [
                    "300g pack cooked beetroot",
                    "400g can chickpeas",
                    "3 tbsp vegan pesto",
                    "olive oil",
                    "vinegar ",
                    "2 large ciabatta rolls",
                    "watercress"
                ],
            dishallergies:
                [
                    "Wheat",
                    "Egg",
                    "Soy"
                ]
        });
        this.db.insert({
            dishName: "Creamy pesto & kale pasta",
            dishDesc: 'Enjoy our creamy pesto and kale pasta as a tasty and nutritious supper. Make it with just a handful of ingredients and storecupboard staples',
            dishType: 'dinner',
            dishPrice: '9.99',
            dishImage: 'Creamy pasta.JPG',
            dishIngredients:
                [
                    "300g kale",
                    "300g wholemeal pasta",
                    "4 tbsp reduced-fat soft cheese",
                    "4 tbsp fresh pesto",
                    "2 red onions",
                    "rapeseed oil"
                ],
            dishallergies:
                [
                    "Wheat",
                    "Egg",
                    "Cheese"
                ]
        });
        this.db.insert({
            dishName: "Smoked salmon & spinach gratin",
            dishDesc: 'Make this easy Swedish-inspired smoked salmon and spinach gratin with just four ingredients. Serve with potatoes and roasted beets – perfect for entertaining',
            dishType: 'dinner',
            dishPrice: '9.99',
            dishImage: 'Smoked Salmon.JPG',
            dishIngredients:
                [
                    "1.2kg spinach",
                    "15g butter",
                    "smoked raw salmon fillets",
                    "300ml double cream"
                ],
            dishallergies:
                [
                    "Fish"
                ]
        });
        //-----------chefs special
        this.db.insert({
            dishName: "Coronation chicken pie",
            dishDesc: 'Serve this gently spiced chicken pie warm or cold its delicious either way. While it looks impressive for a party or picnic, its easy to make using ready-made puff pastry',
            dishType: 'chefs_special',
            dishPrice: '19.99',
            dishImage: 'chiken pie.JPG',
            dishAvailible: true,
            dishIngredients:
                [
                    "chicken thighs",
                    "large piece ginger",
                    "cumin seeds",
                    "korma curry paste",
                    "coconut milk",
                    "block puff pastry",
                    "plain flour",
                    "egg"
                ],
            dishallergies:
                [
                    "Wheat",
                    "Egg",
                    "Milk"
                ]
        });

        this.db.insert({
            dishName: "Cheese & bacon turnovers",
            dishDesc: 'Make some moreish cheese and bacon turnovers for lunch, a picnic or buffet, and add a dollop of mustard if you like. They will keep for up to three days',
            dishType: 'chefs_special',
            dishPrice: '19.99',
            dishImage: 'Cheese & bacon turnovers.JPG',
            dishAvailible: false,
            dishIngredients:
                [
                    "1 sheet ready-rolled puff pastry",
                    "3 tbsp soft cheese",
                    "mustard ",
                    "smoked bacon",
                    "mature cheddar",
                    "egg"
                ],
            dishallergies:
                [
                    "Cheese",
                    "Egg"
                ]
        });

        this.db.insert({
            dishName: "Raspberry & white chocolate crumble muffins",
            dishDesc: 'Mix tangy raspberries with white chocolate chips, a light sponge and toasty topping to make these moreish muffins. They are ideal for a mid-morning snack',
            dishType: 'chefs_special',
            dishPrice: '19.99',
            dishImage: 'muffins.JPG',
            dishAvailible: true,
            dishIngredients:
                [
                    "unsalted butter,",
                    "caster sugar",
                    "brown soft sugar",
                    "large eggs",
                    "yogurt",
                    "vanilla paste",
                    "milk",
                    "self-raising flour",
                    "raspberries",
                    "white chocolate chips",
                ],
            dishallergies:
                [
                    "Milk",
                    "Eggs",
                    "Chocolate",
                    "wheat"
                ]
        });
    }
    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({ $not: { dishType: 'chefs_special' } }, function (err, entries) {
                err ? reject(err) : resolve(entries)
            })
        })
    }

    getDishByName(dishName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'dishName': dishName }, function (err, entry) {
                err ? reject(err) : resolve(entry)// && console.log('getDishByName returns: ', entry);
            })
        })
    }

    getDishType(dishType, dishAvailible) {
        if (dishAvailible == true) {
            return new Promise((resolve, reject) => {
                this.db.find({ $and: [{ dishType: dishType }, { dishAvailible: true }] }, function (err, entries) {
                    err ? reject(err) : resolve(entries)// && console.log('getDishType returns: ', entries);
                })
            })
        }
        return new Promise((resolve, reject) => {
            this.db.find({ 'dishType': dishType }, function (err, entries) {
                err ? reject(err) : resolve(entries)// && console.log('getDishType returns: ', entries);
            })
        })
    }

    addEntry(isChefsSpecial, name, desc, type, price, image, isAvailable, ingredients, allergies) {

        var entry;
        if (isChefsSpecial) {
            entry = {
                dishName: name,
                dishDesc: desc,
                dishType: type,
                dishPrice: price,
                dishImage: image,
                dishAvailible: isAvailable,
                dishIngredients: ingredients.split(/[, ]+/),
                dishallergies: allergies.split(/[, ]+/)
            }
        } else {
            entry = {
                dishName: name,
                dishDesc: desc,
                dishType: type,
                dishPrice: price,
                dishImage: image,
                dishIngredients: ingredients.split(/[, ]+/),
                dishallergies: allergies.split(/[, ]+/)
            }
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            err ? console.log('Error inserting document', subject) : console.log('document inserted into the database', doc)
        })
    }

    updateEntry(orgName, name, desc, type, price, image, ingredients, allergies) {
        var newEntry = {
            dishName: name,
            dishDesc: desc,
            dishType: type,
            dishPrice: price,
            dishImage: image,
            dishIngredients: ingredients,
            dishallergies: allergies
        }
        console.log('entry created', newEntry);
        const oldEntry = this.getDishByName(orgName);

        this.db.update(oldEntry, newEntry, function (err, doc) {
            err ? console.log('Error updated document', subject) : console.log('document updated into the database', doc);
        })
    }

    deleteEntry(dishName) {
        return new Promise((resolve, reject) => {
            this.db.remove({ 'dishName': dishName }, function (err, entry) {
                err ? reject(err) : resolve(entry) && console.log(`${dishName} deleted`);
            })
        })
    }

    chnageDishAvailability(name, isAvailable) {

        var res = (isAvailable === 'true');

        this.db.update({ dishName: name }, { $set: { dishAvailible: !res } }, function (err, numReplaced) {
            err ? console.log('Error updated document', subject) : console.log("replaced---->" + numReplaced);
        });
    }
}
module.exports = Restaurant;