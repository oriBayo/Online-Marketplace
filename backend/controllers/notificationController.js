import amqp from 'amqplib';

// @desc    Create new notification
// @route   POST /api/notifications
// @access  public
const createNotificationsTest = async (req, res) => {
  try {
    const { userId, message } = req.body;
    createMessage(userId, message);
    res.status(200).json({ success: true, message: 'Notification sent!' });
    console.log('📨 Notification sent to RabbitMQ:', { userId, message });
  } catch (error) {
    console.error('❌ Error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to send notification.' });
  }
};

const createMessage = async (userId, message) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'notificationQueue';

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId, message })));
  console.log('📨 Notification sent to RabbitMQ:', { userId, message });
};
export { createMessage as createNotifications, createNotificationsTest };
