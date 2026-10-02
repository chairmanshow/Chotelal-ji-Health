'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { ContactPage } from '../../src/pages/ContactPage';

export default function Page() {
  return (
    <RouterProvider>
      <ContactPage />
    </RouterProvider>
  );
}
