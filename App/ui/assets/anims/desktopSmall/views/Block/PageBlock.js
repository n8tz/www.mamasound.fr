/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
export const selected       = {
	position : "absolute",
	//backgroundColor: "red",
	top      : "45%",
	left     : "50%",
	//width          : "90vw",
	height   : "50vh",
	opacity  : 1,
	transform: [{
		translateX : "-50%",
		translateY : "-50%",
		perspective: "600px",
		//rotateX    : "2deg"
	}, {}, {}]
};
export const selectedScroll = {
	scrollY: [
		{
			from    : 0,
			duration: 100,
			apply   : {
				opacity  : -1,
				//height   : 2.5,
				//top      : -2.5,
				transform: [
					{
						//perspective:'500px'
					},
					{
						rotateX: "-6deg"
					}, {
						translateY: "150px",
						translateZ: "50px",
					}]
			}
		},
	],
}