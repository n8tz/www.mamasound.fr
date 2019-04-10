/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "rscopes";

import desktopAnims from "App/ui/anims/responsive/desktop/(*).js";
import mobileAnims  from "App/ui/anims/responsive/mobile/(*).js";

const isBrowserSide = (new Function("try {return this===window;}catch(e){ return false;}"))();

const breakPts = {
	desktop: desktopAnims,
	mobile : mobileAnims
};

export default class Anims extends Store {
	static singleton = true;
	static actions   = {};
	state            = {
		currentBrkPts: "desktop",
	};
	data             = {
		...desktopAnims
	};
	
	constructor() {
		super(...arguments);
		
		isBrowserSide && window.addEventListener(
			"resize",
			this._onResize = ( e ) => {//@todo
				let currentBrkPts;
				if ( window.innerWidth >= 1200 )
					currentBrkPts = "desktop";
				if ( window.innerWidth <= 1200 )
					currentBrkPts = "tablet";
				this.setState({ currentBrkPts })
			});
	}
	
	apply( data, state, { currentBrkPts } ) {
		
		if ( currentBrkPts )
			return { ...breakPts[currentBrkPts] }
		
		return data;
	}
	
	destroy() {
		super.destroy(...arguments);
		
		if ( isBrowserSide ) {
			window.removeEventListener(
				"resize",
				this._onResize);
			delete this._onResize;
		}
	}
	
}