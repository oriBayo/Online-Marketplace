import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../features/notificationSlice';

export const useSignalRNotifications = (hubUrl) => {
  const [connectionState, setConnectionState] = useState('disconnected');
  const dispatch = useDispatch();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection.onreconnecting(() => setConnectionState('reconnecting'));
    connection.onreconnected(() => setConnectionState('connected'));
    connection.onclose(() => setConnectionState('disconnected'));

    connection.on('ReceiveNotification', (notification) => {
      console.log('📨 New Notification:', notification);
      dispatch(addNotification(notification));
    });

    connection
      .start()
      .then(() => {
        console.log('✅ SignalR connected');
        setConnectionState('connected');
      })
      .catch((err) => {
        console.error('❌ SignalR Connection Error:', err);
        setConnectionState('error');
      });

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [dispatch, hubUrl]);
  return { connectionState };
};
