<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */


const Table = ({columns, renderRow, data}) => {
=======



const TableS = ({columns, renderRow, data}) => {
>>>>>>> 59aa312c98f7c082898a73dca15f14f644f985f7
    
    
  return (
    <table className='w-full mt-4'>
        <thead>
            <tr className="text-left text-sm">
                {columns.map((col) => (
                    <th key={col.accessor} className={col.className}>{col.header}</th>
                ))}
            </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  )
}

<<<<<<< HEAD
export default Table
=======
export default TableS
>>>>>>> 59aa312c98f7c082898a73dca15f14f644f985f7
