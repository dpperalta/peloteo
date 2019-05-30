/*
 * Configuración del puerto de la aplicación
 */
process.env.PORT = process.env.PORT || 3000;


/*
 *  Tiempo de expiración del Token
 */
//process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

/*
 * SEED de verificación del Token
 */

process.env.SEED = process.env.SEED || 'seed-de-desarrollo';