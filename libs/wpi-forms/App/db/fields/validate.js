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


export default {//http://www.regxlib.com/
	mandatory: function ( name, value, record ) {
		if ( !value ) return "Le champ '" + name + "' est obligatoire et ne peut être vide";
	},
	noHtml   : function ( name, value, record ) {
		if ( /[\w*|\W*]*<[[\w*|\W*]*|[\w*|\W*]]>[\w*|\W*]*/.test(value) )
			return "Le champ '" + name + "' est invalide : il semble comporter du html";
	},
	noJs     : function ( name, value, record ) {
		//debugger;
		if ( value &&
			(
				/(\s(\bon[a-zA-Z][a-z]+)\s?\=\s?[\'\"]?(javascript\:)?[\w\(\),\' ]*;?[\'\"]?|(\b[a-zA-Z][a-z]+)\s?\=\s?[\'\"]?javascript\:[\w\(\),\' ]*;?[\'\"]?)+/.test(
					value)
				|| /<script[^>]*>[\w|\t|\r|\W]*<\/script\s*>/.test(value)
			)
		) {
			//debugger;
			return "Le champ '" + name + "' est invalide : il semble comporter du javascript oO";
		}
	},
	isMachine: function ( name, value, record ) {
		if ( !/^[\w\d_]+$/.test(value) )
			return "Le champ '" + name + "' est invalide : il semble comporter des caractères invalides :/";
	},
	isEmail  : function ( name, value, record ) {
		if ( !/^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/.test(
			value) )
			return "Le champ '" + name + "' n'a pas l'air d'une adresse email";
	},
	isUrl    : function ( name, value, record ) {
		if ( value &&
			!/^(ht|f)tp(s?)\:\/\/(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?([\d\w\.\/\%\+\-\=\&amp;\?\:\\\&quot;\'\,\|\~\;]*)$/.test(
				value) )
			return "Le champ '" + name + "' n'a pas l'air d'une adresse internet";
	},
	//...require("$map(db/validators, **.js)")
}
