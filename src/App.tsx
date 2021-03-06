/** @jsxImportSource @emotion/react */
import React from 'react';
import { Route } from 'wouter';
import { css } from '@emotion/react/macro';

import { color, viewport } from './components/tokens';
import Mailbox from './components/Mailbox';
import ContactList from './components/ContactList';
import Contact from './components/Contact';
import { UnlinkDevices, Device } from './components/Device';
import NetworkError from './components/Error';
import Settings, {
  ClearAllSettings,
  RelaySettings,
  DevicesSettings,
} from './components/Settings';
import ContactSettings from './components/ContactSettings';
import RedeemCode from './components/RedeemCode';
import GenerateCode from './components/GenerateCode';
import GenerateDeviceCode from './components/GenerateDeviceCode';
import RedeemDeviceCode from './components/RedeemDeviceCode';

export default function App() {
  return (
    <div
      css={css`
        background: ${color.primary};
        height: 100%;

        @media (min-width: 400px) {
          max-width: 100vw;
          max-height: 100vh;
          height: 100%;
        }

        @media (min-width: 801px) {
          margin: auto;
          max-width: ${viewport.maxWidth}px;
          max-height: min(130vw, ${viewport.maxHeight}px);
        }
      `}
    >
      <Route path="/redeem">
        <RedeemCode />
      </Route>
      <Route path="/generate">
        <GenerateCode />
      </Route>
      <Route path="/devices/generate">
        <GenerateDeviceCode />
      </Route>
      <Route path="/devices/redeem">
        <RedeemDeviceCode />
      </Route>
      <Route path="/settings/reset">
        <ClearAllSettings />
      </Route>
      <Route path="/settings/relay">
        <RelaySettings />
      </Route>
      <Route path="/settings/devices">
        <DevicesSettings />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/settings/unlink">
        <UnlinkDevices />
      </Route>
      <Route path="/device/:did">
        {(params) => <Device deviceId={params.did} />}
      </Route>
      <Route path="/mailbox/:cid">
        {(params) => <Mailbox contactId={params.cid} />}
      </Route>
      <Route path="/contact/:cid">
        {(params) => <ContactSettings contactId={params.cid} />}
      </Route>
      <Route path="/contact/:cid/add">
        {(params) => <Contact contactId={params.cid} backHref={null} />}
      </Route>
      <Route path="/contact/:cid/edit">
        {(params) => (
          <Contact contactId={params.cid} backHref={`/mailbox/${params.cid}`} />
        )}
      </Route>
      <Route path="/">
        <ContactList />
      </Route>
      <NetworkError />
    </div>
  );
}
