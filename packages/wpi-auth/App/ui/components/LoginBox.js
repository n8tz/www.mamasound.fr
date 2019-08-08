/*
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

'use strict';

import React       from "react";
import {Component} from "react";
import Button      from '@material-ui/core/Button';
import Dialog      from '@material-ui/core/Dialog';
import IconPerson  from '@material-ui/icons/AccountBox';
import Menu        from '@material-ui/core/Menu';
import MenuItem    from '@material-ui/core/MenuItem';
import Avatar      from '@material-ui/core/Avatar';

import {
	isSpell, spells, Store, Scope, withScope, propsToScope, scopeToProps,
	scopeToState
} from "react-scopes";


@scopeToProps("CurrentUser")
export default class LoginBox extends Component {
	state = { session: {}, showModal: false, lastLoginFail: false };
	
	doSubmit( form ) {
		this.props.$actions.login(
			{
				username: this.state.login,
				password: this.state.pass
			},
			( e, r ) => {
				if ( e ) this.setState({ lastLoginFail: true });
				else this.setState({ showModal: false });
			}
		);
	}
	
	render() {
		let { CurrentUser, $actions } = this.props;
		
		return (
			<div className="LoginBox">
				{
					!CurrentUser &&
					<a className="loginLink" onClick={ () => this.setState({ showModal: true }) }
					   title="Connexion"><IconPerson/></a>
				}
				{
					CurrentUser &&
					<React.Fragment>
						<Button color="primary"
						        onClick={ event => this.setState({ menu: event.currentTarget }) }>
							{ CurrentUser._id }
						</Button>
						<span onClick={ $actions.logout }>Sign out</span>
					</React.Fragment>
					
				}
				<Dialog open={ this.state.showModal }
				        title='My awesome dialog'
				        onEscKeyDown={ () => this.setState({ showModal: false }) }
				        onOverlayClick={ () => this.setState({ showModal: false }) }>
					<h1>Connexion</h1>
					
					<form onKeyPress={
						( e ) => {
							if ( e.charCode == '13' ) {
								e.preventDefault();
								this.doSubmit();
							}
						} }>
						
						<input label="Login / Adresse email" ref="login"
						       type="email"
							//placeholder="Email"
							   onChange={ ( e ) => this.setState({ login: e.target.value }) }
							   name="login"/>
						
						<input label="Mot de passe" ref="pass" type="password"
							//placeholder="Mot de passe"
							   onChange={
								   ( e ) => this.setState({ pass: e.target.value })// this is shit !!!!!!
							   }
							   name="pass"/>
						{
							this.state.lastLoginFail
							&&
							<div type="danger">
								<strong>Erreur :</strong> Ces identifiant sont incorrects
							</div>
						}
					</form>
					
					<a className="loginBoxPasswordLost">Mot de passe oublié</a>
					<button className="submit-input" onClick={ this.doSubmit.bind(this) }>Connexion</button>
				</Dialog>
			</div>
		)
			;
	}
	
};