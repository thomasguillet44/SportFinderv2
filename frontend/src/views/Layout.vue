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