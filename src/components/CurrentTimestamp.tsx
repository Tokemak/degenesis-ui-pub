import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AsOf = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export default function CurrentTimestamp() {
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AsOf className="text-center uppercase text-gray">
      As Of {timestamp.replace('T', ' ').split('.')[0] + 'Z'}
    </AsOf>
  );
}
