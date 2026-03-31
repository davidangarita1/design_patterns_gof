/**
 * PATRÓN ADAPTER
 * 
 * Explicación:
 * El Adapter convierte la interfaz de una clase en otra interfaz que el cliente
 * espera. Permite que clases incompatibles trabajen juntas adaptando una interfaz
 * a otra.
 * 
 * Caso de uso: Integrar bibliotecas antiguas, compatibilidad con diferentes formatos,
 *             adaptadores de hardware o software
 */

// Interfaz que el cliente espera
interface AdapterMediaPlayer {
  play(audioFileName: string): void;
}

// Clase que el cliente quiere usar pero tiene una interfaz diferente
interface AdvancedMediaPlayer {
  playMp4(fileName: string): void;
  playVlc(fileName: string): void;
}

// Implementación de reproductor avanzado
class Mp4Player implements AdvancedMediaPlayer {
  playMp4(fileName: string): void {
    console.log(`Playing MP4 file: ${fileName}`);
  }

  playVlc(fileName: string): void {
    // No soporta VLC: falla explícita en lugar de silenciosa
    console.log(`Mp4Player: VLC format not supported for "${fileName}"`);
  }
}

class VlcPlayer implements AdvancedMediaPlayer {
  playMp4(fileName: string): void {
    // No soporta MP4: falla explícita en lugar de silenciosa
    console.log(`VlcPlayer: MP4 format not supported for "${fileName}"`);
  }

  playVlc(fileName: string): void {
    console.log(`Playing VLC file: ${fileName}`);
  }
}

// Adapter que adapta AdvancedMediaPlayer a AdapterMediaPlayer
class MediaAdapter implements AdapterMediaPlayer {
  private advancedPlayer: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === "mp4") {
      this.advancedPlayer = new Mp4Player();
    } else if (audioType === "vlc") {
      this.advancedPlayer = new VlcPlayer();
    } else {
      throw new Error(`Unsupported audio type: ${audioType}`);
    }
  }

  play(audioFileName: string): void {
    const fileType = audioFileName.split(".").pop();
    if (fileType === "mp4") {
      this.advancedPlayer.playMp4(audioFileName);
    } else if (fileType === "vlc") {
      this.advancedPlayer.playVlc(audioFileName);
    }
  }
}

// Cliente que usa AdapterMediaPlayer
class AudioPlayer implements AdapterMediaPlayer {
  private mediaAdapter?: MediaAdapter;

  play(audioFileName: string): void {
    const fileType = audioFileName.split(".").pop();

    if (fileType === "mp3") {
      console.log(`Playing MP3 file: ${audioFileName}`);
    } else if (fileType === "mp4" || fileType === "vlc") {
      this.mediaAdapter = new MediaAdapter(fileType!);
      this.mediaAdapter.play(audioFileName);
    } else {
      console.log(`Unsupported audio format: ${fileType}`);
    }
  }
}

// Ejemplo de uso
console.log("=== ADAPTER PATTERN ===\n");

const audioPlayer = new AudioPlayer();

audioPlayer.play("song.mp3");
audioPlayer.play("movie.mp4");
audioPlayer.play("video.vlc");
audioPlayer.play("unsupported.wav");

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - S (Single Responsibility): MediaAdapter tiene una sola responsabilidad:
//     traducir llamadas de la interfaz MediaPlayer a AdvancedMediaPlayer.
//   - O (Open/Closed): Se pueden agregar nuevos adaptadores (ej. AviAdapter)
//     sin modificar AudioPlayer ni las clases existentes.
//   - D (Dependency Inversion): AudioPlayer depende de la interfaz MediaPlayer,
//     no de clases concretas como Mp4Player o VlcPlayer.
//   - L (Liskov Substitution): MediaAdapter implementa MediaPlayer y puede
//     sustituir a cualquier otro MediaPlayer sin romper el comportamiento.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): AdvancedMediaPlayer obliga a Mp4Player a
//     implementar playVlc() y a VlcPlayer a implementar playMp4(), aunque
//     no los soporten. Lo correcto sería segregar en interfaces específicas.
//   - S (Single Responsibility): MediaAdapter decide quiné player crear basado
//     en el tipo de audio, mezclando creación con adaptación.
