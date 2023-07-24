import React from 'react';
import { Outlet } from 'react-router-dom';
import Headers from '../../components/Headers/Headers';

export default function () {
  return (
    <div>
      <Headers />
      <Outlet />
    </div>
  );
}
