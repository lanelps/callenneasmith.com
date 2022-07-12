import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useApp } from "~hooks";

import { ReactComponent as PopOutIcon } from "~assets/svg/pop-out.svg";

const Button = styled.button`
  position: relative;
  width: max-content;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-off-black);

  text-transform: uppercase;

  :hover {
    color: var(--color-rich-black);
  }

  transition: color 0.3s ease;
`;

const PopOut = ({ id, image, loaded, setIsActive }) => {
  const { setPopOuts } = useApp();
  const [popUpActive, setPopUpActive] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    if (popUpActive) {
      setPopOuts((prev) => [
        ...prev,
        { id, image, active: popUpActive, setActive: setPopUpActive }
      ]);
    } else {
      setPopOuts((prev) => {
        const newPopOuts = prev.filter((popUp) => popUp.id !== id);
        return newPopOuts;
      });
    }
  }, [popUpActive]);

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setPopUpActive(true);
          setIsActive(false);
        }}
      >
        <PopOutIcon
          css={css`
            width: 1rem;
          `}
        />

        <span className="caption">Pop Out</span>
      </Button>
    </>
  );
};

export default PopOut;
