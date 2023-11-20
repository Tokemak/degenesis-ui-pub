interface TokeBarProps {
  borderwidth?: number;
  height?: number;
  val?: number;
  maincolor?: string;
  bgcolor?: string;
  unit?: string;
  content?: boolean;
  flexflag?: boolean;
  textInside?: boolean;
  textColor?: string;
}

export default function TokeBar({
  borderwidth,
  height,
  val,
  maincolor,
  bgcolor,
  unit,
  content = true,
  flexflag = true,
  textInside = false,
  textColor = '#fff',
}: TokeBarProps) {
  function setMainStyle() {
    let styles = {};
    if (borderwidth && bgcolor) {
      const firstStyle = {
        width: '' + borderwidth + 'px',
        backgroundColor: bgcolor,
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

  function setSubStyle() {
    let styles = {
      color: '#ffffff',
      left: '' + borderwidth + 'px',
      width: '100px',
    };
    if (val) {
      if (val < 30) {
        const firstStyle = {
          borderBottom: '1px solid #ffffff',
          paddingLeft: '10px',
          bottom: 'calc(' + val + '% - 1px)',
        };
        styles = Object.assign(styles, firstStyle);
      } else {
        const firstStyle = {
          borderTop: '1px solid #ffffff',
          paddingLeft: '10px',
          top: '' + (100 - val) + '%',
        };
        styles = Object.assign(styles, firstStyle);
      }
    } else if (val === 0) {
      const firstStyle = {
        borderBottom: '1px solid #ffffff',
        paddingLeft: '10px',
        bottom: '0px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setSubStyle2() {
    let styles = {
      left: '' + borderwidth + 'px',
      width: '100px',
    };
    if (val) {
      if (val < 30) {
        const firstStyle = {
          paddingLeft: '10px',
          bottom: 'calc(' + val + '% - 1px)',
        };
        styles = Object.assign(styles, firstStyle);
      } else {
        const firstStyle = {
          paddingLeft: '10px',
          top: '' + (100 - val) + '%',
        };
        styles = Object.assign(styles, firstStyle);
      }
    } else if (val === 0) {
      const firstStyle = {
        paddingLeft: '10px',
        bottom: '0px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setTokeStyle() {
    let styles = {
      bottom: '0px',
    };
    if (content) {
      const firstStyle = {
        borderTop: '1px solid #ffffff',
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (borderwidth && bgcolor) {
      const firstStyle = {
        width: '' + borderwidth + 'px',
        backgroundColor: bgcolor,
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (height && val) {
      const secondStyle = {
        height: '' + (height * 1.0 * val) / 100 + 'px',
      };
      styles = Object.assign(styles, secondStyle);
    }
    if (maincolor) {
      const thirdStyle = {
        backgroundColor: maincolor,
      };
      styles = Object.assign(styles, thirdStyle);
    }
    return styles;
  }

  function getClassName() {
    let classname = 'flex flex-row';
    if (flexflag) classname = classname + ' flex-1';
    return classname;
  }

  return (
    <div className={getClassName()}>
      <div style={setMainStyle()} className="text-white uppercase relative">
        {!textInside ? (
          <>
            <div style={setTokeStyle()} className="absolute" />
            {content ? (
              <div
                style={setSubStyle()}
                className="absolute uppercase text-left font-favorit"
              >
                {val?.toFixed(2)} % {unit}
              </div>
            ) : (
              <div
                style={setSubStyle2()}
                className="absolute uppercase text-left font-favorit text-gray"
              >
                ({val?.toFixed(2)} % {unit})
              </div>
            )}
          </>
        ) : (
          <>
            <div style={setTokeStyle()} className="absolute">
              <div
                style={{
                  width: borderwidth + 'px',
                  fontSize: '10px',
                  textAlign: 'center',
                  color: textColor,
                }}
                className="absolute uppercase text-left font-favorit"
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
