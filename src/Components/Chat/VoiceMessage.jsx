// import React, { useEffect, useRef, useState } from "react";

// import WaveSurfer from "wavesurfer.js";

// const formWaveSurferOptions = ref => ({
//   container: ref,
//   waveColor: "#eee",
//   progressColor: "OrangeRed",
//   cursorColor: "OrangeRed",
//   barWidth: 3,
//   barRadius: 3,
//   responsive: true,
//   height: 150,
//   normalize: true,
//   partialRender: true
// });

// export default function VoiceMessage() {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const [playing, setPlay] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   const url = "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"

//   useEffect(() => {
//     setPlay(false);

//     const options = formWaveSurferOptions(waveformRef.current);
//     wavesurfer.current = WaveSurfer.create(options);

//     wavesurfer.current.load(url);

//     wavesurfer.current.on("ready", function () {

//       if (wavesurfer.current) {
//         wavesurfer.current.setVolume(volume);
//         setVolume(volume);
//       }
//     });

//     return () => wavesurfer.current.destroy();
//   }, [url]);

//   const handlePlayPause = () => {
//     setPlay(!playing);
//     wavesurfer.current.playPause();
//   };

//   const onVolumeChange = e => {
//     const { target } = e;
//     const newVolume = +target.value;

//     if (newVolume) {
//       setVolume(newVolume);
//       wavesurfer.current.setVolume(newVolume || 1);
//     }
//   };

//   return (
//     <div>
//       <div id="waveform" ref={waveformRef} />
//       <div className="controls">
//         <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
//         <input
//           type="range"
//           id="volume"
//           name="volume"
//           min="0.01"
//           max="1"
//           step=".025"
//           onChange={onVolumeChange}
//           defaultValue={volume}
//         />
//         <label htmlFor="volume">Volume</label>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true
});

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const VoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);


  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const url = URL.createObjectURL(blob);
        setBlobURL(url);
        setIsRecording(false);
      }).catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setIsBlocked(true);
      },
    );
  }, []);

  const url = blobURL;

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {

      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={start} disabled={isRecording}>Record</button>
        <button onClick={stop} disabled={!isRecording}>Stop</button>
        <audio src={blobURL} controls="controls" />
        {console.log(blobURL)}
      </header>

      <div>
        <div id="waveform" ref={waveformRef} />
        <div className="controls">
          <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
          <label htmlFor="volume">Volume</label>
        </div>
      </div>


    </div>
  );
};

export default VoiceMessage;

