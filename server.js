const {
  selectAllCustomer,
  selectAllEmployee,
  selectAllProduct,
  selectAllIngredient,
  selectAllSupplier,
  selectAllOrder,
  selectAllSupply,
  selectAllMade,
  selectAllConsist,
  deleteSupplier,
  deleteIngredient,
  deleteProduct,
  deleteEmployee,
  deleteCustomer,
  deleteConsist,
  deleteMade,
  deleteOrder,
  deleteSupply,
  insertCustomer,
  insertEmployee,
  insertProduct,
  insertIngredient,
  insertSupplier,
  insertOrder,
  insertSupply,
  insertMade,
  insertConsist,
} = require('./src/services/dbOperations');

const express = require('express');
const cors = require('cors');
const API_PORT = process.env.PORT || 5000;
const app = express();
const config = require('./src/services/dbConfig');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// SELECT
app.post('/select-all-customers', function (req, res) {
  selectAllCustomer(res, config);
});

app.post('/select-all-orders', function (req, res) {
  selectAllOrder(res, config);
});

app.post('/select-all-products', function (req, res) {
  selectAllProduct(res, config);
});

app.post('/select-all-ingredients', function (req, res) {
  selectAllIngredient(res, config);
});

app.post('/select-all-employees', function (req, res) {
  selectAllEmployee(res, config);
});

app.post('/select-all-suppliers', function (req, res) {
  selectAllSupplier(res, config);
});

app.post('/select-all-supplies', function (req, res) {
  selectAllSupply(res, config);
});

app.post('/select-all-made', function (req, res) {
  selectAllMade(res, config);
});

app.post('/select-all-consist', function (req, res) {
  selectAllConsist(res, config);
});

// DELETE INSTANCE
app.post('/delete-supplier', (req, res) => {
  deleteSupplier(res, req.body.id, config);
});

app.post('/delete-ingredient', (req, res) => {
  deleteIngredient(res, req.body.id, config);
});

app.post('/delete-product', (req, res) => {
  deleteProduct(res, req.body.id, config);
});

app.post('/delete-employee', (req, res) => {
  deleteEmployee(res, req.body.id, config);
});

app.post('/delete-customer', (req, res) => {
  deleteCustomer(res, req.body.id, config);
});

app.post('/delete-consist', (req, res) => {
  deleteConsist(res, req.body.id, config);
});

app.post('/delete-made', (req, res) => {
  deleteMade(res, req.body.id, config);
});

app.post('/delete-order', (req, res) => {
  deleteOrder(res, req.body.id, config);
});

app.post('/delete-supply', (req, res) => {
  deleteSupply(res, req.body.id, config);
});

// INSERT
app.post('/insert-supplier', (req, res) => {
  insertSupplier(res, req.body.values, config);
});

app.post('/insert-ingredient', (req, res) => {
  insertIngredient(res, req.body.values, config);
});

app.post('/insert-product', (req, res) => {
  insertProduct(res, req.body.values, config);
});

app.post('/insert-customer', (req, res) => {
  insertCustomer(res, req.body.values, config);
});

app.post('/insert-employee', (req, res) => {
  insertEmployee(res, req.body.values, config);
});

app.post('/insert-supply', (req, res) => {
  insertSupply(res, req.body.values, config);
});

app.post('/insert-made', (req, res) => {
  insertMade(res, req.body.values, config);
});

app.post('/insert-order', (req, res) => {
  insertOrder(res, req.body.values, config);
});

app.post('/insert-consist', (req, res) => {
  insertConsist(res, req.body.values, config);
});

// CONNECT SQL
config.connect((error) => {
  if (error) throw error;
  console.log('Successful!');
  app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
});
