import { ClearButton, TextField } from "./FilterComponentCSS";


export const FilterComponent = ({ filterText, onClear,setFilterText }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={(e)=>{setFilterText(e.target.value)
                console.log(e.target.value)
            }}
        />
        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);
