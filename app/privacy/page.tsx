'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { PrivacyPage } from '../../src/pages/PrivacyPage';

export default function Page() {
  return (
    <RouterProvider>
      <PrivacyPage />
    </RouterProvider>
  );
}
