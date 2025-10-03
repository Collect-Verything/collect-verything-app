// import React from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import ArticleIcon from "@mui/icons-material/Article";
// import { CenteredGrid } from "../../common/components/grid-centered";
// /*
//  * Les composant documentation sont pour le moment commun à un user comme a un super admin ou metier concerné.
//  * If user get all documentation
//  * If metier or super adinm get all documentation avec possibilité de modififer ou supprimer + rajouter un composant de redaction de documentation
//  * Trouver un moyen de rendre commun le composant mais de changer le type de d'action dans le display du tableau selon le role detecté
//  * */
// export const Documentation = () => {
//     return (
//         <CenteredGrid>
//             <Paper
//                 elevation={3}
//                 sx={{
//                     px: 6,
//                     py: 8,
//                     maxWidth: 420,
//                     textAlign: "center",
//                     borderRadius: 4,
//                 }}
//             >
//                 <Box display="flex" justifyContent="center" mb={2}>
//                     <ArticleIcon sx={{ fontSize: 56, color: "text.secondary" }} />
//                 </Box>
//
//                 <Typography variant="h6" gutterBottom>
//                     Aucune documentation pour l’instant
//                 </Typography>
//             </Paper>
//         </CenteredGrid>
//     );
// };

// Proof orale doc tech vulga

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

/**
 * Centre d’aide – Accordeon MUI (docs vulgarisées)
 *
 * Objectif: guider l’utilisateur (non technique) pas-à-pas.
 *
 * Sections:
 * 1) Créer des clients «métier»
 * 2) Créer un produit (+ auto-création Stripe)
 * 3) Gérer le Click & Collect côté livraison (Admin)
 * 4) Aider un client depuis le module Support (workflow + FAQ)
 * 5) Gérer un remboursement (Back‑office + Stripe)
 */

const Pill: React.FC<{ label: string }> = ({ label }) => (
    <Chip size="small" label={label} variant="outlined" sx={{ mr: 1, mb: 1 }} />
);

const Step: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1.5 }}>
        <Box
            sx={{
                minWidth: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                bgcolor: "action.hover",
                color: "text.primary",
            }}
        >
            {n}
        </Box>
        <Typography component="div" sx={{ lineHeight: 1.6 }}>
            {children}
        </Typography>
    </Box>
);

