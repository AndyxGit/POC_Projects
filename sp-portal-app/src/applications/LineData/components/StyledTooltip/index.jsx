import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import React from "react";

import './StyledTooltip.css'

const StyledTooltip = styled(({ className, children, ...props }) => (
  <Tooltip {...props} arrow placement={props.placement || 'top'} classes={{ popper: 'popper' }}>
    {children}
  </Tooltip>
))();

export default StyledTooltip;