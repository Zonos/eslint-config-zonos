import { useEffect, useState } from 'react';

const Test = () => {
  const [first, setfirst] = useState('');

  useEffect(() => {
    console.log({ first });
  }, []);
};
