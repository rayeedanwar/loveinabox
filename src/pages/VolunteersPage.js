import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/TableWrapper";
import Layout from "./Layout";

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
    <Layout title="Here be yer volunteers">
      <Table data={volunteers} />
    </Layout>
  );
}
