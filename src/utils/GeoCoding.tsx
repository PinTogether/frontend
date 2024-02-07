
const GetGeoCodingAuth = ({
	consumer_key,
	consumer_secret,
  }: {
	consumer_key:string;
	consumer_secret:string;
  }) => {
	console.log("실행");
	const url = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${process.env.NEXT_PUBLIC_SGIS_ID}&consumer_secret=${process.env.NEXT_PUBLIC_SGIS_KEY}`;
	return fetch(url)
	  .then(response => {
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json();
	  })
	  .then(data => {
		return data;
	  })
	  .catch(error => {
		console.error('Error:', error);
		throw error;
	  });
  };

const GeoCoding = ({
	accessToken,
	address,
	pagenum,
	resultcount,
  }: {
	accessToken:string;
	address:string;
	pagenum?:0;
	resultcount?:5;
  }) => {
	const url = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocodewgs84.json?accessToken=${accessToken}&address=${address}&pagenum=${pagenum}&resultcount=${resultcount}`;
	return fetch(url)
	  .then(response => {
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json();
	  })
	  .then(data => {
		return data;
	  })
	  .catch(error => {
		console.error('Error:', error);
		throw error;
	  });
  };

  const ReverseGeoCoding = ({
	accessToken,
	x_coor,
	y_coor,
	addr_type,
  }: {
	accessToken:string;
	x_coor:number;
	y_coor:number;
	addr_type?:number;
  }) => {
	const url = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocodewgs84.json?accessToken=${accessToken}&x_coor=${x_coor}&y_coor=${y_coor}&addr_type=${addr_type}`;
	return fetch(url)
	  .then(response => {
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json();
	  })
	  .then(data => {
		return data;
	  })
	  .catch(error => {
		console.error('Error:', error);
		throw error;
	  });
  };

export {GetGeoCodingAuth, GeoCoding, ReverseGeoCoding}
