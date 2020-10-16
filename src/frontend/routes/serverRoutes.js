import Home from '../containers/Home';
import Login from '../containers/login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

const routes = [
  {
    exact: true,
    path: '/',
    components: Home,
  },
  {
    exact: true,
    path: '/login',
    components: Login,
  },
  {
    exact: true,
    path: '/register',
    components: Register,
  },
  {
    exact: true,
    path: '/player/:id',
    components: Player,
  },
  {
    name: 'NotFound',
    components: NotFound,
  },
];

export default routes;
