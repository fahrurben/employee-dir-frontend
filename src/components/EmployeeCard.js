import React from 'react';

function EmployeeCard(props) {
    const employee = props.employee;
    const photoUrl = process.env.REACT_APP_PHOTO_URL;
    const photo = employee.photo ? photoUrl + employee.photo : 'profile-pic.jpg';
    return (
        <div className="employee-item border border-t-4 border-solid border-gray-400 p-4 space-x-3">
            <div className="photo-box">
                <img src={photo} width="150" height="150"></img>
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
                    <p><a onClick={e => props.employeeViewClicked(employee.id)}><span className="bp3-icon-standard bp3-icon-document"></span> View</a></p>
                    <p><a onClick={e => props.employeeUpdateClicked(employee.id)}><span className="bp3-icon-standard bp3-icon-edit"></span> Edit</a></p>
                    <p><a onClick={e => props.employeeDeleteClicked(employee.id)}><span className="bp3-icon-standard bp3-icon-trash"></span> Delete</a></p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;