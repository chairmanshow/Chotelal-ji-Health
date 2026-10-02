'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { BlogPage } from '../../src/pages/BlogPage';

export default function Page() {
  return (
    <RouterProvider>
      <BlogPage />
    </RouterProvider>
  );
}
