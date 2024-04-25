import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from "socket.io-client";
import EditorToolbar, { modules, formats } from './EditorToolbar';
import { FaRegEdit } from "react-icons/fa";
import { LuMic } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { BsBarChartLine } from "react-icons/bs";
import { LuCalendarPlus } from "react-icons/lu";
import { RiSendPlane2Fill } from "react-icons/ri";
import JoditEditor from 'jodit-react'
import "../../Styles/Chat/Chat.css";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import WaveSurfer from 'wavesurfer.js';
import Modal from 'react-modal';
import MicRecorder from 'mic-recorder-to-mp3';


// text editor icons

import Bold from '../../Assets/Redo.svg';
import Bullet from '../../Assets/Bullet.png';
import Cloud from '../../Assets/CloudUpload.png';
import AudioMessage from './AudioMessage';
import AudioWaves from './AudioWaves';


const socket = io('http://localhost:4000');
const Mp3Recorder = new MicRecorder({ bitRate: 128 });


const TextEditor = ({ placeholder }) => {
  const editor = useRef(null);
  const [editorHtml, setEditorHtml] = useState('');
  const [normalMsg, setNormalMsg] = useState('');
  const [openJoditor, setOpenJoditor] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // voice messages
  const [isRecording, setIsRecording] = useState(false);
  // const [recordedUrl, setRecordedUrl] = useState('');
  // const mediaStream = useRef(null);
  // const mediaRecorder = useRef(null);
  // const chunks = useRef([]);


  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia(
  //       { audio: true }
  //     );
  //     mediaStream.current = stream;
  //     mediaRecorder.current = new MediaRecorder(stream);
  //     mediaRecorder.current.ondataavailable = (e) => {
  //       if (e.data.size > 0) {
  //         chunks.current.push(e.data);
  //       }
  //     };
  //     mediaRecorder.current.onstop = () => {
  //       const recordedBlob = new Blob(
  //         chunks.current, { type: 'audio/mp3' }
  //       );
  //       const url = URL.createObjectURL(recordedBlob);
  //       setRecordedUrl(url);
  //       chunks.current = [];
  //     };
  //     mediaRecorder.current.start();
  //   } catch (error) {
  //     console.error('Error accessing microphone:', error);
  //   }
  // };
  // const stopRecording = () => {
  //   if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
  //     mediaRecorder.current.stop();
  //   }
  //   if (mediaStream.current) {
  //     mediaStream.current.getTracks().forEach((track) => {
  //       track.stop();
  //     });
  //   }
  // };

  // -------------------------------------------------------

  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);


  // -------------------------------------------------------


  // attachment modal state
  const [modal, setModal] = useState(false);


  console.log("renders");

  const handleChange = (html) => {
    setEditorHtml(html);
  };


  // custom styles for attachment modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "32%",
      height: "80%",
      borderRadius: "0.5rem",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: '1rem'
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      zIndex: "999",
    },
  };



  const config = {
    readonly: false,
    toolbarAdaptive: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'indent',
      'outdent',
      'ul',
      'ol',
      '|',
      'fontsize',
      'paragraph',
      'eraser',
      'brush',
      '|',
      'image',
      'video',
      '|',
      'link',
      'table',
      'undo',
      'redo',
      '|',

    ],
    icons: {
      bold: Bold
    }
  };


  // send normal text messages

  const sendTextMessage = () => {
    if (normalMsg !== '') {
      console.log(normalMsg);
      socket.emit('message', {
        type: 'text',
        content: normalMsg
      });
      setNormalMsg('');
    } else {
      console.log('message cannot be empty');
    }
  }


  // send html messages

  const sendMessage = () => {
    if (editorHtml.trim() !== '') {
      console.log("___________", editorHtml);
      socket.emit('message', {
        type: 'html',
        content: editorHtml
      });
      setEditorHtml('');
    } else {
      console.log("msg is empty, not sending");
    }
  };

  // send voice messages

  // const sendVoiceMessage = () => {
  //   if (recordedUrl !== '') {
  //     console.log('-----------------', recordedUrl);
  //     socket.emit('message', {
  //       type: 'audio',
  //       content: 'send react component'
  //     });
  //   } else {
  //     console.log('cannot send empty messages');
  //   }
  // };

  const sendVoiceMessage = () => {
    if (blobURL !== '') {
      console.log('-----------------', blobURL);
      socket.emit('message', {
        type: 'audio',
        content: blobURL
      });
    } else {
      console.log('cannot send empty messages');
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;
      const fileMessage = `<a href="${fileContent}" download>${file.name}</a>`;
      setEditorHtml(prevMessage => prevMessage + fileMessage);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  // voice message start



  // voice message end

  // emoji

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.native);
    if (normalMsg) {
      setNormalMsg(prevMessage => prevMessage + emoji.native);
    } else {
      setEditorHtml(prevMessage => prevMessage + emoji.native);
    }
  };


  // useEffect(() => {
  //   const handleScroll = (event) => {
  //   };

  //   window.addEventListener('mousewheel', handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener('mousewheel', handleScroll);
  //   };
  // }, []);

  console.log(editorHtml);

  // const handleImageUpload = (files) => {
  //   const formData = new FormData();
  //   formData.append('image', files[0]);

  //   fetch('/upload-image', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     const imageUrl = data.imageUrl;
  //     console.log(imageUrl);
  //     const imgHtml = `<img src="${imageUrl}" alt="Uploaded Image" />`;
  //     setEditorHtml(prevMessage => prevMessage + imgHtml);
  //   })
  //   .catch(error => {
  //     console.error('Error uploading image:', error);
  //   });
  // // };


  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    // <div style={{
    //   width: '100%',
    //   border: '1px solid #ccc',
    //   padding: '1rem 1.2rem',
    //   borderRadius: "0.5rem"
    // }}>
    //   <EditorToolbar />
    //   <ReactQuill
    //     theme="snow"
    //     value={editorHtml}
    //     onChange={handleChange}
    //     modules={modules}
    //     formats={formats}
    //     style={{
    //       width: "100%"
    //     }}
    //   />
    //   <div style={{
    //     marginTop: '1rem',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    //   }}>
    //     <div style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       columnGap: '0.8rem'
    //     }}>
    //       <FaRegEdit size={20}
    //         color='rgba(132, 147, 178, 1)'
    //       />
    //       <LuMic size={20} color='rgba(132, 147, 178, 1)' />
    //       <div>|</div>
    //       <BsEmojiSmile size={20} color='rgba(132, 147, 178, 1)' />
    //       <GrAttachment size={20} color='rgba(132, 147, 178, 1)' />
    //       <BsBarChartLine size={20} color='rgba(132, 147, 178, 1)' />
    //       <div>|</div>
    //       <LuCalendarPlus size={20} color='rgba(132, 147, 178, 1)' />
    //       <div style={{
    //         fontSize: "1.4rem",
    //         fontFamily: 'EuclidRegular',
    //         color: 'rgba(132, 147, 178, 1)'
    //       }}>@</div>
    //     </div>
    //     <div style={{
    //       border: '1px solid rgba(27, 81, 187, 1)',
    //       borderRadius: '0.3rem',
    //       padding: '0.3rem',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center'
    //     }}
    //       onClick={sendMessage}
    //     >
    //       <RiSendPlane2Fill size={24} color='rgba(27, 81, 187, 1)' />
    //     </div>
    //   </div>
    // </div>
    <>
      <div style={{
        border: "1px solid rgba(211, 220, 229, 1)",
        borderRadius: "0.5rem",
        position: 'relative'
      }}>
        {
          showEmojiPicker && <div style={{
            position: 'absolute',
            bottom: '100%',
          }}>
            <Picker theme='light'
              previewPosition='none'
              perLine={8}
              onEmojiSelect={handleEmojiSelect}
            />
          </div>
        }
        {
          openJoditor ? (
            <JoditEditor
              ref={editor}
              value={editorHtml}
              // config={{
              //   readonly: false,
              //   uploader: {
              //     insertImageAsBase64URI: true,
              //   },
              // }}
              config={config}
              tabIndex={1}
              onBlur={newContent => setEditorHtml(newContent)}
              onChange={newContent => { }}
            />
          ) : <div className='normal-msg-box'>
            <input
              type='text'
              placeholder='start typing'
              value={normalMsg}
              onChange={(e) => setNormalMsg(e.target.value)}
            />
            {/* <audio controls src={recordedUrl} />
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button> */}

            {/* -------------------------------------- */}

            <button onClick={start} disabled={isRecording}>Record</button>
            <button onClick={stop} disabled={!isRecording}>Stop</button>
            {/* <audio src={blobURL} controls="controls" /> */}

            {/* -------------------------------------- */}

          </div>
        }
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.4rem 1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            cursor: 'pointer'
          }}>
            <FaRegEdit size={20}
              color={openJoditor ? 'rgba(27, 81, 187, 1)' : 'rgba(132, 147, 178, 1)'}
              onClick={() => setOpenJoditor(!openJoditor)}
            />
            <LuMic size={20}
              color={isRecording ? 'red' : 'rgba(132, 147, 178, 1)'}
            // onClick={toggleRecording}
            />
            <BsEmojiSmile size={20}
              color={showEmojiPicker ? 'rgba(27, 81, 187, 1)' : 'rgba(132, 147, 178, 1)'}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <GrAttachment size={20}
              color='rgba(132, 147, 178, 1)'
              onClick={() => setModal(true)}
            />
            {/* <input type='file' onChange={handleFileChange} /> */}
            <BsBarChartLine size={20}
              color='rgba(132, 147, 178, 1)' />
            <LuCalendarPlus size={20}
              color='rgba(132, 147, 178, 1)' />
          </div>

          <div style={{
            border: '1px solid rgba(27, 81, 187, 1)',
            borderRadius: '0.3rem',
            padding: '0.2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
            // onClick={
            //   openJoditor ? sendMessage : sendTextMessage
            // }
            onClick={sendVoiceMessage}
          >
            <RiSendPlane2Fill size={24} color='rgba(27, 81, 187, 1)' />
          </div>
        </div>

      </div>

      {/* attachment modal */}

      <Modal
        isOpen={modal}
        onAfterOpen={() => setModal(true)}
        onAfterClose={() => setModal(false)}
        style={customStyles}
      >
        <div style={{
          border: '2px dashed rgba(27, 81, 187, 1)',
          height: '100%',
          width: '100%',
          borderRadius: '0.5rem'
        }}>
          <div>
            <img
              src={Cloud}
              alt='uplaod_cloud_png'
            />

          </div>
        </div>
      </Modal>

    </>
  );
};

export default TextEditor;

