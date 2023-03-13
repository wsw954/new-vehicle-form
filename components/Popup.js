import styles from "../styles/Home.module.css";

export default function Popup({ message, onConfirm, onCancel, detail }) {
  const handleConfirmClick = (event) => {
    onConfirm(event, detail);
  };

  return (
    <div className={styles.popup}>
      <p>Configuration Change</p>
      <p>{message}</p>
      <div>
        <button onClick={handleConfirmClick}>Yes</button>
        <button onClick={() => onCancel()}>No</button>
      </div>
    </div>
  );
}
