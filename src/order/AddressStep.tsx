import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruck} from "@fortawesome/free-solid-svg-icons";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import "./order.scss"
import {Redirect} from "react-router";
import {useDispatch} from "react-redux";
import {wizardPages as pages} from "./OrderWizardContainer"
import {NextButton} from "./buttons/NextButton";
import {BackButton} from "./buttons/BackButton";
import {Address, DeliveryType, Product} from "../AppState";
import {updateAddressAction, updateDeliveryTypeAction} from "../admin/redux/orderReducer";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const schema = yup.object({
    name: yup.string().required(),
    telephone: yup.number().positive().integer().required(),
    email: yup.string().email()
}).required();


export default function AddresStep() {

    const { register, handleSubmit, formState } = useForm<Address>({
        resolver: yupResolver(schema)
    });

    console.info("errors")

    let errors = formState.errors

    try {
        console.info(JSON.stringify(errors))
    }
    catch(e) {
        console.error("circular error")
    }

    const dispatch = useDispatch();
    const [redirect, setRedirect] = React.useState<boolean>(false);
    const [deliveryType, setDeliveryType] = React.useState(DeliveryType.pickup);

    function onRadioChanged(e: any) {
        setDeliveryType(e.currentTarget.value)
        dispatch(updateDeliveryTypeAction(e.currentTarget.value));
    }

    if (redirect) {
        return <Redirect to={pages.WHICH_PAYMENT}/>
    }

    const onSubmit = (data: Address) => {
        // alert(JSON.stringify(data))

        dispatch(updateAddressAction({address: data}));
        setRedirect(true)
    }
    return (
        <div className="wizardPanel address-step">

            {formState.isValid && <h4>IS VALID</h4> }
            <h2 className={"wizardHeader"}>Delivery or Pickup?</h2>
                <div className="wizardMain">
                    <BackButton page={"/order/cat_drinks"}/>
                    <form onSubmit={handleSubmit(onSubmit)} id="addressForm" aria-label="form" style={{border: "5px green dashed", width: "100%"}}>

                        <div className="wizardCenter">

                            <div className="icon-container">
                                <FontAwesomeIcon icon={faTruck}
                                                 style={{fontSize: "60px", color: "navy", margin: "25px"}}/>
                            </div>

                            <div className={"radioBox"}>
                                <input type="radio"
                                       id="contactChoice1"
                                       name="pickupOrDelivery"
                                       value={DeliveryType.pickup}
                                       onChange={onRadioChanged}
                                       checked={deliveryType === DeliveryType.pickup}/>
                                <label htmlFor="contactChoice1">Pickup</label>
                                <input type="radio"
                                       id="contactChoice2"
                                       name="pckupOrDelivery"
                                       value={DeliveryType.delivery}
                                       checked={deliveryType === DeliveryType.delivery}
                                       onChange={onRadioChanged}/>
                                <label htmlFor="contactChoice2">Delivery</label>
                            </div>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", {required: true, maxLength: 45})}
                                />
                                <span className={"error"}>
                                    {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
                            </span>
                            </div>
                            {deliveryType && (deliveryType === DeliveryType.delivery) &&
                                <div>
                                    <div>
                                        <label htmlFor="street">Strasse</label>
                                        <input
                                            id="street"
                                            type="text"
                                            {...register("street", {required: false, maxLength: 85})}
                                        />
                                        <span className={"error"}>

                            </span>
                                    </div>
                                    <div>
                                        <label htmlFor="postcode">Postleitzahl</label>
                                        <input
                                            id="postcode"
                                            type="text"
                                            {...register("postcode", {required: false, maxLength: 85})}
                                        />
                                        <span className={"error"}>
                                </span>
                                    </div>
                                </div>
                            }
                            <div>
                                <label htmlFor="tel">Telefon</label>
                                <input
                                    id="tel"
                                    type="text"
                                    {...register("telephone", {required: true, maxLength: 85})}
                                />
                                <span className={"error"}>
                                    {errors.telephone?.type === 'required' && <p role="alert">Telephone is required</p>}
                                </span>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    {...register("email", {required: false, maxLength: 85})}
                                />
                                <span className={"error"}>
                                    {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
                                </span>
                            </div>
                        </div>
                    </form>
                <NextButton label={"next"} type={"submit"} form={"addressForm"} disabled={false}/>
            </div>
        </div>
    );
}

let validator = (values: any) => {
    const errors: any = {};

    if (!values.name) {
        errors.name = 'Name Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
}
