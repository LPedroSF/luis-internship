import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import {useCountdown} from './hooks/useCountdown.js';


const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Expired!!!</span>
        </div>
    );
};

const ShowCounter = ({ hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <DateTimeDisplay value={hours} type={'h'} isDanger={false} />
        <DateTimeDisplay value={minutes} type={'m'} isDanger={false} />
        <DateTimeDisplay value={seconds} type={'s'} isDanger={false} />
      </div>
    );
};
  
const CountdownTimer = ({ targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  if (hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;