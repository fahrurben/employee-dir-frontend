import React from 'react';

function EmployeeCard(props) {
    const employee = props.employee;

    return (
        <div className="employee-item border border-t-4 border-solid border-gray-400 p-4 space-x-3">
            <div className="photo-box">
                <img src="profile-pic.jpg" width="150"></img>
            </div>
            <div className="details-box p-2 p-t-4 flex">
                <div className="details-content">
                    <p className="text-2xl">{employee.fullname}</p>
                    <p>{employee.position}</p>
                    <p>Departments: {employee.department?.name}</p>
                </div>
                <div
                    className="details-operations border border-t-0 border-r-0 border-b-0 border-solid border-gray-400 p-2 pl-4">
                    {
                        employee.email !== null &&
                        <p><a href={'email:' + employee.email}><span
                            className="bp3-icon-standard bp3-icon-envelope"></span> Email</a></p>
                    }
                    <p><a><span className="bp3-icon-standard bp3-icon-document"></span> View</a></p>
                    <p><a onClick={e => props.employeeUpdateClicked(employee.id)}><span className="bp3-icon-standard bp3-icon-edit"></span> Edit</a></p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;