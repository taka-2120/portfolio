import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Router from './Router';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: 'monospace' }}>
    <Router />
  </MantineProvider>
);
