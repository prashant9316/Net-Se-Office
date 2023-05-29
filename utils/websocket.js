export const createWebSocketConnection = (url, onMessageReceived) => {
    const ws = new WebSocket(url);
  
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessageReceived(data);
    };
  
    return ws;
  };
  