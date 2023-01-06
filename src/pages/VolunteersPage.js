import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/TableWrapper";
import AddVolunteer from "../components/AddVolunteer";
import Layout from "../components/Layout";

const baseURL = `${process.env.REACT_APP_API_URL}/volunteers`;

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
      <AddVolunteer />
      <Table data={volunteers} />
    </Layout>
  );
}
