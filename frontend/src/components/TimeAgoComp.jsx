import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

function TimeAgoComp({ time }) {
  const date = new Date(time);

  return (
    <div>
      <small className='text-muted'>
        <ReactTimeAgo date={date} locale='en-US' />
      </small>
    </div>
  );
}

export default TimeAgoComp;
