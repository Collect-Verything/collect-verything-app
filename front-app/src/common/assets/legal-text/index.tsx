import { Box, Container, Typography } from "@mui/material";
import React from "react";

export const GeneralConditionsOfUse = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom mt={4}>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenue sur [Nom du site] (ci-après "le Site"). Les présentes
          Conditions Générales d'Utilisation (CGU) régissent l'accès et
          l'utilisation du Site ainsi que les services proposés par [Nom de
          l'entreprise] (ci-après "nous", "notre" ou "nos"). En utilisant le
          Site, vous acceptez les présentes CGU dans leur intégralité. Si vous
          n'acceptez pas ces termes, veuillez ne pas utiliser notre Site.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          2. Objet
        </Typography>
        <Typography variant="body1" paragraph>
          Le Site est une plateforme en ligne permettant aux utilisateurs de
          [décrire le type de services ou produits offerts, par exemple :
          acheter et vendre des produits en ligne]. Les présentes CGU
          définissent les droits et obligations des utilisateurs et de
          l'entreprise dans le cadre de l'utilisation du Site.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          3. Accès au Site
        </Typography>
        <Typography variant="body1" paragraph>
          L'accès au Site est gratuit. Toutefois, l'utilisation de certains
          services peut être conditionnée à la création d'un compte utilisateur
          et/ou à des paiements. Nous nous réservons le droit de modifier,
          suspendre ou interrompre l'accès au Site, en tout ou en partie, à tout
          moment et sans préavis.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          4. Compte Utilisateur
        </Typography>
        <Typography variant="body1" paragraph>
          Pour accéder à certains services du Site, vous devez créer un compte
          en fournissant des informations exactes, à jour et complètes. Vous
          êtes responsable de la confidentialité de votre identifiant et de
          votre mot de passe, ainsi que de toutes les activités qui se déroulent
          sous votre compte. Vous vous engagez à nous informer immédiatement en
          cas d'utilisation non autorisée de votre compte.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          5. Conditions de Vente
        </Typography>
        <Typography variant="body1" paragraph>
          Toutes les commandes passées sur le Site sont soumises à nos
          [Conditions Générales de Vente], que vous devez lire et accepter avant
          tout achat. Les produits et services proposés sont décrits et
          présentés avec la plus grande précision possible. Toutefois, si des
          erreurs ou omissions se produisent dans cette présentation, notre
          responsabilité ne pourra être engagée.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          6. Paiement
        </Typography>
        <Typography variant="body1" paragraph>
          Le paiement des achats effectués sur le Site s'effectue via les moyens
          de paiement proposés lors de la commande. Vous vous engagez à utiliser
          uniquement des moyens de paiement légaux et à jour.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          7. Droit de Rétractation
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément à la législation en vigueur, vous disposez d'un droit de
          rétractation de [indiquez la période légale, par exemple 14 jours] à
          compter de la réception de votre commande. Pour exercer ce droit, vous
          devez nous notifier par [précisez la méthode, par exemple e-mail,
          formulaire en ligne] votre décision de vous rétracter. Les frais de
          retour sont à votre charge, sauf en cas de non-conformité des
          produits.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          8. Propriété Intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          Tous les contenus présents sur le Site (textes, images, logos, vidéos,
          etc.) sont la propriété de [Nom de l'entreprise] ou de ses
          partenaires. Toute reproduction, distribution, modification, ou
          exploitation de ces contenus, sans autorisation préalable écrite, est
          strictement interdite.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          9. Protection des Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Nous attachons une grande importance à la protection de vos données
          personnelles. Vos données sont collectées et traitées conformément à
          notre [Politique de Confidentialité]. Vous disposez d'un droit
          d'accès, de rectification et de suppression de vos données
          personnelles que vous pouvez exercer en nous contactant à [adresse
          e-mail ou formulaire de contact].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          10. Responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous efforçons de garantir que le Site est accessible en
          permanence et que les informations disponibles sont exactes et à jour.
          Toutefois, nous ne pouvons garantir l'absence de bugs ou d'erreurs, ni
          une disponibilité continue du Site. Nous ne serons pas tenus
          responsables des dommages indirects, pertes de données ou pertes
          financières découlant de l'utilisation du Site.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          11. Modifications des CGU
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier les présentes CGU à tout
          moment. Les modifications entreront en vigueur dès leur publication
          sur le Site. Il vous incombe de consulter régulièrement les CGU pour
          vous tenir informé des éventuelles modifications.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          12. Droit Applicable et Juridiction
        </Typography>
        <Typography variant="body1" paragraph>
          Les présentes CGU sont régies par le droit [indiquez le pays, par
          exemple français]. Tout litige relatif à l'interprétation ou à
          l'exécution des présentes sera de la compétence exclusive des
          tribunaux [précisez la juridiction compétente].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          13. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question ou réclamation concernant le Site, vous pouvez
          nous contacter à [adresse e-mail, numéro de téléphone, adresse
          postale].
        </Typography>
      </Box>
    </Container>
  );
};

