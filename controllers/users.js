const User = require('../models/user');

module.exports.createUser = (req, res) => {
    const {name, avatar, about} = req.body;
    User.create({name, avatar, about})
        .then(user => res.send({data: user}))
        .catch(err => res.status(err.status).send({message: err.message}));
};


module.exports.getUsers = (req, res) => {
    User.find({})
        .then(users => res.send({data: users}))
        .catch(err => res.status(err.status).send({message: err.message}));
};

module.exports.getUser = (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.send({data: user}))
        .catch(err => res.status(err.status).send({message: err.message}));
};

module.exports.updateProfile = (req, res) => {
    const {name, about} = req.body;
    User.findByIdAndUpdate(req.user._id,
        {name: name, about: about},
        {new: true, runValidators: true})
        .then(user => res.send({data: user}))
        .catch(err => res.status(err.status).send({message: err.message}));
};

module.exports.updateAvatar = (req, res) => {
    const {avatar} = req.body;
    User.findByIdAndUpdate(req.user._id,
        {avatar: avatar},
        {new: true, runValidators: true})
        .then(user => res.send({data: user}))
        .catch(err => res.status(err.status).send({message: err.message}));
};