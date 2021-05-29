import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CustomerDetails from "./pages/customers/CustomerDetails";
import ListCustomers from "./pages/customers/ListCustomers";

const App: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/customers" exact component={ListCustomers} />
        <Route path="/customer-details" component={CustomerDetails} />
        <Redirect path="/" exact to="/customers" />
      </Switch>
    </Router>
  );
};

export default App;
