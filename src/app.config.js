export default {
    mapbox: {
        apikey: "pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ",
        init: { /* default map location (center of the map, and zoom level) */
            zoom: 12,
            center: [2.347457,48.857627]
        },
        style: "mapbox://styles/mapbox/light-v10",
        geocoder: { /* Narrow search results to the defined boundingbox to avoid to many noises */
            searchbbox: [2.108065, 50.896051, 2.608629, 51.132778],
            placeholder: "Chercher une adresse"
        },
    },
    store: {
        unique_ids: ['nom_de_la_societe', 'adresse_du_point_de_vente']
    },
    data: {
        baseurl: "https://fpassaniti.opendatasoft.com/api/v2/catalog/datasets/les-arbres/exports/geojson",
        query: "?select=*&where=%22PARIS+12E+ARRDT%22&rows=49999",
        clustering: false,
        categories: {
            "default": // mandatory, keep a default icon
                {
                    "slug": "default",
                    "color":
                        "#f5f5f5"
                },
            "Traiteur - restauration à emporter":
                {
                    "slug": "traiteur",
                    "color":
                        "#FDD98B"
                }
            ,
            "Primeur - fruits et légumes":
                {
                    "slug": "primeur",
                    "color":
                        "#1EA81A"
                }
            ,
            "Poissonnerie":
                {
                    "slug": "poissonnerie",
                    "color":
                        "#86B1FC"
                }
            ,
            "Livraisons":
                {
                    "slug": "truck",
                    "color":
                        "#364852"
                }
            ,
            "Boucherie - charcuterie":
                {
                    "slug": "boucherie_charcuterie",
                    "color":
                        "#CB3019"
                }
            ,
            "Crèmerie - fromagerie":
                {
                    "slug": "fromagerie",
                    "color":
                        "#FDDB00"
                }
            ,
            "Vins - bières - spiritueux":
                {
                    "slug": "vin",
                    "color":
                        "#F90126"
                }
            ,
            "Boulangerie - pâtisserie":
                {
                    "slug": "boulangerie_patisserie",
                    "color":
                        "#E2A76F"
                }
            ,
            "Drive":
                {
                    "slug": "truck",
                    "color":
                        "#364852"
                }
            ,
            "Épicerie":
                {
                    "slug": "epicerie",
                    "color":
                        "#FDD98B"
                }
            ,
            "Alimentation générale":
                {
                    "slug": "alimentation_generale",
                    "color":
                        "#E06000"
                }
            ,
            "Supermarché ou hypermarché":
                {
                    "slug": "supermarche",
                    "color":
                        "#364852"
                }
        }
    }
};

