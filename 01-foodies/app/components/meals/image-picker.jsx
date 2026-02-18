'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef();
  const [pickedImage, setPickedImage] = useState();
  const onButtonClick = () => {
    imageInputRef.current.click();
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Picked image" fill />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          ref={imageInputRef}
          onChange={onImageChange}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={onButtonClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
