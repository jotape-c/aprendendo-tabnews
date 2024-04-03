const calculadora = require("../../models/calculador.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 3 + 2 deveria retornar 5", () => {
  const resultado = calculadora.somar(3, 2);
  expect(resultado).toBe(5);
});

test("soma banana + 2 deveria retornar erro", () => {
  const resultado = calculadora.somar("banana", 2);
  expect(resultado).toBe("Erro");
});
