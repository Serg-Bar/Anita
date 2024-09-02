'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { AppConfig } from '@/utils/AppConfig';

type FormValues = {
  welcomeText: string;
  middleText: string;
  systemPrompt: string;
  forwardPhoneNumber: string;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end', // Align items to the right
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box' as const,
  },
  inputGroup: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'right', // Align text to the right
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
    textAlign: 'right', // Align label text to the right
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
    outline: 'none' as const,
    textAlign: 'right', // Align text inside the input to the right
    direction: 'rtl', // Set text direction to right-to-left
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    height: '120px', // Set a height for the textarea
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
    outline: 'none' as const,
    textAlign: 'right', // Align text inside the textarea to the right
    direction: 'rtl', // Set text direction to right-to-left
    resize: 'vertical', // Allow resizing vertically
  },
  inputError: {
    border: '1px solid #f00',
  },
  text: {
    margin: '20px 0',
    fontSize: '18px',
    color: '#333',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0070f3',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
  errorText: {
    color: '#f00',
    fontSize: '14px',
    marginTop: '4px',
  },
  avatar: {
    width: '80px', // Adjust size as needed
    height: '80px',
    borderRadius: '50%',
    marginBottom: '20px',
    objectFit: 'cover', // Ensure the image covers the area
  },
};

function Starter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // API call logic goes here
    console.log(data);

    const { forwardPhoneNumber, systemPrompt, middleText, welcomeText } = data;

    const UserInstructionsData = {
      email: '',
      systemPrompt,
      businessInfo: '',
      middleText,
      welcomeText,
      forwardPhoneNumber,
    };

    fetch('http://localhost:3003/user-instructions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserInstructionsData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then((text) => {
        console.log('Success:', text);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 className="text-3xl font-bold text-gray-900">{AppConfig.name}</h1>

      <img
        src="https://thumbs.dreamstime.com/z/generative-ai-young-smiling-man-avatar-man-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-d-vector-people-279560903.jpg?ct=jpeg" // Replace with your avatar URL
        alt="Avatar"
        style={styles.avatar}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={styles.inputGroup}>
        <div style={styles.inputGroup}>
          <span style={styles.label}>טקסט שלום</span>
          <input
            id="welcomeText"
            type="text"
            placeholder=""
            style={{
              ...styles.input,
              ...(errors.welcomeText ? styles.inputError : {}),
            }}
            {...register('welcomeText', { required: true })}
          />
          {errors.welcomeText && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <div style={styles.inputGroup}>
          <span style={styles.label}>טקסט ביניים</span>
          <input
            id="middleText"
            type="text"
            style={{
              ...styles.input,
              ...(errors.middleText ? styles.inputError : {}),
            }}
            {...register('middleText', { required: true })}
          />
          {errors.middleText && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <div style={styles.inputGroup}>
          <span style={styles.label}>טקסט תקנון</span>
          <textarea
            id="systemPrompt"
            style={{
              ...styles.textarea,
              ...(errors.systemPrompt ? styles.inputError : {}),
            }}
            {...register('systemPrompt', { required: true })}
          />
          {errors.systemPrompt && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <div style={styles.inputGroup}>
          <span style={styles.label}> מספר טלפון לניתוב</span>
          <input
            id="forwardPhoneNumber"
            type="tel"
            style={{
              ...styles.input,
              ...(errors.forwardPhoneNumber ? styles.inputError : {}),
            }}
            {...register('forwardPhoneNumber', { required: true })}
          />
          {errors.forwardPhoneNumber && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <button type="submit" style={styles.button}>
          הפעל
        </button>
      </form>
    </div>
  );
}

export { Starter };
