import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Orders from './components/Orders/Orders.lazy';
import Deliveries from './components/Deliveries/Deliveries.lazy';
import Products from './components/Products/Products.lazy';
import Customers from './components/Customers/Customers.lazy';
function App() {
  return (
    <div className="App">
     <Router>
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/deliveries">
            <Deliveries />
          </Route>
          <Route path="/products">
            <Products/>
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
