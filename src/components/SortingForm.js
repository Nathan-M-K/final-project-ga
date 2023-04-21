import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from "@mui/material/";

const SortingForm = ( { setSortByOptions, setSortOrder, setCurrentPage, sortByOptions, sortOrder }) => {
  const [sortBy, setSortBy] = useState("");
  //const [order, setOrder] = useState("");

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  // const handleOrderChange = (event) => {
  //   setOrder(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(sortBy){
      if(sortByOptions!==sortBy.slice(0,sortBy.indexOf('-')) || sortOrder!==sortBy.slice(sortBy.indexOf('-')+1)){
        setSortByOptions(sortBy.slice(0,sortBy.indexOf('-')))
        setSortOrder(sortBy.slice(sortBy.indexOf('-')+1))
        setCurrentPage(1)
      }
    }
    // if(sortBy){
    //   setSortByOptions(sortBy)
    // }
    // if(order){
    //   setSortOrder(order)
    // }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '10px', width: '300px' }}>
      <FormControl fullWidth size="small" sx={{ mb: '10px' }}>
        <InputLabel id="sort-by">Sort by</InputLabel>
        <Select labelId="sort-by" value={sortBy} label="Sort by" onChange={handleSortByChange}>
          <MenuItem value="first_release_date-desc">Release Date: Newest first</MenuItem>
          <MenuItem value="total_rating-desc">Rating: High to low</MenuItem>
          <MenuItem value="total_rating-asc">Rating: Low to high</MenuItem>
          <MenuItem value="first_release_date-asc">Release Date: Oldest first</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl fullWidth size="small" sx={{ mb: '10px',}}>
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={handleOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl> */}
      <Button fullWidth type="submit" variant="contained" color="primary">
        Show me the games!
      </Button>
    </Box>
  );
};

export default SortingForm;
