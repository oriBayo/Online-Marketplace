import React from 'react';
import { useSignalRNotifications } from '../hooks/useSignalRNotifications';
import { useSelector } from 'react-redux';
import NotificationButton from './NotificationButton';

const NotificationComp = () => {
  const { connectionState } = useSignalRNotifications(
    'https://localhost:5001/notifications-hub'
  );
  console.log(`connectionState:${connectionState}`);

  const { notifications } = useSelector((state) => state.notifications);

  return (
    <>
      {connectionState === 'connected' && (
        <NotificationButton notifications={notifications} />
      )}
    </>
  );
};

export default NotificationComp;
