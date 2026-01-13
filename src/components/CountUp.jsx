import { useState, useEffect } from 'react';

const CountUp = ({ end, intervalDuration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = () => {
      if (count < end) {
        setCount((prevCount) => prevCount + 1);
      }
    };

    const interval = setInterval(increment, intervalDuration); // Change the interval as desired

    return () => clearInterval(interval);
  }, [count, end]);

  return <h3 className="text-[44px] text-white">{count}</h3>;
};

export default CountUp;