export const Documentation = () => {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* En‑tête simple et rassurante */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Centre d’aide utilisateur
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Retrouvez ci‑dessous des guides pas‑à‑pas pour accomplir les tâches courantes.
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* 1. Créer des clients de type métier */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="p1-content" id="p1-header">
                    <Typography
                        component="span"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <StorefrontIcon fontSize="small" /> Créer des clients de type «métier»
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Un «client métier» correspond à un client avec ses infos professionnelles (ex: société, SIREN,
                        secteur). Voici comment l’ajouter rapidement.
                    </Typography>

                    <Box>
                        <Step n={1}>
                            Ouvrez <strong>Clients → Nouveau</strong>.
                        </Step>
                        <Step n={2}>
                            Choisissez le <strong>type</strong> : <em>Métier</em>.
                        </Step>
                        <Step n={3}>
                            Renseignez les champs clés : <strong>Raison sociale</strong>, <strong>SIREN</strong>,{" "}
                            <strong>Adresse</strong>, <strong>Contact</strong> (email/téléphone).
                        </Step>
                        <Step n={4}>
                            Ajoutez éventuellement des <strong>étiquettes</strong> (ex : Grossiste, VIP, Partenaire).
                        </Step>
                        <Step n={5}>
                            Cliquez sur <strong>Enregistrer</strong>. Le client apparaît dans la liste et devient
                            sélectionnable lors d’une commande.
                        </Step>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Pill label="Astuce" />
                        <Typography variant="body2">
                            Utilisez les <em>étiquettes</em> pour filtrer rapidement vos clients et adapter vos remises.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 2. Créer un produit (création auto Stripe) */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="p2-content" id="p2-header">
                    <Typography
                        component="span"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <CreditScoreIcon fontSize="small" /> Créer un produit (et sa fiche Stripe automatiquement)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Lorsque vous créez un produit dans l’Admin, une fiche <strong>Stripe Product</strong> est
                        générée en parallèle (ainsi qu’un <strong>Price</strong> si un tarif est défini).
                    </Typography>

                    <Box>
                        <Step n={1}>
                            Allez dans <strong>Catalogue → Produits → Nouveau</strong>.
                        </Step>
                        <Step n={2}>
                            Saisissez le <strong>Nom</strong>, la <strong>Référence/SKU</strong>, la{" "}
                            <strong>TVA</strong> et le <strong>Prix TTC</strong>.
                        </Step>
                        <Step n={3}>
                            Définissez la <strong>Disponibilité</strong> (en ligne / boutique) et ajoutez des{" "}
                            <strong>images</strong> si besoin.
                        </Step>
                        <Step n={4}>
                            Cliquez sur <strong>Enregistrer</strong>. Le système :
                            <ul style={{ marginTop: 8 }}>
                                <li>
                                    Crée un <em>Product</em> dans Stripe avec le nom et la description.
                                </li>
                                <li>
                                    Crée un <em>Price</em> associé (montant, devise, TVA).{" "}
                                </li>
                                <li>
                                    Stocke les <em>identifiants Stripe</em> dans la fiche produit pour les paiements.
                                </li>
                            </ul>
                        </Step>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <InfoIcon fontSize="small" />
                        <Typography variant="body2">
                            Si vous modifiez le <strong>prix</strong> plus tard, un <em>nouveau Price Stripe</em> sera
                            créé (historique préservé).
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                        <WarningAmberIcon fontSize="small" />
                        <Typography variant="body2">
                            Évitez de supprimer manuellement le produit dans Stripe: cela peut casser des liens avec les
                            commandes en cours.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 3. Gérer le Click & Collect (Livraison) */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="p3-content" id="p3-header">
                    <Typography
                        component="span"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <LocalShippingIcon fontSize="small" /> Gérer la livraison «Click & Collect» en boutique
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Utilisez l’<strong>interface de livraison</strong> (Admin) pour préparer, notifier et remettre
                        les commandes.
                    </Typography>

                    <Box>
                        <Step n={1}>
                            Ouvrez <strong>Commandes → Livraison</strong> puis filtrez sur <em>Click & Collect</em>.
                        </Step>
                        <Step n={2}>
                            Sélectionnez la commande → <strong>Marquer “Prête”</strong>. Un email/SMS informe le client.
                        </Step>
                        <Step n={3}>
                            À l’arrivée du client : vérifiez <strong>nom + code de retrait</strong> (ou pièce
                            d’identité).
                        </Step>
                        <Step n={4}>
                            Cliquez <strong>Remise effectuée</strong>. Le statut passe à <em>Retirée</em>, la facture
                            est envoyée si activée.
                        </Step>
                        <Step n={5}>
                            En cas d’imprévu : utilisez <strong>Reporter</strong> ou <strong>Annuler</strong> (motif
                            requis pour suivi).
                        </Step>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Pill label="Bon à savoir" />
                        <Typography variant="body2">
                            Les délais moyens s’affichent en haut de page pour piloter la qualité de service.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 4. Support → Workflow + FAQ */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="p4-content" id="p4-header">
                    <Typography
                        component="span"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <SupportAgentIcon fontSize="small" /> Aider un client (module Support) & alimenter la FAQ
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Suivez le <strong>workflow de résolution</strong> pour garder un historique clair et enrichir la
                        FAQ.
                    </Typography>

                    <Box>
                        <Step n={1}>
                            Dans <strong>Support</strong>, cliquez <strong>Nouveau ticket</strong> (canal : email, chat,
                            tel).
                        </Step>
                        <Step n={2}>
                            Choisissez la <strong>catégorie</strong> (Paiement, Livraison, Compte, Produit…).
                        </Step>
                        <Step n={3}>
                            Rédigez une <strong>note interne</strong> (constat, étapes testées, captures).
                        </Step>
                        <Step n={4}>
                            Proposez la <strong>solution</strong> au client (message type + réglages si besoin).
                        </Step>
                        <Step n={5}>
                            Passez le ticket en <strong>Résolu</strong>. Cochez <em>Créer une entrée de FAQ</em> si le
                            cas peut resservir.
                        </Step>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircleIcon fontSize="small" />
                        <Typography variant="body2">
                            Les articles de FAQ sont relus avant publication. Pensez à un <strong>titre clair</strong>{" "}
                            et une <strong>procédure concise</strong>.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 5. Sujet libre : Gérer un remboursement */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="p5-content" id="p5-header">
                    <Typography
                        component="span"
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <CreditScoreIcon fontSize="small" /> Gérer un remboursement (Back‑office & Stripe)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Selon l’état de la commande, vous pouvez rembourser partiellement ou totalement le client.
                    </Typography>

                    <Box>
                        <Step n={1}>
                            Ouvrez la <strong>commande</strong> concernée → onglet <strong>Paiement</strong>.
                        </Step>
                        <Step n={2}>
                            Cliquez <strong>Rembourser</strong> et choisissez <em>Total</em> ou <em>Partiel</em>{" "}
                            (montant).
                        </Step>
                        <Step n={3}>
                            Validez. Le système crée un <strong>refund Stripe</strong> et met à jour le statut de la
                            commande.
                        </Step>
                        <Step n={4}>
                            Une <strong>note</strong> est ajoutée à la commande et, si activé, un email part au client.
                        </Step>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <InfoIcon fontSize="small" />
                        <Typography variant="body2">
                            Le délai d’apparition sur le compte client dépend de la banque (souvent 3–5 j ouvrés).
                        </Typography>
                    </Box>
                </AccordionDetails>
                <AccordionActions>
                    <Button size="small">Besoin d’aide</Button>
                    <Button variant="contained" size="small">
                        Ouvrir le back‑office
                    </Button>
                </AccordionActions>
            </Accordion>

            {/* Pied de page léger */}
            <Divider sx={{ mt: 4, mb: 2 }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
                Cette page d’aide est conçue pour être courte, claire et actionnable. Mettez‑la à jour dès que vos
                processus évoluent.
            </Typography>
        </Container>
    );
};
