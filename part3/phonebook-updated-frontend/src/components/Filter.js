const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <h2>Filter</h2>
      <form>
        <div>
          Keyword: <input onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

export default Filter
