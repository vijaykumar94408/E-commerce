import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Wrap Link to forward its ref.
const ForwardRefLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

export default ForwardRefLink;