export const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="body1" paragraph>
          La protection de vos données personnelles est une priorité pour [Nom
          de l'entreprise]. Cette politique de confidentialité décrit la manière
          dont nous collectons, utilisons et protégeons vos informations
          personnelles lorsque vous utilisez notre site [Nom du site].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          1. Collecte des Informations
        </Typography>
        <Typography variant="body1" paragraph>
          Nous collectons des informations personnelles lorsque vous créez un
          compte, passez une commande, remplissez un formulaire de contact, ou
          interagissez autrement avec notre site. Les informations collectées
          peuvent inclure votre nom, adresse e-mail, numéro de téléphone,
          adresse postale, informations de paiement, et toute autre information
          que vous choisissez de nous fournir.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          2. Utilisation des Informations
        </Typography>
        <Typography variant="body1" paragraph>
          Les informations que nous collectons sont utilisées pour :
        </Typography>
        <Typography variant="body1" component="ul" gutterBottom>
          <li>Traiter vos commandes et gérer votre compte utilisateur.</li>
          <li>Améliorer notre site et nos services.</li>
          <li>Personnaliser votre expérience sur notre site.</li>
          <li>
            Communiquer avec vous concernant vos commandes, nos produits,
            services, et promotions.
          </li>
          <li>Respecter nos obligations légales.</li>
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          3. Partage des Informations
        </Typography>
        <Typography variant="body1" paragraph>
          Nous ne vendons, n'échangeons, ni ne louons vos informations
          personnelles à des tiers. Nous pouvons partager vos informations avec
          des partenaires de confiance pour traiter vos commandes ou vous
          fournir certains services, sous réserve qu'ils acceptent de garder ces
          informations confidentielles.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          4. Protection des Informations
        </Typography>
        <Typography variant="body1" paragraph>
          Nous mettons en œuvre diverses mesures de sécurité pour protéger vos
          informations personnelles. Cependant, aucune méthode de transmission
          sur Internet ou de stockage électronique n'est totalement sécurisée.
          Par conséquent, bien que nous nous efforcions de protéger vos
          informations personnelles, nous ne pouvons garantir leur sécurité
          absolue.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          5. Utilisation des Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Notre site utilise des cookies pour améliorer votre expérience en
          ligne. Un cookie est un fichier texte placé sur votre appareil pour
          collecter des informations standard sur l'internaute et des
          informations sur le comportement du visiteur. Vous pouvez configurer
          votre navigateur pour qu'il n'accepte pas les cookies, mais cela
          pourrait limiter certaines fonctionnalités de notre site.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          6. Vos Droits
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément à la réglementation applicable, vous avez le droit
          d'accéder, de rectifier, de supprimer vos données personnelles, ainsi
          que de vous opposer à leur traitement ou de demander leur portabilité.
          Pour exercer ces droits, veuillez nous contacter à [adresse e-mail ou
          formulaire de contact].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          7. Modifications de cette Politique
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Toute modification sera publiée sur
          cette page et vous en serez informé par e-mail si nécessaire. Nous
          vous encourageons à consulter régulièrement cette page pour rester
          informé de la manière dont nous protégeons vos informations
          personnelles.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          8. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Si vous avez des questions concernant cette politique de
          confidentialité, ou si vous souhaitez exercer vos droits, veuillez
          nous contacter à [adresse e-mail, numéro de téléphone, adresse
          postale].
        </Typography>
      </Box>
    </Container>
  );
};

