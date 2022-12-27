import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Layout from "./Layout";

const baseURL = "http://localhost:3000/recipients";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) setRecipients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Here be yer recipients">
      <Table data={recipients} />
    </Layout>
  );
}
