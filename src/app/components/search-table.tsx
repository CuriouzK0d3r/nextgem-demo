import Table from 'react-tailwind-table';

// import 'react-tailwind-table/dist/index.css';

// create a new component called SearchTable
const SearchTable = ({ searchResults }: { searchResults: any }) => {
  var columns = [
    {
     field: "title",
     use: "Title",
     //Will not be used in search filtering
     use_in_search:true
   },
   {
     field: "typeOfStudy",
     use: "Type of Study",
   },
   {
    field: "outputType",
    use: "Output Type",
  },
  {
    field: "location",
    use: "Location",
  },
  {
    field: "privacyLevel",
    use: "Status",
  },
  {
    field: "source",
    use: "",
  },
  // {
  //   field: "more",
  //   use: "",
  // },
]

  return (
    <Table columns={columns} rows={searchResults} />

  );
};

export default SearchTable;
