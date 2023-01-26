import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function BarchartInfoAllMessages({statistics}) {

  const allSended = statistics?.sendedMessageToUser + statistics?.sendedMessageToManager + statistics?.sendedMessageToOrg;
  const allAccepted = statistics?.acceptedMessageFromManager + statistics?.acceptedMessageFromOrg  + statistics?.acceptedMessageFromUser;
  const sendedToTelegraph = statistics?.sendedMessageToOrg;
  const acceptedFromTelegraph = statistics?.acceptedMessageFromOrg;
  const sendedToUser = statistics?.sendedMessageToUser;
  const acceptedFromUser = statistics?.acceptedMessageFromUser;

  const data = [ 
    {
      name: 'Umumiy',
      Chiquvchi: allSended,
      Kiruvchi: allAccepted,
    },
    {
      name: 'Telegraflar bo\'yicha',
      Chiquvchi: sendedToTelegraph,
      Kiruvchi: acceptedFromTelegraph,
    },
    {
      name: 'Ishchilar bo\'yicha',
      Chiquvchi: sendedToUser,
      Kiruvchi: acceptedFromUser,
    },
  ];
  

    return (
      <ResponsiveContainer width="100%" height="25%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Kiruvchi" fill="#8884d8" />
          <Bar dataKey="Chiquvchi" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
}
