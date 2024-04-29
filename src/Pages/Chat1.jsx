import React from 'react'
import ChatLeft from '../Components/Chat1/ChatLeft'
import ChatRight from '../Components/Chat1/ChatRight'

const data1 = [
    {
        id: 1,
        profileImg: '',
        uname: 'baskar',
    },
    {
        id: 2,
        profileImg: '',
        uname: 'ponbaskar',
    },
    {
        id: 3,
        profileImg: '',
        uname: 'bas',
    },
];

export default function Chat1() {
  return (
    <div style={{
        padding: '10rem'
    }}>
       <ChatLeft 
        data={data1}
        title={"chat 1"}

       />
       <ChatRight />
    </div>
  )
}
