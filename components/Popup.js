import styles from "../styles/Home.module.css";

export default function Popup({ message, onConfirm }) {
  return (
    <div className={styles.popup}>
      <p>Configuration Change</p>
      <p>{message}</p>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
}
