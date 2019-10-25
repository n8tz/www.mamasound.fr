/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

export default {
	indexes      : {
		"index": true
	},
	hidden       : {
		formRenderer: "Text",
		defaultProps: {
			type: "text"
		},
		label       : "Titre",
		test        : /^[\w_\-\d]+$/
	},
	url          : ( label ) => ({
		formRenderer: "Text",
		defaultProps: {
			type: "text"
		},
		label       : label || "Url",
		test        : /^[\w_\-\d]+$/ // @todo url regexp
	}),
	labels       : ( label ) => ({
		formRenderer: "Text",
		defaultProps: {
			type: "text"
		},
		label       : label || "Titre",
		test        : /^[\w_\-\d]+$/
	}),
	dateTime     : {
		//formRenderer    : require('App/ui/fields/dateTimeField'),
		defaultProps: {
			//type : "chrome"
		},
		label       : "Date/Heure",
		test        : /^[\w_\-\d]+$/
	},
	date         : ( label, props ) => ({
		formRenderer: "Date",
		defaultProps: {
			displayTime: true,
			useInput   : true,
			...(props || {})
		},
		label       : label || "Date/Heure",
		test        : /^[\w_\-\d]+$/
	}),
	datesList    : ( label, props ) => ({
		formRenderer: "PeriodList",
		defaultProps: {
			...(props || {})
		},
		label       : label || "Dates/Heures",
		test        : /^[\w_\-\d]+$/
	}),
	color        : ( label, props ) => ({
		formRenderer: "Color",
		defaultProps: {
			type: "chrome",
			...(props || {})
		},
		label       : label || "Couleur",
		test        : /^[\w_\-\d]+$/
	}),
	enum         : ( label, options, props ) => ({
		//formRenderer    : require('App/ui/fields/Select'),
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
	ettyEnum     : ( label, multiple ) => ({
		//formRenderer    : require('App/ui/fields/Select'),
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
	media        : ( cfg, label ) => ({
		formRenderer: "Media",
		defaultProps: { ...cfg },
		label       : label || "Media Url",
		test        : /^[\w_\-\d]+$/
	}),
	collectionStr: ( etty, filters, label ) => ({
		//formRenderer    : require('App/ui/fields/RecordRefList'),
		defaultProps: {
			etty        : etty,
			stringValue : true,
			filters     : filters,
			defaultValue: []
		},
		label       : label || ("Liste de " + etty),
		test        : /^[\w_\-\d]+$/
	}),
	collection   : ( etty, filters, label ) => ({
		//@lazyInitialize
		formRenderer: 'RecordRefList',
		defaultProps: Object.assign({}, {
			//etty        : etty,
			allowTypeSelection: (typeof etty === 'string') ? [etty] : etty,
			// defaultProps : true,
			defaultValue      : []
		}, filters),
		label       : label || ("Liste de " + etty),
		test        : /^[\w_\-\d]+$/
	}),
	picker       : function ( etty, defaultProps = {}, label ) {
		return {
			formRenderer: "RecordRef",
			defaultProps: {
				defaultValue      : false,
				disallowId        : true,
				allowTypeSelection: (typeof etty === 'string') ? [etty] : etty,
				...defaultProps,
				
			},
			label       : label || ("Sélectionner : " + etty),
			test        : /^[\w_\-\d]+$/
		};
	},
	address      : ( label ) => ({
		formRenderer: 'GeoPoint',
		defaultProps: {},
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	value        : ( label, cfg ) => ({
		//formRenderer    : require('App/ui/fields/valueSliderField'),
		defaultProps: Object.assign({
			                            //allowedType : etty
		                            }, cfg || {}),
		label       : label,
		test        : /^[\w_\-\d]+$/
	}),
	json         : ( label, props = {} ) => ({
		formRenderer: "Json",
		defaultProps: props,
		"type"      : "string",
		label       : label
	}),
	descriptions : ( label ) => ({
		formRenderer: "Html",
		defaultProps: {},
		"type"      : "string",
		label       : label || "Description",
		test        : /^[\w_\-\d]+$/
	}),
	boolean      : ( label, checked ) => ({
		formRenderer: "Switch",
		label       : label,
		defaultProps: {
			checked: checked ? "checked" : null, // TODO check if this property works
		},
	}),
	//...require("App/db/fields/types/**/(*).js")
}
