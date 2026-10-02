'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { CategoriesPage } from '../../src/pages/CategoriesPage';

export default function Page() {
  return (
    <RouterProvider>
      <CategoriesPage />
    </RouterProvider>
  );
}
