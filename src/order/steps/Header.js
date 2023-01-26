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

export default function Header(props) {
    return (
        <h3 className="wizardHeader  wiz-item">
            {props.text}
        </h3>
    );
}

