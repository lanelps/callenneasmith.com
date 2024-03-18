import React, { forwardRef } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { remToPx } from "~utils/helpers";
import { breakpoint } from "~utils/css";

export const GRID_COLUMNS = 8;
export const GRID_MAX_WIDTH_PX = 1440;

export const GRID_GAP_REM = 0.25;
export const GRID_MOBILE_GAP_REM = 0.375;
export const GRID_GAP_PX = remToPx(GRID_GAP_REM);

export const GRID_PADDING_REM = 0.5;
export const GRID_MOBILE_PADDING_REM = 0.5;
export const GRID_PADDING_PX = remToPx(GRID_GAP_REM);

/**
 * -----------------------------------------------------------------------------
 * Receive a CSS grid wrapper to style guide spec.
 * @param  {node}   children  Inner JSX
 * @param  {string} node      Wrapper JSX node type (defaults to <div>)
 * @return {node}             The resulting CSS grid node
 */
const Grid = forwardRef(({ children, className, node, onClick }, ref) => {
  const G = `${node}`;

  return (
    <G
      ref={ref}
      className={className}
      onClick={onClick}
      css={[
        css`
          width: 100%;
          position: relative;
          display: grid;
          margin: 0 auto;
          // max-width: ${GRID_MAX_WIDTH_PX}px;
          grid-template-columns: repeat(${GRID_COLUMNS}, minmax(0, 1fr));
          grid-gap: 0 ${GRID_MOBILE_GAP_REM}rem;
          padding: 0 ${GRID_MOBILE_PADDING_REM}rem;

          ${breakpoint(`tablet`)} {
            grid-gap: 0 ${GRID_GAP_REM}rem;
            padding: 0 ${GRID_PADDING_REM}rem;
          }
        `
      ]}
    >
      {children}
    </G>
  );
});

Grid.defaultProps = {
  node: `div`
};
Grid.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.string
};

export default Grid;
