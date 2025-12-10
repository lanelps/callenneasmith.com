import React, { useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { breakpoint } from "~utils/css";
import { ReactComponent as Arrow } from "~assets/svg/arrow.svg";

const CursorWrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
  mix-blend-mode: difference;

  ${breakpoint(`tablet`)} {
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  }
`;

const StyledArrow = styled(Arrow)`
  width: 142.71px;
  height: 143.71px;
  transform: ${({ direction }) =>
    direction === "right" ? "rotate(0deg)" : "rotate(180deg)"};
`;

const ArrowCursor = ({ isVisible, direction }) => {
  const ref = useRef(null);
  const prevVisible = useRef(isVisible);

  useLayoutEffect(() => {
    // Hide cursor initially when it becomes visible to prevent jumping
    if (isVisible && !prevVisible.current && ref.current) {
      ref.current.style.opacity = "0";
    }
    prevVisible.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
        ref.current.style.opacity = "1";
      }
    };

    if (isVisible) {
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isVisible]);

  return (
    <CursorWrapper ref={ref} isVisible={isVisible}>
      <StyledArrow direction={direction} />
    </CursorWrapper>
  );
};

export default ArrowCursor;
