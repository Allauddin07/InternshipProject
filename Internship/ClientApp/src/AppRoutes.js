import Customer from "./components/Customer";
import Product from "./components/Product";
import Store from "./components/Store";
import Sales from "./components/Sales";

const AppRoutes = [
  {
        index: true,
        element: <Customer />
  },
  
  {
    path: '/product',
    element: <Product />
   },
    {
        path: '/store',
        element: <Store />
    },
    {
        path: '/sales',
        element: <Sales />
    }
];

export default AppRoutes;
