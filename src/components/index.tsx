/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react/macro';
import { Link } from 'wouter';
import { ReactComponent as ArrowLeft } from '../components/icons/ArrowLeft.svg';
import { ReactComponent as Ellipse } from '../components/icons/Ellipse.svg';

import { color, fontSize } from './tokens';

type TODO = any;

/**
 * Top bar component with left back link, center title, and optional icon on the right. By default the back link goes home.
 */
export function TopBar({
  backHref = '/',
  title = null,
  children = null,
  icon = null,
  ...props
}) {
  return (
    <div
      css={css`
        color: ${color.chatHeaderText};
        text-align: center;
        padding: 18px 0;
        position: absolute;
        top: 0;
        min-height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      `}
      {...props}
    >
      {backHref ? <BackLink href={backHref} /> : <TopBarPlaceholder />}
      <div
        css={css`
          flex: 0 1 auto;
        `}
      >
        {title}
        {children}
      </div>
      {icon ? (
        <div
          css={css`
            width: 50px;
            cursor: pointer;

            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          {icon}
        </div>
      ) : (
        <TopBarPlaceholder />
      )}
    </div>
  );
}

const TopBarPlaceholder = (props) => (
  <div
    css={css`
      width: 50px;
    `}
    {...props}
  />
);

export function BottomNav(props) {
  return (
    <div
      css={css`
        text-align: center;
        padding: 18px 0;
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 0;
        color: ${color.textInverse};
        font-size: ${fontSize[0]}px;
        font-weight: 600;

        pointer-events: none; /* Fixes clicking elements behind this container, and scrolling while mouse is over container. */

        & > * {
          pointer-events: auto; /* Enable clicking children elements within this container */
        }
      `}
      {...props}
    />
  );
}

export const ContentWithBottomNav = (props) => (
  <div
    css={css`
      flex: 1 0 auto;
      height: 100%;
      overflow: auto; /* scroll this only, not top or bottom nav */
    `}
    {...props}
  />
);

export const ContentWithTopNav = (props) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;

      padding-top: 75px;
      flex: 1 0 auto;
    `}
    {...props}
  />
);

export function SettingsContent(props) {
  return (
    <div
      css={css`
        max-width: 374px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-self: center;
        row-gap: 10px;
        justify-content: center;
        margin-bottom: 60px;
        flex: 1 0 auto;
      `}
      {...props}
    />
  );
}

export const Content = (props) => (
  <div
    css={css`
      flex: 1 0 auto;
      height: 100%;
      overflow: auto; /* scroll this only, not top or bottom nav */
    `}
    {...props}
  />
);

export const Page = ({ align = 'left', ...props }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      text-align: ${align};
    `}
    {...props}
  />
);

export function A({ children, href, ...props }) {
  return (
    <Link
      href={href}
      {...props}
      css={css`
        display: inline-block;
        margin: 0 1em;
        background: white;
        color: black;
        text-decoration: none;
        padding: 2px 8px;
        border-radius: 5px;
      `}
    >
      {children}
    </Link>
  );
}

export function Text(props) {
  return (
    <p
      css={css`
        margin-left: 1em;
        margin-right: 1em;
      `}
      {...props}
    />
  );
}

type ButtonVariantType = 'transparent' | 'primary' | 'destructive';
type ButtonType = {
  variant?: ButtonVariantType;
} & React.ClassAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', ...props }: ButtonType) {
  return (
    <button
      css={css`
        padding: 8px 16px;
        border-radius: 3px;
        font-size: ${fontSize[2]}px;
        border: none;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        ${buttonStyles(variant)};

        &:disabled {
          opacity: 70%;
          cursor: not-allowed;
          filter: grayscale(40%) brightness(90%);
        }
      `}
      {...props}
    />
  );
}
function buttonStyles(variant: ButtonVariantType) {
  switch (variant) {
    case 'destructive':
      return css`
        background: ${color.primaryButtonBackground};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: ${color.destructiveText};

        &:hover {
          // TODO
        }
      `;
    case 'transparent':
      return css`
        background: transparent;
        color: ${color.transparentButtonText};
        border: 1px solid ${color.transparentButtonBorder};

        &:hover {
          // TODO
        }
      `;
    case 'primary':
    default:
      return css`
        background: ${color.primaryButtonBackground};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: ${color.primary};

        &:hover {
          // TODO
        }
      `;
  }
}

type IconButtonProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} & ButtonType;

export function IconButton({
  icon: Icon,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      css={css`
        margin: 0 24px;
        position: relative;
      `}
      {...props}
    >
      <Icon
        css={css`
          margin: 0 8px;
          position: absolute;
          left: 0;
          max-height: 20px;
          max-width: 20px;
        `}
      />
      {children}
    </Button>
  );
}

export const Instructions = (props) => (
  <div
    css={css`
      color: ${color.instructionsText};
      font-size: ${fontSize[1]}px;
      margin: 18px 18px 0;
      flex: 0 0 auto;
      text-align: center;
    `}
    {...props}
  />
);

export const CodeDisplayOrInput = (props) => (
  <div
    css={css`
      color: ${color.textBold};
      font-size: ${fontSize[3]}px;
      font-family: monospace;
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 18px;
    `}
    {...props}
  />
);

export const BottomActions = (props) => (
  <div
    css={css`
      align-self: center;
      margin-bottom: 18px;
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: stretch;
    `}
    {...props}
  />
);

export const Message = (props) => (
  <div
    css={css`
      height: 24px;
      margin: 16px 24px;
      color: ${color.textBold};
      text-align: center;
    `}
    {...props}
  />
);

export const BackLink = ({ href = '/', ...props }) => (
  <div {...props}>
    <Link href={href}>
      <ArrowLeft
        css={css`
          padding: 0 18px;
          cursor: pointer;
        `}
      />
    </Link>
  </div>
);

type IconWithMessageType = {
  icon: TODO;
  text: string;
} & React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const IconWithMessage = ({
  icon: Icon,
  text,
  ...props
}: IconWithMessageType) => (
  <div
    css={css`
      font-size: 22px;
      font-weight: 200;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 1.1;
      margin: 2em 0;
      color: ${color.textBold};
    `}
    {...props}
  >
    <Icon />
    <span
      css={css`
        margin-left: 12px;
      `}
    >
      {text}
    </span>
  </div>
);

export const Spinner = (props) => (
  <Ellipse
    css={css`
      animation: spin 1200ms infinite;

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
    {...props}
  />
);

export const UnderlineInput = (props) => (
  <input
    css={css`
      font-size: inherit;
      width: 100%;
      text-align: center;
      background: none;
      box-sizing: border-box;
      border: 0;
      border-bottom: 2px solid ${color.border};
      color: white;
      font-family: monospace;
      padding: 2px 0;
      border-radius: 0; /* phone user agents like to add border radius */

      &:focus {
        outline: 0;
        border-bottom: 2px solid ${color.codeShareText};
        transition: 0.2s;
      }
      &::placeholder {
        font-style: italic;
      }
    `}
    type="text"
    {...props}
  />
);

type ToggleProps = {
  isActive: boolean;
} & React.ComponentProps<typeof Link>;

export function Toggle({ isActive = false, ...props }: ToggleProps) {
  const ToggleStyle = css`
    display: inline-block;
    border: none;
    margin: 0 6px;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    cursor:pointer;
    color: ${
      isActive ? color.codeShareToggleTextActive : color.codeShareToggleText
    };
    background: ${isActive ? color.codeShareToggleBackgroundActive : 'none'};
    }
  `;

  return props.href ? (
    <Link css={ToggleStyle} {...props} />
  ) : (
    <button css={ToggleStyle} {...props} />
  );
}

export const ToggleWrapper = (props) => (
  <div
    css={css`
      flex: 0 1 auto;
      background: ${color.codeShareToggleBackground};
      padding: 4px 0;
      border-radius: 24px;
    `}
    {...props}
  />
);
