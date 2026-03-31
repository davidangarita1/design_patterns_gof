/**
 * PATRÓN STRATEGY
 * 
 * Explicación:
 * El Strategy define una familia de algoritmos, encapsula cada uno y los hace
 * intercambiables. Permite que el algoritmo varíe independientemente del cliente.
 * 
 * Caso de uso: Diferentes algoritmos de ordenamiento, métodos de pago, compresión
 *             de datos, estrategias de cálculo de descuentos
 */

// Interfaz para estrategias
interface PaymentStrategy {
  pay(amount: number): void;
  getPaymentMethod(): string;
}

// Estrategias concretas
class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  private cvv: string;

  constructor(cardNumber: string, cvv: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount: number): void {
    console.log(`[CARD] Processing credit card payment of $${amount}`);
    console.log(`Card: ****-****-****-${this.cardNumber.slice(-4)}`);
    console.log("[OK] Payment authorized");
  }

  getPaymentMethod(): string {
    return "Credit Card";
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`[PAYPAL] Processing PayPal payment of $${amount}`);
    console.log(`Account: ${this.email}`);
    console.log("[OK] Payment authorized");
  }

  getPaymentMethod(): string {
    return "PayPal";
  }
}

class CryptoCurrencyPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`[BITCOIN] Processing cryptocurrency payment of $${amount}`);
    console.log(`Wallet: ${this.walletAddress.slice(0, 10)}...`);
    console.log("[OK] Transaction confirmed on blockchain");
  }

  getPaymentMethod(): string {
    return "Cryptocurrency";
  }
}

class BankTransferPayment implements PaymentStrategy {
  private accountNumber: string;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  pay(amount: number): void {
    console.log(`[BANK] Processing bank transfer of $${amount}`);
    console.log(`Account: ****${this.accountNumber.slice(-4)}`);
    console.log("[OK] Transfer initiated");
  }

  getPaymentMethod(): string {
    return "Bank Transfer";
  }
}

// Contexto
class ShoppingCart {
  private items: { name: string; price: number }[] = [];
  private paymentStrategy: PaymentStrategy | null = null;

  addItem(name: string, price: number): void {
    this.items.push({ name, price });
    console.log(`Added: ${name} ($${price})`);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(): void {
    if (!this.paymentStrategy) {
      console.log("[ERROR] No payment strategy selected");
      return;
    }

    const total = this.getTotal();
    console.log(`\n--- Checkout ---`);
    console.log(`Total: $${total}`);
    console.log(`Payment Method: ${this.paymentStrategy.getPaymentMethod()}`);
    this.paymentStrategy.pay(total);
  }
}

// Ejemplo de uso
console.log("=== STRATEGY PATTERN ===\n");

const cart = new ShoppingCart();

cart.addItem("Laptop", 1299.99);
cart.addItem("Mouse", 49.99);
cart.addItem("Keyboard", 149.99);

console.log("\n--- Payment with Credit Card ---");
const creditCard = new CreditCardPayment("1234567890123456", "123");
cart.setPaymentStrategy(creditCard);
cart.checkout();

console.log("\n--- Different Cart with PayPal ---");
const cart2 = new ShoppingCart();
cart2.addItem("Monitor", 399.99);
cart2.addItem("HDMI Cable", 15.99);

const paypal = new PayPalPayment("user@example.com");
cart2.setPaymentStrategy(paypal);
cart2.checkout();

console.log("\n--- Cryptocurrency Payment ---");
const cart3 = new ShoppingCart();
cart3.addItem("Bitcoin Hardware Wallet", 79.99);

const cryptoPayment = new CryptoCurrencyPayment("1A2B3C4D5E6F7G8H9I");
cart3.setPaymentStrategy(cryptoPayment);
cart3.checkout();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevas estrategias (ej. ApplePayPayment) se agregan
//     sin modificar ShoppingCart ni las estrategias existentes.
//   - S (Single Responsibility): Cada estrategia de pago tiene una sola
//     responsabilidad: procesar el pago con su método específico.
//   - D (Dependency Inversion): ShoppingCart depende de la interfaz
//     PaymentStrategy, no de CreditCardPayment ni PayPalPayment.
//   - L (Liskov Substitution): Todas las estrategias son intercambiables al
//     implementar PaymentStrategy; el cliente no nota la diferencia.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): Si PaymentStrategy crece con métodos como
//     refund() o validateCard(), estrategias simples (ej. CashPayment) deben
//     implementar métodos irrelevantes para ellas.
//   - S (Single Responsibility): ShoppingCart combina la gestión del carrito
//     de compras con la selección y ejecución de la estrategia de pago.
