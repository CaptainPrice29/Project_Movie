
import { isNil, isEmpty } from 'lodash';

export const isNilOrEmpty = (value) => {
	return isNil(value) || value === '' || (typeof value !== 'string' && typeof value !== 'number' && isEmpty(value))
}

export const formatToNumbers = (value) => {
	if (!value) {
		return ''
	}
	return value.replaceAll(/[^0-9]/g, '');
}
