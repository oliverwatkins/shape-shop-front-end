// //@flow
// import {call, put, takeLatest} from 'redux-saga/effects';
// import {getMerchantDetailsSuccess, LoginActions as Actions} from "./loginActions";
//
// export default api => {
// 	function* merchantDetailsWatcher() {
// 		yield takeLatest(Actions.GET_MERCHANT_DETAILS, fetchMerchantDetails);
// 	}
//
// 	function* fetchMerchantDetails({Authorization, role}) {
// 		try {
// 			const response = yield call(api.merchantDetails, {Authorization});
// 			if (response.status === 200) {
// 				alert("what is this??")
// 				yield put(getMerchantDetailsSuccess({...response.data, role}));
// 			} else {
// 				alert("soomik wrong")
// 			}
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	}
//
// 	return {
// 		merchantDetailsWatcher: merchantDetailsWatcher,
// 	};
// };
