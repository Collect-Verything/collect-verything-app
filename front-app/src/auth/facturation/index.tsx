import React from "react";

/*
* Les composant facturation sont pour le moment commun à un user comme a un super admin ou metier concerné.
* If user get facture from user id present dans le token
* If metier or super adinm get all facture
* Trouver un moyen de rendre commun le composant mais de changer le type de requete selon le role detecté
* */

export const Facturation = () => {
    return <p>Facturation page</p>;
};
