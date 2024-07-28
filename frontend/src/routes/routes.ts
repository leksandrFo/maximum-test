const BASE_URL = 'http://localhost:5000'; // ваш API сервер

const serverRoutes = {
  stock: () => [BASE_URL, 'api/stock'].join('/'),
  brands: () => [BASE_URL, 'api/brands'].join('/'),
};

export default serverRoutes;
