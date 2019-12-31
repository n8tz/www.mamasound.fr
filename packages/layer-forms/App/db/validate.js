/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
