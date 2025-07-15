import React from 'react';

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-jazz-gold focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-gatsbybold focus:text-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jazz-gold"
      aria-label="Pular para o conteúdo principal"
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipLink;