import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { EVENTS } from '@inkandswitch/backchannel';
import { forceScreenSize } from './web';
import { viewport } from './components/tokens';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Backchannel from './backchannel'

let backchannel = Backchannel();

declare global {
  interface Window {
    spake2: any;
  }
}

localStorage.setItem('debug', 'bc:*');

serviceWorkerRegistration.register();
forceScreenSize(viewport.maxWidth, viewport.maxHeight);

backchannel.on(EVENTS.CLOSE, () => {
  window.location.href = '/';
});

// TODO: Loading screen
backchannel.once(EVENTS.OPEN, async () => {
  render(
    //@ts-ignore
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

//render(<InstallButton />, document.getElementById('install'));
