import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from "wavesurfer.js";
import Play from '../../Assets/play.png';
import { BsFillPauseFill } from "react-icons/bs";

const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#C5D0DD",
    progressColor: "#1B51BB",
    cursorColor: "#1B51BB",
    barWidth: 2,
    // barRadius: 3,
    responsive: true,
    height: 40,
    normalize: true,
    partialRender: true
});

export default function AudioWaves({ blobURL }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    console.log("blobURL", blobURL);

    // const url = blobURL;

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
        <div style={{
            backgroundColor: '#E8EFFF',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0.2rem',
            padding: '0.5rem',
            columnGap: '0.5rem'
        }}>
            <div onClick={handlePlayPause}>{!playing ? <img
                src={Play}
            /> : <BsFillPauseFill 
                color='#1B51BB'
                size={24} 
            />
            }</div>
            <div id="waveform" ref={waveformRef}
                style={{
                    width: '100%',
                }}
            />
            {/* <div className="controls"> */}

            {/* <input
                    type="range"
                    name="volume"
                    min="0.01"
                    max="1"
                    step=".025"
                    onChange={onVolumeChange}
                    defaultValue={volume}
                /> */}
            {/* <label htmlFor="volume">Volume</label> */}
            {/* </div> */}
        </div>
    )
}
