'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { DisclaimerPage } from '../../src/pages/DisclaimerPage';

export default function Page() {
  return (
    <RouterProvider>
      <DisclaimerPage />
    </RouterProvider>
  );
}
