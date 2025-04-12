/**
 * Génère un mot de passe aléatoire sécurisé de la longueur spécifiée.
 *
 * @param passwordLength - La longueur souhaitée du mot de passe
 * @returns Une chaîne de caractères représentant le mot de passe généré
 */
export const generateRandomPassword = (passwordLength: number): string => {
  const CHARACTERS =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@+=-_()&';

  return Array.from({ length: passwordLength }, () => {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    return CHARACTERS[randomIndex];
  }).join('');
};
