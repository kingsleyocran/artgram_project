import React from "react";
import styles from "../styles/style.module.css";


function CustomButton({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-th-button-primary px-16 py-3 rounded-2xl hover:bg-th-button-primary-hover transition-all"
    >
      <p className={`${styles.medium} text-lg md:text-base text-white`}> {title}</p>
    </button>
  );
}

export default CustomButton;
