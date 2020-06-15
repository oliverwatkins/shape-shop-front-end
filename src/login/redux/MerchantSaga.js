//@flow
import {call, put, takeLatest} from 'redux-saga/effects';
import {getMerchantDetailsSuccess, LoginActions as Actions} from "./loginActions";
import historyObj2 from "../../historyObj2";





// after API call & validate user
// yield put(push('/app'));


export default api => {
	function* merchantDetailsWatcher() {
		yield takeLatest(Actions.GET_MERCHANT_DETAILS, fetchMerchantDetails);
	}

	function* fetchMerchantDetails({Authorization, role, history}) {
		try {
			const response = yield call(api.merchantDetails, {Authorization});
			if (response.status === 200) {


				yield put(getMerchantDetailsSuccess({...response.data, role}));


				// alert("redirect happening now")


				// yield put(push('/admin/'));


				// history.push('/admin/');

				// yield call(forwardTo, '/admin/');
				// window.location.reload();


			} else {
				alert("soomik wrong")
			}
		} catch (e) {
			console.error(e);
		}
	}

	return {
		merchantDetailsWatcher: merchantDetailsWatcher,
	};
};


function forwardTo(location) {
	historyObj2.push(location);
}
