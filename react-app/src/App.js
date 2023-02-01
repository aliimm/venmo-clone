import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import PaymentMethods from './components/payment';
import Sidebar from './components/sidebar';
import PaymentDetails from './components/PaymentDetails';
import AllTransaction from './components/AllTransactions';
import CreateTransaction from './components/PostTransaction';



function App() {

  // console.log(user)

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <div className='page-container'>
        <Sidebar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/:id/send' exact={true} >
            <CreateTransaction />
          </Route>
          <Route path='/' exact={true} >
            {/* <h1>My Home Page</h1> */}
            {/* <NavBar /> */}
              <AllTransaction />
          </Route>
          <Route path='/:id/payment-methods' exact={true} >
            <PaymentMethods />
          </Route>
          <Route path='/:id/payment-method-details'>
            <PaymentDetails />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
