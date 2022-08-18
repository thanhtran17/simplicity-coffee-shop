import RouteConfigs from './constants/routes';
import About from './pages/About';
import Supplier from './pages/Supplier';
import Ingredient from './pages/Ingredient';
import Product from './pages/Product';
import Order from './pages/Order';
import Employee from './pages/Employee';
import Customer from './pages/Customer';
import Supply from './pages/Supply';
import Made from './pages/Made';
import Consist from './pages/Consist';

export const routes = {
  about: {
    path: RouteConfigs.about,
    component: <About />,
  },
  supplier: {
    path: RouteConfigs.supplier,
    component: <Supplier />,
  },
  ingredient: {
    path: RouteConfigs.ingredient,
    component: <Ingredient />,
  },
  product: {
    path: RouteConfigs.product,
    component: <Product />,
  },
  order: {
    path: RouteConfigs.order,
    component: <Order />,
  },
  employee: {
    path: RouteConfigs.employee,
    component: <Employee />,
  },
  customer: {
    path: RouteConfigs.customer,
    component: <Customer />,
  },
  supply: {
    path: RouteConfigs.supply,
    component: <Supply />,
  },
  made: {
    path: RouteConfigs.made,
    component: <Made />,
  },
  consist: {
    path: RouteConfigs.consist,
    component: <Consist />,
  },
};
