/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react/macro';
import { useLocation } from 'wouter';

import { copyToClipboard } from '../web';
import {
  A,
  TopBar,
  Button,
  ContentWithTopNav,
  Instructions,
  CodeDisplayOrInput,
  BottomActions,
  Message,
  BackToHomeLink,
} from '../components';
import { Code, ContactId, Backchannel } from '../backend/types';
import { color } from '../components/tokens';

// Amount of time to show immediate user feedback
let USER_FEEDBACK_TIMER = 5000;

type CodeViewMode = 'add' | 'generate';
type Props = {
  view: CodeViewMode;
  backchannel: Backchannel;
};

export default function AddContact({ backchannel, view }: Props) {
  let [code, setCode] = useState<Code>('');
  let [message, setMessage] = useState('');
  let [errorMsg, setErrorMsg] = useState('');
  //eslint-disable-next-line
  let [_, setLocation] = useLocation();

  useEffect(() => {
    // get code on initial page load
    if (view === 'generate' && !code && !errorMsg) {
      onClickGenerate();
    }
  });

  // Set user feedback message to disappear if necessary
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage('');
      }, USER_FEEDBACK_TIMER);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  let onError = (err: Error) => {
    console.error('got error from backend', err);
    setErrorMsg(err.message);
  };

  function handleChange(event) {
    setErrorMsg('');
    setCode(event.target.value);
  }

  async function onClickRedeem() {
    try {
      let cid: ContactId = await backchannel.accept(code);
      setErrorMsg('');
      setLocation(`/contact/${cid}/add`);
    } catch (err) {
      console.log('got error', err)
      onError(err);
      setCode('');
    }
  }

  async function onClickGenerate() {
    try {
      const code: Code = backchannel.getCode();

      if (code) {
        setCode(code);

        // This promise returns once the other party redeems the code
        let cid: ContactId = await backchannel.announce(code);
        setErrorMsg('');
        setLocation(`/contact/${cid}/add`);
      }
    } catch (err) {
      onError(err);
      setCode('');
      onClickGenerate();
    }
  }

  async function onClickCopy() {
    const copySuccess = await copyToClipboard(code);
    if (copySuccess) {
      setMessage('Code copied!');
    }
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      `}
    >
      <TopBar>
        <BackToHomeLink />
        <div
          css={css`
            flex: 1 0 auto;
          `}
        >
          <A href="generate">Generate codes</A>
          <A href="add">Enter codes</A>
        </div>
      </TopBar>
      <ContentWithTopNav
        css={css`
          background: ${color.codeShareBackground};
          text-align: center;
          display: flex;
          flex-direction: column;
        `}
      >
        {view === 'generate' && (
          <React.Fragment>
            <Instructions>
              Share this code with a correspondant you trust to open a
              backchannel and add them as a contact:
            </Instructions>
            <CodeDisplayOrInput>{code}</CodeDisplayOrInput>
            <BottomActions>
              <Message>{errorMsg || message}</Message>
              <Button onClick={onClickCopy}>Copy code</Button>
            </BottomActions>
          </React.Fragment>
        )}
        {view === 'add' && (
          <React.Fragment>
            <Instructions>
              Enter the code your correspondant sent you to access the
              backchannel:
            </Instructions>
            <CodeDisplayOrInput>
              <input
                value={code}
                css={css`
                  font-size: inherit;
                  width: 100%;
                  text-align: center;
                `}
                type="text"
                placeholder="Enter the code"
                onChange={handleChange}
              ></input>
            </CodeDisplayOrInput>
            <BottomActions>
              <Message>{errorMsg || message}</Message>
              <Button onClick={onClickRedeem}>Enter Backchannel</Button>
            </BottomActions>
          </React.Fragment>
        )}
      </ContentWithTopNav>
    </div>
  );
}