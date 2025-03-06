// Replace this:
record(data.sentence)

// With this:
if (data && data.sentence) {
  record(data.sentence);
} else {
  console.warn('No sentence data available');
}

// Add error handling for messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message && message.data) {
      if (message.data.sentence) {
        record(message.data.sentence);
      } else {
        console.warn('Message received but no sentence data found');
      }
    }
    // Acknowledge message receipt
    sendResponse({ status: 'success' });
  } catch (error) {
    console.error('Error processing message:', error);
    sendResponse({ status: 'error', message: error.message });
  }
  // Return true to indicate async response
  return true;
});

const record = async (data) => {
  try {
    if (!data) {
      throw new Error('No data provided to record function');
    }
    // Your existing record logic here
    // ...
  } catch (error) {
    console.error('Record function error:', error);
    throw error;
  }
};