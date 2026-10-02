'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { DietPage } from '../../src/pages/DietPage';

export default function Page() {
  return (
    <RouterProvider>
      <DietPage />
    </RouterProvider>
  );
}
