export const ImageActions = {
	UPLOAD_IMAGE: 'UPLOAD_IMAGE',
	UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
	UPLOAD_IMAGE_FAIL: 'UPLOAD_IMAGE_FAIL',
};

//TODO

export function createUploadImageSuccessAction() {
	return {
		type: ImageActions.UPLOAD_IMAGE_SUCCESS,
	};
}

export function createUploadImageFailAction(errorMessage: string) {
	return {
		type: ImageActions.UPLOAD_IMAGE_SUCCESS,
		errorMessage: errorMessage
	};
}

