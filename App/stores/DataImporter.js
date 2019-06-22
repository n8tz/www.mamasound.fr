/*
 * www.mamasound.fr
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