import React from 'react';
import {Button, Classes, FormGroup, Intent} from "@blueprintjs/core";
import {Controller, useForm} from "react-hook-form";
import {DateInput} from "@blueprintjs/datetime";
import moment from "moment";

function EmployeeForm(props) {
    const {control, register, handleSubmit, errors} = useForm();
    let departments = props.departments;

    return (
        <form onSubmit={handleSubmit(props.onFormSubmit)}>
            <div className={Classes.DIALOG_BODY}>
                <FormGroup label="Employee ID" labelFor="employee_id" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.employee_id && 'Employee ID is required'}
                           intent={errors.employee_id && Intent.DANGER}
                >
                    <input className="bp3-input" id="employee_id" name="employee_id" ref={register({required: true})}
                           placeholder="Employee ID"/>
                </FormGroup>
                <FormGroup label="Firstname" labelFor="firstname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.firstname && 'Firstname is required'}
                           intent={errors.firstname && Intent.DANGER}>
                    <input className="bp3-input" id="firstname" name="firstname" ref={register({required: true})}
                           placeholder="Firstname"/>
                </FormGroup>
                <FormGroup label="Lastname" labelFor="lastname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.lastname && 'Lastname is required'}
                           intent={errors.lastname && Intent.DANGER}>
                    <input className="bp3-input" id="lastname" name="lastname" ref={register({required: true})}
                           placeholder="Lastname"/>
                </FormGroup>
                <FormGroup label="Fullname" labelFor="fullname" inline={true} className="form-row" labelInfo="*"
                           helperText={errors.fullname && 'Fullname is required'}
                           intent={errors.fullname && Intent.DANGER}>
                    <input className="bp3-input" id="fullname" name="fullname" ref={register({required: true})}
                           placeholder="Fullname"/>
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
                    <input className="bp3-input" id="position" name="position" ref={register({required: true})}
                           placeholder="Position"/>
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
                                    return (<option value={department.id}>{department.name}</option>)
                                })
                            }
                        </select>
                    </div>
                </FormGroup>
                <FormGroup label="Address" labelFor="address" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="address" name="address" ref={register} placeholder="Address"/>
                </FormGroup>
                <FormGroup label="Phone" labelFor="phone" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="phone" name="address" ref={register} placeholder="Phone"/>
                </FormGroup>
                <FormGroup label="Mobile" labelFor="mobile" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="mobile" name="address" ref={register} placeholder="Mobile"/>
                </FormGroup>
                <FormGroup label="Email" labelFor="email" inline={true} className="form-row" labelInfo="">
                    <input className="bp3-input" id="email" name="address" ref={register} placeholder="Email"/>
                </FormGroup>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.NONE} onClick={props.onFormCancel}>
                            Cancel
                        </Button>
                        <Button intent={Intent.PRIMARY} onClick={handleSubmit(props.onFormSubmit)}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EmployeeForm;