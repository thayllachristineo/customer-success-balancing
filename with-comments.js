function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  // Filtrando CSs disponíveis
  const availableCS = customerSuccess.filter(
    (cs) => !customerSuccessAway.includes(cs.id)
  );

  // Ordenando CSs em ordem crescente de score
  availableCS.sort((a, b) => a.score - b.score);

  // Calculando número máximo de abstenções de CSs
  const maxAbs = Math.floor(availableCS.length / 2);

  // Criando objeto para armazenar quantidade de clientes atendidos por cada CS
  const csToCustomers = {};
  availableCS.forEach((cs) => (csToCustomers[cs.id] = 0));

  // Distribuindo clientes entre CSs de score mais próximo (maior)
  customers.forEach((c) => {
    let closestCS = null;
    let minDiff = Number.MAX_SAFE_INTEGER;

    availableCS.forEach((cs) => {
      const diff = cs.score - c.score;
      if (diff >= 0 && diff < minDiff) {
        closestCS = cs;
        minDiff = diff;
      }
    });

    if (closestCS) {
      csToCustomers[closestCS.id]++;
    }
  });

  // Encontrando CS que atendeu mais clientes
  let maxCustomers = 0;
  let bestCS = 0;
  Object.entries(csToCustomers).forEach(([csId, numCustomers]) => {
    if (numCustomers > maxCustomers) {
      maxCustomers = numCustomers;
      bestCS = csId;
    } else if (numCustomers === maxCustomers) {
      bestCS = 0; // empate
    }
  });

  return Number(bestCS);
}
