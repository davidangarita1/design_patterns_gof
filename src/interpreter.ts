/**
 * PATRÓN INTERPRETER
 * 
 * Explicación:
 * El Interpreter define una representación gramatical para un lenguaje y un
 * interpretador para procesarlo. Útil para crear lenguajes de dominio específico.
 * 
 * Caso de uso: Parseo de expresiones, lenguajes de consulta, compiladores,
 *             máquinas de estados, evaluación de fórmulas
 */

// Interfaz para expresiones
interface Expression {
  interpret(): number;
}

// Expresiones terminales (números)
class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret(): number {
    return this.value;
  }
}

// Expresiones no terminales (operaciones)
class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class SubtractExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class MultiplyExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}

class DivideExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    const divisor = this.right.interpret();
    if (divisor === 0) {
      throw new Error("Division by zero");
    }
    return this.left.interpret() / divisor;
  }
}

// Parser para construir el árbol de expresión
class Calculator {
  parse(expression: string): Expression {
    const tokens = expression.split(" ");
    let result: Expression | null = null;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (!isNaN(parseFloat(token))) {
        // Es un número
        const num = new NumberExpression(parseFloat(token));
        if (result === null) {
          result = num;
        }
      } else {
        // Es un operador
        i++; // Obtener el siguiente número
        const nextNum = new NumberExpression(parseFloat(tokens[i]));

        if (token === "+") {
          result = new AddExpression(result!, nextNum);
        } else if (token === "-") {
          result = new SubtractExpression(result!, nextNum);
        } else if (token === "*") {
          result = new MultiplyExpression(result!, nextNum);
        } else if (token === "/") {
          result = new DivideExpression(result!, nextNum);
        }
      }
    }

    if (result === null) {
      throw new Error("Invalid expression");
    }

    return result;
  }
}

// Ejemplo de uso
console.log("=== INTERPRETER PATTERN ===\n");

const calculator = new Calculator();

// Construir y evaluar expresiones
console.log("Evaluating: 5 + 3");
let expr = calculator.parse("5 + 3");
console.log("Result:", expr.interpret());

console.log("\nEvaluating: 10 - 4");
expr = calculator.parse("10 - 4");
console.log("Result:", expr.interpret());

console.log("\nEvaluating: 6 * 7");
expr = calculator.parse("6 * 7");
console.log("Result:", expr.interpret());

console.log("\nEvaluating: 20 / 4");
expr = calculator.parse("20 / 4");
console.log("Result:", expr.interpret());

console.log("\nEvaluating: 100 / 0");
try {
  expr = calculator.parse("100 / 0");
  console.log("Result:", expr.interpret());
} catch (error) {
  console.log("Error:", (error as Error).message);
}

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevas operaciones (ej. ModuloExpression, PowerExpression)
//     se agregan implementando la interfaz Expression sin modificar las existentes.
//   - L (Liskov Substitution): Todas las expresiones son sustituibles entre sí
//     al implementar la misma interfaz Expression.
//   - D (Dependency Inversion): Las expresiones compuestas dependen de la interfaz
//     Expression, no de NumberExpression ni otras concretas.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - S (Single Responsibility): Las clases de expresión mezclan la estructura
//     gramátical (qué operandos tiene) con la lógica de interpretación (cómo
//     se evalúa). Idealmente se separarían en nodos y visitantes.
//   - S (Single Responsibility): Calculator combina parsing (tokenización y
//     construcción del árbol) con la responsabilidad de orquestar la evaluación.
//   - O (Open/Closed): Agregar un nuevo tipo de token (ej. paréntesis) requiere
//     modificar el método parse() del Calculator.
