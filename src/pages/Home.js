import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from "react-hook-form";
import moment from "moment";
import _ from "lodash";
import {useHistory} from 'react-router-dom';
import {FormGroup, Button, Card, Classes, Dialog, Toaster, Intent, Position} from '@blueprintjs/core';
import {DateInput} from "@blueprintjs/datetime";
import {FETCH_EMPLOYEES, FETCH_DEPARTMENTS, CREATE_EMPLOYEE, RESET_EMPLOYEE_FORM, GET_EMPLOYEE, UPDATE_EMPLOYEE} from "../constant";
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';

const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
    intent: Intent.SUCCESS,
});

function Home() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {control, register, handleSubmit, errors} = useForm();
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const [arrPage, setArrPage] = useState([]);

    const isSubmitted = useSelector(state => state.employee.isSubmitted);
    const errorMessage = useSelector(state => state.employee.errorMessage);
    const isSuccess = useSelector(state => state.employee.isSuccess);
    const isLoading = useSelector(state => state.employee.isLoading);
    const employees = useSelector(state => state.employee.list);
    const page = useSelector(state => state.employee.page);
    const totalPage = useSelector(state => state.employee.totalPage);
    const departments = useSelector(state => state.employee.departments);

    const formCreate = useRef(null);

    // component did moint
    useEffect(() => {
        dispatch({type: FETCH_EMPLOYEES, page: page});
        dispatch({type: FETCH_DEPARTMENTS})
    }, []);

    const onSubmit = data => {
        dispatch({type: CREATE_EMPLOYEE, payload: data});
        setIsShowCreate(false);
    };

    const onSubmitUpdate = data => {
        dispatch({type: UPDATE_EMPLOYEE, payload: data});
        setIsShowUpdate(false);
    };

    const goToPage = (page) => {
        dispatch({type: FETCH_EMPLOYEES, page: page});
    };

    const employeeUpdateClicked = (id) => {
        setIsShowUpdate(true);
        dispatch({type: GET_EMPLOYEE, payload: id});
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
            dispatch({type: RESET_EMPLOYEE_FORM});
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
                                return (<EmployeeCard key={i} employee={employee} employeeUpdateClicked={employeeUpdateClicked}/>)
                            })
                        }
                        <div className="flex justify-center items-start space-x-2">
                            {
                                arrPage &&
                                arrPage.length > 0 &&
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
                onClose={e => setIsShowCreate(false)}
                title="Create Employee"
                className="crud-modal"
            >
                <EmployeeForm
                    departments={departments}
                    onFormSubmit={onSubmit}
                    onFormCancel={e => setIsShowCreate(false)}
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
                    onFormCancel={e => {
                        setIsShowUpdate(false);
                        dispatch({type: RESET_EMPLOYEE_FORM});
                    }}
                />
            </Dialog>
        </>
    );
}

export default Home;