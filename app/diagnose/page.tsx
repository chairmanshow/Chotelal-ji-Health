'use client';

import React from 'react';
import { RouterProvider } from '../../src/router';
import { DiagnosePage } from '../../src/pages/DiagnosePage';

export default function Page() {
  return (
    <RouterProvider>
      <DiagnosePage />
    </RouterProvider>
  );
}
