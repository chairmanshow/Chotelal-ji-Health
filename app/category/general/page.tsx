'use client';

import React from 'react';
import { RouterProvider } from '../../../src/router';
import { CategoryDetailPage } from '../../../src/pages/CategoryDetailPage';

export default function Page() {
  return (
    <RouterProvider>
      <CategoryDetailPage slug="general" />
    </RouterProvider>
  );
}
