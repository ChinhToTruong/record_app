import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const RecordFile = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioElementRef = useRef(null);
  
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
        setRecording(true);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };  

  const playRecording = () => {
    if (audioElementRef.current && audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioElementRef.current.src = audioURL;
      audioElementRef.current.play();
    }
  };

  const sendRecording = () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      console.log(formData);

      // Gửi formData lên server
      const url = 'http://localhost:3000/media/up-load'
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          console.log('Response:', response);
          playRecording(); // Phát lại đoạn ghi âm sau khi gửi thành công
        })
        .catch(error => {
          console.error('Error sending recording:', error);
        });
      console.log('Audio blob:', audioBlob);
    }
  };

  return (
    <Container>
      <Row className="my-4">
      <label htmlFor="fileInput" className="form-label"> Live Record</label>
        <Col>
          <Button variant="primary" onClick={startRecording} disabled={recording}>Start</Button>
          <Button variant="danger" onClick={stopRecording} disabled={!recording}>Stop</Button>
          <Button variant="success" onClick={sendRecording} disabled={!audioBlob}>Send</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <audio ref={audioElementRef} controls />
        </Col>
      </Row>
    </Container>
  );
}

export default RecordFile


