"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Polaroid(props: any) {

  const [image, setImage] = useState(props.storage.image);
  const [coordinates, setCoordinates] = useState({x: props.storage.xpos, y: props.storage.ypos});
  const [notetext, setNotetext] = useState(props.storage.note);
  const [alignment, setAlignment] = useState(props.storage.alignment);  

  const nodeRef = React.useRef(null);
  const reader = new FileReader();
  const uploadButton = useRef();

  function uploadPolaroid(e: any) {
    let polaroid = e.target.files[0];

    reader.addEventListener('load', function() {
      // localStorage.setItem('polaroid', JSON.stringify(reader.result));
      setImage(reader.result);

    });

    if (polaroid) {
      reader.readAsDataURL(polaroid);
    }

  }

  function handleClick(e: any) {
    uploadButton.current.click();
  }

  useEffect(() => {

    let updatedPolaroid = {
      "note": notetext,
      "image": image,
      "alignment": alignment,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedPolaroid, props.idx);

  }, [coordinates, notetext, image, alignment]);

  return (
    <>
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{x: coordinates.x, y: coordinates.y}} 
      onStop={(e, ui) => { setCoordinates({x: ui.x, y: ui.y})}}>
        <div ref={nodeRef} className='sticky polaroid'>
        <div className={'sticky-wrapper ' + props.storage.rotation}>
              <div className='polaroid-container' draggable>
                    <img className={'img-align-' + alignment} src={image} width="275"/>          
                    <input ref={uploadButton} type="file" onChange={(e) => uploadPolaroid(e)} accept="image/*"/>
                    
                    <button className='upload-button' onClick={handleClick}> 
                        <svg width="20" height="25" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6016 8.55518V0.586426H1.88281C1.10352 0.586426 0.476562 1.21338 0.476562 1.99268V29.1802C0.476562 29.9595 1.10352 30.5864 1.88281 30.5864H21.5703C22.3496 30.5864 22.9766 29.9595 22.9766 29.1802V9.96143H15.0078C14.2344 9.96143 13.6016 9.32861 13.6016 8.55518ZM17.4207 21.212H13.6016V25.8995C13.6016 26.4175 13.182 26.837 12.6641 26.837H10.7891C10.2711 26.837 9.85156 26.4175 9.85156 25.8995V21.212H6.03242C5.1957 21.212 4.77793 20.1989 5.37207 19.6089L11.0217 14.0015C11.4113 13.6142 12.0406 13.6142 12.4303 14.0015L18.0799 19.6089C18.6746 20.1989 18.2574 21.212 17.4207 21.212ZM22.5664 6.73877L16.8301 0.996582C16.5664 0.73291 16.209 0.586426 15.834 0.586426H15.4766V8.08643H22.9766V7.729C22.9766 7.35986 22.8301 7.00244 22.5664 6.73877Z" />
                        </svg>
                    </button>

                    <div className='buttons-container'>
                        {/* Align Top */}
                        <button onClick={(e) => setAlignment("top")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.68115 1.34412H15.6812" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.68115 15.3441H15.6812" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.68115" y="4.1441" width="11.2" height="4.8" rx="2" />
                            </svg>
                        </button>

                        {/* Align Middle */}
                        <button onClick={(e) => setAlignment("center")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5564 1.34412H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.5564 15.3441H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.5564" y="6.34412" width="11.2" height="4.8" rx="2" />
                            </svg>
                        </button>

                        {/* Align Bottom */}
                        <button onClick={(e) => setAlignment("bottom")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5564 1.34412H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.5564 15.3441H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.5564" y="7.34412" width="11.2" height="4.8" rx="2"/>
                            </svg>
                        </button>
                    </div>
              </div>

              <input type="text" onChange={(e) => { setNotetext(e.target.value)}} defaultValue={notetext}/>
        </div>
        </div>
    </Draggable> 
    </>
  )
}