const express = require('express')
const protect = require('../auth/tokenMiddleware')

let cereals = [
  {
    "id": 1,
    "name": "Rice Krispies",
    "brand": "Kellogg's",
    "sugarContent": 4,
    "history": "Introduced in 1928, Rice Krispies is famous for its 'Snap, Crackle, Pop' sound when milk is added. It was created to offer a light and crispy texture."
  },
  {
    "id": 2,
    "name": "Cheerios",
    "brand": "General Mills",
    "sugarContent": 1,
    "history": "First sold in 1941 under the name CheeriOats, Cheerios was one of the first ready-to-eat oat cereals. It's known for its distinctive O shape and health benefits."
  },
  {
    "id": 3,
    "name": "Corn Flakes",
    "brand": "Kellogg's",
    "sugarContent": 3,
    "history": "Corn Flakes were invented in 1894 by John Harvey Kellogg as a health food for patients at The Battle Creek Sanitarium. It became the flagship product of Kellogg's company."
  },
  {
    "id": 4,
    "name": "Frosted Flakes",
    "brand": "Kellogg's",
    "sugarContent": 11,
    "history": "Introduced in 1952, Frosted Flakes, or Frosties, are a sweetened version of Corn Flakes. Its mascot, Tony the Tiger, has become iconic with its 'They're Gr-r-reat!' slogan."
  },
  {
    "id": 5,
    "name": "Lucky Charms",
    "brand": "General Mills",
    "sugarContent": 10,
    "history": "Launched in 1964, Lucky Charms were the first cereal to include marshmallows in the recipe. The mascot, Lucky the Leprechaun, coined the phrase 'Magically Delicious.'"
  },
  {
    "id": 6,
    "name": "Froot Loops",
    "brand": "Kellogg's",
    "sugarContent": 12,
    "history": "First introduced in 1963, Froot Loops are fruit-flavored cereal rings. They are known for their colorful appearance and mascot, Toucan Sam."
  },
  {
    "id": 7,
    "name": "Cinnamon Toast Crunch",
    "brand": "General Mills",
    "sugarContent": 9,
    "history": "Introduced in 1984, Cinnamon Toast Crunch aims to replicate the taste of cinnamon sugar toast in a crunchy cereal form. It's known for its swirls of cinnamon and sugar."
  },
  {
    "id": 8,
    "name": "Cap'n Crunch",
    "brand": "Quaker Oats",
    "sugarContent": 12,
    "history": "Cap'n Crunch cereal, introduced in 1963, was developed to recall a brown sugar and butter flavor. The mascot, Cap'n Crunch, is a sea captain character."
  },
  {
    "id": 9,
    "name": "Honey Nut Cheerios",
    "brand": "General Mills",
    "sugarContent": 9,
    "history": "Introduced in 1979, Honey Nut Cheerios is a sweeter variant of the original Cheerios. It quickly became a favorite for its honey and almond flavor."
  },
  {
    "id": 10,
    "name": "Shredded Wheat",
    "brand": "Post",
    "sugarContent": 0,
    "history": "Shredded Wheat was first made in 1890 by Henry Perky, who aimed to create a whole wheat cereal for better health. It is known for its simple, unsweetened whole grain biscuit form."
  }
]


const router = express.Router()

router.get('/', protect, (req, res) => {
  res.json(cereals)
})

module.exports = router
