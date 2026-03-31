/**
 * PATRÓN CHAIN OF RESPONSIBILITY
 * 
 * Explicación:
 * El Chain of Responsibility pass a request a lo largo de una cadena de
 * manejadores. Cada manejador decide si procesar la solicitud o pasarla
 * al siguiente manejador en la cadena.
 * 
 * Caso de uso: Sistemas de aprobación, manejo de eventos en UI, logging
 *             con múltiples niveles, validación de formularios
 */

// Clase que representa una solicitud
class LeaveRequest {
  constructor(
    public employeeName: string,
    public leaveDays: number
  ) {}
}

// Clase abstracta para manejadores
abstract class LeaveApprover {
  protected nextApprover: LeaveApprover | null = null;

  setNextApprover(approver: LeaveApprover): void {
    this.nextApprover = approver;
  }

  abstract canApprove(days: number): boolean;
  abstract getApproverName(): string;

  handleRequest(request: LeaveRequest): void {
    if (this.canApprove(request.leaveDays)) {
      console.log(`✓ ${this.getApproverName()} approves ${request.leaveDays} days for ${request.employeeName}`);
    } else if (this.nextApprover !== null) {
      console.log(`→ ${this.getApproverName()} delegates to next approver`);
      this.nextApprover.handleRequest(request);
    } else {
      console.log(`✗ Request rejected - no approver can handle ${request.leaveDays} days`);
    }
  }
}

// Implementaciones concretas
class Manager extends LeaveApprover {
  canApprove(days: number): boolean {
    return days <= 3;
  }

  getApproverName(): string {
    return "Manager";
  }
}

class Director extends LeaveApprover {
  canApprove(days: number): boolean {
    return days <= 7;
  }

  getApproverName(): string {
    return "Director";
  }
}

class VicePresident extends LeaveApprover {
  canApprove(days: number): boolean {
    return days <= 30;
  }

  getApproverName(): string {
    return "Vice President";
  }
}

class CEO extends LeaveApprover {
  canApprove(days: number): boolean {
    return true; // CEO puede aprobar cualquier cantidad de días
  }

  getApproverName(): string {
    return "CEO";
  }
}

// Ejemplo de uso
console.log("=== CHAIN OF RESPONSIBILITY PATTERN ===\n");

// Crear la cadena de aprobadores
const manager = new Manager();
const director = new Director();
const vp = new VicePresident();
const ceo = new CEO();

manager.setNextApprover(director);
director.setNextApprover(vp);
vp.setNextApprover(ceo);

// Procesar solicitudes
const request1 = new LeaveRequest("Alice", 2);
console.log("Request 1: 2 days");
manager.handleRequest(request1);

console.log("\nRequest 2: 5 days");
const request2 = new LeaveRequest("Bob", 5);
manager.handleRequest(request2);

console.log("\nRequest 3: 15 days");
const request3 = new LeaveRequest("Charlie", 15);
manager.handleRequest(request3);

console.log("\nRequest 4: 60 days");
const request4 = new LeaveRequest("Diana", 60);
manager.handleRequest(request4);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos aprobadores (ej. Board) se agregan creando una
//     nueva subclase y enlazándola, sin modificar la cadena existente.
//   - L (Liskov Substitution): Cada manejador concreto puede sustituir a
//     LeaveApprover en cualquier posición de la cadena.
//   - D (Dependency Inversion): El cliente y cada eslabón dependen de la
//     clase abstracta LeaveApprover, no de los tipos concretos.
//   - S (Single Responsibility): Cada manejador decide solo si puede aprobar
//     la solicitud según su propio umbral.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - S (Single Responsibility): LeaveApprover mezcla la lógica de delegación
//     en cadena (handleRequest) con la lógica de aprobación (canApprove),
//     generando dos razones de cambio en la misma clase.
//   - I (Interface Segregation): Si la interfaz del manejador crece (ej. con
//     métodos de auditoría o notificación), todos los manejadores deben
//     implementarlos aunque no los usen.
