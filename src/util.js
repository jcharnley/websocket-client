export const unixTimestamp = () => {
	const getStamp = Math.floor(new Date().getTime() / 1000);
	var t = new Date(1970, 0, 1);
	t.setSeconds(getStamp);
	const format = t.toString().split(' ');
	return {
		date: format.slice(1, 3).join(' '),
		time: format[4],
	};
};
