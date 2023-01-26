const sortByAdmin = [
    {
      value : "username",
      name :  "Username ko'ra"
    },
    {
      value : "phoneNumber",
      name :  "Telefon raqamiga ko'ra"
    },
    {
      value : "jobName",
      name :  "Lavozimiga ko'ra"
    },
    {
      value : "fullName",
      name :  "Ism familyasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]


const sortByMtu = [
    {
      value : "name",
      name :  "Nomiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]

  const sortByOrg = [
    {
      value : "name",
      name :  "Nomiga ko'ra"
    },
    {
      value : "phoneNumber",
      name :  "Telefon raqamiga ko'ra"
    },
    {
      value : "parentName",
      name :  "Qaysi MTU ga tegishliligiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]

  const sortByManager = [
    {
      value : "username",
      name :  "Username ko'ra"
    },
    {
      value : "phoneNumber",
      name :  "Telefon raqamiga ko'ra"
    },
    {
      value : "jobName",
      name :  "Lavozimiga ko'ra"
    },
    {
      value : "fullName",
      name :  "Ism familyasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]

  const sortByManagerEmployees = [
    {
      value : "username",
      name :  "Username ko'ra"
    },
    {
      value : "phoneNumber",
      name :  "Telefon raqamiga ko'ra"
    },
    {
      value : "jobName",
      name :  "Lavozimiga ko'ra"
    },
    {
      value : "fullName",
      name :  "Ism familyasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]

  const sortByManagerGroup = [
    {
      value : "name",
      name :  "Nomiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yaratilgan vaqtiga ko'ra"
    }
  ]

  const sortByMessageSendedToOrg = [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    }
  ]

  const sortByMessageSendedToEmployees = [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    },
    {
      value : "context",
      name :  "Xabar matniga ko'ra"
    }
  ]

  
  const sortByMessageAcceptedFromUser = [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    },
    {
      value : "context",
      name :  "Xabar matniga ko'ra"
    },
    {
      value : "messageStatus",
      name :  "Xabar statusiga ko'ra"
    }
  ]

  const sortByMessageAcceptedFromOrg = [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    },
    {
      value : "context",
      name :  "Xabar matniga ko'ra"
    },
    {
      value : "messageStatus",
      name :  "Xabar statusiga ko'ra"
    }
  ]
  const sortByMessageAcceptedFromManagerToEmployee= [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    },
  ]
  const sortByMessageSendedByEmployeeToManager= [
    {
      value : "title",
      name :  "Xabar sarlavhasiga ko'ra"
    },
    {
      value : "createdAt",
      name :  "Yuborilgan vaqtiga ko'ra"
    },
  ]
  
  export{sortByAdmin,
     sortByMtu,
     sortByOrg,
     sortByManager,
     sortByManagerEmployees,
     sortByManagerGroup,
     sortByMessageSendedToOrg,
     sortByMessageSendedToEmployees,
     sortByMessageAcceptedFromUser,
     sortByMessageAcceptedFromOrg,
     sortByMessageAcceptedFromManagerToEmployee,
     sortByMessageSendedByEmployeeToManager
     }