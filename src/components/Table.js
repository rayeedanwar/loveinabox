export default function Table({ data }) {
  if (data.length == 0) return <p>No data :(</p>; // probs should be loading state

  // typing would be better to handle nulls, won't matter if I use a table component that handles these issues
  // also would remove table primary key as they're useless to a user
  const keys = Object.keys(data[0]);

  return (
    <table>
      <tr>
        {keys.map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {data.map((arrayObject) => {
        const rows = keys.map((key) => <td>{arrayObject[key]}</td>);
        return <tr>{rows}</tr>; // availability needs improving
      })}
    </table>
  );
}
