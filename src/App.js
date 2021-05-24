import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import ProductDetails from './components/Products/ProductDetails';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
  return (
    <Provider store={store}>
    <Router>
          <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/details/:id">
                <ProductDetails/>
              </Route>
          </Switch>
    </Router>
    </Provider>
  );
}

export default App;
