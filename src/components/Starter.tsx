"use client";

import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { AppConfig } from "@/utils/AppConfig";

type FormValues = {
  welcomeText: string;
  middleText: string;
  systemPrompt: string;
  businessInfo: string;
  forwardPhoneNumber: string;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end", // Align items to the right
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    boxSizing: "border-box" as const,
  },
  inputGroup: {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "right" as React.CSSProperties["textAlign"], // Align text to the right
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    color: "#333",
    textAlign: "right" as React.CSSProperties["textAlign"], // Align label text to the right
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
    outline: "none" as const,
    textAlign: "right" as React.CSSProperties["textAlign"], // Align text inside the input to the right
    direction: "rtl" as React.CSSProperties["direction"], // Set text direction to right-to-left
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    height: "120px", // Set a height for the textarea
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
    outline: "none" as const,
    textAlign: "right" as React.CSSProperties["textAlign"], // Align text inside the textarea to the right
    direction: "rtl" as React.CSSProperties["direction"], // Set text direction to right-to-left
    resize: "vertical" as React.CSSProperties["resize"], // Allow resizing vertically
  },
  inputError: {
    border: "1px solid #f00",
  },
  text: {
    margin: "20px 0",
    fontSize: "18px",
    color: "#333",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "#fff",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  errorText: {
    color: "#f00",
    fontSize: "14px",
    marginTop: "4px",
  },
  avatar: {
    width: "80px", // Adjust size as needed
    height: "80px",
    borderRadius: "50%",
    marginBottom: "20px",
    // objectFit: 'cover', // Ensure the image covers the area
  },
  unanswered: {
    position: "absolute" as React.CSSProperties["position"],
    top: "100px",
    left: "100px",
    maxHeight: "400px",
    overflowY: "auto" as React.CSSProperties["overflowY"],
    border: "4px solid #ccc",
    padding: "10px",
    borderRadius: 10
  }
};

const systemPrompt =
  "you are customer success worker from now respond only in Hebrew, Very important if you asked about something not from the text answer this question by word false in English only, Answer only questions related to this text";

const mail = "test@gmail.com";

function Starter() {
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: async () => await getUserInstruction(),
  });

  const getUnAnsweredConversation = async () => {
    try {
      const response = await fetch(`${AppConfig.url}unanswered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: "+97233764181" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const text = await response.text();
      setUnansweredQuestions(JSON.parse(text));
      console.log("Success:", text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUnAnsweredConversation();
  }, []);

  const getUserInstruction = async () => {
    let instructions = {
      welcomeText: "",
      middleText: "",
      systemPrompt: "",
      businessInfo: "",
      forwardPhoneNumber: "",
    };
    try {
      const response = await fetch(
        `${AppConfig.url}user-instructions/${encodeURIComponent("test@gmail.com")}`,
        {
          method: "POST", // Make sure this endpoint is supposed to handle POST requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const text = await response.text();
      console.log("Success:", text);

      instructions = JSON.parse(text);
    } catch (error) {
      console.error("Error:", error);
    }

    return instructions;
  };

  const formatDate = (seconds: number, nanoseconds: number) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toLocaleString();
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // API call logic goes here
    const { forwardPhoneNumber, middleText, welcomeText, businessInfo } = data;

    const UserInstructionsData = {
      email: mail,
      systemPrompt,
      businessInfo,
      middleText,
      welcomeText,
      forwardPhoneNumber,
    };

    fetch(`${AppConfig.url}user-instructions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserInstructionsData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Network response was not ok.");
      })
      .then((text) => {
        console.log("Success:", text);
      })
      .catch((error) => {
        console.error("Error:", error);
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
            {...register("welcomeText", { required: true })}
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
            {...register("middleText", { required: true })}
          />
          {errors.middleText && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <div style={styles.inputGroup}>
          <span style={styles.label}>טקסט תקנון</span>
          <textarea
            id="businessInfo"
            style={{
              ...styles.textarea,
              ...(errors.businessInfo ? styles.inputError : {}),
            }}
            {...register("businessInfo", { required: true })}
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
            {...register("forwardPhoneNumber", { required: true })}
          />
          {errors.forwardPhoneNumber && (
            <span style={styles.errorText}>This field is required</span>
          )}
        </div>
        <button type="submit" style={styles.button}>
          שמור
        </button>
      </form>
      <div style={styles.unanswered}>
        {unansweredQuestions.length > 0 && (
          <div>
            <h2 style={{ textAlign: 'right' }}>שאלות שלא נענו</h2>
            <ul>
              {unansweredQuestions.map((conversation: any, index) => (
                <li key={index} style={{ marginBottom: "20px" }}>
                  <div>
                    <strong>From:</strong> {conversation.from}
                  </div>
                  <div>
                    <strong>Question:</strong> {conversation.questionText}
                  </div>
                  <div>
                    <strong>Created At:</strong>{" "}
                    {formatDate(
                      conversation.createdAt._seconds,
                      conversation.createdAt._nanoseconds
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export { Starter };
