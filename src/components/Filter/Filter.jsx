import css from './Filter.module.css';
const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
};
export default Filter;
