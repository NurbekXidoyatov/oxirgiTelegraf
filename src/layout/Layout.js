import React from 'react'
import Navigation from '../components/Navigation/Navigation'

import './layout.css'

const Layout = ({ role, children }) => {
  const menus = {
    ROLE_ADMIN: [
      { icon: 'fa-solid fa-house-user', path: '/home', name: 'Bosh sahifa' },
      {
        icon: 'fa-solid fa-person-chalkboard',
        path: '/xodimlar',
        name: 'Boshqaruvchilar',
      },
      { icon: 'fa-solid fa-building-columns', path: '/department', name: 'Uzellar' },
      {
        icon: 'fa-solid fa-building',
        path: '/guruhlar',
        name: 'Korxonalar',
      },
      {
        icon: 'fa-solid fa-user',
        path: '/managers',
        name: 'Moderatorlar',
      },
    ],
    ROLE_USER: [
      {
        icon: 'fa-solid fa-house-user',
        path: '/employeeProfile',
        name: 'Bosh sahifa',
      },
      {
        icon: 'fa-solid fa-message',
        path: '/acceptedMessage',
        name: 'Kiruvchi Xabarlar',
      },
      {
        icon: 'fa-solid fa-arrow-right',
        path: '/sendingMessage',
        name: 'Xabar Yuborish',
      },
      {
        icon: 'fa-solid fa-message',
        path: '/sendedMessageByemployee',
        name: 'Yuborilgan Xabarlar',
      },
    ],
    ROLE_MANAGER: [
      {
        icon: 'fa-solid fa-house-user',
        path: '/profileManagers',
        name: 'Bosh sahifa',
      },
      { icon: 'fa-solid fa-user',
        path: '/employee',
        name: 'Xodimlar' },
      {
        icon: 'fa-solid fa-user-group',
        path: '/managerguruh',
        name: 'Guruhlar',
      },
      {
        icon: 'fa-solid fa-message',
        path: '/yuborilganXabarlar',
        name: 'Yuborilgan xabarlar',
      },
      {
        icon: 'fa-solid fa-message',
        path: '/kiruvchixabarlar',
        name: 'Kiruvchi xabarlar',
      },
      {
        icon: 'fa-solid fa-building',
        path: '/sendedmessagetoorg',
        name: 'Telegraflarga yuborilgan xabarlar',
      },
      {
        icon: 'fa-solid fa-building',
        path: '/sendedmessagebyorg',
        name: 'Telegraflardan kelgan xabarlar',
      },
    ],
  }

  return (
    <div className="container-profile">
      <main className="main-body">
        <div className="navigation">
          <Navigation menus={menus[role]} role={role}/>
        </div>
        <div className="features">{children}</div>
      </main>
    </div>
  )
}

export default Layout
