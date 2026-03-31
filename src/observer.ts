/**
 * PATRÓN OBSERVER
 * 
 * Explicación:
 * El Observer define una relación de uno-a-muchos entre objetos de modo que cuando
 * uno de ellos cambia de estado, todos los demás son notificados automáticamente.
 * 
 * Caso de uso: Sistemas de suscripción, actualizaciones de eventos, MVC frameworks,
 *             reactividad en frameworks frontend, notificaciones
 */

// Interfaz para observadores
interface Observer {
  update(subject: Subject): void;
}

// Interfaz para el sujeto observable
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// Sujeto concreto
class StockPrice implements Subject {
  private price: number = 0;
  private observers: Observer[] = [];

  setPrice(price: number): void {
    console.log(`Updating price to: $${price}`);
    this.price = price;
    this.notify();
  }

  getPrice(): number {
    return this.price;
  }

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      console.log(`Observer attached. Total observers: ${this.observers.length}`);
    }
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
    console.log(`Observer detached. Total observers: ${this.observers.length}`);
  }

  notify(): void {
    console.log("Notifying observers...\n");
    this.observers.forEach((observer) => observer.update(this));
  }
}

// Observadores concretos
class StockPortfolio implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: Subject): void {
    if (subject instanceof StockPrice) {
      console.log(`${this.name} received update: New price is $${subject.getPrice()}`);
    }
  }
}

class StockAnalyst implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: Subject): void {
    if (subject instanceof StockPrice) {
      const price = subject.getPrice();
      let recommendation = "";
      if (price < 50) {
        recommendation = "BUY";
      } else if (price > 100) {
        recommendation = "SELL";
      } else {
        recommendation = "HOLD";
      }
      console.log(`${this.name} analysis: Price $${price} - Recommendation: ${recommendation}`);
    }
  }
}

class TradingBot implements Observer {
  private name: string;
  private threshold: number;

  constructor(name: string, threshold: number) {
    this.name = name;
    this.threshold = threshold;
  }

  update(subject: Subject): void {
    if (subject instanceof StockPrice) {
      const price = subject.getPrice();
      if (price > this.threshold) {
        console.log(`${this.name} ALERT: Price exceeded threshold of $${this.threshold}!`);
      }
    }
  }
}

// Ejemplo de uso
console.log("=== OBSERVER PATTERN ===\n");

const stock = new StockPrice();

// Crear observadores
const portfolio1 = new StockPortfolio("My Portfolio");
const portfolio2 = new StockPortfolio("Investment Fund");
const analyst = new StockAnalyst("Goldman Sachs");
const bot = new TradingBot("Trading Bot", 80);

// Suscribir observadores
console.log("--- Subscribing Observers ---");
stock.attach(portfolio1);
stock.attach(portfolio2);
stock.attach(analyst);
stock.attach(bot);

console.log("\n--- Price Update 1 ---");
stock.setPrice(45);

console.log("--- Price Update 2 ---");
stock.setPrice(95);

console.log("--- Price Update 3 ---");
stock.setPrice(120);

console.log("--- Unsubscribing ---");
stock.detach(portfolio2);

console.log("\n--- Price Update 4 ---");
stock.setPrice(75);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos observadores (StockScreener, MobileAlert) se
//     agregan sin modificar StockPrice ni los observadores existentes.
//   - D (Dependency Inversion): StockPrice depende de la interfaz Observer,
//     no de StockPortfolio ni StockAnalyst directamente.
//   - S (Single Responsibility): El sujeto gestiona su estado y notificación;
//     cada observador gestiona su propia reacción al cambio.
//   - L (Liskov Substitution): Cualquier observador concreto puede sustituir
//     a otro al implementar la misma interfaz Observer.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): Todos los observadores reciben el Subject
//     completo en update(). Un TradingBot que solo necesita el precio debe
//     hacer un cast (instanceof StockPrice), acoplando al tipo concreto.
//   - S (Single Responsibility): StockPrice mezcla la lógica de negocio
//     (gestionar el precio) con la infraestructura de notificación (attach,
//     detach, notify). Idealmente se separarían en dos clases.
