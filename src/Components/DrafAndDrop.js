import React from 'react'
import DraggableBox from "../Components/TaskList/DraggableBox "
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Profile from "../Assets/Profile.svg"

const arr = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },

];

export default function DrafAndDrop() {

  const DraggableBox = arr.map((data, index) => (
    <Draggable
      draggableId={`draggable-${index}`}
      key={`draggable-${index}`}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.draggableProps}
          ref={provided.innerRef}

          style={{
            padding: "2rem",
            border: "1px solid #636363",
            // minWidth: "320px",
            height: "60vh",
            // userSelect: 'none'
          }}
        >
          {index}
          <img src={Profile} alt="" />
        </div>
      )}
    </Draggable>
  ))

  return (
    <div>
      <DragDropContext>
        <Droppable
          droppableId='productsSequence'
          direction='horizontal'
          type='column'
        >
          {
            (provided) => (
              <div style={{ display: 'flex', columnGap: '3rem', }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {DraggableBox}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}
