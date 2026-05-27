<template>
    <div>
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

    const closeModal = () => {
        showModal.value = false
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
    })
</script>

<style scoped>
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
