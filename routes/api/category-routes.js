const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [{model: Product}]
  }).then(response =>{
    res.json(response)
  }).catch(err =>{
    console.log(err);
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let id = req.params.id;
  Category.findAll({
    where:{
      id: id,
    },
    include: [{model: Product}]
  }).then(response =>{
    res.json(response)
  }).catch(err =>{
    console.log(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Category.destroy({
    where:{
      id: id
    }
  }).then(response =>{
    res.status(200).json('{message: "Record deleted"}')
  }).catch(err=>{
    res.status(400).json(err)
  });
});

module.exports = router;
