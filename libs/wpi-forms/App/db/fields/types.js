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

import inputField from '@material-ui/core/TextField';

export default {
	indexes        : {
		"index": true
	},
	hidden         : {
		renderer    : "Text",
		defaultProps: {
			type: "text"
		},
		label       : "Titre",
		test        : /^[\w_\-\d]+$/
	},
	url            : ( label ) => ({
		renderer    : "Text",
		defaultProps: {
			type: "text"
		},
		label       : label || "Url",
		test        : /^[\w_\-\d]+$/ // @todo url regexp
	}),
	labels         : ( label ) => ({
		renderer    : "Text",
		defaultProps: {
			type: "text"
		},
		label       : label || "Titre",
		test        : /^[\w_\-\d]+$/
	}),
	dateTime       : {
		//renderer    : require('App/ui/fields/dateTimeField'),
		defaultProps: {
			//type : "chrome"
		},
		label       : "Date/Heure",
		test        : /^[\w_\-\d]+$/
	},
	date           : ( label, props ) => ({
		//renderer    : require('App/ui/fields/dateTimeField'),
		defaultProps: {
			...(props || {})
		},
		label       : label || "Date/Heure",
		test        : /^[\w_\-\d]+$/
	}),
	datesList      : ( label, props ) => ({
		//renderer    : require('App/ui/fields/dateTimeListField'),
		defaultProps: {
			...(props || {})
		},
		label       : label || "Date/Heure",
		test        : /^[\w_\-\d]+$/
	}),
	color          : ( label, props ) => ({
		//renderer    : require('App/ui/fields/colorField'),
		defaultProps: {
			type: "chrome",
			...(props || {})
		},
		label       : label || "Couleur",
		test        : /^[\w_\-\d]+$/
	}),
	enum           : ( label, options, props ) => ({
		//renderer    : require('App/ui/fields/Select'),
		defaultProps: {
			options    : options.map(( v ) => (typeof v == "string"
			                                   ? { label: v, value: v }
			                                   : v)),
			firstOption: typeof options[0] == "string"
			             ? options[0]
			             : options[0].value
		},
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	ettyEnum       : ( label, multiple ) => ({
		//renderer    : require('App/ui/fields/Select'),
		defaultProps: {
			multiple   : multiple,
			get options() {
				var records = require('App/db/entities');
				return Object.keys(records).map(( v ) => ({
					label: records[v].label,
					value: v
				}));
				
			},
			firstOption: 0
		},
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	media          : ( cfg, label ) => ({
		//renderer    : require('App/ui/fields/Media'),
		defaultProps: { ...cfg },
		label       : label || "Media Url",
		test        : /^[\w_\-\d]+$/
	}),
	publicationFlag: {
		renderer    : inputField,
		defaultProps: {
			type       : "select",
			options    : [
				{ label: "En attente de validation", value: "invalid" },
				{ label: "Publié", value: "valid" }
			],
			firstOption: "invalid"
		},
		label       : "Diffusion :"
	},
	collectionStr  : ( etty, filters, label ) => ({
		//renderer    : require('App/ui/fields/RecordRefList'),
		defaultProps: {
			etty        : etty,
			stringValue : true,
			filters     : filters,
			defaultValue: []
		},
		label       : label || ("Liste de " + etty),
		test        : /^[\w_\-\d]+$/
	}),
	collection     : ( etty, filters, label ) => ({
		//@lazyInitialize
		//renderer    : require('App/ui/fields/RecordRefList'),
		defaultProps: Object.assign({}, {
			etty        : etty,
			// defaultProps : true,
			defaultValue: []
		}, filters),
		label       : label || ("Liste de " + etty),
		test        : /^[\w_\-\d]+$/
	}),
	picker         : function ( etty, defaultProps, label ) {
		var p = {
			allowTypeSelection: (typeof etty == 'string') ? [etty] : etty,
			defaultValue      : false,
			disallowId        : true
		};
		defaultProps && Object.keys(defaultProps).forEach(( v ) => {
			p[v] = defaultProps[v];
		});
		
		return {
			//renderer    : require('App/ui/fields/RecordRef'),
			defaultProps: p,
			label       : label || ("Sélectionner : " + etty),
			test        : /^[\w_\-\d]+$/
		};
	},
	address        : ( cfg, label ) => ({
		renderer    : 'Address',
		defaultProps: Object.assign({
			                            //allowedType : etty
		                            }, cfg || {}),
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	value          : ( label, cfg ) => ({
		//renderer    : require('App/ui/fields/valueSliderField'),
		defaultProps: Object.assign({
			                            //allowedType : etty
		                            }, cfg || {}),
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	json           : ( label, props ) => ({
		
		//renderer    : require('App/ui/fields/jsonEditorField'),
		defaultProps: props,
		"type"      : "string",
		label       : label
	}),
	descriptions   : ( label ) => ({
		renderer    : "Html",
		defaultProps: {},
		"type"      : "string",
		label       : label || "Description",
		test        : /^[\w_\-\d]+$/
	}),
	excerpt        : {
		renderer    : inputField,
		label       : "Résumé",
		"type"      : "string",
		defaultProps: {
			multiline: true
		},
		test        : /^[\w_\-\d]+$/
	},
	boolean        : ( label, checked ) => ({
		renderer    : "Switch",
		label       : label,
		defaultProps: {
			checked: checked ? "checked" : null, // TODO check if this property works
		},
	}),
	//...require("App/db/fields/types/**/(*).js")
}
