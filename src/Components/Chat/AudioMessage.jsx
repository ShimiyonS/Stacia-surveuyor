// import React, { useState, useRef } from 'react';

// function AudioMessage() {
//     const [isRecording, setIsRecording] = useState(false);
//     const [audioBlob, setAudioBlob] = useState(null);
//     const mediaRecorderRef = useRef(null);
//     const chunksRef = useRef([]);
//     const audioElementRef = useRef(null);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaRecorderRef.current = new MediaRecorder(stream);
//             mediaRecorderRef.current.ondataavailable = handleDataAvailable;
//             mediaRecorderRef.current.start();
//             setIsRecording(true);
//         } catch (error) {
//             console.error('Error accessing microphone:', error);
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//             mediaRecorderRef.current.stop();
//         }
//         setIsRecording(false);
//     };

//     const handleDataAvailable = (event) => {
//         if (event.data.size > 0) {
//             chunksRef.current.push(event.data);
//         }
//     };

//     const sendVoiceMessage = async () => {
//         try {
//             const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
//             setAudioBlob(audioBlob);
//             const audioUrl = URL.createObjectURL(audioBlob);
//             if (audioElementRef.current) {
//                 audioElementRef.current.src = audioUrl;
//                 audioElementRef.current.play();
//             }
//         } catch (error) {   
//             console.error('Error sending voice message:', error);
//         }
//     };

//     console.log(chunksRef);

//     return (
//         <div>
//             <button onClick={startRecording} type="button" disabled={isRecording}>
//                 Start Recording
//             </button>
//             <button onClick={stopRecording} type="button" disabled={!isRecording}>
//                 Stop Recording
//             </button>
//             <button onClick={sendVoiceMessage} type="button">
//                 Send Voice Message
//             </button>
//             <audio ref={audioElementRef} controls />
//         </div>
//     );
// }

// export default AudioMessage;

// import React, { useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// const AudioMessage = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [wavesurfer, setWaveSurfer] = useState(null);

//   const handleRecordToggle = () => {
//     if (!isRecording) {
//       // Start recording
//       setIsRecording(true);
//       const waveSurferInstance = WaveSurfer.create({
//         container: '#waveform',
//         waveColor: 'blue',
//         progressColor: 'purple',
//         height: 100,
//       });
//       setWaveSurfer(waveSurferInstance);
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then((stream) => {
//           const mediaRecorder = new MediaRecorder(stream);
//           const audioChunks = [];

//           mediaRecorder.addEventListener('dataavailable', (event) => {
//             audioChunks.push(event.data);
//             waveSurferInstance.loadBlob(event.data);
//           });

//           mediaRecorder.addEventListener('stop', () => {
//             const audioBlob = new Blob(audioChunks);
//             const audioUrl = URL.createObjectURL(audioBlob);
//             const audio = new Audio(audioUrl);
//             audio.controls = true;
//             const playButton = document.createElement('button');
//             playButton.textContent = 'Play';
//             playButton.onclick = () => {
//               if (!isPlaying) {
//                 audio.play();
//                 setIsPlaying(true);
//               } else {
//                 audio.pause();
//                 setIsPlaying(false);
//               }
//             };
//             document.getElementById('audio-controls').appendChild(audio);
//             document.getElementById('audio-controls').appendChild(playButton);
//           });

//           mediaRecorder.start();
//           setTimeout(() => {
//             mediaRecorder.stop();
//             setIsRecording(false);
//           }, 5000); // Record for 5 seconds
//         })
//         .catch((error) => {
//           console.error('Error accessing microphone:', error);
//         });
//     } else {
//       // Stop recording
//       setIsRecording(false);
//       wavesurfer.stop();
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleRecordToggle}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <div id="waveform"></div>
//       <div id="audio-controls"></div>
//     </div>
//   );
// };

// export default AudioMessage;

import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioMessage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [wavesurfer, setWaveSurfer] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        if (isRecording) {
            const timer = setInterval(() => {
                setDuration((prevDuration) => prevDuration + 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setDuration(0); // Reset duration when recording stops
        }
    }, [isRecording]);

    useEffect(() => {
        if (!isRecording) {
            // Cleanup mediaRecorder and wavesurfer instances
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
            if (wavesurfer) {
                wavesurfer.destroy();
                setWaveSurfer(null);
            }
        }
    }, [isRecording]);

    const handleRecordToggle = () => {
        if (!isRecording) {
            // Start recording
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    const waveSurferInstance = WaveSurfer.create({
                        container: '#waveform',
                        waveColor: 'blue',
                        progressColor: 'purple',
                        height: 100,
                    });
                    setWaveSurfer(waveSurferInstance);

                    const mediaRecorderInstance = new MediaRecorder(stream);
                    setMediaRecorder(mediaRecorderInstance);

                    const audioChunks = [];
                    mediaRecorderInstance.addEventListener('dataavailable', (event) => {
                        audioChunks.push(event.data);
                        // Only loadBlob when WaveSurfer is already initialized
                        if (waveSurferInstance) {
                            waveSurferInstance.loadBlob(event.data);
                        }
                    });

                    mediaRecorderInstance.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.controls = true;
                        document.getElementById('audio-controls').appendChild(audio);
                    });

                    mediaRecorderInstance.start();
                    setIsRecording(true);
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            // Stop recording
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <div>
            <button onClick={handleRecordToggle}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <div>{duration}</div>
            <div id="waveform"></div>
            <div id="audio-controls"></div>
        </div>
    );
};

export default AudioMessage;


