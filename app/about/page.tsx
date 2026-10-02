'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { AboutPage } from '../../src/pages/AboutPage';

export default function Page() {
  return (
    <RouterProvider>
      <AboutPage />
    </RouterProvider>
  );
}
