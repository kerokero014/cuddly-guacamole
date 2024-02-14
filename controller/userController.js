const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const lists = await User.getAllUsers();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(lists);
  } catch (error) {
    console.error('Error in getUsers function:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const singleUser = await User.getUserById(userId);

    if (singleUser) {
      res.status(201).json(singleUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getSingleUser function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNewUser = async (req, res) => {
  try {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      JobTitle: req.body.JobTitle,
      Experience: req.body.Experience,
      Education: req.body.Education,
      password: req.body.password
    };
    const newUser = await User.create(userData);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in createNewUser function:', error);
    res.status(500).json({ error: 'Error occurred while creating user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      JobTitle: req.body.JobTitle,
      Experience: req.body.Experience,
      Education: req.body.Education,
      Education: req.body.Education,
      password: req.body.password
    };
    const updatedUser = await User.update(userId, userData);

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in updateUser function:', error);
    res.status(500).json({ error: 'Error occurred while updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.delete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser function:', error);
    res.status(500).json({ error: 'Error occurred while deleting user' });
  }
};

module.exports = { getUsers, getSingleUser, createNewUser, updateUser, deleteUser };
