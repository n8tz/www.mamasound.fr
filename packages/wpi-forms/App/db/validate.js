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

import validators from 'App/db//validators';

function validate( record, etty ) {
    let entities    = require('App/db/entities');
    etty            = etty || record._cls;
    var recordDef   = entities[etty],
        errorsCount = 0,
        errors      = {};//@todo : use schema 4 perfs

    if ( !entities[etty] )
        return false;

    Object.keys(recordDef.fields).map(
        ( key ) => {
            var tests = recordDef.schema[key];
            if ( tests ) {
                tests       = tests instanceof Array ? tests : [tests];
                errors[key] = tests
                    .map(( test ) => test(key, record[key], record))
                    .filter(( v ) => typeof v == 'string');

                if ( errors[key].length )
                    errorsCount++;
                else
                    errors[key] = null;
            }
        }
    );
    return errorsCount && errors || true;
}

Object.keys(validators).forEach(( k ) => (validate[k] = validators[k]));
export default validate;
