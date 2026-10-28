import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HostHandbook } from './host';

createRoot(document.getElementById('root')!).render(<>{window.location.hash === '#host' ? <HostHandbook /> : <App />}</>);
