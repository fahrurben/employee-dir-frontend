import React, {useEffect} from 'react';
import {Button, Classes, FormGroup, Intent} from "@blueprintjs/core";
import {Controller, useForm} from "react-hook-form";
import {DateInput} from "@blueprintjs/datetime";
import moment from "moment";
import {useSelector} from "react-redux";

function EmployeeForm(props) {
    const {control, register, handleSubmit, errors, setValue} = useForm();
    let departments = props.departments;
    let employee = useSelector(state => state.employee.employee);

    useEffect(() => {
        console.log(employee);
        setValue("id", employee.id);
        setValue("employee_id", employee.employee_id);
        setValue("firstname", employee.firstname);
        setValue("lastname", employee.lastname);
        setValue("fullname", employee.fullname);
        setValue("birthday", moment(employee.birthday).toDate());
        setValue("position", employee.position);
        setValue("department", employee.department);
        setValue("address", employee.address);
        setValue("phone", employee.phone);
        setValue("mobile", employee.mobile);
        setValue("email", employee.email);
    }, [employee]);

    // useEffect(() => {
    //     register({ name: 'photo' });
    // }, [register]);

    const uploadChange = (e) => {
        console.log(e.target);
        setValue('photo', e.target.files);
    };

    return (
        <form onSubmit={handleSubmit(props.onFormSubmit)}>
            <div className={Classes.DIALOG_BODY}>
                <input type="hidden" id="id" name="id" ref={register} />
                <FormGroup label="Employee ID" labelFor="employee_id" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.employee_id && 'Employee ID is required'}
                           intent={errors.employee_id && Intent.DANGER}
                >
                    <input className="bp3-input" id="employee_id" name="employee_id" ref={register({required: true})}
                           defaultValue={employee?.employee_id} placeholder="Employee ID"/>
                </FormGroup>
                <FormGroup label="Firstname" labelFor="firstname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.firstname && 'Firstname is required'}
                           intent={errors.firstname && Intent.DANGER}>
                    <input className="bp3-input" id="firstname" name="firstname" ref={register({required: true})}
                           defaultValue={employee?.firstname} placeholder="Firstname"/>
                </FormGroup>
                <FormGroup label="Lastname" labelFor="lastname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.lastname && 'Lastname is required'}
                           intent={errors.lastname && Intent.DANGER}>
                    <input className="bp3-input" id="lastname" name="lastname" ref={register({required: true})}
                           defaultValue={employee?.lastname} placeholder="Lastname"/>
                </FormGroup>
                <FormGroup label="Fullname" labelFor="fullname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.fullname && 'Fullname is required'}
                           intent={errors.fullname && Intent.DANGER}>
                    <input className="bp3-input" id="fullname" name="fullname" ref={register({required: true})}
                           defaultValue={employee?.fullname} placeholder="Fullname"/>
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
                        defaultValue={employee?.birthday}
                        minDate={new Date(1960, 0, 1)}
                        maxDate={new Date(2050, 0, 1)}
                    />
                </FormGroup>
                <FormGroup label="Position" labelFor="position" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.position && 'Position is required'}
                           intent={errors.position && Intent.DANGER}>
                    <input className="bp3-input" id="position" name="position" ref={register({required: true})}
                           defaultValue={employee?.position} placeholder="Position"/>
                </FormGroup>
                <FormGroup label="Department" labelFor="department_id" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.department_id && 'Department is required'}
                           intent={errors.department_id && Intent.DANGER}>
                    <div className="bp3-select">
                        <select name="department_id" ref={register({required: true})}>
                            <option value="">- Select Department -</option>
                            {
                                departments &&
                                departments.length > 0 &&
                                departments.map((department) => {
                                    const selected = department.id === employee.department_id ? 'selected' : '';
                                    return (<option value={department.id} selected={selected}>{department.name}</option>)
                                })
                            }
                        </select>
                    </div>
                </FormGroup>
                <FormGroup label="Address" labelFor="address" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="address" name="address" ref={register} placeholder="Address"
                           defaultValue={employee?.address}/>
                </FormGroup>
                <FormGroup label="Phone" labelFor="phone" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="phone" name="phone" ref={register} placeholder="Phone"
                           defaultValue={employee?.phone}/>
                </FormGroup>
                <FormGroup label="Mobile" labelFor="mobile" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="mobile" name="mobile" ref={register} placeholder="Mobile"
                           defaultValue={employee?.mobile}/>
                </FormGroup>
                <FormGroup label="Email" labelFor="email" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="email" name="email" ref={register} placeholder="Email"
                           defaultValue={employee?.email}/>
                </FormGroup>
                {
                    typeof props.onFormSubmit !== "undefined" &&
                    <FormGroup label="Photo" labelFor="photo" inline={true} className="form-row" labelInfo="">
                        <input type="file" name="photo" ref={register}/>
                    </FormGroup>
                }
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.NONE} onClick={props.onFormCancel}>
                            Cancel
                        </Button>
                        {
                            typeof props.onFormSubmit !== "undefined" &&
                                <Button intent={Intent.PRIMARY} onClick={handleSubmit(props.onFormSubmit)}>
                                    Submit
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EmployeeForm;