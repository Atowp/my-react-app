import Nav from "../../component/Nav/Nav";
import styles from "./TicTacToe.module.less";

function Square() {
  return <button className={styles.square}>X</button>;
}

function TicTacToe() {
  return (
    <>
      <Nav />
      <Square />
    </>
  );
}

export default TicTacToe;
