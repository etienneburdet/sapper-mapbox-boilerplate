export const itemTemplate = (fields) => {
  return `
    <p class="title is-size-5">${fields.nom.toString()!="null"?fields.nom:"Nom non renseigné"}</p>
    <p class="subtitle is-size-6">${fields.adresse.toString()!="null"?fields.adresse:"Adresse non renseigné"}</p>
    <div class="tags">
      <div class="tag is-medium">${fields.nom_commune.toString()!="null"?fields.nom_commune:"Commune non renseigné"}</div>
    </div>
    `;
};


export const popupTemplate = (item) => {
  return `
    <p class="title">${item.fields.nom}</p>
    <p class="subtitle">${item.fields.nom_commune}</p>
    <hr />
    <p>${item.fields.adresse}</p>
    <hr />
    <p>
      ${item.fields.typologie_ods}
    </p>
    <hr />
    <p class="title is-size-6">Type de produits</p>
    <div class="tags">
      ${item.fields.familles_des_produits.toString().split(',').map(type => 
        `<div class="tag is-medium">${type}</div>`
        ).join("")
      }
    </div>
    `;
};
