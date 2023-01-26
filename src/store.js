import { configureStore} from "@reduxjs/toolkit"
import admins from "./components/Xodimlar/adminSlice"
import organizations from "./components/Guruhlar/organizationSlice"
import managers from "./components/Managers/managerSlice"
import departments from "./components/Department/departmentSlice"
import logins from "./components/Login/loginSlice"
import employees from "./components/Employee/employeeSlice"
import groups from "./components/ManagerGuruh/managerGuruhSlice"
import acceptedMessagesForManagers from "./components/XabarYuborish/managerXabarYuborishSlice"
import employeesprofile from "./components/Employees/employeesSlice"

export const store = configureStore({
  reducer : {
    admins : admins,
    departments : departments,
    organizations:organizations,
    managers : managers,
    logins : logins,
    employees : employees,
    groups : groups,
    acceptedMessagesForManagers : acceptedMessagesForManagers,
    employeesprofile : employeesprofile,
  },
})