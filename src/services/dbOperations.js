const {
  selectAllCustomerQuery,
  selectAllEmployeeQuery,
  selectAllIngredientQuery,
  selectAllOrderQuery,
  selectAllProductQuery,
  selectAllSupplierQuery,
  selectAllSupplyQuery,
  selectAllMadeQuery,
  selectAllConsistQuery,
  deleteSupplierQuery,
  deleteIngredientQuery,
  deleteProductQuery,
  deleteCustomerQuery,
  deleteEmployeeQuery,
  deleteConsistQuery,
  deleteMadeQuery,
  deleteOrderQuery,
  deleteSupplyQuery,
  insertCustomerQuery,
  insertEmployeeQuery,
  insertProductQuery,
  insertIngredientQuery,
  insertSupplierQuery,
  insertOrderQuery,
  insertSupplyQuery,
  insertMadeQuery,
  insertConsistQuery,
} = require('../../src/constants/query');

const { formatNewDate } = require('../utils/formatDateModule');

const config = require('./dbConfig');

const selectAllCustomer = (res) => {
  config.query(selectAllCustomerQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllSupplier = (res) => {
  config.query(selectAllSupplierQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllEmployee = (res) => {
  config.query(selectAllEmployeeQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllIngredient = (res) => {
  config.query(selectAllIngredientQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllOrder = (res) => {
  config.query(selectAllOrderQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllProduct = (res) => {
  config.query(selectAllProductQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllSupply = (res) => {
  config.query(selectAllSupplyQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllMade = (res) => {
  config.query(selectAllMadeQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const selectAllConsist = (res) => {
  config.query(selectAllConsistQuery, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteSupplier = (res, id) => {
  config.query(`${deleteSupplierQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteIngredient = (res, id) => {
  config.query(`${deleteIngredientQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteProduct = (res, id) => {
  config.query(`${deleteProductQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteEmployee = (res, id) => {
  config.query(`${deleteEmployeeQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteCustomer = (res, id) => {
  config.query(`${deleteCustomerQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteConsist = (res, id) => {
  config.query(`${deleteConsistQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteMade = (res, id) => {
  config.query(`${deleteMadeQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteOrder = (res, id) => {
  config.query(`${deleteOrderQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const deleteSupply = (res, id) => {
  config.query(`${deleteSupplyQuery} \'${id}\'`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
};

const insertCustomer = (res, values) => {
  config.query(
    `${insertCustomerQuery} ('${values.customerid}', '${values.name}', '${values.phonenumber}', '${values.gender}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertSupplier = (res, values) => {
  config.query(
    `${insertSupplierQuery} ('${values.supplierid}', '${values.name}', '${values.phonenumber}', '${values.address}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertEmployee = (res, values) => {
  config.query(
    `${insertEmployeeQuery} ('${values.employeeid}', '${values.name}', '${values.phonenumber}', '${values.gender}', '${values.position}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertIngredient = (res, values) => {
  config.query(
    `${insertIngredientQuery} ('${values.ingredientid}', '${values.name}', '${
      values.price
    }', '${values.quantity}', '${formatNewDate(values.expire)}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertProduct = (res, values) => {
  config.query(
    `${insertProductQuery} ('${values.productid}', '${values.name}', '${values.type}', '${values.price}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertOrder = (res, values) => {
  config.query(
    `${insertOrderQuery} ('${values.orderid}', '${values.customerid}', '${
      values.employeeid
    }', '${formatNewDate(values.date)}', '${values.payment}', '${
      values.totalprice
    }')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertMade = (res, values) => {
  config.query(
    `${insertMadeQuery} ('${values.madeid}', '${values.productid}', '${values.ingredientid}', '${values.quantity}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertConsist = (res, values) => {
  config.query(
    `${insertConsistQuery} ('${values.consistid}', '${values.orderid}', '${values.productid}', '${values.quantity}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

const insertSupply = (res, values) => {
  config.query(
    `${insertSupplyQuery} ('${values.supplyid}', '${values.supplierid}', '${
      values.ingredientid
    }', '${formatNewDate(values.date)}', '${values.quantity}')`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      res.send(data);
    }
  );
};

module.exports = {
  selectAllCustomer,
  selectAllSupplier,
  selectAllEmployee,
  selectAllIngredient,
  selectAllOrder,
  selectAllProduct,
  selectAllSupply,
  selectAllMade,
  selectAllConsist,
  deleteSupplier,
  deleteIngredient,
  deleteEmployee,
  deleteProduct,
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
};
