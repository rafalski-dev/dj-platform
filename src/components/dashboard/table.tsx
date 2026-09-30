export async function Table({ data }) {
  return (
    <table className="">
      <thead>
        <td></td>
        <td></td>
      </thead>
      <tbody>
        {data.map(({ id, name }) => {
          return <div key={id}>{name}</div>;
        })}
      </tbody>
    </table>
  );
}
