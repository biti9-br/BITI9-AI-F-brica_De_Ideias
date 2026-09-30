import confetti from 'canvas-confetti';

export function firePartyConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#6366F1', '#EC4899', '#F59E0B']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#10B981', '#3B82F6', '#8B5CF6']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#F43F5E', '#FBBF24', '#06B6D4']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#A855F7', '#E11D48', '#F59E0B']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}

export function fireContinuousCelebration(durationSeconds: number = 3) {
  const duration = durationSeconds * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#38BDF8']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#F43F5E', '#6366F1', '#FBBF24', '#06B6D4', '#E11D48']
    });
  }, 250);
}
