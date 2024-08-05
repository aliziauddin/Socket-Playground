import React, { useEffect, useRef, useState } from "react"

const AudioStream = () => {
  const [isRecording, setIsRecording] = useState(false)
  const ws = useRef<WebSocket | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const seqIdRef = useRef<number>(0) // To track sequence IDs

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:8000/ws/audio")

    ws.current.onopen = () => {
      console.log("WebSocket connection established")
    }

    ws.current.onmessage = (event) => {
      console.log("Message from server:", event.data)
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" })

    mediaRecorder.ondataavailable = (event) => {
      if (
        event.data.size > 0 &&
        ws.current &&
        ws.current.readyState === WebSocket.OPEN
      ) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(",")[1]
          ws?.current?.send(
            JSON.stringify({
              object: "audio_chunk",
              payload: base64Data,
              seq_id: seqIdRef.current++
            })
          )
        }
        reader.readAsDataURL(event.data)
      }
    }

    mediaRecorder.start(100) // Send data every 100ms
    mediaRecorderRef.current = mediaRecorder
    setIsRecording(true)

    // Notify server that recording has started
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ object: "start" }))
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)

    // Notify server that recording has stopped
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ object: "end" }))
    }
  }

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  )
}

export default AudioStream