export const LegalNotices = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="body1" paragraph>
          Conformément aux dispositions des articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs du site [Nom du site] les présentes mentions
          légales.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          1. Éditeur du Site
        </Typography>
        <Typography variant="body1" paragraph>
          Le site [Nom du site] est édité par [Nom de l'entreprise], société
          [forme juridique] au capital de [montant du capital social], inscrite
          au Registre du Commerce et des Sociétés sous le numéro [numéro RCS],
          dont le siège social est situé à [adresse du siège social].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          2. Directeur de la Publication
        </Typography>
        <Typography variant="body1" paragraph>
          Le Directeur de la publication du site est [Nom du directeur de la
          publication].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          3. Hébergement
        </Typography>
        <Typography variant="body1" paragraph>
          Le site est hébergé par [Nom de l'hébergeur], dont le siège social est
          situé à [adresse de l'hébergeur].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          4. Propriété Intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          L'intégralité du contenu du site [Nom du site] (textes, images,
          graphismes, logo, icônes, sons, logiciels, etc.) est la propriété de
          [Nom de l'entreprise] ou de ses partenaires. Toute reproduction,
          distribution, modification, adaptation, retransmission ou publication,
          même partielle, de ces différents éléments est strictement interdite
          sans l'accord exprès par écrit de [Nom de l'entreprise].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          5. Responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          [Nom de l'entreprise] ne saurait être tenue pour responsable des
          erreurs rencontrées sur le site, de problèmes techniques,
          d'interprétation des informations publiées et des conséquences de leur
          utilisation. L'utilisateur reconnaît utiliser les informations
          présentes sur le site sous sa responsabilité exclusive.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          6. Liens Hypertextes
        </Typography>
        <Typography variant="body1" paragraph>
          Le site [Nom du site] peut contenir des liens hypertextes vers
          d'autres sites présents sur le réseau Internet. Les liens vers ces
          autres ressources vous font quitter le site [Nom du site]. Il est
          possible de créer un lien vers la page de présentation de ce site sans
          autorisation expresse de [Nom de l'entreprise]. Aucune autorisation ou
          demande d'information préalable ne peut être exigée par l'éditeur à
          l'égard d'un site qui souhaite établir un lien vers le site de
          l'éditeur. Toutefois, ce site doit être affiché dans une nouvelle
          fenêtre du navigateur. Cependant, [Nom de l'entreprise] se réserve le
          droit de demander la suppression d'un lien qu'elle estime non conforme
          à l'objet du site [Nom du site].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          7. Protection des Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Les données personnelles collectées sur le site sont destinées à
          l'usage exclusif de [Nom de l'entreprise]. Elles ne feront l'objet
          d'aucune cession à des tiers. Vous disposez d'un droit d'accès, de
          rectification et de suppression de vos données personnelles que vous
          pouvez exercer en nous contactant à [adresse e-mail ou formulaire de
          contact].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          8. Droit Applicable
        </Typography>
        <Typography variant="body1" paragraph>
          Le présent site et ses mentions légales sont soumis au droit [indiquer
          le pays, par exemple français]. En cas de litige, et après une
          tentative de recherche de solution amiable, compétence expresse est
          attribuée aux tribunaux compétents du ressort du siège social de [Nom
          de l'entreprise].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          9. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question ou demande d'information concernant le site, ou
          tout signalement de contenu ou d'activités illicites, l'utilisateur
          peut contacter l'éditeur à l'adresse e-mail suivante : [adresse
          e-mail], ou adresser un courrier recommandé avec accusé de réception à
          [Nom de l'entreprise], à l'adresse suivante : [adresse postale].
        </Typography>
      </Box>
    </Container>
  );
};

export const PrivacyManagement = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="body1" paragraph>
          Chez [Nom de l'entreprise], la confidentialité de vos données
          personnelles est une priorité. Cette section détaille la manière dont
          nous gérons, protégeons et utilisons vos données personnelles,
          conformément aux réglementations en vigueur.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          1. Collecte des Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Nous collectons vos données personnelles lorsque vous interagissez
          avec notre site, par exemple en créant un compte, en passant une
          commande, ou en vous abonnant à notre newsletter. Les informations
          collectées peuvent inclure votre nom, votre adresse e-mail, votre
          numéro de téléphone, et toute autre information nécessaire pour
          fournir nos services.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          2. Utilisation des Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Les données personnelles que nous collectons sont utilisées pour :
        </Typography>
        <Typography variant="body1" component="ul" gutterBottom>
          <li>Gérer vos commandes et votre compte utilisateur.</li>
          <li>Fournir et améliorer nos services.</li>
          <li>
            Vous envoyer des informations relatives à nos produits, services, et
            promotions.
          </li>
          <li>Respecter nos obligations légales et réglementaires.</li>
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          3. Partage des Données Personnelles
        </Typography>
        <Typography variant="body1" paragraph>
          Nous ne partageons pas vos données personnelles avec des tiers, sauf
          si cela est nécessaire pour fournir nos services, pour respecter une
          obligation légale, ou avec votre consentement explicite. Dans tous les
          cas, nous exigeons que ces tiers respectent la confidentialité de vos
          informations.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          4. Conservation des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Vos données personnelles sont conservées pendant la durée nécessaire
          pour atteindre les objectifs pour lesquels elles ont été collectées,
          sauf si une durée de conservation plus longue est requise ou permise
          par la loi. À l'issue de cette période, elles sont supprimées ou
          anonymisées.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          5. Vos Droits
        </Typography>
        <Typography variant="body1" paragraph>
          Conformément à la réglementation sur la protection des données, vous
          disposez de plusieurs droits concernant vos données personnelles,
          notamment :
        </Typography>
        <Typography variant="body1" component="ul" gutterBottom>
          <li>
            Le droit d'accès : Vous pouvez demander à accéder aux données
            personnelles que nous détenons à votre sujet.
          </li>
          <li>
            Le droit de rectification : Vous pouvez demander la correction de
            vos données personnelles si elles sont incorrectes ou incomplètes.
          </li>
          <li>
            Le droit à l'effacement : Vous pouvez demander la suppression de vos
            données personnelles sous certaines conditions.
          </li>
          <li>
            Le droit d'opposition : Vous pouvez vous opposer au traitement de
            vos données personnelles pour des motifs légitimes.
          </li>
          <li>
            Le droit à la portabilité : Vous pouvez demander à recevoir vos
            données personnelles dans un format structuré, couramment utilisé et
            lisible par machine.
          </li>
        </Typography>
        <Typography variant="body1" paragraph>
          Pour exercer ces droits, vous pouvez nous contacter à [adresse e-mail
          ou formulaire de contact].
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          6. Sécurité des Données
        </Typography>
        <Typography variant="body1" paragraph>
          Nous mettons en œuvre des mesures techniques et organisationnelles
          appropriées pour protéger vos données personnelles contre tout accès
          non autorisé, divulgation, altération ou destruction. Cependant,
          aucune méthode de transmission sur Internet ou de stockage
          électronique n'est totalement sécurisée.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          7. Modifications de la Politique de Confidentialité
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Les modifications seront publiées sur
          cette page et, si elles sont significatives, nous vous en informerons
          par e-mail ou via un avis sur notre site. Nous vous encourageons à
          consulter régulièrement cette page pour vous tenir informé des mises à
          jour.
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          8. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Si vous avez des questions concernant cette politique de
          confidentialité ou si vous souhaitez exercer vos droits, vous pouvez
          nous contacter à [adresse e-mail, numéro de téléphone, adresse
          postale].
        </Typography>
      </Box>
    </Container>
  );
};

export interface LegalProps {
  label: string;
  children: React.ReactNode;
}

export const legalItems: LegalProps[] = [
  {
    label: "Conditions générales d’utilisation",
    children: <GeneralConditionsOfUse />,
  },
  { label: "Politique de confidentialité", children: <PrivacyPolicy /> },
  { label: "Mentions légales", children: <LegalNotices /> },
  { label: "Gestion de la confidentialité", children: <PrivacyManagement /> },
];
