const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    unique: true,
    trim: true,
    maxLength: [20, 'A tour name must be less than or equal to 20 characters'],
    minLength: [5, 'A tour name must be at least 5 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a name.'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  photo: {
    type: String,
    required: [true, 'A user must upload a photo.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    trim: true,
    minLength: [8, 'A password must be at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password is required.'],
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
