import React from "react";
import UsersList from "./components/usersList";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path = "/" component={Main}/>
                <Route path = "/login" component={Login}/>
                <Route path = "/users/:userId?" component={UsersList}/>
            </Switch>
        </>
    );
};

export default App;
