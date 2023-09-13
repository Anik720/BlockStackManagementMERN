const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [3, 'must be greater than 3'],
  },
  address: {
    type: String,
    required: [true, 'Please tell us your address!'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please tell us your phone number!'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  profession: {
    type: String,
    required: [true, 'Please tell us your profession!'],
    trim: true,
  },
  favourite_color: {
    type: String,
    required: [true, 'Please tell us favourite color!'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
  activated: {
    type: Boolean,
    default: false,
  },
});

// userSchema.pre(/^find/, function (next) {
//   next();
// });

// Encrpt the password ad Presave it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //  only run if password is modified
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); // hashing password
  this.passwordConfirm = undefined; // delete passwordConfirm field
  next();
});



// comparing password
userSchema.methods.correctPassword = async function (candidate_Password, user_Password) {
  console.log(candidate_Password);
  return await bcrypt.compare(candidate_Password, user_Password);
};



const User = mongoose.model('User', userSchema);
module.exports = User;
