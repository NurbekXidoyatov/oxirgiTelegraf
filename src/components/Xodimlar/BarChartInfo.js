import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default class BarChartInfo extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      statistica : {}
    }
  }

  render() {


    const data = [
      {
        name: "Umumiy bo'yicha",
        Kiruvchi: 4000,
        Chiquvchi: 2400,
      },
      {
        name:  "Telegraflar bo'yicha",
        Kiruvchi: 3000,
        Chiquvchi: 1398,
      },
      {
        name:  "Ishchilar bo'yicha",
        Kiruvchi: 2000,
        Chiquvchi: 9800,
      },
    ];
    
    
    return (
      <ResponsiveContainer width="100%" height="50%">
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
}
