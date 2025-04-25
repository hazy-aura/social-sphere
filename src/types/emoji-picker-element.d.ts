import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'emoji-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { theme: string }, HTMLElement>;
    }
  }
}
