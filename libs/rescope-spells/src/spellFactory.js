/*
 * Copyright (c)  2018 Wise Wild Web .
 *
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
 */
import rescope from "rescope";
import is      from "is";
// will use as external the index in dist

const SimpleObjectProto = ({}).constructor;


export const spells = {};

let castTypesToAppliable = {};
let castTypes            = {};

rescope.isSpell = function caster( ...argz ) {
	// are we decorating a member / without argz
	if ( argz[0] instanceof SimpleObjectProto && argz[2] instanceof SimpleObjectProto && argz[0].hasOwnProperty(argz[1]) ) {
		argz[0][argz[1]] = argz[2].value = addCaster(argz[0][argz[1]], argz);
		return argz[0];
	}
	else if ( !is.fn(argz[0]) ) {
		return ( ...argz2 ) => {
			// are we decorating a member / with argz
			if ( argz2[0] instanceof SimpleObjectProto && argz2[2] instanceof SimpleObjectProto && argz2[0].hasOwnProperty(argz2[1]) ) {
				argz2[0][argz2[1]] = argz2[2].value = addCaster(argz2[0][argz2[1]], ...argz, argz2);
				return argz2[0];
			}
			else
				return caster(argz2[0], ...argz);
		}
	}
	return addCaster(...argz);
};

export const isSpell = rescope.isSpell;

function addCaster( ...argz ) {
	let cast = (!argz[0] || is.fn(argz[0])) && argz.shift();
	if ( !cast )
		throw "ReScope cast : bad decorator function"
	let typeName    = (!argz[0] || is.string(argz[0])) && argz.shift() || cast.name || cast.displayName,
	    test        = (!argz[0] || is.fn(argz[0])) && argz.shift(),
	    prefix      = (!argz[0] || is.string(argz[0])) && argz.shift() || "as",
	    memberDescr = (!argz[0] || is.bool(argz[0]) || is.array(argz[0])) && argz.shift() || true,
	    casterName  = typeName && (prefix + typeName[0].toUpperCase() + typeName.substr(1));
	
	
	if ( !castTypesToAppliable[typeName] ) {
		castTypesToAppliable[typeName] = [];
		
		spells[casterName] = castTypes[typeName] =
			function doCast( ...argz ) {
				// are we decorating a member / without argz
				if ( argz[0] instanceof SimpleObjectProto && argz[2] instanceof SimpleObjectProto && argz[0].hasOwnProperty(argz[1]) ) {
					argz[0][argz[1]] = applyCastableType(typeName, argz[0][argz[1]], [], argz);
					return argz[0];
				}
				else if ( !isCastableType(typeName, argz[0]) ) {
					return ( ...argz2 ) => {
						// are we decorating a member / with argz
						if ( argz2[0] instanceof SimpleObjectProto && argz2[2] instanceof SimpleObjectProto && argz2[0].hasOwnProperty(argz2[1]) ) {
							argz2[0][argz2[1]] = applyCastableType(typeName, argz2[0][argz2[1]], argz, argz2);
							return argz2[0];
						}
						else
							return doCast(argz2[0], ...argz);
					}
				}
				return applyCastableType(typeName, argz[0], argz.slice(1));
			};
	}
	castTypesToAppliable[typeName].unshift(
		{
			typeName, test, memberDescr, cast
		}
	)
	return spells[casterName];
}

function isCastableType( typeName, Comp, member, stateScope ) {
	let castable = castTypesToAppliable[typeName];
	for ( let i = 0; i < castable.length; i++ )
		if (
			(member === undefined || !!member == !!castable[i].memberDescr)
			&& castable[i].test(Comp)
		)
			return castable[i];
	
	return false;
	
}

function applyCastableType( typeName, Comp, argz, member, stateScope ) {
	
	let castable = castTypesToAppliable[typeName] || [];
	for ( let i = 0; i < castable.length; i++ )
		if (
			(member === undefined || !!member == !!castable[i].memberDescr)
			&& castable[i].test(Comp)
		)
			return castable[i].cast(Comp, argz, member)
				;
	
	console.warn("reScope cast : Unknown type", typeName, Comp)
	return false;
	
}

export default rescope;