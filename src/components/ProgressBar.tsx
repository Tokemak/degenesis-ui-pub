interface ProgressBarProps {
  width?: number;
  height?: number;
  val?: number;
  striped?: boolean;
  borderradius?: number;
  maincolor?: string;
  bgcolor?: string;
  stripecolor?: string;
  stripedegree?: number;
}

export default function ProgressBar({
  width,
  height,
  val,
  striped,
  borderradius = 0,
  maincolor,
  bgcolor,
  stripecolor,
  stripedegree,
}: ProgressBarProps) {
  function setMainStyle() {
    let styles = {
      border: '1px solid #ffffff',
    };
    if (borderradius === 1) {
      styles = Object.assign(styles, {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
      });
    } else if (borderradius === 2) {
      styles = Object.assign(styles, {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
      });
    }
    if (width) {
      const firstStyle = {
        width: '' + width + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (height) {
      const secondStyle = {
        height: '' + height + 'px',
      };
      styles = Object.assign(styles, secondStyle);
    }
    if (bgcolor) {
      const thirdStyle = {
        backgroundColor: bgcolor,
      };
      styles = Object.assign(styles, thirdStyle);
    }
    return styles;
  }
  function setSubMainStyle() {
    let styles = {
      width: val + '%',
      height: '100%',
      overflow: 'hidden',
    };
    if (borderradius === 1) {
      styles = Object.assign(styles, {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
      });
    } else if (borderradius === 2) {
      styles = Object.assign(styles, {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
      });
    }
    return styles;
  }

  function setSubStyle() {
    let styles = {
      animation: 'progressAnimation 4s infinite linear',
    };
    if (val) {
      const firstStyle = {
        width: '200%',
        height: '100%',
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (maincolor) {
      const secondStyle = {
        backgroundColor: maincolor,
      };
      styles = Object.assign(styles, secondStyle);
    }
    if (striped) {
      if (stripecolor) {
        const thirdStyle = {
          backgroundSize: '0.8rem 0.8rem',
        };
        styles = Object.assign(styles, thirdStyle);
        const fourthStyle = {
          backgroundImage:
            'linear-gradient(' +
            stripedegree +
            'deg,' +
            stripecolor +
            ' 25%,transparent 0,transparent 50%,' +
            stripecolor +
            ' 0,' +
            stripecolor +
            ' 75%,transparent 0,transparent)',
        };
        styles = Object.assign(styles, fourthStyle);
      }
    }
    return styles;
  }

  return (
    <div style={setMainStyle()}>
      <div style={setSubMainStyle()}>
        <div style={setSubStyle()}></div>
      </div>
    </div>
  );
}
