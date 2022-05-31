import React from "react";
import UsersList from "./layouts/usersList";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import EditUserPage from "./components/page/userPage/editUserPage";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path = "/" component={Main}/>
                <Route path = "/login/:type?" component={Login}/>
                <Route path = "/users/:userId?/edit" component = {EditUserPage}/>
                <Route path = "/users/:userId?" component={UsersList}/>
            </Switch>
        </>
    );
};

export default App;
