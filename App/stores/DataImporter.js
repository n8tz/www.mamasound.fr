/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "rscopes";

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
						this.push({ items: res.body, complete: true })
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
								this.$actions.saveState();
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
								this.$actions.saveState();
							}
							else {
								alert('Pas marché :(... rééssay plus tard ?')
							}
						}
					)
		}
	};
	
}