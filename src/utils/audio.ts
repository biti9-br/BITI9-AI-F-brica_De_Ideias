// Web Audio API sound effects for celebratory moments
class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Cheerful party fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.12, t: 0 },      // C5
        { f: 659.25, d: 0.12, t: 0.12 },   // E5
        { f: 783.99, d: 0.15, t: 0.24 },   // G5
        { f: 1046.50, d: 0.35, t: 0.39 }   // C6
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + t);
        
        gain.gain.setValueAtTime(0, this.ctx!.currentTime + t);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx!.currentTime + t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + t + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + t);
        osc.stop(this.ctx!.currentTime + t + d + 0.05);
      });
    } catch {
      // Audio might be blocked by autoplay policies
    }
  }

  // Friendly soft pop/chime for transitions
  public playPop() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }

  // Confetti / party burst sound
  public playPartyHorn() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const chord = [440, 554.37, 659.25, 880];
      chord.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.03);

        gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.03);
        gain.gain.linearRampToValueAtTime(0.08, this.ctx!.currentTime + i * 0.03 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.03 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + i * 0.03);
        osc.stop(this.ctx!.currentTime + i * 0.03 + 0.45);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundEffects();
