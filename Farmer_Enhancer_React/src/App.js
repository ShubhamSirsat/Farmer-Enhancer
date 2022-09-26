import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Auth from './components/Auth'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import FarmerDashboard from './components/Dashboard/FarmerDashboard'
import ExporterDashboard from './components/Dashboard/ExporterDashboard'
import SeedDashboard from './components/Dashboard/SeedDashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
          <Route exact path="/FarmerDashboard"   component={FarmerDashboard} />
          <Route exact path="/ExporterDashboard" component={ExporterDashboard}/>
          <Route exact path="/SeedDashboard" component={SeedDashboard}/>
0        </Switch>
      </Router>
    </div>
  )
}

export default App
