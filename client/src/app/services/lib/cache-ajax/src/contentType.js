export const ContentType=params=>{
	let type;
	try{
		if(params instanceof Object){
			if(params instanceof FormData){

			}
			else if(params instanceof ArrayBuffer){
				type='application/octet-stream';
			}
			else{
				params=JSON.stringify(params);
				type='application/json';
			}
		}
	}catch(err){}
	return {params,type:type};
}