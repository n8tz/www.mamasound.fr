/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import {expandShorthandProperty, isShorthandProperty, isValidDeclaration} from "./cssUtils";
import cssDemuxers                                                        from "./demux/(*).js";

import {int, multi, number, opacity} from "./demux/typed/(*).js";


const cssDemux = {
	...cssDemuxers,
	height         : number,
	width          : number,
	top            : number,
	left           : number,
	right          : number,
	bottom         : number,
	marginTop      : number,
	marginLeft     : number,
	marginRight    : number,
	marginBottom   : number,
	paddingTop     : number,
	paddingLeft    : number,
	paddingRight   : number,
	paddingBottom  : number,
	transformOrigin: multi(2),
	zIndex         : int,
	opacity        : opacity,
};

export function muxToCss( tweenable, css, demuxers, data, box ) {
	Object.keys(demuxers)
	      .forEach(
		      ( key ) => {
			      //if ( key === 'zIndex' ) debugger
			      demuxers[key](key, tweenable, css, data, box)
		      }
	      )
}

export function deMuxTween( tween, deMuxedTween, initials, data, demuxers, forceUnits, reOrder ) {
	let fTween = {}, excluded = {};
	Object.keys(tween)
	      .forEach(
		      ( key ) => {
			      if ( cssDemux[key] )
				      fTween[key] = tween[key];
			      else if ( isValidDeclaration(key, tween[key]) ) {
				      if ( isShorthandProperty(key) ) {
					      expandShorthandProperty(key, tween[key], fTween);
				      }
				      else fTween[key] = tween[key];
			      }
			      else excluded[key] = tween[key];
		      });
	
	Object.keys(fTween)
	      .forEach(
		      ( key ) => {
			      if ( cssDemux[key] ) {//key, value, target, data, initials
				      demuxers[key] = cssDemux[key](key, fTween[key], deMuxedTween, data, initials, forceUnits, reOrder)
			      }
			      else
				      demuxers[key] = number(key, fTween[key], deMuxedTween, data, initials, forceUnits, reOrder)
		      }
	      )
	return excluded;
}

export function deMuxLine( tweenLine, initials, data, demuxers ) {
	return tweenLine.reduce(
		( line, tween ) => {
			let demuxedTween       = {};
			demuxers[tween.target] = demuxers[tween.target] || {};
			initials[tween.target] = initials[tween.target] || {};
			data[tween.target]     = data[tween.target] || {};
			
			if ( !tween.type || tween.type === "Tween" ) {
				deMuxTween(tween.apply, demuxedTween, initials[tween.target], data[tween.target], demuxers[tween.target]);
				line.push(
					{
						...tween,
						apply: demuxedTween
					});
			}
			else line.push({ ...tween });
			return line
		},
		[]
	)
}