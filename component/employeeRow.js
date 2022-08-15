export default function EmployeeRow(props) {
    return (
        <tr>
            {props.headers.map((header) => (
                <td key={header} className={props.searchTarget==header?"table-secondary":""}>{props.employee[header]}</td>
            ))}
        </tr>
    );
}
