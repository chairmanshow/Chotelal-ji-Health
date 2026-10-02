'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { RemediesPage } from '../../src/pages/RemediesPage';

export default function Page() {
  return (
    <RouterProvider>
      <RemediesPage />
    </RouterProvider>
  );
}
