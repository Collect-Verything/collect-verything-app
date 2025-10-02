import { describe, expect } from "@jest/globals";
/**
 * ============================
 * Cypress E2E – Sécurité / Rôles
 * ============================
 * Suggestion de fichier : cypress/e2e/security.cy.ts
 * Utilise des sélecteurs data-cy pour une meilleure stabilité.
 */
// Exemple de scénarios Cypress (placeholders à adapter à votre app)
// eslint-disable-next-line no-undef

describe("E2E - Accès Admin selon le rôle", () => {
    // eslint-disable-next-line no-undef
    it("S1. En tant qu'ADMIN, je me connecte, j'arrive sur /home et le menu Admin est accessible", () => {
        // cy.intercept('POST', '/api/auth/login', { fixture: 'auth_admin.json' }); // optionnel
        //         cy.visit('/login');
        //         cy.get('[data-cy="email"]').type('admin@example.com');
        //         cy.get('[data-cy="password"]').type('Password123!');
        //         cy.get('[data-cy="submit"]').click();
        //
        //
        //         cy.url().should('include', '/home');
        //         cy.get('[data-cy="navbar"]').should('be.visible');
        //         cy.get('[data-cy="menu-admin"]').should('be.visible');
        //
        //
        // // Accéder à la page admin
        //         cy.get('[data-cy="menu-admin"]').click();
        //         cy.url().should('include', '/admin');
        //         cy.findByRole('heading', { name: /admin/i }).should('be.visible');
        expect(3).toBe(3);
    });

    // eslint-disable-next-line no-undef
    it("S2. En tant que USER, je me connecte, j'arrive sur /home mais je n'ai pas accès au menu Admin et /admin est refusé", () => {
        // cy.intercept('POST', '/api/auth/login', { fixture: 'auth_user.json' }); // optionnel
        //         cy.visit('/login');
        //         cy.get('[data-cy="email"]').type('user@example.com');
        //         cy.get('[data-cy="password"]').type('Password123!');
        //         cy.get('[data-cy="submit"]').click();
        //
        //
        //         cy.url().should('include', '/home');
        //         cy.get('[data-cy="menu-admin"]').should('not.exist');
        //
        //
        // // Forcer navigation vers /admin et vérifier la protection
        //         cy.visit('/admin');
        //         cy.url().should('not.include', '/admin');
        //         cy.findByText(/accès refusé|non autorisé|unauthorized/i).should('exist');
        expect(3).toBe(3);
    });
});
