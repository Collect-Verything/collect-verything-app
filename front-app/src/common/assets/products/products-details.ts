import { PRODUCT_FORMULA } from "../../component/solution/const";

export interface ProductsDetailsType {
    id: number,
    class: PRODUCT_FORMULA,
    title: string,
    description:string,
    details: string[],
    price_mounth: number,
}

export const productsDetails: ProductsDetailsType[] = [
    {
        id: 1,
        class: PRODUCT_FORMULA.STANDARD,
        title: "Conçu pour l’extensibilité",
        description:
            "Évoluez rapidement avec notre boutique en ligne personnalisable, ou construisez la vôtre avec la technologie qui vous plaît pour une liberté créative totale. Mieux encore, intégrez vos systèmes tiers via les API de notre écosystème d’applications.",
        details: [
            "• Le processus optimisé",
            "• Analyses de données standard",
            "• 10 emplacements des stocks",
            "• Assistance par chat à tout moment",
            "• Vente globale localisée",
            "• Stockage serveur 2go",
            "• Le processus optimisé",
            "• Analyses de données standard",
        ],
        price_mounth: 12,
    },
    {
        id: 2,
        class: PRODUCT_FORMULA.MEDIUM,
        title: "Optimisé pour le headless",
        description:
            "Pour une flexibilité optimale, créez votre boutique via la couche API headless de Shopify. Hébergez-la n’importe où, ou déployez-la en quelques heures en utilisant notre pile headless basée sur React, sans surcoût.",
        details: [
            "• Le processus optimisé",
            "• Analyses de données standard",
            "• 10 emplacements des stocks",
            "• Assistance par chat à tout moment",
            "• Vente globale localisée",
            "• Stockage serveur 2go",
            "• Le processus optimisé",
            "• Analyses de données standard",
            "• 10 emplacements des stocks",
            "• Vente globale localisée",
        ],
        price_mounth: 16,
    },
    {
        id: 3,
        class: PRODUCT_FORMULA.PREMIUM,
        title: "L’obsession de la performance",
        description:
            "Optimisez notre boutique en ligne extra rapide et notre paiement le plus performant au monde avec des extensions pour le retail, la vente en gros et votre back-office.",
        details: [
            "• Le processus optimisé",
            "• Analyses de données standard",
            "• 10 emplacements des stocks",
            "• Assistance par chat à tout moment",
            "• Vente globale localisée",
            "• Stockage serveur 2go",
            "• Le processus optimisé",
            "• Analyses de données standard",
            "• 10 emplacements des stocks",
            "• Vente globale localisée",
            "• Stockage serveur 2go",
            "• Assistance par chat à tout moment",
        ],
        price_mounth: 20,
    },
];
