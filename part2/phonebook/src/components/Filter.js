const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <h3>Filter</h3>
      <form>
        <div>
          Filter shown with: <input onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
