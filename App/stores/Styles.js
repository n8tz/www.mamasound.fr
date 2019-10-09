/*
 * www.mamasound.fr
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import anims   from "App/ui/assets/anims/(**/*).js";
import {Store} from "react-scopes";

const isBrowserSide = (new Function("try {return this===window;}catch(e){ return false;}"))();

const initialPts = (!isBrowserSide || window.innerWidth >= 900) && "desktop" || "phone";

export default class Styles extends Store {
	//static singleton = true;
	static actions = {};
	state          = {
		currentBrkPts: initialPts,
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
				let currentBrkPts;
				if ( window.innerWidth >= 900 ) {
					if ( window.innerHeight >= 850 )
						currentBrkPts = "desktop";
					else
						currentBrkPts = "desktopSmall";
					
				}
				if ( window.innerWidth <= 900 )
					currentBrkPts = "phone";
				this.setState({ currentBrkPts })
			});
		isBrowserSide && setTimeout(tm => (this._onResize && this._onResize()), 500)
	}
	
	__onHotReloaded() {
		this.pushState(this.nextState);
	}
	
	apply( data, { currentBrkPts } ) {
		
		if ( currentBrkPts )
			return { ...(anims[currentBrkPts] || anims.desktop), currentBrkPts }
		
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