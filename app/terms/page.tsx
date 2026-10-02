'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { TermsPage } from '../../src/pages/TermsPage';

export default function Page() {
  return (
    <RouterProvider>
      <TermsPage />
    </RouterProvider>
  );
}
