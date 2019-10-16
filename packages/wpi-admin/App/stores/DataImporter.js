/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";

import superagent from "superagent";

export default class DataImporter extends Store {
	static state   = {};
	static actions = {
		doDbValidation() {
			let state = this.nextState;
			superagent
				.post(state.validateUrl, state.items)
				.then(
					( res ) => {
						this.push({ items: res.body, complete: true });
						console.log(res)
					}
				)
		},
		doDbImport() {
			let state = this.nextState;
			if ( confirm("Commencer l'importation ?") )
				superagent
					.post(state.importerUrl, state.items.filter(row=>row.valid))
					.then(
						( res ) => {
							if ( res.body.success ) {
								alert('Importation compléte !')
								this.push({ imported: res.body.items });
								//this.$scope.then(s => this.$actions.exportAsXLS());
								this.$actions.dataProvider_flushAll();
							}
							else {
								alert('Pas marché :(... rééssay plus tard ?')
							}
						}
					)
		},
		doDbDelete() {
			let state = this.nextState;
			if ( confirm("Supprimer les dates importées ?") )
				superagent
					.post(state.deleteUrl, this.data.imported)
					.then(
						( res ) => {
							if ( res.body.success ) {
								alert('Suppression compléte !')
								this.push({ imported: null });
								this.$actions.dataProvider_flushAll();
							}
							else {
								alert('Pas marché :(... rééssay plus tard ?')
							}
						}
					)
		}
	};
	
}