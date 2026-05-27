<template>
<div>
    <Transition name="fade">
        <div v-if="tapCount > 0" class="tap-feedback">
                <span
                    v-for="i in REQUIRED_TAPS"
                    :key="i"
                    class="tap-dot"
                    :class="{ active: i <= tapCount }"
                />
        </div>
    </Transition>

    <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <button class="close-btn" @click="closeModal">✕</button>
                <h2>SHREK !!!</h2>
                <img
                    src="/images/shrek.jpg"
                    alt="Easter Egg"
                    class="easter-egg-img"
                />
            </div>
        </div>
    </Transition>
</div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'

    const showModal = ref(false)
    const tapCount = ref(0)

    const REQUIRED_TAPS = 4
    const TAP_THRESHOLD = 10
    const TIME_WINDOW = 1000

    const KONAMI_CODE = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ]

    let inputSequence = []

    const handleKeydown = (e) => {
        inputSequence.push(e.key)

        if (inputSequence.length > KONAMI_CODE.length) {
            inputSequence.shift()
        }

        const isKonamiCode = KONAMI_CODE.every(
            (key, index) => key === inputSequence[index]
        )

        if (isKonamiCode) {
            showModal.value = true
            inputSequence = []
        }
    }

    let tapTimer = null
    let touchStartX = 0
    let touchStartY = 0
    let resetFeedbackTimer = null

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
        const deltaX = Math.abs(e.changedTouches[0].clientX - touchStartX)
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY)

        const isTap = deltaX < TAP_THRESHOLD && deltaY < TAP_THRESHOLD
        if (!isTap) {
            resetTaps()
            return
        }

        tapCount.value++

        clearTimeout(resetFeedbackTimer)
        resetFeedbackTimer = setTimeout(() => {
            tapCount.value = 0
        }, 1200)

        if (tapCount.value === 1) {
            tapTimer = setTimeout(() => {
                resetTaps()
            }, TIME_WINDOW)
        }

        if (tapCount.value >= REQUIRED_TAPS) {
            showModal.value = true
            resetTaps()
        }
    }

    const resetTaps = () => {
        tapCount.value = 0
        clearTimeout(tapTimer)
        clearTimeout(resetFeedbackTimer)
        tapTimer = null
    }

    // ─────────────────────────────────────
    // MODAL
    // ─────────────────────────────────────
    const closeModal = () => {
        showModal.value = false
    }

    // ─────────────────────────────────────
    // LIFECYCLE
    // ─────────────────────────────────────
    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchend', handleTouchEnd, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchend', handleTouchEnd)
        clearTimeout(tapTimer)
        clearTimeout(resetFeedbackTimer)
    })
</script>

<style scoped>
/* ── Feedback taps ── */
.tap-feedback {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 9998;
}

.tap-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid white;
    transition: background 0.15s, transform 0.15s;
}

.tap-dot.active {
    background: #e94560;
    border-color: #e94560;
    transform: scale(1.3);
}

/* ── Modal ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    background: #1a1a2e;
    border: 2px solid #e94560;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    max-width: 500px;
    width: 90%;
    color: white;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.close-btn:hover {
    transform: scale(1.3);
}

.easter-egg-img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    margin: 1rem 0;
}
</style>
