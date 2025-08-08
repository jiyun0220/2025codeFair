'use client';

import { Global } from '@emotion/react';
import { globalStyles } from './global-styles';

export default function GlobalStyleClient() {
  return <Global styles={globalStyles} />;
}
