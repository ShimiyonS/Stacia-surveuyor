import React, { useState } from 'react'
import styled from 'styled-components'
// import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/TopBar'

const OverviewContainer = styled.div`
  background-color: beige;
  width: calc(100% - 4.2rem);
  min-height: calc(100vh - 4rem);
  height: calc(100vh - 4rem);
  margin-left: 4.2rem;
`

const ArticleBox = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  column-gap: 1rem;
  width: 100%;
  height: 100%; 
`

const Article = styled.div`
  border: 1px solid #000;
  padding: 1rem;
  width: 30%;
  border-radius: 0.4rem;
  line-height: 1.5rem;

  &:hover{
    height: 400px;
    cursor: pointer;
  }
`

export default function OverviewPage() {
  return (
    <OverviewContainer>
     
      {/* <h2 style={{ position: 'absolute', top: '15px', left: '7%', opacity: '0.8' }}>Dashboard</h2> */}
    </OverviewContainer>
  )
}
