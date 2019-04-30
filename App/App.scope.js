/*
 *
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

import $super     from "$super";
import moment     from "moment";
import shortid    from "shortid";
import superagent from "superagent";

import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';
import scopes                         from 'App/scopes/(*).js';


export default {
	...$super,
	Anims          : stores.Anims,
	UserGeoLocation: stores.UserGeoLocation,
	
	@asStore
	appState: {
		
		currentPageFocus: "head",// head, events, page
		
		selectedEvent     : undefined,
		selectedEventId   : undefined,
		selectedEventDT   : undefined,
		curDay            : undefined,
		viewType          : 0,
		dayCountByViewType: [3, 1, 1, 1, 0],
		curTags           : undefined,
		
		$apply( data, state ) {
			!state.curDay && this.setState({ curDay: moment().startOf('day').valueOf() })
			return state;
		},
		
		// global app actions
		
		setCurStyleTab( viewType ) {
			return { viewType };
		},
		oneMoreDay( viewType = 0 ) {
			let { dayCountByViewType } = this.nextState;
			dayCountByViewType[viewType]++;
			return { dayCountByViewType: [...dayCountByViewType] };
		},
		setPageFocus( _currentPageFocus ) {
			let { currentPageFocus, selectedEventId } = this.nextState;
			if ( _currentPageFocus !== currentPageFocus ) {
				if ( selectedEventId && _currentPageFocus === 'events' )
					this.$actions.selectEvent();
				return { currentPageFocus: _currentPageFocus };
			}
		},
		updateCurrentDay( _currentVisibleDay ) {
			let { currentVisibleDay, selectedEventId } = this.nextState;
			if ( _currentVisibleDay !== currentVisibleDay ) {
				//selectedEventId && this.$actions.selectEvent();
				return { currentVisibleDay: moment(_currentVisibleDay).startOf("day").valueOf() };
			}
		},
		selectEvent( selectedEvent, selectedEventDT, showPageBlock ) {
			let { currentPageFocus } = this.nextState;
			currentPageFocus         = showPageBlock ? "page" : currentPageFocus;
			if ( !selectedEvent && currentPageFocus === 'page' )
				currentPageFocus = 'events';
			return {
				selectedEventId: selectedEvent && selectedEvent._id,
				selectedEventDT,
				currentPageFocus,
				selectedEvent  : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null
			};
		},
		selectWidget( selectedWidgetId ) {
			return { selectedWidgetId };
		},
		clearWebSiteCache() {
			window.open("http://api.mamasound.fr/cleanCache")
		},
		saveState() {
			localStorage.mama = JSON.stringify(this.scopeObj.serialize());
		},
		clearState() {
			localStorage.mama = null;
			window.location += "";
		}
	},
	
	@withStateMap(
		{
			@asRef
			Event: "appState.selectedEvent"
		}
	)
	Selected: stores.MongoRecords,
	
	@asStore
	TagManager: {
		// initial state
		selected    : [],
		selectedTags: {},
		available   : {},
		
		// actions
		$apply( data, state ) {
			return {
				...state,
				selected: Object.keys(state.selectedTags)
			}
		},
		selectTag( tag ) {
			return {
				selectedTags: {
					...this.nextState.selected,
					[tag]: true
				}
			}
		},
		unSelectTag( tag ) {
			let selectedTags = {
				...this.nextState.selectedTags
			};
			delete selectedTags[tag]
			return {
				selectedTags
			}
		},
		registerTags( tags ) {
			return {
				available: tags.reduce(
					( h, tag ) => {
						h[tag.label] = h[tag.label] || tag;
						return h;
					},
					{
						...this.nextState.available
					}
				)
			}
		},
	},
	@asStore
	widgets   : {
		// initial state
		items: [],
		
		// actions
		newWidget( type, props = {} ) {
			return {
				items: [...this.nextState.items, {
					_id     : shortid.generate(),
					size    : { width: 600, height: 400 },
					type,
					props,
					position: {
						x: 50 + ~~(Math.random() * 200),
						y: 50 + ~~(Math.random() * 200)
					},
				}]
			}
		},
		updateWidget( widget ) {
			return {
				items: this.nextState.items
				           .map(
					           it => (it._id === widget._id)
					                 ? widget
					                 : it
				           )
			}
		},
		rmWidget( id ) {
			return {
				items: this.nextState.items
				           .filter(
					           it => (it._id !== id)
				           )
			}
		}
	}
}