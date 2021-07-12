import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    zIndex: 10,
    width: "1000px",
    height: "1000px",
    backgroundColor: isOver ? '#faaafa' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable