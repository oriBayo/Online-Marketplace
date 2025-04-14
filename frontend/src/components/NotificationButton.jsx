import { useState, useRef, useEffect } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import TimeAgoComp from './TimeAgoComp';
import { useDispatch } from 'react-redux';
import { markAllAsRead, markAsRead } from '../features/notificationSlice';
import axios from 'axios';

const NotificationButton = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleMarkAll = () => {
    dispatch(markAllAsRead());
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleDocumentClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <Dropdown
      show={isOpen}
      onToggle={handleOpenMenu}
      className='d-flex justify-content-center align-items-center'
      style={{ width: '50px' }}
    >
      <Dropdown.Toggle variant='' vas='div' className='notification-toggle'>
        <div className='position-relative'>
          <i className='fa-solid fa-bell me-1'></i>
          {unreadCount > 0 && (
            <Badge
              bg='danger'
              className='position-absolute top-0 start-100 translate-middle rounded-pill'
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu
        ref={menuRef}
        align='end'
        className='notification-menu p-2'
        onClick={handleMenuClick}
      >
        <div className='d-flex justify-content-between align-items-center p-2'>
          <Dropdown.Header>Notifications</Dropdown.Header>
          {unreadCount > 0 && (
            <button
              type='button'
              onClick={handleMarkAll}
              className='text-capitalize btn btn-sm btn-outline-info border-1'
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className='notification-list'>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <div className='p-3 text-center text-muted'>No notifications</div>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

function NotificationItem({ notification }) {
  const dispatch = useDispatch();

  const handleMarkAsRead = async () => {
    console.log(notification);
    dispatch(markAsRead(notification.id));
    await axios.post(
      'http://localhost:5000/api/notifications/updateToRead',
      notification
    );
  };

  return (
    <Dropdown.Item onClick={handleMarkAsRead}>
      <div className='d-flex justify-content-between align-items-start py-2 border-bottom'>
        <div className='d-flex align-items-start'>
          <span
            className={`me-2 mt-1 rounded-circle`}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: notification.isRead ? '#ced4da' : '#0d6efd',
            }}
          ></span>
          <div>
            <div className='fw-medium'>{notification.message}</div>
            <TimeAgoComp time={notification.createdAt} />
          </div>
        </div>
      </div>
    </Dropdown.Item>
  );
}

export default NotificationButton;
