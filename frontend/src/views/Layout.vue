<template>
    <div class="layout">
        <header class="header">
            <slot name="header"></slot>
        </header> 

        <main class="main">
            <slot name="main"></slot>
        </main>

        <div class="filters">
            <slot name="filters"></slot>
        </div>
        
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<style scoped>
.layout {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    --header-height: 10vh;
}

@media (max-width: 768px) {
    .layout {
        --header-height: 15vh;
    }
}

.header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 10px;
    height: var(--header-height);
}

.main {
    position: absolute;
    inset: 0; /* couvre tout le layout */
    z-index: 1;
}

.filters {
    position: absolute;
    top: var(--header-height);
    margin-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.footer {
    position: absolute;
    bottom: 18px;
    left: 8px;
    z-index: 10;
}
</style>