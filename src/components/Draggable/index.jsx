import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { useApp } from "~hooks";

const Container = styled.div`
  position: fixed;

  width: max-content;
  height: max-content;

  top: ${({ defaultPosition }) => defaultPosition[0] || `0`};
  left: ${({ defaultPosition }) => defaultPosition[1] || `0`};
  bottom: ${({ defaultPosition }) => defaultPosition[2] || `unset`};
  right: ${({ defaultPosition }) => defaultPosition[3] || `unset`};

  transform: ${({ position: { x, y } }) => `translate3d(${x}px, ${y}px, 0);`};

  cursor: pointer;
`;

const Draggable = ({
  id,
  className,
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  onMouseMove = () => {},
  startPosition = [`0`, `0`]
}) => {
  const dragRef = useRef();

  const { activePopOut, setActivePopOut } = useApp();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });

  const [canDrag, setCanDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const downHandler = (e) => {
    setCanDrag(true);
    setActivePopOut(id);

    if (dragRef?.current) {
      const { offsetLeft, offsetTop } = dragRef.current;
      const rect = dragRef.current.getBoundingClientRect();

      setOffSet({
        x: rect.left - offsetLeft - e.clientX,
        y: rect.top - offsetTop - e.clientY
      });
    }

    onMouseDown();
  };

  const upHandler = () => {
    setCanDrag(false);

    onMouseUp();
  };

  const moveHandler = (e) => {
    if (canDrag) {
      setPosition({
        x: e.clientX + offSet.x,
        y: e.clientY + offSet.y
      });
    }

    onMouseMove();
  };

  const leaveHandler = () => {
    setCanDrag(false);

    onMouseLeave();
  };

  const clickHandler = () => {
    if (isDragging) return;

    onClick();
  };

  useEffect(() => {
    if (canDrag) {
      setIsDragging(true);
    }
  }, [position]);

  useEffect(() => {
    if (!canDrag) {
      setIsDragging(false);
    }
  }, [canDrag]);

  return (
    <Container
      ref={dragRef}
      id={id}
      activePopOut={activePopOut}
      defaultPosition={startPosition}
      position={position}
      className={className}
      onClick={clickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={leaveHandler}
      onMouseDown={downHandler}
      onMouseUp={upHandler}
      onMouseMove={moveHandler}
    >
      {children}
    </Container>
  );
};

export default Draggable;
