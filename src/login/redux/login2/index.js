import { fork } from 'redux-saga/effects';
import loginWatcher2 from "./watcher";

export default function* startForman() {
    yield fork(loginWatcher2);
}