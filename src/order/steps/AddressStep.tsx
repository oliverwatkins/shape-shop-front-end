import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruck} from "@fortawesome/free-solid-svg-icons";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {wizardPages as pages} from "../OrderWizardContainer"
import {NextButton} from "../buttons/NextButton";
import {BackButton} from "../buttons/BackButton";
import {Address, DeliveryType, Product} from "../../AppState";
import {updateAddressAction, updateDeliveryTypeAction} from "../../admin/redux/orderReducer";
import {useForm} from "react-hook-form";
import {selectOrder} from "../../selectors";

import "./addressStep.scss"
import Header from "./Header";

export default function AddresStep() {

    const order = useSelector(selectOrder);

    let schema = yup.object({
        name: yup.string().required(),
        telephone: yup.number().positive().integer().required(),
        email: yup.string().email(),
        postcode: yup.string().required(),
        street: yup.string().required(),
    }).required();

    let schema2 = yup.object({
            name: yup.string().required(),
            telephone: yup.number().positive().integer().required(),
            email: yup.string().email(),
        }).required();

    const { register, handleSubmit, formState } = useForm<Address>({
        resolver: yupResolver((order.deliveryType === DeliveryType.DELIVERY) ? schema: schema2),
        defaultValues: {
            name: order.address ? order.address.name : "",
            email: order.address ? order.address.email : "",
            street: order.address ? order.address.street : "",
            telephone: order.address ? order.address.telephone : "",
            postcode: order.address ? order.address.postcode : ""
        }
    });

    let errors = formState.errors

    const dispatch = useDispatch();
    const [redirect, setRedirect] = React.useState<boolean>(false);

    function onRadioChanged(e: any) {
        dispatch(updateDeliveryTypeAction(e.currentTarget.value));
    }

    if (redirect) {
        return <Redirect to={pages.WHICH_PAYMENT}/>
    }

    const onSubmit = (data: Address) => {
        dispatch(updateAddressAction({address: data}));
        setRedirect(true)
    }
    return (
        <div className="wizardPanel address-step">

            {/*{order && order.deliveryType}*/}
            <Header text={"asdf"}/>
            {/*<h2 className={"wizardHeader"}>Delivery or Pickup?</h2>*/}
            <div className="wizardMain">
                <BackButton page={"/order/cat_drinks"}/>
                <form onSubmit={handleSubmit(onSubmit)} id="addressForm" aria-label="form">
                    <div className="wizardCenter">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faTruck} style={{fontSize: "60px", color: "navy", margin: "25px"}}/>
                        </div>
                        <div className={"radioBox"}>
                            <input type="radio"
                                   id="contactChoice1"
                                   name="pickupOrDelivery"
                                   value={DeliveryType.PICKUP}
                                   onChange={onRadioChanged}
                                   checked={order.deliveryType === DeliveryType.PICKUP}/>
                            <label htmlFor="contactChoice1">Pickup</label>
                            <input type="radio"
                                   id="contactChoice2"
                                   name="pickupOrDelivery"
                                   value={DeliveryType.DELIVERY}
                                   checked={order.deliveryType === DeliveryType.DELIVERY}
                                   onChange={onRadioChanged}/>
                            <label htmlFor="contactChoice2">Delivery</label>
                        </div>

                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text"
                                {...register("name", {required: true, maxLength: 45, })}
                            />
                            <span className={"error"}>
                                {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
                            </span>
                        </div>
                        {order.deliveryType && (order.deliveryType === DeliveryType.DELIVERY) &&
                            <div>
                                <div>
                                    <label htmlFor="street">Strasse</label>
                                    <input id="street" type="text"
                                        {...register("street", {required: true, maxLength: 85})}
                                    />
                                    <span className={"error"}></span>
                                </div>
                                <div>
                                    <label htmlFor="postcode">Postleitzahl</label>
                                    <input
                                        id="postcode"
                                        type="text"
                                        {...register("postcode", {required: true, maxLength: 85})}
                                    />
                                    <span className={"error"}></span>
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
                                value={order.address?.email}
                                {...register("email", {required: false, maxLength: 85})}
                            />
                            <span className={"error"}>
                                {errors.email?.type === 'pattern' && <p role="alert">Email pattern is wrong</p>}
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
