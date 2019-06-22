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

"use strict";

import { DomUtil } from 'leaflet';

var splitClassName = function splitClassName(className) {
  if (className === void 0) {
    className = '';
  }

  return className.split(' ').filter(Boolean);
};

export var addClassName = function addClassName(container, className) {
  splitClassName(className).forEach(function (cls) {
    DomUtil.addClass(container, cls);
  });
};
export var removeClassName = function removeClassName(container, className) {
  splitClassName(className).forEach(function (cls) {
    DomUtil.removeClass(container, cls);
  });
};
export default (function (container, prevClassName, nextClassName) {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      removeClassName(container, prevClassName);
    }

    if (nextClassName != null && nextClassName.length > 0) {
      addClassName(container, nextClassName);
    }
  }
});