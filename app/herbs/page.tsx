'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { HerbsPage } from '../../src/pages/HerbsPage';

export default function Page() {
  return (
    <RouterProvider>
      <HerbsPage />
    </RouterProvider>
  );
}
