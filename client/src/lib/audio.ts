// Gentle ambient harmonic synthesizer for the "Door Towards a New Beginning" experience
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;

  constructor() {
    // Check saved preference
    const saved = localStorage.getItem('mitrangan_sound_enabled');
    this.isMuted = saved !== 'true';
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;
    localStorage.setItem('mitrangan_sound_enabled', (!muted).toString());
    if (this.masterGain && this.ctx) {
      const target = muted ? 0 : 0.08;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.2);
    }
    return this.isMuted;
  }

  public toggleMute(): boolean {
    const next = !this.isMuted;
    this.setMuted(next);
    if (!next && !this.isPlaying) {
      this.playGentleChime();
    }
    return this.isMuted;
  }

  public playGentleChime() {
    if (this.isMuted) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Warm peaceful harmonic chord (F# major 9 / Pentatonic healing frequencies: 369Hz, 432Hz, 528Hz)
      const frequencies = [216, 272, 324, 432, 544];
      const now = this.ctx.currentTime;

      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope: fade in softly, linger peacefully
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04 / frequencies.length, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5 + idx * 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.15);
        osc.stop(now + 5.5 + idx * 0.4);
      });
    } catch {
      // Ignore audio failure
    }
  }
}

export const soundManager = new AmbientSoundManager();
