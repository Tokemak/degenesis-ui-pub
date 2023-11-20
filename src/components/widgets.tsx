import { createPortal } from 'react-dom';

import TokoIcon from '../assets/img/tokomodal.svg';

interface ModalProps {
  width?: number;
  height?: number;
  onClose?: () => void;
  children?: React.ReactNode[] | React.ReactNode;
}

export default function Modal({
  width,
  height,
  onClose,
  children,
}: ModalProps) {
  function setMainStyle() {
    let styles = {
      borderRadius: '5px',
      border: '1px solid #ffffff',
      backgroundColor: '#000000',
    };
    if (width && height) {
      const firstStyle = {
        width,
        height,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setLogoContainerStyle() {
    let styles = {
      width: '105px',
      height: '105px',
      left: 'calc(50% - 52.5px)',
      top: '-52.5px',
      backgroundColor: '#000000',
    };
    return styles;
  }

  function setLogoStyle() {
    let styles = {
      borderRadius: '50%',
      border: '2px solid #B5FF00',
      width: '100%',
      height: '100%',
    };
    return styles;
  }

  function setCloseStyle() {
    let styles = {
      border: '1px solid #ffffff',
      width: '30px',
      height: '30px',
      top: '1rem',
      right: '1rem',
      cursor: 'pointer',
    };
    return styles;
  }

  const modalRoot = document.getElementById('modal-root');

  return (
    modalRoot &&
    createPortal(
      <div className="relative flex flex-col" style={setMainStyle()}>
        <div className="absolute px-3 py-3" style={setLogoContainerStyle()}>
          <div className="px-3 py-3 flex" style={setLogoStyle()}>
            <img
              src={TokoIcon}
              width={'100%'}
              height={'100%'}
              alt="Token Icon"
            />
          </div>
        </div>
        {(onClose && (
          <div
            className="absolute text-white"
            style={setCloseStyle()}
            onClick={onClose}
          >
            <svg
              view-box="0 0 28 28"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6 L22 22 M6 22 L22 6"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        )) ||
          undefined}
        {children}
      </div>,
      modalRoot
    )
  );
}
