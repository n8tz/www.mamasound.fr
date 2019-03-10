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

export default {
	"type"      : "object",
	"required"  : [
		"firstName",
		"lastName",
		"address",
		"city",
		"province",
		"postalCode",
		"country",
		"phone"
	],
	"title"     : "Address",
	"properties": {
		"firstName"           : {
			"title": "First Name",
			"type" : "string"
		},
		"lastName"            : {
			"title": "Last Name",
			"type" : "string"
		},
		"apartmentSuiteNumber": {
			"title": "Apartment/Suite Number",
			"type" : "string"
		},
		"address"             : {
			"title": "Address",
			"type" : "string"
		},
		"city"                : {
			"title"      : "City",
			"type"       : "string",
			"description": "Please enter full city name"
		},
		"province"            : {
			"title": "Province",
			"type" : "string",
			"enum" : [
				"AB",
				"BC",
				"MB",
				"NB",
				"NF",
				"NS",
				"NT",
				"NU",
				"ON",
				"PE",
				"QC",
				"SK",
				"YK"
			]
		},
		"postalCode"          : {
			"title": "Postal Code",
			"type" : "string"
		},
		"country"             : {
			"title": "Country",
			"type" : "string",
			"enum" : [
				"Canada"
			]
		},
		"phone"               : {
			"title"      : "Phone",
			"type"       : "string",
			"description": "Please include area code"
		}
	}
};