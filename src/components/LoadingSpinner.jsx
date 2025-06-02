// LoadingSpinner.jsx
export default function LoadingSpinner() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '8px solid white',
            borderTop: '8px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
          role="status"
        >
          <span style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}>
            Loading...
          </span>
        </div>
      </div>
    );
  }
  