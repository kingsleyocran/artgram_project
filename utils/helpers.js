export function htmlTagRemover (str) {
    return (str).replace(/(<([^>]+)>)/gi, "")
}

export function convertTimestamp(timestamp) {
	let date = timestamp.toDate();
	let mm = date.toLocaleString('default', { month: 'short' }) ;
	let dd = date.getDate();
    let EE = date.getDate();
	let yyyy = date.getFullYear();

	date = mm + ' ' + dd + ', ' + yyyy;
	return date;
}