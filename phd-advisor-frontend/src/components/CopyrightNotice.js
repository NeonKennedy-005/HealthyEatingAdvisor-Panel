import React from 'react';
import { useAppConfig } from '../contexts/AppConfigContext';

/**
 * Panel footer / sidebar notice.
 * When app.footer_text is set (Healthy Eating: educational disclaimer), show only that.
 * Otherwise fall back to the Neon.ai copyright line.
 */
const CopyrightNotice = ({ variant = 'footer', className = '' }) => {
  const { config } = useAppConfig();
  const isSidebar = variant === 'sidebar';
  const textClass = isSidebar ? 'sidebar-copyright-text' : 'footer-text';
  const patentsClass = isSidebar ? 'sidebar-patents-link' : 'footer-patents-link';
  const combinedClass = className ? `${textClass} ${className}` : textClass;

  const footerText = config?.app?.footer_text?.trim();

  if (footerText) {
    return <p className={combinedClass}>{footerText}</p>;
  }

  return (
    <p className={combinedClass}>
      {'\u00A9 '}
      {isSidebar ? (
        'Neon.ai'
      ) : (
        <a
          href="https://neon.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-neon-link"
        >
          <img src="/neon-logo.png" alt="" className="footer-neon-logo" />
          Neon.ai
        </a>
      )}
      . All rights reserved.
      {' '}
      <a
        href="https://www.neon.ai/contact"
        target="_blank"
        rel="noopener noreferrer"
        className={patentsClass}
      >
        Patents and licensing.
      </a>
    </p>
  );
};

export default CopyrightNotice;
