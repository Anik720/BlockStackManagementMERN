const mongoose = require("mongoose");
const validator = require('validator');
const reportSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
    maxlength: [20, "must be less than or equal to 20"],
    minlength: [3, "must be greater than 3"],
  },
  address: {
    type: String,
    required: [true, "Please tell us your address!"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please tell us your phone number!"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profession: {
    type: String,
    required: [true, "Please tell us your profession!"],
    trim: true,
  },
  favourite_color: {
    type: String,
    required: [true, "Please tell us favourite color!"],
    trim: true,
  },

  creator: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

reportSchema.pre("save", async function (next) {
  if (!this.isNew) {
    // If the document is not new (updating an existing one), skip this middleware
    return next();
  }

  try {
    // Find the maximum existing 'id' field
    const maxId = await this.constructor.findOne({}, "id").sort({ id: -1 });

    // Set the new 'id' as the maximum 'id' + 1 or 1 if no documents exist
    this.id = maxId ? maxId.id + 1 : 1;
    return next();
  } catch (err) {
    return next(err);
  }
});


reportSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
  });

  next();
});
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
