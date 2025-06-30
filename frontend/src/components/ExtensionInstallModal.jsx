import React from 'react';
import { X } from 'lucide-react';

const ExtensionInstallModal = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          width: '90%',
          maxWidth: '600px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#FBBF24' }}>
          Install Chrome Extension
        </h2>
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '1rem' }}>
            Download the extension files by clicking the button below.
            <a
              href="/extension.zip"
              download
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                backgroundColor: '#D97706',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Download Extension
            </a>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Unzip the downloaded file. You will get a folder named `extension`.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Open Chrome and navigate to <code style={{ backgroundColor: '#374151', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>chrome://extensions</code>.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Enable "Developer mode" by toggling the switch in the top-right corner.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Click on the "Load unpacked" button that appears.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Select the unzipped `extension` folder.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            The extension should now be installed and ready to use!
          </li>
        </ol>
        <button
            onClick={onClose}
            style={{
                backgroundColor: 'transparent',
                border: '2px solid #DC2626',
                color: '#DC2626',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC2626';
                e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#DC2626';
            }}
        >
            Close
        </button>
      </div>
    </div>
  );
};

export default ExtensionInstallModal; 