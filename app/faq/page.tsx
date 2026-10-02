'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { FaqPage } from '../../src/pages/FaqPage';

export default function Page() {
  return (
    <RouterProvider>
      <FaqPage />
    </RouterProvider>
  );
}
