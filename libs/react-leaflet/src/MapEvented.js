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

// @flow

import type { Evented } from 'leaflet'
import { Component } from 'react'

export const EVENTS_RE = /^on(.+)$/i

type EventHandler = (event: Event) => void
type EventsObject = { [key: string]: EventHandler }

export default class MapEvented<
  LeafletElement: Evented,
  Props: Object,
> extends Component<Props> {
  _leafletEvents: EventsObject
  leafletElement: LeafletElement

  constructor(props: Props) {
    super(props)
    this._leafletEvents = this.extractLeafletEvents(props)
  }

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents)
  }

  componentDidUpdate(_prevProps: Props) {
    this._leafletEvents = this.bindLeafletEvents(
      this.extractLeafletEvents(this.props),
      this._leafletEvents,
    )
  }

  componentWillUnmount() {
    const el = this.leafletElement
    if (!el) return

    Object.keys(this._leafletEvents).forEach(ev => {
      el.off(ev, this._leafletEvents[ev])
    })
  }

  extractLeafletEvents(props: Props): EventsObject {
    return Object.keys(props).reduce((res, prop) => {
      if (EVENTS_RE.test(prop)) {
        if (props[prop] != null) {
          const key = prop.replace(EVENTS_RE, (match, p) => p.toLowerCase())
          res[key] = props[prop]
        }
      }
      return res
    }, {})
  }

  bindLeafletEvents(
    next: EventsObject = {},
    prev: EventsObject = {},
  ): EventsObject {
    const el = this.leafletElement
    if (el == null || el.on == null) return {}

    const diff = { ...prev }
    Object.keys(prev).forEach(ev => {
      if (next[ev] == null || prev[ev] !== next[ev]) {
        delete diff[ev]
        el.off(ev, prev[ev])
      }
    })

    Object.keys(next).forEach(ev => {
      if (prev[ev] == null || next[ev] !== prev[ev]) {
        diff[ev] = next[ev]
        el.on(ev, next[ev])
      }
    })

    return diff
  }

  fireLeafletEvent(type: string, data: ?any) {
    const el = this.leafletElement
    if (el) el.fire(type, data)
  }
}
