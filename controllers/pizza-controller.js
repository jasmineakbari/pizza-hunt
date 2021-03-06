const { Pizza } = require('../models');

const pizzaController = {
    //find all
    getAllPizza(req, res) {
      Pizza.find({})
      // uses .populate to be able to view comment data when retrieving the pizza
      // information
      .populate({
        path: 'comments',
        // -__v is an uneccessary field always created with objects and returned
        // with every response
        select: '-__v'
      })
        .select('-__v')
        // sorts in descending order by the id's value
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // find one
    getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
        .select('-__v')
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // create a pizza
    createPizza({ body }, res) {
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.status(400).json(err));
    },

    // update the pizza by id
    updatePizza({ params, body }, res) {
        // set param to true to accept the new updated "document"
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, 
          runValidators: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
    },

    // deletes pizza
    deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;