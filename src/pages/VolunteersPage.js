import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";

const baseURL = "http://localhost:3000/volunteers";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) setVolunteers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Here be yer volunteers</h1>
      <Table data={volunteers} />
    </div>
  );
}
