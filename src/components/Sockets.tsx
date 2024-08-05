import React, { useState, useRef, FormEvent } from "react"

const WebSocketChat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Initialize WebSocket connection when component mounts
  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/audio")
    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data])
    }
    setWs(socket)

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close()
    }
  }, [])

  const sendMessage = (event: FormEvent) => {
    event.preventDefault()
    if (ws && messageText) {
      ws.send(messageText)
      setMessageText("")
    }
  }

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          autoComplete="off"
          ref={messageInputRef}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}

export default WebSocketChat
