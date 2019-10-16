/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

//import forms    from './forms/(*).js';
import entities from 'App/db/entities';
import React    from "react";
import AutoForm from 'uniforms-material/AutoForm';
import Ajv      from 'ajv';

import JSONSchemaBridge from 'uniforms/JSONSchemaBridge';

function mkSchema( schema ) {
	const validator = new Ajv({ allErrors: true, useDefaults: true }).compile(schema);
	
	const schemaValidator = model => {
		//validator(model);
		
		//if ( validator.errors && validator.errors.length ) {
		//	throw { details: validator.errors };
		//}
	};
	return new JSONSchemaBridge(schema, schemaValidator)
}

const allForms = {
	//...forms
}

Object.keys(entities)
      .map(
	      etty => {
		      allForms[etty] = ( props ) => <AutoForm
			      schema={ mkSchema(entities[etty].fields || entities[etty]) } { ...props }/>;
	      }
      )

export default allForms;