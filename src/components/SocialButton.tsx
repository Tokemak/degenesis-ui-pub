import { GrTwitter } from 'react-icons/gr';
import { AiOutlineMedium } from 'react-icons/ai';

interface SocialButtonProps {
  width?: number;
  height?: number;
  description?: string;
  socialtype?: string;
  socialsize?: number;
  className?: string;
  url?: string;
  fontsize?: number;
}

export default function SocialButton({
  width,
  height,
  description,
  socialtype,
  socialsize,
  className,
  url,
  fontsize = 16,
}: SocialButtonProps) {
  function setMainStyle() {
    let styles = {
      backgroundColor: 'rgba(38, 38, 38, 0.7)',
      borderRadius: '2rem',
      width: 'fit-content',
      paddingRight: '10px',
    };
    if (height) {
      const firstStyle = {
        height: '' + height + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setSocialIconStyle() {
    let styles = {
      backgroundColor: '#2c2c2c',
      borderRadius: '50%',
      paddingLeft: '3px',
      marginTop: '-2px',
    };
    if (width) {
      const firstStyle = {
        width: '' + width + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (height) {
      const firstStyle = {
        height: '' + height + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function getMainClassName() {
    let classname = 'flex flex-row items-center';
    if (className) classname = classname + ' ' + className;
    return classname;
  }

  function setDescriptionStyle() {
    let styles = {};
    if (fontsize) {
      const firstStyle = {
        fontSize: '' + fontsize + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  return (
    <a
      href={url}
      target="_blank"
      className={getMainClassName()}
      style={setMainStyle()}
      rel="noreferrer"
    >
      <div
        style={setSocialIconStyle()}
        className="flex items-center justify-center"
      >
        {socialtype === 'twitter' && (
          <GrTwitter size={socialsize} className="text-white" />
        )}
        {socialtype === 'medium' && (
          <AiOutlineMedium size={socialsize} className="text-white" />
        )}
      </div>
      <div
        className="flex justify-center items-center text-white px-3 uppercase"
        style={setDescriptionStyle()}
      >
        {description}
      </div>
    </a>
  );
}
