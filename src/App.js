import React, { useEffect } from "react"
import './App.css';
import { Switch, Route, useHistory, Redirect } from "react-router-dom"

import Layout from './layout/Layout';
import BoshSahifa from "./components/Xodimlar/BoshSahifa"
import Xodimlar from "./components/Xodimlar/Xodimlar"
import Guruhlar from "./components/Guruhlar/Guruhlar"
import SendedMessageBYManager from "./components/XabarYuborish/SendedMessageBYManager";
import KiruvchiXabarlar from "./components/KiruvchiXabarlar/KiruvchiXabarlar"
import EditAdmin from './components/Xodimlar/EditAdmin'
import EditDepartment from "./components/Department/EditDepartment";
import EditKorxonalar from './components/Guruhlar/EditKorxonalar'
import Managers from './components/Managers/Managers'
import Department from './components/Department/Department'
import Login from './components/Login/Login';
import Employee from "./components/Employee/Employee"
import EditEmplloyee from "./components/Employee/EditEmplloyee";
import { useHttp } from "./components/AsyncURL/useHttp"
import { useSelector, useDispatch } from "react-redux"
import { requestProfile, successProfile, errorProfile } from "./components/Login/loginSlice"
import ProfileManagers from "./components/Managers/ProfileManagers";
import ManagerGuruh from "./components/ManagerGuruh/ManagerGuruh";
import { getLengthOfPage } from "./components/Employee/employeeSlice"
import { getLengthOfPageManager } from "./components/ManagerGuruh/managerGuruhSlice"
import EmployeeProfile from "./components/Employees/EmployeeProfile"
import AcceptedMessageFromManager from "./components/Employees/AcceptedMessageFromManagers"
import SendingMessageToManager from "./components/Employees/SendingMessageToManager"
import SeparateMessage from "./components/Employees/SeparateMessage";
import SendingMessages from "./components/Employees/SendingMessages";
import { nameOfloggedInPeople } from "./components/Login/loginSlice";
import { getAllSendedMessagesByManage } from "./components/XabarYuborish/managerXabarYuborishSlice";
import SingleMessageSndedByManager from "./components/XabarYuborish/SingleMessageSndedByManager";
import SendedMessageByOrganization from "./components/KiruvchiXabarlar/SendedMessageByOrganization";
import SendedMessageToOrganization from "./components/XabarYuborish/SendedMessageToOrganization";
import SepareteMessageForSeingForEmployee from "./components/Employees/SeparateMessageForSeingForEmployee";
import EditManagerGuruh from "./components/ManagerGuruh/EditManagerGuruh";
import AdminLog from "./components/changesOfLogs/AdminLog";
import DepartmentLog from "./components/changesOfLogs/DepartmentLog";
import ManagerLog from "./components/changesOfLogs/ManagerLog";
import OrganizationLog from "./components/changesOfLogs/OrganizationLog";
import EmployeeLog from "./components/changesOfLogs/EmployeeLog";
import { UniversalURL } from "./components/AsyncURL/BaseUrl";
import ForwardToEmployees from "./components/forwardMessage/ForwardToEmployees";
import ForwardToManagers from "./components/forwardMessage/ForwardToManagers";


const ROLE = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  MANAGER: "ROLE_MANAGER"
}

function App() {

  const { request } = useHttp()
  const dispatch = useDispatch()
  const history = useHistory();
  const { isAuthenticated, isFetched, token, roles } = useSelector(state => state.logins)

  const role = roles[0]?.name;

  useEffect(() => {
    request(`${UniversalURL}employee/find/all`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        dispatch(getLengthOfPage(response.data.content));
      })
      .catch(error => console.log(error))
          request(`${UniversalURL}group/find/all`, "GET", null, {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json"
      })
        .then(response => {
          dispatch(getLengthOfPageManager(response.data.content));
        })
        .catch(error => console.log(error))

        request(`${UniversalURL}message/find/all`, "GET", null, {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json"
        })
          .then(response => {
            dispatch(getAllSendedMessagesByManage(response.data.content));
          })
          .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(requestProfile());
      request(`${UniversalURL}get/me`, "GET", null, {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json"
      }).then(response => {
        dispatch(successProfile(response?.data?.roles));
        dispatch(nameOfloggedInPeople(response?.data?.fullName))
      })
        .catch(error => {
          dispatch(errorProfile());
        });
    } else {
      history.push('/');
    }
    if (!isFetched) {
      return 'loading....'
    }
  }, [token])

  if (!isAuthenticated) {
    return (
      <div className="main-section">
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    )
  }

  if (role === ROLE.ADMIN) {
    return (
      <div className="main-section">
        <Layout role={"ROLE_ADMIN"}>
          <Switch>
            <Route exact path="/home" component={BoshSahifa} />
            <Route exact path="/xodimlar" component={Xodimlar} />
            <Route exact path="/department" component={Department} />
            <Route exact path="/guruhlar" component={Guruhlar} />
            <Route exact path="/managers" component={Managers} />
            <Route exact path="/editadmin/:id" component={EditAdmin} />
            <Route exact path="/editdepartment/:id" component={EditDepartment} />
            <Route exact path="/editkorxona/:id" component={EditKorxonalar} />
            <Route exact path="/adminlog" component={AdminLog} />
            <Route exact path="/departmentlog" component={DepartmentLog} />
            <Route exact path="/managerlog" component={ManagerLog} />
            <Route exact path="/organizationlog" component={OrganizationLog} />
            <Route exact path="/employeelog" component={EmployeeLog} />
            <Redirect push to={'/home'} />
          </Switch>
        </Layout>
      </div>
    )
  }

  if (role === ROLE.USER) {
    return (
      <div className="main-section">
        <Layout role={role}>
          <Switch>
            <Route exact path="/employeeProfile" component={EmployeeProfile} />
            <Route exact path="/acceptedMessage" component={AcceptedMessageFromManager} />
            <Route exact path="/sendingMessage" component={SendingMessageToManager} />
            <Route exact path="/separateMessage/:id" component={SeparateMessage} />
            <Route exact path="/sendedMessageByemployee" component={SendingMessages} />
            <Route exact path="/separateMessageForSeing/:id" component={SepareteMessageForSeingForEmployee} />
            <Redirect push to={'/employeeProfile'} />
          </Switch>
        </Layout>
      </div>
    )
  }
  if (role === ROLE.MANAGER) {
    return (
      <div className="main-section">
        <Layout role={role}>
          <Switch>
            <Route exact path="/profileManagers" component={ProfileManagers} />
            <Route exact path="/employee" component={Employee} />
            <Route exact path="/managerguruh" component={ManagerGuruh} />
            <Route exact path="/yuborilganXabarlar" component={SendedMessageBYManager} />
            <Route exact path="/kiruvchixabarlar" component={KiruvchiXabarlar} />
            <Route exact path="/editemployee/:id" component={EditEmplloyee} />
            <Route exact path="/yuborilganXabarlar/singlemessage/:id" component={SingleMessageSndedByManager} />
            <Route exact path="/sendedmessagetoorg" component={SendedMessageToOrganization} />
            <Route exact path="/sendedmessagebyorg" component={SendedMessageByOrganization} />
            <Route exact path="/editmanagerguruh/:id" component={EditManagerGuruh} />
            <Route exact path="/kiruvchixabarlar/forwardMessage/:id" component={ForwardToEmployees} />
            <Route exact path="/forwardMessageManagers/:id" component={ForwardToManagers} />
            <Redirect push to={'/profileManagers'} />
          </Switch>
        </Layout>
      </div>
    )
  }
}
export default App;