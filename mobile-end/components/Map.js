import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'


const Map = () => {
  return (
    <MapView
    width={100} height={300} frameborder={0} allowfullscreen allow="geolocation"
    source={"//umap.openstreetmap.fr/fr/map/projet_1075295?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"}>
      
    </MapView>
  )
}

// https://umap.openstreetmap.fr/fr/map/projet_1075295
// <iframe width="100%" height="300px" frameborder="0" allowfullscreen allow="geolocation" src="//umap.openstreetmap.fr/fr/map/projet_1075295?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true">
// </iframe>
// <p>
//   <a href="//umap.openstreetmap.fr/fr/map/projet_1075295?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true">
//   Voir en plein écran
//   </a>
//   </p>
export default Map

const styles = StyleSheet.create({})