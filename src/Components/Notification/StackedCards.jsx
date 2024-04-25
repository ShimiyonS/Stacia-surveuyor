import React, { useState } from 'react'
import styled from 'styled-components'

const Stack = styled.div`
`
const StackCard = styled.div`
  padding: 1rem;
  height: 10rem;
  width: 100%;
  background-color: pink;
  margin-bottom: 1rem;
  border-radius: 1rem;
  cursor: pointer;
`

export default function StackedCards() {

  const [toggle, setToggle] = useState(false);
  const cards = ["Card 1", "Card 2", "Card 3", "Card 4"];

  return (
    <Stack>
      <StackCard onClick={() => setToggle(!toggle)}>{cards[cards.length - 1]}</StackCard>

      {
        toggle && (
          cards.map((card, index) => <StackCard key={index}>{card}</StackCard>)
        )
      }
    </Stack>
  )
}
