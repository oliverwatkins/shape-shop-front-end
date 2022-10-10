import { put, call } from 'redux-saga/effects';
import {loginUserService} from "./authenticationService";
import {LoginActions} from "../loginActions";


// export function* registerSaga(payload: any) {
//     try {
//         // @ts-ignore
//         const response = yield call(registerUserService, payload);
//         yield [
//             put({ type: types.REGISTER_USER_SUCCESS, response })
//         ];
//     } catch(error) {
//         yield put({ type: types.REGISTER_USER_ERROR, error });
//     }
// }

export function* loginSaga(payload: any) {
    try {

        // @ts-ignore
        const response = yield call(loginUserService, payload);
        yield [
            put({ type: LoginActions.LOGIN_SUCCESS, response })
        ];
    } catch(error) {
        yield put({ type: LoginActions.LOGIN_FAIL, error })
    }
}
