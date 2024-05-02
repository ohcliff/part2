const Filter = ({filter, handleFilter}) => {
    return (
        <div>
            search countries
            <input
            value={filter}
            onChange={handleFilter}
            />
        </div>
    )
}

export default Filter