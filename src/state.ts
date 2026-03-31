/**
 * PATRÓN STATE
 * 
 * Explicación:
 * El State permite que un objeto altere su comportamiento cuando su estado
 * interno cambia. Parece que cambie la clase del objeto.
 * 
 * Caso de uso: Máquinas de estados, reproductores de medios, sistemas de flujo
 *             de trabajo, máquinas expendedoras, procesadores de pedidos
 */

// Interfaz para estados
interface State {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

// Contexto
class MediaPlayer {
  private state: State;
  private isPlaying: boolean = false;
  private currentTime: number = 0;
  private duration: number = 180; // 3 minutos

  constructor() {
    this.state = new StoppedState();
  }

  setState(state: State): void {
    console.log(`State changed to ${state.constructor.name}`);
    this.state = state;
  }

  play(): void {
    this.state.play(this);
  }

  pause(): void {
    this.state.pause(this);
  }

  stop(): void {
    this.state.stop(this);
  }

  setPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
  }

  setCurrentTime(time: number): void {
    this.currentTime = time;
  }

  getStatus(): string {
    const status = this.isPlaying ? "Playing" : "Not playing";
    return `Status: ${status} | Time: ${this.currentTime}/${this.duration}s`;
  }
}

// Estados concretos
class StoppedState implements State {
  play(player: MediaPlayer): void {
    console.log("▶️  Starting playback");
    player.setPlaying(true);
    player.setCurrentTime(0);
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log("⚠️  Cannot pause. Media is stopped.");
  }

  stop(player: MediaPlayer): void {
    console.log("⚠️  Already stopped.");
  }
}

class PlayingState implements State {
  play(player: MediaPlayer): void {
    console.log("⚠️  Already playing.");
  }

  pause(player: MediaPlayer): void {
    console.log("⏸️  Pausing playback");
    player.setPlaying(false);
    player.setState(new PausedState());
  }

  stop(player: MediaPlayer): void {
    console.log("⏹️  Stopping playback");
    player.setPlaying(false);
    player.setCurrentTime(0);
    player.setState(new StoppedState());
  }
}

class PausedState implements State {
  play(player: MediaPlayer): void {
    console.log("▶️  Resuming playback");
    player.setPlaying(true);
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log("⚠️  Already paused.");
  }

  stop(player: MediaPlayer): void {
    console.log("⏹️  Stopping playback");
    player.setPlaying(false);
    player.setCurrentTime(0);
    player.setState(new StoppedState());
  }
}

// Ejemplo de uso
console.log("=== STATE PATTERN ===\n");

const player = new MediaPlayer();

console.log("Initial State:");
console.log(player.getStatus());

console.log("\n--- Play ---");
player.play();
player.setCurrentTime(45);
console.log(player.getStatus());

console.log("\n--- Try to Play Again ---");
player.play();

console.log("\n--- Pause ---");
player.pause();
console.log(player.getStatus());

console.log("\n--- Play Again ---");
player.play();
player.setCurrentTime(120);
console.log(player.getStatus());

console.log("\n--- Stop ---");
player.stop();
console.log(player.getStatus());

console.log("\n--- Try to Pause Stopped Player ---");
player.pause();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos estados (ej. BufferingState) se agregan creando
//     una nueva clase que implementa State, sin modificar el contexto ni los
//     estados existentes.
//   - S (Single Responsibility): Cada estado (StoppedState, PlayingState,
//     PausedState) encapsula el comportamiento de MediaPlayer para ese estado
//     específico. El contexto solo delega.
//   - D (Dependency Inversion): MediaPlayer depende de la interfaz State,
//     no de StoppedState, PlayingState ni PausedState directamente.
//   - L (Liskov Substitution): Cualquier estado concreto puede sustituir a otro
//     en el contexto porque todos implementan la misma interfaz State.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): La interfaz State obliga a implementar play(),
//     pause() y stop() aunque un estado particular no soporte alguna de esas
//     transiciones de forma significativa (retornan mensajes de advertencia).
//   - D (Dependency Inversion): Los estados concretos reciben MediaPlayer como
//     argumento concreto, creando un acoplamiento bidireccional entre el contexto
//     y sus estados.
