import { put, call, takeLatest } from 'redux-saga/effects';

import {
	Actions,
	createUploadImageFailAction, createUploadImageSuccessAction
} from '../adminActions';
import {api} from "../../../api/api";
import {toast} from "react-toastify";
import React from "react";

export function* uploadImageWatcher() {
	yield takeLatest(Actions.UPLOAD_IMAGE, uploadImage);
}

function* uploadImage(action: any) {
	try {
		console.info("action.Authorization.token " + action.Authorization.token);
		console.info("File " + JSON.stringify(action.formData));

		console.info("File " + action.formData.name);


		alert()
		if (!action.Authorization.token)
			yield put(createUploadImageFailAction("No authorisation token supplied "));

		// @ts-ignore
		const response = yield call(api.uploadImage, action.Authorization, action.formData.name);

		if (response.status === 200) {
			yield put(createUploadImageSuccessAction());
			console.info("success : " + response.data)
		} else {
			console.error(JSON.stringify(response))
			yield put(createUploadImageFailAction("Unknown Error Y "+ JSON.stringify(response)));
		}
	} catch (e) {
		console.error('Error fetching orders!!');
		console.error(e);
		// @ts-ignore
		yield put(createUploadImageFailAction( "Unknown Error X " + e.message));
	}
}
