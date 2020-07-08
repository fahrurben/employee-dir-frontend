import React, {useState, useEffect, useRef} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useForm} from "react-hook-form";
import _ from "lodash";
import {useHistory} from 'react-router-dom';
import {Alert, Button, Card, Classes, Dialog, Toaster, Intent, Position} from '@blueprintjs/core';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';

import {fetchEmployees, fetchDepartments, getEmployee, createEmployee, updateEmployee, deleteEmployee, resetEmployeeForm} from '../actions/EmployeeAction';

const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
    intent: Intent.SUCCESS,
});

function Home(props) {

    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [isShowView, setIsShowView] = useState(false);
    const [arrPage, setArrPage] = useState([]);
    const [currId, setCurrId] = useState(null);

    const isSubmitted = useSelector(state => state.employee.isSubmitted);
    const isSuccess = useSelector(state => state.employee.isSuccess);
    const employees = useSelector(state => state.employee.list);
    const page = useSelector(state => state.employee.page);
    const totalPage = useSelector(state => state.employee.totalPage);
    const departments = useSelector(state => state.employee.departments);

    const formCreate = useRef(null);

    // component did moint
    useEffect(() => {
        props.fetchEmployees(page);
        props.fetchDepartments();
    }, []);

    const onSubmit = data => {
        props.createEmployee(data);
        setIsShowCreate(false);
    };

    const onSubmitUpdate = data => {
        props.updateEmployee(data);
        setIsShowUpdate(false);
    };

    const goToPage = (page) => {
        props.fetchEmployees(page);
    };

    const employeeUpdateClicked = (id) => {
        setIsShowUpdate(true);
        props.getEmployee(id);
    };

    const employeeViewClicked = (id) => {
        setIsShowView(true);
        props.getEmployee(id);
    };

    const employeeDeleteClicked = (id) => {
        setIsShowDelete(true);
        setCurrId(id);
    };

    const confirmDeleteClicked = () => {
        props.deleteEmployee(currId);
        setCurrId(null);
        setIsShowDelete(false);
    };

    useEffect(() => {
        if (!isNaN(totalPage)) {
            let arr = new Array(totalPage);
            _.fill(arr, 0, 0, totalPage);
            setArrPage(arr);
        }
    }, [totalPage]);

    useEffect(() => {
        if (isSubmitted && isSuccess) {
            AppToaster.show({message: 'Save employee success'});
            props.resetEmployeeForm();
        }
    }, [isSubmitted]);

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center items-start bg-gray-200 h-min-screen p-16">
                    <Card interactive={false} className="w-full space-y-3">
                        <div className="text-4xl">
                            <p className="text-4xl flex">
                                Employees
                                <a className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-400 ml-2 bp3-icon-standard bp3-icon-plus"
                                   onClick={e => setIsShowCreate(!isShowCreate)}
                                ></a>
                            </p>
                        </div>
                        {
                            employees &&
                            employees.length > 0 &&
                            employees.map((employee, i) => {
                                return (<EmployeeCard key={i} employee={employee}
                                                      employeeUpdateClicked={employeeUpdateClicked}
                                                      employeeViewClicked={employeeViewClicked}
                                                      employeeDeleteClicked={employeeDeleteClicked}
                                        />)
                            })
                        }
                        <div className="flex justify-center items-start space-x-2">
                            {
                                arrPage &&
                                arrPage.length > 1 &&
                                arrPage.map((value, i) => {
                                    return (<Button key={i} intent={page === i + 1 ? Intent.PRIMARY : Intent.NONE}
                                                    onClick={e => goToPage(i + 1)}>{i + 1}</Button>)
                                })
                            }
                        </div>
                    </Card>
                </div>
            </div>

            <Dialog
                isOpen={isShowCreate}
                onClose={() => setIsShowCreate(false)}
                title="Create Employee"
                className="crud-modal"
            >
                <EmployeeForm
                    departments={departments}
                    onFormSubmit={onSubmit}
                    onFormCancel={() => setIsShowCreate(false)}
                />
            </Dialog>

            <Dialog
                isOpen={isShowUpdate}
                onClose={e => setIsShowUpdate(false)}
                title="Update Employee"
                className="crud-modal"
            >
                <EmployeeForm
                    departments={departments}
                    onFormSubmit={onSubmitUpdate}
                    onFormCancel={() => {
                        setIsShowUpdate(false);
                        props.resetEmployeeForm();
                    }}
                />
            </Dialog>

            <Dialog
                isOpen={isShowView}
                onClose={e => setIsShowView(false)}
                title="View Employee"
                className="crud-modal"
            >
                <EmployeeForm
                    departments={departments}
                    onFormCancel={e => {
                        setIsShowView(false);
                        props.resetEmployeeForm();
                    }}
                />
            </Dialog>

            <Alert
                cancelButtonText="No"
                confirmButtonText="Yes"
                icon="trash"
                intent={Intent.DANGER}
                isOpen={isShowDelete}
                onCancel={e => setIsShowDelete(false)}
                onConfirm={confirmDeleteClicked}
            >
                <p>
                    Are you sure to delete this employee data ?
                </p>
            </Alert>
        </>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchEmployees,
        fetchDepartments,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        resetEmployeeForm
    }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Home);