
// Función para la aproximación normal de la Poisson cuando lambda es grande
export function poissonApproxNormal(lambda, generator) {
    const mu = lambda;
    const sigma = Math.sqrt(lambda);

    // Aproximar Poisson con distribución normal N(mu, sigma)
    const randomNormal = normalRandom(generator); // Genera un número normal estándar

    return Math.max(0, Math.round(mu + sigma * randomNormal)); // Aproximación
}

// Generar un número normal estándar (distribución normal N(0, 1))
export function normalRandom(generator) {
    // Usar Box-Muller para obtener un número normal estándar
    const u1 = generator.next() / generator.N; // Normalizar
    const u2 = generator.next() / generator.N; // Normalizar

    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}


export function distribucionBinomial(n, p, numeroPseudoAleatorio) {
    let x = 0;  // Variable que cuenta el número de éxitos
    for (let i = 0; i < n; i++) {
        let u = numeroPseudoAleatorio.next();  // Genera un número aleatorio uniformemente distribuido entre 0 y 1
        if (u <= p) {
            x++;  // Si el número aleatorio es menor o igual a p, contamos un éxito
        }
    }

    return x;  // Devolvemos el número de éxitos
}

export function distribucionExponencial(lambda, randomValue) {
    // Calcular el tiempo hasta el próximo evento usando la inversa de la CDF
    const resultado = lambda * Math.log(randomValue.next());
    return resultado * -1; // Tiempo hasta el próximo evento en meses
}
