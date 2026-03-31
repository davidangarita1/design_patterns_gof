/**
 * PATRÓN PROXY
 * 
 * Explicación:
 * El Proxy proporciona un sustituto o marcador de posición para otro objeto.
 * Controla el acceso al objeto original, permitiendo ejecutar algo antes o
 * después de que la solicitud sea procesada.
 * 
 * Caso de uso: Control de acceso, lazy loading, logging, cacheo, protección
 *             de objetos remotos o costosos
 */

// Interfaz que tanto el objeto real como el proxy deben implementar
interface DatabaseConnection {
  query(sql: string): string;
}

// Objeto real que es costoso de crear o usar
class RealDatabaseConnection implements DatabaseConnection {
  private isConnected: boolean = false;

  constructor() {
    console.log("Creating expensive database connection...");
    this.connect();
  }

  private connect(): string {
    console.log("✓ Connected to database");
    this.isConnected = true;
    return "Connected";
  }

  query(sql: string): string {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    console.log(`Executing query: ${sql}`);
    return "Query result";
  }
}

// Proxy que controla el acceso
class ProxyDatabaseConnection implements DatabaseConnection {
  private realConnection: RealDatabaseConnection | null = null;
  private accessLog: string[] = [];
  private queryCount: number = 0;

  private getRealConnection(): RealDatabaseConnection {
    if (this.realConnection === null) {
      console.log("Initializing real connection on first use...");
      this.realConnection = new RealDatabaseConnection();
    }
    return this.realConnection;
  }

  query(sql: string): string {
    this.queryCount++;
    this.accessLog.push(`Query #${this.queryCount}: ${sql}`);

    // Control de acceso: prevenir ciertos comandos
    if (sql.toUpperCase().includes("DROP")) {
      console.log("❌ DROP commands are not allowed!");
      return "Access denied";
    }

    // Logging
    console.log(`[PROXY LOG] Intercepting query #${this.queryCount}`);

    // Delegación al objeto real
    const result = this.getRealConnection().query(sql);

    console.log("[PROXY LOG] Query executed successfully");
    return result;
  }

  getAccessLog(): string[] {
    return this.accessLog;
  }
}

// Ejemplo de uso
console.log("=== PROXY PATTERN ===\n");

console.log("Creating proxy...");
const databaseProxy = new ProxyDatabaseConnection();

console.log("\n--- First query (triggers real connection) ---");
databaseProxy.query("SELECT * FROM users");

console.log("\n--- Second query (reuses connection) ---");
databaseProxy.query("SELECT * FROM products");

console.log("\n--- Attempting dangerous query ---");
databaseProxy.query("DROP TABLE users");

console.log("\n--- Valid query ---");
databaseProxy.query("UPDATE users SET name = 'John'");

console.log("\n--- Access Log ---");
databaseProxy.getAccessLog().forEach((log) => console.log(log));

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Se puede agregar nueva lógica al proxy (caché, auditoría)
//     sin modificar RealDatabaseConnection.
//   - D (Dependency Inversion): El cliente depende de la interfaz DatabaseConnection,
//     no de RealDatabaseConnection ni de DatabaseProxy directamente.
//   - L (Liskov Substitution): DatabaseProxy puede sustituir a RealDatabaseConnection
//     en cualquier contexto porque implementa la misma interfaz.
//   - S (Single Responsibility): El proxy gestiona logging y control de acceso;
//     la clase real solo gestiona la conexión. Responsabilidades separadas.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): Si DatabaseConnection crece con métodos como
//     beginTransaction(), el proxy debe implementarlos todos aunque solo delege.
//   - S (Single Responsibility): DatabaseProxy combina tres responabilidades:
//     lazy loading, logging y control de acceso. Idealmente serían proxies
//     separados o middlewares independientes.
