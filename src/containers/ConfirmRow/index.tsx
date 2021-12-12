import { confirmRow } from './style.module.css';

interface IConfirmRow {
  rowName: string;
  rowValue: string | boolean;
}

export const ConfirmRow = ({ rowName, rowValue }: IConfirmRow) => {
  return (
    <div className={confirmRow}>
      <p>{rowName}</p>
      <span>{rowValue}</span>
    </div>
  );
};