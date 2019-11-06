/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import anims   from "App/ui/assets/anims/(**/*).js";
import {Store} from "react-scopes";

const isBrowserSide = (new Function("try {return this===window;}catch(e){ return false;}"))();

const initialPts = (!isBrowserSide || window.innerWidth >= 900) && "desktop" || "phone";

export default class Styles extends Store {
	//static singleton = true;
	static actions = {
		loadTheme( currentTheme ) {
			return { currentTheme };
		}
	};
	state          = {
		currentTheme: "desktop",
	};
	//data             = {
	//	//...breakPts[initialPts]
	//};
	//
	//shouldSerialize() {
	//return false;
	//}
	
	constructor() {
		super(...arguments);
		
		isBrowserSide && window.addEventListener(
			"resize",
			this._onResize = ( e ) => {//@todo
				let currentTheme;
				if ( window.innerWidth >= 900 ) {
					//if ( window.innerWidth >= 1500 )
					//	currentTheme = "desktopBig";
					//else
						if ( window.innerWidth >= 1100 )
						currentTheme = "desktop";
					else
						currentTheme = "desktopSmall";
					
				}
				if ( window.innerWidth <= 900 )
					currentTheme = "phone";
				this.setState({ currentTheme })
			});
		isBrowserSide && setTimeout(tm => (this._onResize && this._onResize()), 50)
	}
	
	__onHotReloaded() {
		this.pushState(this.nextState);
	}
	
	apply( data, { currentTheme } ) {
		console.log(currentTheme)
		if ( currentTheme )
			return { ...anims[currentTheme] || anims.desktop, currentTheme }
		
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