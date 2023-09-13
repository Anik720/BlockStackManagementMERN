
const Report = require("../models/reportModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllReports = factory.getAll(Report);
exports.careteReport = factory.createOne(Report);
exports.getReport = factory.getOne(Report);
exports.updateReport= factory.updateOne(Report);
exports.deleteReport = factory.deleteOne(Report);
