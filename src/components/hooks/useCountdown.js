import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  let secs = countDown / 1000;
  let mins = secs / 60 ;
  let h = mins / 24;

  let seconds = Math.floor(secs) % 60;
  let minutes = Math.floor(mins) % 60;
  let hours = Math.floor(h);

  return [hours, minutes, seconds];
};

export { useCountdown };