import { Redirect } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { LoginScreen } from "../auth/LoginScreen";
import { CalendarScreen } from "../calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Router>
        <div>
            <Switch>
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/" component={CalendarScreen} />

                <Redirect to='/'/>
            </Switch>
        </div>
    </Router>
  )
}
