import React from 'react'
import styled from 'styled-components'
// import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/TopBar'

export default function OverviewPage() {
  const OverviewContainer = styled.div`
    background-color: beige;
    width: calc(100% - 4.2rem);
    min-height: calc(100vh - 4rem);
    margin-left: 4.2rem;
  `
  return (
    <OverviewContainer>
      {/* <h2 style={{ position: 'absolute', top: '15px', left: '7%', opacity: '0.8' }}>Dashboard</h2> */}
    </OverviewContainer>
  )
}
