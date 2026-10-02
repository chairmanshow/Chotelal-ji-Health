'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { YogaPage } from '../../src/pages/YogaPage';

export default function Page() {
  return (
    <RouterProvider>
      <YogaPage />
    </RouterProvider>
  );
}
