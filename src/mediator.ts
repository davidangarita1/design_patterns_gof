/**
 * PATRÓN MEDIATOR
 * 
 * Explicación:
 * El Mediator define un objeto que encapsula cómo interactúan un conjunto de
 * objetos. Promueve el acoplamiento débil manteniendo los objetos de no
 * referenciarse entre sí explícitamente.
 * 
 * Caso de uso: Sistemas de chat, controladores de diálogos complejos,
 *             coordinación de componentes, tráfico aéreo
 */

// Interfaz para el mediador
interface ChatMediator {
  showMessage(user: User, message: string): void;
  registerUser(user: User): void;
}

// Clase abstracta para usuarios
abstract class User {
  protected name: string;
  protected mediator: ChatMediator;

  constructor(name: string, mediator: ChatMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  abstract send(message: string): void;
  abstract receive(message: string): void;

  getName(): string {
    return this.name;
  }
}

// Tipos de usuarios
class RegularUser extends User {
  send(message: string): void {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.showMessage(this, message);
  }

  receive(message: string): void {
    console.log(`${this.name} receives: ${message}`);
  }
}

class AdminUser extends User {
  send(message: string): void {
    console.log(`${this.name} [ADMIN] sends: ${message}`);
    this.mediator.showMessage(this, `[ADMIN] ${message}`);
  }

  receive(message: string): void {
    console.log(`${this.name} [ADMIN] receives: ${message}`);
  }
}

// Mediador concreto
class ChatRoom implements ChatMediator {
  private users: User[] = [];

  registerUser(user: User): void {
    this.users.push(user);
    console.log(`[OK] ${user.getName()} joined the chat`);
  }

  showMessage(sender: User, message: string): void {
    console.log(`\n--- Message Broadcast ---`);
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(`${sender.getName()}: ${message}`);
      }
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  countUsers(): number {
    return this.users.length;
  }
}

// Ejemplo de uso
console.log("=== MEDIATOR PATTERN ===\n");

const chatRoom = new ChatRoom();

// Crear usuarios
const user1 = new RegularUser("Alice", chatRoom);
const user2 = new RegularUser("Bob", chatRoom);
const user3 = new RegularUser("Charlie", chatRoom);
const admin = new AdminUser("Admin", chatRoom);

// Registrar usuarios
chatRoom.registerUser(user1);
chatRoom.registerUser(user2);
chatRoom.registerUser(user3);
chatRoom.registerUser(admin);

console.log(`\nTotal users in chat: ${chatRoom.countUsers()}`);

// Enviar mensajes
user1.send("Hello everyone!");

user2.send("Hi Alice!");

admin.send("This is an announcement for everyone");

user3.send("Thanks for the update!");

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - D (Dependency Inversion): Todos los usuarios dependen de la interfaz
//     ChatMediator, no de ChatRoom directamente. El acoplamiento es hacia
//     la abstracción.
//   - S (Single Responsibility): La lógica de comunicación y enrutamiento de
//     mensajes está centralizada en ChatRoom, no dispersa entre los usuarios.
//   - O (Open/Closed): Nuevos tipos de usuario (AdminUser, BotUser) se agregan
//     sin modificar ChatRoom ni los usuarios existentes.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - S (Single Responsibility): ChatRoom puede convertirse en un "God Object"
//     al centralizar TODA la lógica de comunicación. Si crece con filtros,
//     roles, y logs, tendrá múltiples razones de cambio.
//   - O (Open/Closed): Cambiar la lógica de distribución en showMessage() puede
//     afectar el comportamiento de todos los usuarios al mismo tiempo.
//   - I (Interface Segregation): ChatMediator expone registerUser() y showMessage()
//     juntos; un mediador de eventos puede no necesitar el registro explícito.
