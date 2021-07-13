import { put, call, takeLatest } from 'redux-saga/effects';

import {
	Actions,
	createUploadImageFailAction, createUploadImageSuccessAction
} from './adminActions';
import {api} from "../../api/api";
import {toast} from "react-toastify";

export function* uploadImageWatcher() {
	yield takeLatest(Actions.UPLOAD_IMAGE, uploadImage);
}

function* uploadImage(action) {
	try {
		console.info("action.Authorization.token " + action.Authorization.token);

		if (!action.Authorization.token)
			yield put(createUploadImageFailAction("No authorisation token supplied "));

		const response = yield call(api.uploadImage, action.Authorization);

		if (response.status === 200) {
			yield put(createUploadImageSuccessAction(response.data));
			console.info("success : " + response.data)
		} else {
			console.error(JSON.stringify(response))
			yield put(createUploadImageFailAction("Unknown Error Y "+ JSON.stringify(response)));
		}
	} catch (e) {
		console.error('Error fetching orders!!');
		console.error(e);
		yield put(createUploadImageFailAction( "Unknown Error X " + e.message));
	}
}
