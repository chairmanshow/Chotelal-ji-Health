'use client';

import React from 'react';
import { RouterProvider } from '../src/router';
import { HomePage } from '../src/pages/HomePage';

export default function Page() {
  return (
    <RouterProvider>
      <HomePage />
    </RouterProvider>
  );
}
