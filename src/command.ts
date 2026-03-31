/**
 * PATRÓN COMMAND
 * 
 * Explicación:
 * El Command encapsula una solicitud como un objeto, permitiendo parametrizar
 * clientes con diferentes solicitudes, hacer cola de solicitudes, registrar
 * solicitudes y soportar operaciones que se puedan deshacer.
 * 
 * Caso de uso: Undo/Redo, colas de tareas, macros, transacciones de BD,
 *             botones de control remoto
 */

// Interfaz para comandos
interface Command {
  execute(): void;
  undo(): void;
}

// Receptor de las acciones (el objeto que realiza el trabajo)
class Light {
  private isOn: boolean = false;

  turnOn(): void {
    this.isOn = true;
    console.log("Light is ON");
  }

  turnOff(): void {
    this.isOn = false;
    console.log("Light is OFF");
  }

  getStatus(): string {
    return this.isOn ? "ON" : "OFF";
  }
}

class Fan {
  private speed: number = 0;

  setSpeed(speed: number): void {
    this.speed = speed;
    console.log(`Fan speed set to ${speed}%`);
  }

  // Expone el estado actual para que el comando pueda guardarlo antes de ejecutar
  getSpeed(): number {
    return this.speed;
  }

  turnOff(): void {
    this.speed = 0;
    console.log("Fan turned OFF");
  }
}

// Comandos concretos
class TurnOnLightCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }

  undo(): void {
    this.light.turnOff();
  }
}

class TurnOffLightCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }

  undo(): void {
    this.light.turnOn();
  }
}

class SetFanSpeedCommand implements Command {
  private previousSpeed: number = 0;

  constructor(
    private fan: Fan,
    private newSpeed: number
  ) {}

  execute(): void {
    // Captura el estado actual ANTES de ejecutar para poder deshacerlo correctamente
    this.previousSpeed = this.fan.getSpeed();
    this.fan.setSpeed(this.newSpeed);
  }

  undo(): void {
    this.fan.setSpeed(this.previousSpeed);
  }
}

// Invocador de comandos (control remoto)
class RemoteControl {
  private commands: Command[] = [];
  private history: Command[] = [];

  pressButton(command: Command): void {
    command.execute();
    this.commands.push(command);
    this.history.push(command);
  }

  undo(): void {
    if (this.history.length > 0) {
      const lastCommand = this.history.pop();
      if (lastCommand) {
        console.log("Undoing last action...");
        lastCommand.undo();
      }
    }
  }

  macro(commands: Command[]): void {
    console.log("\n--- Executing Macro ---");
    commands.forEach((cmd) => cmd.execute());
  }
}

// Ejemplo de uso
console.log("=== COMMAND PATTERN ===\n");

const light = new Light();
const fan = new Fan();
const remote = new RemoteControl();

console.log("--- Basic Commands ---");
remote.pressButton(new TurnOnLightCommand(light));
remote.pressButton(new SetFanSpeedCommand(fan, 75));
remote.pressButton(new TurnOffLightCommand(light));

console.log("\n--- Undo Operations ---");
remote.undo();
remote.undo();

console.log("\n--- Macro (Multiple commands at once) ---");
const macroCommands: Command[] = [
  new TurnOnLightCommand(light),
  new SetFanSpeedCommand(fan, 50),
];
remote.macro(macroCommands);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos comandos (ej. DimLightCommand) se agregan sin
//     modificar RemoteControl ni las clases receptor existentes.
//   - S (Single Responsibility): Cada comando encapsula una única acción;
//     RemoteControl solo invoca; Light y Fan solo ejecutan sus operaciones.
//   - D (Dependency Inversion): RemoteControl depende de la interfaz Command,
//     no de TurnOnLightCommand ni SetFanSpeedCommand directamente.
//   - L (Liskov Substitution): Todos los comandos son intercambiables al
//     implementar la interfaz Command con execute() y undo().
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): La interfaz Command incluye undo() pero no
//     todos los comandos necesariamente soportan deshacer (ej. un comando
//     de envío de email). Fuerza implementaciones vacías o falsas.
//   - S (Single Responsibility): RemoteControl combina ejecución de comandos,
//     gestión del historial y soporte de macros: tres responsabilidades.
