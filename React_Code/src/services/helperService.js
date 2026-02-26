const helperService = {

 	wait: (ms) => { 
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	generateTemplateName:(prefix = 'Ticker', date = new Date(), timeZone = 'Asia/Kolkata') =>{
 
 	  // Use Intl to get parts in the requested timezone and locale
		const parts = new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone,
		}).formatToParts(date);

		const lookup = {};
		for (const p of parts) {
			if (p.type !== 'literal') lookup[p.type] = p.value;
		}

		// parts provide: day, month, year, hour, minute, second
		const day = lookup.day || '01';
		const month = lookup.month || 'Jan';
		const year = lookup.year || '1970';
		const hour = lookup.hour || '00';
		const minute = lookup.minute || '00';
		const second = lookup.second || '00';

 		 return `${prefix}-${day}-${month}-${year}-${hour}:${minute}:${second}`; 
	},

    createCommandList: (engineData) => {
		var message = [];
		message.push("Loading config...");
		message.push("Connecting to channel...");
		message.push("Processing requests...");   
		
		let layer 		= engineData.scrolldata.layer;
		let machine 	= engineData.scrolldata.machine;
		let view 		= engineData.scrolldata.view;
		let cmd 		= engineData.scrolldata.cmd; 

	 
		let addcmd11 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET CLEAR INVOKE;`; 				 
		let addcmd22 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET CLEAR_DATA INVOKE;`; 

		let addcmd1 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET ACTIVE 1;`; 				 
		let addcmd2 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET CRAWL 1;`; 
		let addcmd3 = `${layer}*${machine}*STAGE*DIRECTOR*IN START;`;  
		let addcmd4 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET BUILD_QUEUE INVOKE;`;   
	  
		message.push(addcmd11);
		message.push(addcmd22); 
		message.push(addcmd3);     

		const tagelist = engineData.scrolldata.tagdata.map((tag)=> tag.tag);

		tagelist.forEach((tag)=>{
			
			var temstr = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET DATA `; 

			 

			const txtarray = engineData.scrollTxt.filter((itm)=> itm.tagtype === tag); 

			 

			let textlen = txtarray.length;
			
			if(textlen>0){

			if(tag==='ELEMENT'){
				txtarray.forEach((val,i)=> {  
					temstr += `ELEMENT|Txt=${val.scrolltext}`;  
					if((textlen-1)===i){
						temstr +=';';	
					}else{
						temstr += "\n";
					}
				});   
				 
				message.push(temstr);
				 
				
			}else if(tag==='ELEMENT_IMG'){
			
				txtarray.forEach((val,i)=> {  
					temstr += `ELEMENT_IMG|Img=${val.scrolltext}`;  
					if((textlen-1)===i){
						temstr +=';';	
					}else{
						temstr += "\n";
					}
				}); 
				 
				 message.push(temstr);
				 
				
			}else if(tag==='CAT'){
				txtarray.forEach((val,i)=> {  
					temstr += `CAT|Txt=${val.scrolltext}`; 
					if((textlen-1)===i){
						temstr +=';';	
					}else{
						temstr += "\n";
					} 
				});	
				 
					message.push(temstr); 
			}  
			
		}


		});		

		message.push(addcmd1);
		message.push(addcmd2);
		message.push(addcmd4);

		/*
			engineData.scrollTxt.forEach((item)=>{ 
				let tag = item.tagtype; 
				var temstr = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET DATA `; 

					if(tag==='ELEMENT'){
						//txtarray.forEach((val,i)=> {  
							temstr += `ELEMENT|Txt=${val.text}`;  
							if((textlen-1)===i){
								temstr +=';';	
							}else{
								temstr += "\n";
							}
						//});  
						message.push(temstr); 
						
					}else if(tag==='ELEMENT_IMG'){
					
						txtarray.forEach((val,i)=> {  
							temstr += `ELEMENT_IMG|Img=${val.text}`;  
							if((textlen-1)===i){
								temstr +=';';	
							}else{
								temstr += "\n";
							}
						});

						message.push(temstr); 
						
						
					}else if(tag==='CAT'){
						txtarray.forEach((val,i)=> {  
							temstr += `CAT|Txt=${val.text}`; 
							if((textlen-1)===i){
								temstr +=';';	
							}else{
								temstr += "\n";
							} 
						});	
						message.push(temstr); 			 
					}  	
			}); 
			*/
			
        /*
		tagdata.map((item)=>{

			let txtarray = item.content.filter((flag)=>flag.selected===true); 
			let tag = item.tag;
			let tagtype = item.tagtype; 



			let addcmd1 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET ACTIVE 1;`; 				 
			let addcmd2 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET CRAWL 1;`; 
			let addcmd3 = `${layer}*${machine}*STAGE*DIRECTOR*IN START;`;  
			let addcmd4 = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET BUILD_QUEUE INVOKE;`;  
			
			  
			let textlen = txtarray.length;
			if(textlen>0){ 

				message.push(addcmd1);
				message.push(addcmd2);
				message.push(addcmd3); 

				var temstr = `${layer}*${machine}*${view}*${cmd}*GEOMETRY*SCROLLER SET DATA `;

				if(tag==='ELEMENT'){
					txtarray.map((val,i)=> {  
						temstr += `ELEMENT|Txt=${val.text}`;  
						if((textlen-1)===i){
							temstr +=';';	
						}else{
							temstr += "\n";
						}
					});  
					 
				}else if(tag==='ELEMENT_IMG'){
					txtarray.map((val,i)=> {  
						temstr += `ELEMENT_IMG|Txt=${val.text}`;  
						if((textlen-1)===i){
							temstr +=';';	
						}else{
							temstr += "\n";
						}
					});
					 
				}else if(tag==='CAT'){
					txtarray.map((val,i)=> {  
						temstr += `CAT|Txt=${val.text}`; 
						if((textlen-1)===i){
							temstr +=';';	
						}else{
							temstr += "\n";
						}
					});				 
				} 
				message.push(temstr); 
			}  
			message.push(addcmd4);			  
		}); 
    */

	 
	 
        message.push("All request processed ✅");
        message.push("");  
        return message; 
    }
}

export {helperService}; 