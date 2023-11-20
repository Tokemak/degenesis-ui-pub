import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const routes = [
  '/',
  '/welcome',
  '/welcome2',
  '/commitsummary',
  '/waitingapproval',
  '/successmodal',
  '/connectionwarning',
  '/commitfunds',
  '/privatefarming',
  '/privatefarming2',
  '/privatefarming3',
  '/commitassets',
  '/privatefarmingmodalsuccess',
  '/privatefarmingmodalnotice',
  '/privatefarmingmigrationsuccess',
] as const;

export default function DebugRouter() {
  const [show, setShow] = useState(false);

  const toggleHideOnZ = (evt: KeyboardEvent) => {
    if (evt.key === 'z') setShow(!show);
  };

  useEffect(() => {
    document.addEventListener('keypress', toggleHideOnZ);
    return () => {
      document.removeEventListener('keypress', toggleHideOnZ);
    };
  });

  const history = useHistory();

  return (
    <div
      style={{
        display: show ? 'block' : 'none',
        zIndex: 100,
        top: 0,
        left: 0,
        background: 'white',
        position: 'absolute',
        cursor: 'pointer',
      }}
    >
      {routes.map((r) => (
        <div key={r} onClick={() => history.push(r)}>
          {r}
        </div>
      ))}
    </div>
  );
}
