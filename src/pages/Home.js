import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import { FormGroup, InputGroup, Button, Card, Colors, Overlay, Classes, Dialog, AnchorButton, Intent } from '@blueprintjs/core';
import { DateInput } from "@blueprintjs/datetime";
import { FETCH_EMPLOYEES, FETCH_DEPARTMENTS, CREATE_EMPLOYEE } from "../constant";
import EmployeeCard from '../components/EmployeeCard';

function Home() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { control, register, handleSubmit, errors } = useForm();
    const [isShowCreate, setIsShowCreate] = useState(false);

    const isSubmitted = useSelector(state => state.employee.isSubmitted);
    const errorMessage = useSelector(state => state.employee.errorMessage);
    const isSuccess = useSelector(state => state.employee.isSuccess);
    const isLoading = useSelector(state => state.employee.isLoading);
    const employees = useSelector(state => state.employee.list);
    const departments = useSelector(state => state.employee.departments);

    const formCreate = useRef(null);

    // component did moint
    useEffect(() => {
        dispatch({ type: FETCH_EMPLOYEES });
        dispatch({ type: FETCH_DEPARTMENTS })
    }, []);

    const onSubmit = data => {
      console.log(data);
      dispatch({type: CREATE_EMPLOYEE, payload: data});
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center items-start bg-gray-200 h-min-screen p-16">
                    <Card interactive={false} className="w-full space-y-3">
                        <div className="text-4xl">
                            <p className="text-4xl flex">
                                Employees
                                <a className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-400 ml-2 bp3-icon-standard bp3-icon-plus"
                                    onClick={ e => setIsShowCreate(!isShowCreate)}
                                ></a>
                            </p>
                        </div>
                        {
                            employees &&
                            employees.length > 0 &&
                            employees.map((employee) => {
                                return (<EmployeeCard employee={employee} />)
                            })
                        }
                    </Card>
                </div>
            </div>
            <Dialog
                isOpen={isShowCreate}
                onClose={e => setIsShowCreate(false)}
                title="Create Employee"
                className="crud-modal"
            >
                <form ref={formCreate} onSubmit={handleSubmit(onSubmit)}>
                    <div className={Classes.DIALOG_BODY}>
                        <FormGroup label="Employee ID" labelFor="employee_id" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.employee_id && 'Employee ID is required'}
                                   intent={errors.employee_id && Intent.DANGER}
                        >
                            <input className="bp3-input" id="employee_id" name="employee_id" ref={register({ required: true})} placeholder="Employee ID" />
                        </FormGroup>
                        <FormGroup label="Firstname" labelFor="firstname" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.firstname && 'Firstname is required'}
                                   intent={errors.firstname && Intent.DANGER}>
                            <input className="bp3-input" id="firstname" name="firstname" ref={register({ required: true})} placeholder="Firstname" />
                        </FormGroup>
                        <FormGroup label="Lastname" labelFor="lastname" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.lastname && 'Lastname is required'}
                                   intent={errors.lastname && Intent.DANGER}>
                            <input className="bp3-input" id="lastname" name="lastname" ref={register({ required: true})} placeholder="Lastname" />
                        </FormGroup>
                        <FormGroup label="Fullname" labelFor="fullname" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.fullname && 'Fullname is required'}
                                   intent={errors.fullname && Intent.DANGER}>
                            <input className="bp3-input" id="fullname" name="fullname" ref={register({ required: true})} placeholder="Fullname" />
                        </FormGroup>
                        <FormGroup label="Birthday" labelFor="birthday" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.birthday && 'Birthday is required'}
                                   intent={errors.birthday && Intent.DANGER}>
                            <Controller
                                as={DateInput}
                                name="birthday"
                                control={control}
                                formatDate={date => moment(date).format('DD-MM-YYYY')}
                                parseDate={str => new Date(str)}
                                defaultValue={new Date()}
                            />
                        </FormGroup>
                        <FormGroup label="Position" labelFor="position" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.position && 'Position is required'}
                                   intent={errors.position && Intent.DANGER}>
                            <input className="bp3-input" id="position" name="position" ref={register({ required: true})} placeholder="Position" />
                        </FormGroup>
                        <FormGroup label="Department" labelFor="department_id" inline={true} className="form-row" labelInfo="*"
                                   helperText={errors.department_id && 'Department is required'}
                                   intent={errors.department_id && Intent.DANGER}>
                            <div class="bp3-select">
                                <select name="department_id" ref={register({ required: true})}>
                                    <option value="">- Select Department -</option>
                                    {
                                        departments &&
                                        departments.length > 0 &&
                                        departments.map((department) => {
                                            return (<option value={department.id}>{department.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </FormGroup>
                        <FormGroup label="Address" labelFor="address" inline={true} className="form-row" labelInfo="">
                            <input className="bp3-input" id="address" name="address" ref={register} placeholder="Address" />
                        </FormGroup>
                        <FormGroup label="Phone" labelFor="phone" inline={true} className="form-row" labelInfo="">
                            <input className="bp3-input" id="phone" name="address" ref={register} placeholder="Phone" />
                        </FormGroup>
                        <FormGroup label="Mobile" labelFor="mobile" inline={true} className="form-row" labelInfo="">
                            <input className="bp3-input" id="mobile" name="address" ref={register} placeholder="Mobile" />
                        </FormGroup>
                        <FormGroup label="Email" labelFor="email" inline={true} className="form-row" labelInfo="">
                            <input className="bp3-input" id="email" name="address" ref={register} placeholder="Email" />
                        </FormGroup>
                        <div className={Classes.DIALOG_FOOTER}>
                            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                <Button intent={Intent.NONE} onClick={e => setIsShowCreate(false)}>
                                    Cancel
                                </Button>
                                <Button intent={Intent.PRIMARY} onClick={handleSubmit(onSubmit)}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default Home;