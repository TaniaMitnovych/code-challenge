import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Coordinates } from '../types/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() coordinates: Coordinates;
  @Input() marker: string;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 8,
  }
  ngOnInit(): void {

  }
  initMarker() {
    const initialMarker = {
      position: { lat: Number(this.coordinates.latitude), lng: Number(this.coordinates.longitude) },
    }
    const generatedMarker = this.generateMarker(initialMarker);
    const icon = Leaflet.icon({
      iconUrl: this.marker,
      iconSize: [38, 38], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    generatedMarker.setIcon(icon)
    generatedMarker.addTo(this.map).bindPopup(`<b>${initialMarker.position.lat},  ${initialMarker.position.lng}</b>`);
    this.map.panTo(initialMarker.position);
    this.markers.push(generatedMarker)
  }
  generateMarker(data: any) {
    return Leaflet.marker(data.position);
  }
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarker();
  }
}
